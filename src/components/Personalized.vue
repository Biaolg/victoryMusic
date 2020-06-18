<template>
  <div class="Personalized">
    <div class="card">
      <div v-for="(musicData, index) in musicDatas" :key="index">
        <div class="top">
          <span>{{playCountParse(musicData.playCount)}}</span>
          <img :src="musicData.picUrl" />
        </div>
        <h4>{{musicData.name}}</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Personalized",
  props: ["musicDatas"],
  methods: {
    playCountParse: function(n) {
      if (n > 100000000) return (n / 100000000).toFixed(1) + "亿";
      if (n > 10000) return (n / 10000).toFixed(1) + "万";
    }
  }
};
</script> 

<style lang="less">
.Personalized {
  img {
    width: 100%;
    display: block;
  }
  .card {
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    .top {
      //   width: 100px;
      position: relative;
      span {
        position: absolute;
        right: 0px;
        color: white;
        padding-right: 3px;
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
    > div {
      font-size: 12px;
      margin: 1px;
      flex: 32%;
      margin-bottom: 15px;
    }
    h4 {
      padding: 6px 2px 0px 6px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>