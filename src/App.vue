<template>
  <SeaBoard :board="myBoard" :game="game" />
  <div class="vertical-space"></div>
  <SeaBoard :board="enemyBoard" :game="game" />
</template>

<script>

import SeaBoard from './components/SeaBoard.vue'
import Board from "@/components/Board.js";
import Game from "@/components/Game";


export default {
  name: 'App',
  data: function () {
    return {
      myBoard: new Board(true),
      enemyBoard: new Board(),
      game: new Game(),
    }
  },
  components: {
    SeaBoard
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 20px auto ;
}
.vertical-space {
  display: inline-block;
  width: 50px;
}
</style>
