import Board from "@/components/Board";

export default class User {
    board = Board

    constructor(board) {
        this.board = board;
    }

    getShotCoords() {
        console.log('User is not a bot');
    }
}