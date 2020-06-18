<template>
  <div class="Search">
    <TopNav></TopNav>
    <div class="ipKeyWork">
      <div>
        <input type="text" placeholder="搜索歌曲、歌手、专辑" v-model="keywork" />
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from "@/components/TopNav.vue";

// 热搜/search/hot
export default {
  name: "Search",
  data: function() {
    return {
      keywork: ""
    };
  },
  components: {
    TopNav
  }
};
</script>

<style lang="less">
.Search {
  background-color: #fcfcfd;
  margin-top: 40px;
  overflow: hidden;
  .ipKeyWork {
    height: 60px;
    padding: 15px 10px;
    border-bottom: #eee solid 1px;
    > div {
      background: #ebecec;
      border-radius: 50px;
      display: flex;
      justify-content: center;
    }
    input {
      width: 290px;
      height: 30px;
      border: none;
      background: #ebecec;
      font-size: 14px;
      outline:none;
    }
  }
}
</style>