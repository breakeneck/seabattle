<template>
  <div class="container">
    <div class="overflow" v-if="this.game.isCurrentBoardTurn(this.board.isMine)"></div>
    <table class="board">
      <tr v-for="(rowData, row) in this.board.cells" :key="row">
        <td v-for="(cell, col) in rowData" :key="col" @click="cell.isUntouched() && ! this.board.isMine && this.game.isStarted() ? this.game.shot(row, col) : ''">

          <font-awesome-icon icon="fa-regular fa-dot-circle" v-if="cell.isMissed()" class="color-gray"/>
          <font-awesome-icon icon="fa-solid fa-fire" v-else-if="cell.isFire()" beat class="color-red"/>
          <font-awesome-icon icon="fa-solid fa-skull" v-else-if="cell.isDead()"/>

          <font-awesome-icon icon="fa-solid fa-ship" v-if="cell.isShip() && this.board.isMine" class="color-blue" />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faFire, faSkull, faShip} from '@fortawesome/free-solid-svg-icons'
import {faDotCircle} from '@fortawesome/free-regular-svg-icons'
import Board from "@/components/Board";
import Game from "@/components/Game";

library.add(faFire, faDotCircle, faSkull, faShip);

export default {
  name: 'GeneralBoard',
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

.color-blue {
  color: #00729d;
}

.container {
  position: relative;
  display: inline-block;
}

.overflow {
  background: #000000;
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  opacity: 50%;
}

</style>
