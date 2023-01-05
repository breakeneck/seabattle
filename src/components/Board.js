import Ship from "@/components/Ship";
import Cell from "@/components/Cell";

export default class Board {
    static SIZE = 10;

    cells = []
    ships = []

    isMine = false

    constructor(isMine) {
        this.isMine = isMine || false;
    }

    reset() {
        this.cells = Array.from({length: Board.SIZE},() => (
            Array.from({length: Board.SIZE},() => (
                new Cell()
            ))
        ))

        this.createShips();
        this.locateShips();
    }

    shot(x, y) {
        let cell = this.cells[x][y];
        if (! cell.isUntouched()) {
            return false;
        }

        if (cell.isShip()) {
            cell.update(Cell.FIRED_SHIP);

            let ship = this.findShipByCoords(x, y);
            ship.addDamage();
            if (ship.isKilled()) {
                this.markDeadShipArea(ship);
                if (this.allShipsAreDead()) {
                    cell.update(Cell.ALL_SHIPS_DEAD);
                }
            }
        }
        else {
            cell.update(Cell.MISS);
        }

        return cell;
    }

    findShipByCoords(row, col) {
        for (let ship of this.ships) {
            for (let [x, y] of ship.coords) {
                if (x === row && y === col) {
                    return ship;
                }
            }
        }
    }

    markDeadShipArea(ship) {
        for (let [x, y] of ship.coords) {
            this.cells[x][y].update(Cell.DEAD_SHIP);
        }

        let [top, left, bottom, right] = ship.getOuterCoords();
        // console.log(top, left, bottom, right);

        for (let x = top; x <= bottom; x++) {
            for (let y = left; y <= right; y++) {
                // console.log(x, y, this.cells[x][y].state);
                try {
                    let cell = this.cells[x][y];
                    if (cell.isDead()) {
                        cell.update(Cell.DEAD_SHIP)
                    }
                    else {
                        cell.update(Cell.MISS);
                    }
                    // eslint-disable-next-line no-empty
                } catch (e) {
                }
            }
        }
    }

    allShipsAreDead() {
        for (let ship of this.ships) {
            if (! ship.isKilled()) {
                return false;
            }
        }
        return true;
    }

    createShips() {
        this.ships = [];

        this.ships.push(new Ship(4));

        this.ships.push(new Ship(3));
        this.ships.push(new Ship(3));

        this.ships.push(new Ship(2));
        this.ships.push(new Ship(2));
        this.ships.push(new Ship(2));

        this.ships.push(new Ship(1));
        this.ships.push(new Ship(1));
        this.ships.push(new Ship(1));
        this.ships.push(new Ship(1));
    }

    locateShips() {
        for (let ship of this.ships) {
            let attempts = 0;
            while (! this.isFits(ship)) {
                ship.generatePosition();
                attempts++;
                if (attempts > 1000) {
                    console.error('cant locate ship because a lot of attempts', ship.info());
                    break;
                }
            }
            this.add(ship);
        }
    }

    isFits(ship) {
        for (let [x, y] of ship.coords) {
            if (! this.isCoordFits(x, y)) {
                // console.log(row, col, 'ship not fits', ship.info());
                return false;
            }
        }
        // console.log('SHIP FITS!', ship.info());
        return true;
    }

    isCoordFits(x, y) {
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                try {
                    if (this.cells[x + dx][y + dy].isShip()) {
                        return false;
                    }
                    // eslint-disable-next-line no-empty
                } catch (e) {
                }
            }
        }
        return true;
    }

    add(ship) {
        for (let [x, y] of ship.coords) {
            // console.log(x, y);
            this.cells[x][y].update(Cell.UNTOUCHED_SHIP);
        }
        // console.log('Ship added', ship.info());
    }
}