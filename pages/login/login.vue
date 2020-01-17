<template>
  <div>
    <div class="allBg"></div>
    <div class="wrap1">
      <div class="top">
        <img src="../../assets/images/log.png" alt class="pic" @click="goHome" />
      </div>
      <div class="center">
        <div class="left">
          <img src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg" alt />
        </div>
        <div class="right">
          <div class="errMsg" v-if="msg"><Icon type="md-remove-circle" size="20" color="#ff8800" class="icon" />{{msg}}</div>
          <div class="first">
            <div>账号登录</div>
            <div>
              手机动态码登录
              <Icon type="ios-phone-portrait" />
            </div>
          </div>
          <div class="second" :class="{bc:focused===1}">
            <div>
              +86
              <Icon type="ios-arrow-forward" />
            </div>
            <input
              type="text"
              placeholder="手机号"
              @focus="focus(1)"
              @blur="blur"
              v-model="user.username"
            />
          </div>
          <div class="third" :class="{bc:focused===2}">
            <div>
              <Icon type="ios-unlock-outline" size="20" class="icon" />
            </div>
            <input
              type="text"
              placeholder="密码"
              @focus="focus(2)"
              @blur="blur"
              v-model="user.password"
            />
          </div>
          <div class="four">忘记密码？</div>
          <div class="five" @click="login">登录</div>
          <div class="six">
            <span>还没有账号？</span>
            <span class="after" @click="goRegister">免费注册</span>
          </div>
          <div class="seven">
            <div class="con">
              <div class="line"></div>
              <div>用合作网站账号登录</div>
              <div class="line"></div>
            </div>
          </div>
          <div class="eight">
            <div class="qq"></div>
            <div class="wb"></div>
          </div>
        </div>
      </div>
      <div class="foot">
        <div
          v-for="(item,index) in list"
          :key="index"
          class="one hand"
          :class="{one1:index===4,one2:index===0}"
        >{{item}}</div>
      </div>
      <div class="word">©2019 美团网团购 meituan.com 京ICP证070791号 京公网安备11010502025545号</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      focused: null,
      list: ["关于美团", "加入我们", "商家入驻", "帮助中心", "美团手机版"],
      user: {
        username: "",
        password: ""
      },
      msg: ""
    };
  },
  components: {},
  methods: {
    focus(val) {
      this.msg = "";
      this.focused = val;
    },
    blur() {
      this.focused = null;
    },
    goRegister() {
      this.$router.push("/register");
    },
    goHome() {
      this.$router.push("/");
    },
    login() {
      if (this.user.username && this.user.password) {
        console.log(this.user);
        this.$axios.post("users/login", this.user).then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.$Message.success(res.data.msg);
            localStorage.setItem("user", res.data.data);
            this.$router.push("/");
          } else {
            this.msg = res.data.msg;
          }
        });
      } else if (this.user.username) {
        this.msg = "请输入密码";
      } else if (this.user.password) {
        this.msg = "请输入账号";
      } else {
        this.msg = "请输入密码与密码";
      }
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
input {
  border: 0px;
  outline: none;
  height: 34px;
  padding: 5px;
}
.wrap1 {
  width: 980px;
  margin: 0 auto;
  .top {
    margin: 40px auto 30px;
    .pic {
      width: 82px;
      height: 54px;
    }
  }
  .center {
    display: flex;
    justify-content: space-between;
    .left {
      width: 480px;
      height: 370px;
    }
    .right {
      padding-top: 28px;
      width: 270px;
      color: #666;
      font-size: 15px;
      margin-right: 100px;
      position: relative;
      .first {
        display: flex;
        justify-content: space-between;
      }
      .second {
        padding: 0;
        border: 1px solid #aaa;
        background-color: #fff;
        margin: 8px 0;
        align-items: center;
        display: flex;
      }
      .third {
        padding: 0;
        border: 1px solid #aaa;
        background-color: #fff;
        margin: 8px 0;
        align-items: center;
        display: flex;
        .icon {
          margin: 0 7px;
        }
      }
      .four {
        text-align: right;
        padding-bottom: 8px;
        color: #fe8c00;
        cursor: pointer;
        font-size: 12px;
      }
      .five {
        color: #222;
        background-image: linear-gradient(135deg, #ffd000 0, #ffbd00 100%);
        border-width: 0;
        box-shadow: 0 2px 1px rgba(191, 105, 0, 0.15);
        background-size: 100%;
        height: 34px;
        line-height: 34px;
        text-align: center;
        font-weight: 700;
        margin: 8px 0;
      }
      .six {
        line-height: 21px;
        height: 21px;
        .after {
          color: #fe8c00;
        }
      }
      .seven {
        display: flex;
        align-items: center;
        margin: 8px 0;
        .con {
          display: flex;
          justify-content: space-between;
          width: 100%;
        }
        .line {
          height: 1px;
          width: 60px;
          background: #ccc;
          position: relative;
          top: 7px;
          z-index: 99;
        }
      }
      .eight {
        display: flex;
        justify-content: center;
        margin-top: 20px;
      }
      .bc {
        border-color: #ffc300;
      }
      .qq {
        margin-right: 20px;
        background-position: -1250px -491px;
        width: 18px;
        height: 18px;
        background-image: url(//s0.meituan.net/bs/file/?f=fe-sso-fs:build/assets/sp-normal.2ee5c09.png);
      }
      .wb {
        margin-right: 20px;
        background-position: -1250px -599px;
        width: 18px;
        height: 18px;
        background-image: url(//s0.meituan.net/bs/file/?f=fe-sso-fs:build/assets/sp-normal.2ee5c09.png);
      }
    }
  }
  .foot {
    margin-bottom: 20px;
    margin-top: 70px;
    padding: 12px 0;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    display: flex;
    .one {
      margin: 5px 0;
      padding: 0 16px;
      line-height: 14px;
      border-right: 1px solid #eee;
    }
    .one1 {
      border-right: 0;
    }
    .one2 {
      padding-left: 0;
    }
  }
  .word {
    font-size: 13px;
    line-height: 18px;
    height: 18px;
  }
}
.errMsg {
  position: absolute;
  width: 100%;
  padding: 10px;
  border: 1px solid #f5d8a7;
  border-radius: 2px;
  background: #fff6db;
  font-size: 12px;
  top:-26px;
  line-height: 20px;
  .icon {
    margin-right: 5px;
    position: relative;
    top: -3px;
  }
}
</style>