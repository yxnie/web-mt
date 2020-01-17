<template>
  <div>
    <div class="topAll">
      <div class="wrap1">
        <div class="top">
          <div class="log" @click="goPages('/')"></div>
          <div class="right">
            <div class="before">已有美团账号？</div>
            <div class="button" @click="goPages('/login/login')">登录</div>
          </div>
        </div>
      </div>
    </div>
    <div class="wrap1">
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="80"
        class="from"
      >
        <FormItem label="昵称" prop="name" class="one">
          <Input v-model="formValidate.name" placeholder="请填写昵称" />
        </FormItem>
        <FormItem label="邮箱" prop="mail" class="one">
          <Input v-model="formValidate.mail" placeholder="请填写邮箱" />
        </FormItem>
        <div class="two">
          <div class="button" v-if="timeLock" @click="sentCode('formValidate')">发送验证码</div>
          <div class="button button1" v-else>{{time}}秒后再次发送</div>
        </div>
        <FormItem label="验证码" prop="code" class="one">
          <Input v-model="formValidate.code" placeholder="请填写验证码" />
        </FormItem>
        <FormItem label="密码" prop="password" class="one">
          <Input v-model="formValidate.password" type="password" placeholder="请填写密码" />
        </FormItem>
        <FormItem label="确认密码" prop="rePassword" class="one">
          <Input v-model="formValidate.rePassword" type="password" placeholder="请确认密码" />
        </FormItem>
        <FormItem class="six">
          <Button type="primary" @click="handleSubmit('formValidate')" class="button">同意以下协议并注册</Button>
        </FormItem>
      </Form>
      <div class="foot">
        <span>《美团点评用户服务协议》</span>
        <span>《美团点评隐私政策》</span>
      </div>
    </div>
    <div class="bottom">
      <span>©meituan.com</span>
      <span>京ICP证070791号</span>
      <span>京公网安备11010502025545号</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请填写密码"));
      } else {
        if (this.formValidate.rePassword !== "") {
          // 对第二个密码框单独验证
          this.$refs.formValidate.validateField("rePassword");
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次填写密码"));
      } else if (value !== this.formValidate.password) {
        callback(new Error("两次输入的密码不一致，请重新输入"));
      } else {
        callback();
      }
    };
    return {
      formValidate: {
        name: "",
        mail: "",
        code: "",
        password: "",
        rePassword: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "昵称不能为空",
            trigger: "blur"
          },
          { min: 2, max: 12, message: "长度在 2 到 12 个字符", trigger: "blur" }
        ],
        mail: [
          {
            required: true,
            message: "邮箱不能为空",
            trigger: "blur"
          },
          { type: "email", message: "请输入正确的邮箱", trigger: "blur" }
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请填写密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur"
          },
          { validator: validatePass, trigger: "blur" }
        ],
        rePassword: [
          {
            required: true,
            message: "请再次填写密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur"
          },
          { validator: validatePassCheck, trigger: "blur" }
        ]
      },
      time: 59,
      timeLock: true
    };
  },
  components: {},
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let arr = {};
          arr.username = this.formValidate.name;
          arr.password = this.formValidate.password;
          this.$axios
            .post("/users/register", arr)
            .then(res => {
              console.log(res);
              if (res.data.code === 200) {
                this.$Message.success(res.data.msg);
                localStorage.setItem("user",arr)
                this.$router.push("/")
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$Message.error("请完整填写信息");
        }
      });
    },
    sentCode(name) {
      this.$refs[name].validateField("mail", val => {
        this.time = 59;
        if (!val) {
          this.timeLock = false;
          let a = setInterval(() => {
            this.time--;
            if (this.time === 0) {
              clearInterval(a);
              this.timeLock = true;
            }
          }, 1000);
        }
      });
    },
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
.topAll {
  border-bottom: 2px solid #d8d8d8;
}
.wrap1 {
  width: 980px;
  margin: 0 auto;
  .top {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    .right {
      display: flex;
      .before {
        line-height: 36px;
        margin-right: 10px;
        vertical-align: sub;
      }
      .button {
        height: 24px;
        padding: 5px 10px;
        margin-top: 6px;
        font-size: 14px;
        color: #222;
        background-image: linear-gradient(135deg, #ffd000 0, #ffbd00 100%);
        border-width: 0;
        box-shadow: 0 2px 1px rgba(191, 105, 0, 0.15);
        background-size: 100%;
      }
    }
    .log {
      width: 128px;
      background: url(https://s0.meituan.net/bs/file/?f=fe-sso-fs:build/assets/logo.6a89007.png)
        no-repeat;
      background-size: contain;
      height: 36px;
      cursor: pointer;
    }
  }
}
.from {
  margin-top: 30px;
  .one {
    width: 400px;
  }
  .two {
    margin-top: 15px;
    margin-bottom: 10px;
    margin-left: 80px;
    .button {
      width: 150px;
      height: 30px;
      background: #409eff;
      color: white;
      text-align: center;
      line-height: 30px;
      font-size: 15px;
    }
    .button1 {
      background: #76b4f5;
    }
  }
  .six {
    padding: 8px 0 8px;
    .button {
      color: #222;
      background-image: linear-gradient(135deg, #ffd000 0, #ffbd00 100%);
      border-width: 0;
      box-shadow: 0 2px 1px rgba(191, 105, 0, 0.15);
      background-size: 100%;
    }
  }
}
.foot {
  padding: 3px 10px 3px 80px;
  margin: 0 auto 28px;
  color: #fe8c00;
  font-size: 13px;
}
.bottom {
  border-top: 1px solid #eee;
  padding-top: 20px;
  text-align: center;
  font-size: 13px;
  span {
    padding: 0 3px;
  }
}
</style>