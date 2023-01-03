<template>
  <div style="text-align: center">Turn: {{this.game.isMyTurn() ? 'Mine' : 'Enemy'}}</div>
  <GeneralBoard :board="myBoard" :game="game" />
  <div class="vertical-space"></div>
  <GeneralBoard :board="enemyBoard" :game="game" />
</template>

<script>

import GeneralBoard from './components/GeneralBoard'
import Board from "@/components/Board.js";
import Game from "@/components/Game";


export default {
  name: 'App',
  data: function () {
    let myBoard = new Board(true);
    let botBoard = new Board();
    return {
      myBoard: myBoard,
      enemyBoard: botBoard,
      game: new Game(myBoard, botBoard),
    }
  },
  components: {
    GeneralBoard
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
