<template>
  <SeaBoard :board="board"/>
</template>

<script>

import SeaBoard from './components/SeaBoard.vue'
import Board from "@/components/Board.js";


export default {
  name: 'App',
  data: function () {
    return {
      board: new Board()
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
</style>
