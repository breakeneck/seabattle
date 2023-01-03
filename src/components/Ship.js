export default class Ship {
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