<template>
  <table class="board" :class="{'disabled': ! this.game.isCurrentBoardTurn(this.board.isMine)}">
    <tr v-for="(rowData, row) in this.board.states" :key="row">
      <td v-for="(state, col) in rowData" :key="col" @click="this.game.shot(this.board, row, col)">
        <font-awesome-icon icon="fa-regular fa-dot-circle" v-if="this.board.isMissed(state)" class="color-gray" />
        <font-awesome-icon icon="fa-solid fa-fire" v-if="this.board.isFire(state)"  class="color-red" />
        <font-awesome-icon icon="fa-solid fa-skull" v-if="this.board.isDead(state)"/>
        <font-awesome-icon icon="fa-solid fa-ship" v-if="this.board.isMyShip(row, col)"/>
      </td>
    </tr>
  </table>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFire, faSkull, faShip } from '@fortawesome/free-solid-svg-icons'
import { faDotCircle } from '@fortawesome/free-regular-svg-icons'
import Board from "@/components/Board";
import Game from "@/components/Game";
library.add(faFire, faDotCircle, faSkull, faShip);

export default {
  name: 'SeaBoard',
  props: {
    board: Board,
    game: Game
  },
  components: {
    FontAwesomeIcon
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table.board {
  border: 1px solid #dbdbdb;
  border-right: none;
  border-bottom: none;
  border-collapse: collapse;
  /*background: #dbdbdb;*/
  /*border-spacing: 1px;*/
  margin: 0 auto;
  display: inline-block;
}

table.board td {
  border: 1px solid #dbdbdb;
  border-left: none;
  border-top: none;
  width: 33px;
  height: 33px;
  /*display: inline-block;*/
  text-align: center;
  vertical-align: middle;
  /*background: #ffffff;*/
}
.svg-inline--fa {
  width: 28px;
  height: 28px;
  margin: 0;
  padding: 0;
}
.color-gray {
  color: #dbdbdb;
}
.color-red {
  color: #ff0000;
}
table.board.disabled {

}

</style>
