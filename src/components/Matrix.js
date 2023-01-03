export default class Matrix {
    static SIZE = 10
    
    static reset() {
        let matrix = [];
        for (let row = 0; row < Matrix.SIZE; row++) {
            let cols = [];
            for (let col = 0; col < Matrix.SIZE; col++) {
                cols.push(0);
            }
            matrix.push(cols);
        }
        return matrix;
    }
}