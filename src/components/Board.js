export default class Board {
    STATE_MISS = 0;
    STATE_HIT = 1;
    STATE_END = 2;

    SIZE = 10
    EMPTY = 1
    SHIP = 2
    DEAD_SHIP = 4

    states = []
    ships = []

    isMine = false

    constructor(isMine) {
        this.isMine = isMine || false;

        this.states = this.getEmptyMatrix();
        this.createShips();
        this.locateShips();

        console.log(this);
    }

    shot(row, col) {
        if (this.isMine) {
            return false;
        }

        let isHit = this.positions[row][col] === this.SHIP;
        this.states[row][col] = isHit ? this.SHIP : this.EMPTY;

        if (isHit) {
            let ship = this.findShipByCoords(row, col);
            let isKilled = this.getHitsCount(ship.coords) === ship.length;
            if (isKilled) {
                this.markAsDead(ship);
                if (this.allShipsAreDead()) {
                    return this.STATE_END;
                }
            }
        }
        return isHit ? this.STATE_HIT : this.STATE_MISS;
    }

    isMyShip(row, col) {
        return this.isMine && this.positions[row][col] === this.SHIP;
    }

    getHitsCount(coords) {
        let count = 0;
        for (let [x, y] of coords) {
            if (this.states[x][y] === this.SHIP) {
                count++;
            }
        }
        return count;
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

    markAsDead(ship) {
        ship.isDead = true;
        for (let [x, y] of ship.coords) {
            this.states[x][y] = this.DEAD_SHIP;
        }
    }

    allShipsAreDead() {
        for (let ship of this.ships) {
            if (! ship.isDead) {
                return false;
            }
        }
        return true;
    }

    getEmptyMatrix(matrix) {
        matrix = [];
        for (let row = 0; row < this.SIZE; row++) {
            let cols = [];
            for (let col = 0; col < this.SIZE; col++) {
                cols.push(0);
            }
            matrix.push(cols);
        }
        return matrix;
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
        this.positions = this.getEmptyMatrix();

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
        // console.log(this.positions);
    }

    isFits(ship) {
        for (let [row, col] of ship.coords) {
            if (! this.isCoordFits(row, col)) {
                // console.log(row, col, 'ship not fits', ship.info());
                return false;
            }
        }
        // console.log('SHIP FITS!', ship.info());
        return true;
    }

    isCoordFits(row, col) {
        for (let r = -1; r <= 1; r++) {
            for (let c = -1; c <= 1; c++) {
                try {
                    if (this.positions[row + r][col + c] === this.SHIP) {
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
        for (let [row, col] of ship.coords) {
            this.positions[row][col] = this.SHIP;
        }
        // console.log('Ship added', ship.info());
    }
}

class Ship {
    HORIZONTAL = 0
    VERTICAL = 1

    isDead = false;
    length = 0
    direction = 0
    coords = []

    constructor(length) {
        this.length = length;
        this.generatePosition();
    }

    generatePosition() {
        this.direction = this.random(1);
        let maxWidth = this.direction === this.HORIZONTAL ? (10 - this.length - 1) : 10 - 1;
        let maxHeight = this.direction === this.VERTICAL ? (10 - this.length - 1) : 10 - 1;

        let [top, left] = [this.random(maxWidth), this.random(maxHeight)];
        this.writeCoords(top, left);

        // console.log(this.length, this.direction ? 'vertical' : 'horizontal', maxWidth, maxWidth, ' | ', top, left);

        return true;
    }

    writeCoords(row, col) {
        this.coords = [];
        this.coords.push([row, col]);
        for (let i = 0; i < this.length - 1; i++) {
            row = this.direction === this.HORIZONTAL ? row + 1 : row;
            col = this.direction === this.VERTICAL ? col + 1 : col;
            this.coords.push([row, col]);
        }
    }

    random(max) {
        max = Math.floor(max);
        return Math.floor(Math.random() * (max + 1));
    }

    info() {
        return this.length + (this.direction ? ' vertical ' : ' horizontal ') + JSON.stringify(this.coords);
    }
}