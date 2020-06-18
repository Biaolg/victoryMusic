<template>
  <div id="app">
    <router-view @tanslate-song="currentSong = $event" :currentSong="currentSong" />
    <Musicplaying :musicData="currentSong"></Musicplaying>
  </div>
</template>

<script>
// @ is an alias to /src
import Musicplaying from "@/components/Musicplaying.vue";

export default {
  name: "Home",
  data: function() {
    return {
      currentSong: null
    };
  },
  components: {
    Musicplaying
  }
};
</script>

<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
