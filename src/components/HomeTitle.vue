<template>
  <div class="title">
    <h3>
      <slot></slot>
    </h3>
  </div>
</template>

<style lang="less" scoped>
@red: #d43c33;
h3 {
  border-left: 2px solid @red;
  font-size: 16px;
  line-height: 16px;
  padding-left: 10px;
  margin: 15px 0;
}
</style>