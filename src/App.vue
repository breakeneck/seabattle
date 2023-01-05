<template>
  <div class="start">
    <button @click="this.game.start()">{{this.game.isStarted() ? 'Restart game?' : 'Start new game?'}}</button>
  </div>
  <GeneralBoard :board="myBoard" :game="game" />
  <div class="vertical-space"></div>
  <GeneralBoard :board="enemyBoard" :game="game" />
</template>

<script>

import GeneralBoard from './components/GeneralBoard'
import Board from "@/components/Board.js";
import Game from "@/components/Game";
import User from "@/components/User";
import Bot from "@/components/Bot";


export default {
  name: 'App',
  data: function () {
    let myBoard = new Board(true);
    let botBoard = new Board();
    let me = new User(botBoard);
    let bot = new Bot(myBoard);

    return {
      myBoard: myBoard,
      enemyBoard: botBoard,
      game: new Game(me, bot),
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
  margin: 10px auto ;
}
.vertical-space {
  display: inline-block;
  width: 50px;
}
.start {text-align: center;padding: 20px;}
</style>
