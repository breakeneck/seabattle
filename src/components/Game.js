import Cell from "@/components/Cell";
import User from "@/components/User";
import Utils from "@/components/Utils";

export default class Game {
    static BOT_THINK_INTERVAL = 200;

    static NOT_STARTED = 0
    static STATE_MY_TURN = 1;
    static STATE_ENEMY_TURN = 2;

    state = Game.NOT_STARTED;

    me = User
    enemy = User

    constructor(me, enemy) {
        this.me = me;
        this.enemy = enemy;
    }

    start() {
        this.state = Game.STATE_MY_TURN;

        this.me.board.reset();
        this.enemy.board.reset();

        if (this.isBotMove()) {
            this.shot()
        }
    }

    /** @returns {User} */
    user() {
        return this.isMyTurn() ? this.me : this.enemy;
    }

    shot(x, y) {
        Utils.beep();
        if (this.isBotMove()) {
            let bot = this.user();
            [x, y] = bot.getShotCoords();
        }

        let cell = this.user().board.shot(x, y);
        switch (cell.state) {
            case Cell.MISS:
                this.changeTurn();
                break
            case Cell.ALL_SHIPS_DEAD:
                return alert('End of the Game.' + (this.isMyTurn() ? 'You win!' : 'Bot wins!'));
        }

        if (this.isBotMove()) {
            setTimeout(() => this.shot(), Game.BOT_THINK_INTERVAL);
        }
    }

    changeTurn() {
        this.state = this.isMyTurn() ? Game.STATE_ENEMY_TURN : Game.STATE_MY_TURN;
    }

    isCurrentBoardTurn(isMine) {
        return (isMine && this.isMyTurn()) || (! isMine && !  this.isMyTurn());
    }

    isMyTurn() {
        return this.state === Game.STATE_MY_TURN;
    }

    isBotMove() {
        return this.user().constructor.name === 'Bot';
    }

    isStarted() {
        return this.state !== Game.NOT_STARTED;
    }
}