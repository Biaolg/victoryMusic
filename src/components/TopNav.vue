<template>
  <div class="top-nav">
    <ul id="nav">
      <li>
        <router-link to="/">
          <span>推荐音乐</span>
        </router-link>
      </li>
      <li>
        <router-link to="/Hot">
          <span>热歌榜</span>
        </router-link>
      </li>
      <li>
        <router-link to="/search">
          <span>搜索</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="less">
@red: #d43c33;
.top-nav {
  position: fixed;
  top: 0px;
  width: 100%;
  background-color: rgba(255, 255, 255, 1);
  z-index: 10;
}
#nav {
  list-style: none;
  display: flex;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  li {
    flex: 1;
    text-align: center;
  }
  a {
    padding: 0px 5px;
    text-decoration: none;
    color: #2c3e50;
    display: inline-block;
    box-sizing: border-box;
    height: 40px;

    &.router-link-exact-active {
      color: @red;
      border-bottom: 2px solid @red;
    }
  }
}
</style>