import User from "@/components/User";
import Board from "@/components/Board";
import Utils from "@/components/Utils";
import Ship from "@/components/Ship";

export default class Bot extends User {
    static SHIP_MAX_LENGTH = 4;
    static MAX_SEARCH_ATTEMPTS = 1000;
    // getShotCoords() {
    //     let [x, y] = Utils.randomCoords(Board.SIZE - 1);
    //
    //     if (this.board.cells[x][y].isUntouched()) {
    //         return [x, y];
    //     }
    //     else {
    //         this.getShotCoords();
    //     }
    // }

    getShotCoords() {
        let withFire = this.findFire();
        if (withFire.length === 1) {
            return this.findSuspectedCell(withFire[0][0], withFire[0][1]);
        }
        else if( withFire.length > 1) {
            let direction = this.detectShipDirection(withFire);
            let [firstX, firstY] = withFire[0];
            let [lastX, lastY] = withFire[withFire.length - 1];
            let beforeFirstCell = this.findNearCell(firstX, firstY, direction, true);
            let afterLastCell = this.findNearCell(lastX, lastY, direction, false);
            let coords = [];
            if (beforeFirstCell) {
                coords.push(beforeFirstCell);
            }
            if (afterLastCell) {
                coords.push(afterLastCell);
            }
            return Utils.randomArrEl(coords);
        }

        return this.getRandomUntouchedCell();
    }

    getRandomUntouchedCell() {
        for (let i = 0; i < Bot.MAX_SEARCH_ATTEMPTS; i++) {
            let [x, y] = Utils.randomCoords(Board.SIZE - 1);
            if (this.board.cells[x][y].isUntouched()) {
                return [x, y];
            }
        }
        console.error(`Bot can't find untouched cell for ${Bot.MAX_SEARCH_ATTEMPTS} attempts`);
        return [0, 0];
    }

    findFire() {
        let withFire = [];
        /** @var cell */
        for (let [x, rows] of this.board.cells.entries()) {
            for (let [y, cell] of rows.entries()) {
                if (cell.isFire()) {
                    withFire.push([x, y]);
                }
            }
        }
        return withFire;
    }

    findSuspectedCell(x, y) {
        let coords = [];
        for (let dx of [-1, 0, 1]) {
            for (let dy of [-1, 0, 1]) {
                let [newX, newY] = [x + dx, y + dy];

                if (dx * dy !== 0) {
                    continue;
                }
                if (! Board.validateCoords(newX, newY)) {
                    continue
                }
                if (this.board.cells[newX][newY].isUntouched()) {
                    coords.push([newX, newY]);
                }
            }
        }
        return Utils.randomArrEl(coords);
        // console.error('Suspected cell NOT FOUND!');
    }

    detectShipDirection(coords) {
        return coords[0][0] === coords[1][0] ? Ship.HORIZONTAL : Ship.VERTICAL;
    }

    findNearCell(x, y, direction, isFirstCell) {
        let dx = (direction === Ship.HORIZONTAL) ? 0 : (isFirstCell ? -1 : +1);
        let dy = (direction === Ship.VERTICAL) ? 0 : (isFirstCell ? -1 : +1);

        let newX = x + dx;
        let newY = y + dy;

        if (! Board.validateCoords(newX, newY)) {
            // console.log('Near cell find failed for ',x, y, 'because invalid coords', newX, newY);
            return false;
        }

        if (this.board.cells[newX][newY].isUntouched()) {
            return [newX, newY];
        }
        else {
            // console.log('cell', newX, newY, 'has is touched by state', this.board.cells[newX][newY].state);
            return false;
        }
    }



}