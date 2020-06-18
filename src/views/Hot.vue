<template>
  <div class="Hot">
    <TopNav></TopNav>
    <div class="inf">
      <div class="img">
        <div class="hoticon"></div>
        <p>更新日期</p>
      </div>
    </div>
    <!-- <MusicLis :muData="HotData.privileges[0]">{{1}}</MusicLis> -->
  </div>
</template>

<script>
import TopNav from "@/components/TopNav.vue";
// import MusicLis from "@/components/MusicLis.vue";

///top/list?idx=1
export default {
  name: "Hot",
  data: function() {
    return {
      HotData: []
    };
  },
  methods: {
    // 获取热歌榜
    getHotData: function() {
      this.axios
        .get("/top/list?idx=1")
        .then(response => {
          this.HotData = response;
          window.localStorage.setItem(
            "HotData",
            JSON.stringify({
              expire: Date.now() + 1 * 60 * 60 * 1000,
              result: response
            })
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  components: {
    TopNav,
    // MusicLis
  },
  created() {
    this.getHotData();
  }
};
</script>

<style lang="less">
.Hot {
  margin-top: 40px;
  overflow: hidden;
  .img {
    width: 100%;
    height: 150px;
    background: url(../assets/Hotbg.jpg);
    background-size: contain;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // align-items: center;
    p {
      margin-top: 8px;
      color: hsla(0, 0%, 100%, 0.8);
      font-size: 12px;
    }
    .hoticon {
      width: 142px;
      height: 67px;
      background: url(../assets/index_icon.png) no-repeat;
      background-position: -20px -24px;
      background-size: 150px;
    }
  }
}
</style>