<template>
  <table class="board" :class="{'mine': this.board.isMine}">
    <tr v-for="(rowData, row) in this.board.states" :key="row">
      <td v-for="(state, col) in rowData" :key="col" @click="this.board.shot(row, col)">
        <font-awesome-icon icon="fa-regular fa-dot-circle" v-if="state == this.board.EMPTY" class="color-gray" />
        <font-awesome-icon icon="fa-solid fa-fire" v-if="state == this.board.SHIP"  class="color-red" />
        <font-awesome-icon icon="fa-solid fa-skull" v-if="state == this.board.DEAD_SHIP"/>
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
library.add(faFire, faDotCircle, faSkull, faShip);

export default {
  name: 'SeaBoard',
  props: {
    board: Object,
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

</style>
