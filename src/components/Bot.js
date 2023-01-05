import User from "@/components/User";
import Board from "@/components/Board";
import Utils from "@/components/Utils";

export default class Bot extends User {
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
        for (let i = 0; i < 1000; i++) {
            let [x, y] = Utils.randomCoords(Board.SIZE - 1);
            if (this.board.cells[x][y].isUntouched()) {
                return [x, y];
            }
        }
    }
}