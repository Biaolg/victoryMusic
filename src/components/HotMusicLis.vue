<template>
  <div class="Musiclis">
    <div v-if="order!== undefined" class="Sumb">{{order}}</div>
    <div class="inf">
      <h3>
        {{muData.name}}
        <span>{{muData.song.alias[0]}}</span>
      </h3>
      <h5>
        <span class="sq">1</span>
        {{joinArtists(muData.song.artists)}}-{{muData.song.album.name}}
      </h5>
    </div>
    <div class="ico"></div>
  </div>
</template>
    
<script>
export default {
  name: "musicLis",
  props: {
    order: Number,
    muData: Object
  },
  methods: {
    joinArtists: function(muData) {
      return muData.map(artist => artist.name).join(" / ");
    }
  }
};
</script>

<style lang='less' >
.Musiclis {
  height: 55px;
  box-sizing: border-box;
  border-bottom: 1px #eee solid;
  /* background-color: #908765; */
  display: flex;
  .inf {
    margin-left: 10px;
    padding-left: 10px;
    padding: 6px 0px;
  }
  .Sumb {
    margin-right: -10px;
    width: 40px;
    text-align: center;
    line-height: 55px;
    color: #888;
  }
  .ico {
    width: 45px;
    height: 54px;
    font-size: 22px;
    position: absolute;
    right: 0px;
    background-color: #fff;
    background-image: url(../assets/index_icon.png);
    background-size: 166px auto;
    background-position: -12px 15px;
  }
  .sq {
    display: inline-block;
    color: rgba(0, 0, 0, 0);
    height: 100%;
    width: 15px;
    background-image: url(../assets/index_icon.png);
    background-size: 166px auto;
    background-position: 2px 8px;
  }
  .name {
    display: flex;
    white-space: nowrap;
  }
  h3 {
    width: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    span {
      color: rgb(189, 189, 189);
    }
  }
  h5 {
    width: 0;
    font-size: 12px;
    color: #888;
    line-height: 24px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>