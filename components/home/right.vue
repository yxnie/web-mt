<template>
  <div class="rightAll">
    <div class="textCenter top">
      <div>
        <div>
          <img src="//s0.meituan.net/bs/fe-web-meituan/e350c4a/img/avatar.jpg" alt class="pic" />
        </div>
        <div class="name">HI ! 你好</div>
        <div class="button handBg hand" @click="goPages('/register')">注册</div>
        <div class="button handBg hand" @click="goPages('/login/login')">立即登录</div>
      </div>
      <div></div>
    </div>
    <div class="bottom">
      <div class="topPic">
        <img src="//s1.meituan.net/bs/fe-web-meituan/60ac9a0/img/download-qr.png" alt class="pic" />
      </div>
      <div class="app">美团APP手机版</div>
      <div class="foot">
        <span class="price">1元起</span>
        <span class="eat">吃喝玩乐</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {
    
  },
  methods: {
    goPages(path) {
      this.$router.push(path);
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.rightAll {
  margin-top: 10px;
}
.top {
  width: 228px;
  height: 240px;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  padding-top: 30px;
  .name {
    font-size: 16px;
    color: #222;
    font-weight: 500;
    line-height: 21px;
  }
  .pic {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    border: 4px solid #e5e5e5;
    margin: 0 auto;
    margin-bottom: 4px;
  }
  .button {
    width: 118px;
    text-align: center;
    margin: 10px auto 15px auto;
    background: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 40px;
    font-size: 14px;
    color: #333;
    display: block;
    line-height: 38px;
  }
}
.bottom {
  width: 228px;
  height: 165px;
  margin-top: 10px;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  text-align: center;
  padding-top: 10px;
  .pic {
    width: 95px;
    height: 95px;
    margin: 0 auto;
  }
  .topPic {
    height: 99px;
  }
  .app {
    font-size: 16px;
    color: #222222;
    font-weight: 500;
    height: 21px;
    line-height: 21px;
  }
  .foot {
    font-size: 12px;
    font-weight: 500;
    margin-top: 4px;
  }
  .eat {
    color: #3f3f3f;
  }
  .price {
    color: #ec5330;
    margin-right: 5px;
  }
}
.handBg:hover {
  background-color: #f6f6f6;
  transition: background-color 0.5s;
}
</style>