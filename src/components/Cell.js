export default class Cell {
    static EMPTY = 0
    static MISS = 1
    static UNTOUCHED_SHIP = 2
    static FIRED_SHIP = 3
    static DEAD_SHIP = 4
    static ALL_SHIPS_DEAD = 5

    state = Cell.EMPTY

    isUntouched() {
        return [Cell.EMPTY, Cell.UNTOUCHED_SHIP].includes(this.state);
    }


    update(newState) {
        this.state = newState;
    }

    isAnyShip() {
        return [Cell.UNTOUCHED_SHIP, Cell.FIRED_SHIP, Cell.DEAD_SHIP].includes(this.state);
    }

    isShip() {
        return this.state === Cell.UNTOUCHED_SHIP;
    }

    isMissed() {
        return this.state === Cell.MISS;
    }

    isFire() {
        return this.state === Cell.FIRED_SHIP;
    }

    isDead() {
        return this.state === Cell.DEAD_SHIP || this.state === Cell.ALL_SHIPS_DEAD;
    }
}