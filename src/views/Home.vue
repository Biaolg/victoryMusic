<template>
  <div class="home">
    <TopNav></TopNav>
    <Home-title>推荐歌单</Home-title>
    <Personalized :musicDatas="randomPersonalizeds()"></Personalized>
    <HomeTitle>最新音乐</HomeTitle>
    <!-- :order='index' -->
    <MusicLis
      v-for="(item, index) in newsong"
      :muData="item"
      :key="index"
      @tanslate-song="$emit('tanslate-song', $event)"
    ></MusicLis>
  </div>
</template>

<script>
// @ is an alias to /src
import Personalized from "@/components/Personalized.vue";
import TopNav from "@/components/TopNav.vue";
import HomeTitle from "@/components/HomeTitle.vue";
import MusicLis from "@/components/MusicLis.vue";

export default {
  name: "Home",
  data: function() {
    return {
      musicDatas: [],
      newsong: []
    };
  },
  components: {
    Personalized,
    TopNav,
    HomeTitle,
    MusicLis
  },
  methods: {
    // 获取推荐歌单
    getPersonalized: function() {
      this.axios
        .get("/personalized")
        .then(response => {
          this.musicDatas = response.data.result;
          window.localStorage.setItem(
            "musicDatas",
            JSON.stringify({
              expire: Date.now() + 1 * 60 * 60 * 1000,
              result: response.data.result
            })
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //获取最新音乐
    getNewsong: function() {
      this.axios("/personalized/newsong")
        .then(response => {
          this.newsong = response.data.result;
          window.localStorage.setItem(
            "newsong",
            JSON.stringify({
              expire: Date.now() + 1 * 60 * 60 * 1000,
              result: response.data.result
            })
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 随机取六个推荐歌单
    randomPersonalizeds: function() {
      // 深拷贝数组
      var arr = [...this.musicDatas];
      var newArr = [];
      for (let i = 0; i < 6; i++) {
        var r = Math.floor(Math.random() * arr.length);
        newArr.push(...arr.splice(r, 1));
      }
      return newArr;
    }
  },
  created() {
    //歌单
    const cachemusicDatas = JSON.parse(
      window.localStorage.getItem("musicDatas")
    );
    if (cachemusicDatas && cachemusicDatas.expire > Date.now()) {
      // 存在并且还没有过期
      this.musicDatas = cachemusicDatas.result;
    } else {
      // 已经过期
      this.getPersonalized();
    }

    const cacheNewsong = JSON.parse(window.localStorage.getItem("newsong"));
    if (cacheNewsong && cacheNewsong.expire > Date.now()) {
      // 存在并且还没有过期
      this.newsong = cacheNewsong.result;
    } else {
      // 已经过期
      this.getNewsong();
    }
  }
};
</script>

<style lang="less">
.home {
  margin-top: 40px;
  margin-bottom: 50px;
  overflow: hidden;
}
</style>
