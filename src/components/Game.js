import Board from "@/components/Board";
import Bot from "@/components/Bot";

export default class Game {
    static MISS = 0;
    static HIT = 1;
    static KILL = 2;
    static END = 3;

    static MY_TURN = 0;
    static ENEMY_TURN = 1;

    myBoard = Board
    enemyBoard = Board
    turn = Game.MY_TURN;
    bot = Bot;

    constructor(myBoard, enemyBoard) {
        this.myBoard = myBoard;
        this.enemyBoard = enemyBoard;

        this.bot = new Bot(this.myBoard);
    }

    shot(board, row, col) {
        let result = board.shot(row, col);
        this.checkResult(result);
        return result;
    }

    checkResult(shotResult) {
        switch (shotResult) {
            case Board.EMPTY:
                return this.changeTurn();
            case Board.ALL_SHIPS_DEAD:
                return alert('ENd of the Game');
        }
    }

    changeTurn() {
        this.turn = this.turn === Game.MY_TURN ? Game.ENEMY_TURN : Game.MY_TURN;

        if (! this.isMyTurn()) {
            let [x, y] = this.bot.shot();
            let result = this.shot(this.myBoard, x, y);
            this.bot.analyze(result);
        }
    }

    isCurrentBoardTurn(isMine) {
        return (isMine && this.isMyTurn()) || (! isMine && !  this.isMyTurn());
    }

    isMyTurn() {
        return this.turn === Game.MY_TURN;
    }
}