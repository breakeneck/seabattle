import Ship from "@/components/Ship";
import Matrix from "@/components/Matrix";

export default class Board {
    static EMPTY = 1
    static SHIP = 2
    static DEAD_SHIP = 3
    static ALL_SHIPS_DEAD = 4

    positions = []
    states = []
    ships = []

    isMine = false

    constructor(isMine) {
        this.isMine = isMine || false;

        this.states = Matrix.reset();
        this.createShips();
        this.locateShips();
    }

    shot(row, col) {
        if (this.isMine || this.states[row][col]) {
            return false;
        }

        let isHit = this.positions[row][col] === Board.SHIP;
        this.states[row][col] = isHit ? Board.SHIP : Board.EMPTY;

        if (isHit) {
            let ship = this.findShipByCoords(row, col);
            let isKilled = this.getHitsCount(ship.coords) === ship.length;
            if (isKilled) {
                this.markAsDead(ship);
                if (this.allShipsAreDead()) {
                    return Board.ALL_SHIPS_DEAD;
                }
                else {
                    return Board.DEAD_SHIP;
                }
            }
        }
        return isHit ? Board.SHIP : Board.EMPTY;
    }

    isMyShip(row, col) {
        return this.isMine && this.positions[row][col] === Board.SHIP;
    }

    isMyNewShip(row, col) {
        return this.isMyShip(row, col) && ! this.states[row][col];
    }

    isMyBurningShip(row, col) {
        return this.isMyShip(row, col) && this.states[row][col];
    }

    getHitsCount(coords) {
        let count = 0;
        for (let [x, y] of coords) {
            if (this.states[x][y] === Board.SHIP) {
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
            this.states[x][y] = Board.DEAD_SHIP;
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
        this.positions = Matrix.reset();

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
                    if (this.positions[row + r][col + c] === Board.SHIP) {
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
            this.positions[row][col] = Board.SHIP;
        }
        // console.log('Ship added', ship.info());
    }

    isMissed(state) {
        return state === Board.EMPTY;
    }
    isFire(state) {
        return state === Board.SHIP;
    }
    isDead(state) {
        return state === Board.DEAD_SHIP;
    }
}