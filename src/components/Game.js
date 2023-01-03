
export default class Game {
    static MISS = 0;
    static HIT = 1;
    static END = 2;

    static MY_TURN = 0;
    static ENEMY_TURN = 1;

    turn = Game.MY_TURN;

    shot(board, row, col) {
        let state = board.shot(row, col);
        this.checkResult(state);
    }

    checkResult(shotResult) {
        switch (shotResult) {
            case Game.MISS:
                return this.changeTurn();
            case Game.END:
                alert('ENd of the Game');
        }
    }

    changeTurn() {
        this.turn = this.turn === Game.MY_TURN ? Game.ENEMY_TURN : Game.MY_TURN;
    }

    isCurrentBoardTurn(isMine) {
        return (isMine && Game.MY_TURN) || (! isMine && Game.ENEMY_TURN);
    }
}