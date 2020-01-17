<template>
  <div @click="closeLock">
    <div class="shadow">
      <div class="wrap">
        <div class="listAll top">
          <div class="flex">
            <div class="centeY">
              <div class="location">
                <img src="../assets/images/location.png" alt />
              </div>
            </div>
            <div>{{location}}</div>
            <div class="centeY">
              <div class="button handRed" @click="goPages('/location')">切换城市</div>
            </div>
            <div>
              [
              <span class="handRed city">新津县</span>
              <span class="handRed city">崇州</span>
              <span class="handRed city">崇州</span>]
            </div>
            <div class="login hand" @click="goPages('/login/login')">立即登录</div>
            <div class="login1 handRed" @click="goPages('/register')">注册</div>
          </div>
          <div class="flex">
            <div class="padding dropDown">
              <div class="handRed">我的美团</div>
              <div class="block">
                <div class="handRed">我的订单</div>
                <div class="handRed">我的收藏</div>
                <div class="handRed">抵用券</div>
                <div class="handRed">账户设置</div>
              </div>
            </div>
            <div class="padding1 handRed">手机APP</div>
            <div class="padding dropDown">
              <div class="handRed">商家中心</div>
              <div class="block moreBlock">
                <div class="handRed">美团餐饮商户中心</div>
                <div class="handRed">登录商家中心</div>
                <div class="handRed">美团智能收银</div>
                <div class="handRed">我想合作</div>
                <div class="handRed">手机免费开店</div>
                <div class="handRed">餐饮代理商招募</div>
                <div class="handRed">商家申请开票</div>
                <div class="handRed">免费合作美团排队</div>
              </div>
            </div>
            <div class="padding dropDown">
              <div class="handRed">美团规则</div>
              <div class="block">
                <div class="handRed">规则中心</div>
                <div class="handRed">规则目录</div>
                <div class="handRed">规则评议院</div>
              </div>
            </div>
            <div class="padding dropDown">
              <div class="handRed">网站导航</div>
              <div class="lastBlock block">
                <div class="nav">
                  <div>
                    <div class="title">酒店旅游</div>
                    <div class="listAllStart hotelAll">
                      <div
                        v-for="(item,index) in hotelList"
                        :key="index"
                        class="hotel handRed"
                      >{{item}}</div>
                    </div>
                  </div>
                  <div>
                    <div class="title">吃美食</div>
                    <div class="listAllStart foodAll">
                      <div
                        v-for="(item,index) in foodList"
                        :key="index"
                        class="food handRed"
                      >{{item}}</div>
                    </div>
                  </div>
                  <div>
                    <div class="title">看电影</div>
                    <div class="listAllStart movieAll">
                      <div
                        v-for="(item,index) in movieList"
                        :key="index"
                        class="movie handRed"
                      >{{item}}</div>
                    </div>
                  </div>
                  <div class="last">
                    <div class="title">手机应用</div>
                    <div class="listAllStart picAll">
                      <div v-for="(item,index) in pic" :key="index" class="pic">
                        <img :src="item" alt />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="white">
        <div class="bottom">
          <div class="foot">
            <div class="before">
              <div class="mtpic">
                <img src="//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png" alt class="hand" />
              </div>
            </div>
            <div class="center">
              <div class="inputBox">
                <div style="position: relative">
                  <input
                    type="text"
                    placeholder="搜索商家或地点"
                    class="input"
                    @focus="focus"
                    @blur="blur"
                    v-model="keyword"
                    @input="search"
                    @keydown.enter="goDetail"
                  />
                  <div class="heidden" v-if="lock">
                    <div class="title">热门搜索</div>
                    <div class="all">
                      <div
                        v-for="(item,index) in hotPlace"
                        :key="index"
                        class="one handRed"
                      >{{item.name}}</div>
                    </div>
                  </div>
                  <div v-if="suggests.length>0" class="heidden">
                    <div v-for="(item,index) in suggests" :key="index" class="name">{{item.name}}</div>
                  </div>
                </div>
                <div class="after allCenter hand">
                  <Icon type="md-search" size="30" color="#000" />
                </div>
                <div></div>
              </div>
              <div class="all">
                <div v-for="(item,index) in hotPlace" :key="index" class="one handRed">{{item.name}}</div>
              </div>
            </div>
          </div>
          <div v-if="htmlLock">
            <div class="classify">
              <div class="allClassify">
                <div class="desc">全部分类</div>
              </div>
              <div class="listAllStart">
                <div
                  v-for="(item,index) in list"
                  :key="index"
                  class="listItem"
                  :class="{color2:index===0 || index===3,handRed:index===4,color1:index===1 || index===2 || index===5}"
                >{{item}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nuxt />
    <div class="wrap">
      <foot></foot>
    </div>
  </div>
</template>

<script>
import foot from "../components/home/footer";
export default {
  data() {
    return {
      hotelList: [
        "国际机票",
        "火车票",
        "榛果民宿",
        "经济型酒店",
        "主题酒店",
        "商务酒店",
        "公寓",
        "豪华酒店",
        "客栈",
        "青年旅社",
        "度假酒店",
        "别墅",
        "农家院"
      ],
      foodList: ["烤鱼", "特色小吃", "烧烤", "自助餐", "火锅", "代金券"],
      movieList: [
        "热映电影",
        "热门影院",
        "热映电影口碑榜",
        "最受期待电影",
        "国内票房榜",
        "北美票房榜",
        "电影排行榜"
      ],
      pic: [
        "//s0.meituan.net/bs/fe-web-meituan/2d53095/img/appicons/meituan.png",
        "//s1.meituan.net/bs/fe-web-meituan/404d350/img/appicons/waimai.png",
        "//s0.meituan.net/bs/fe-web-meituan/404d350/img/appicons/zhenguo.png",
        "//s1.meituan.net/bs/fe-web-meituan/404d350/img/appicons/dianping.png",
        "//s1.meituan.net/bs/fe-web-meituan/404d350/img/appicons/maoyan.png"
      ],
      hotPlace: [],
      list: [
        "美团外卖",
        "猫眼电影",
        "美团酒店",
        "民宿／公寓",
        "商家入驻",
        "美团公益"
      ],
      lock: false,
      keyword: "",
      suggests: []
    };
  },
  components: {
    foot
  },
  methods: {
    goDetail() {
      this.suggests = [];
      this.$router.push({ name: "detail", query: { keyword: this.keyword } });
    },
    getHotSearch() {
      this.$axios
        .get(`hotPlace?city=${this.location}`)
        .then(res => {
          this.hotPlace = res.data.data.result;
        })
        .catch(err => {});
    },
    focus() {
      if (this.suggests.length === 0) {
        this.lock = true;
      }
      this.searchSuggest();
    },
    blur() {
      this.lock = false;
    },
    goPages(path) {
      this.$router.push(path);
    },
    closeLock() {
      this.suggests = [];
    },
    searchSuggest() {
      this.$axios
        .get(`searchTop?city=${this.location}&input=${this.keyword}`)
        .then(res => {
          console.log(res);
          this.suggests = res.data.data.top;
        })
        .catch(err => {});
    },
    // throttle(func, delay) {
    //   var timer = null;
    //   var startTime = Date.now(); //设置开始时间
    //   return function() {
    //     var curTime = Date.now();
    //     var remaining = delay - (curTime - startTime); //剩余时间
    //     var context = this;
    //     var args = arguments;
    //     clearTimeout(timer);
    //     if (remaining <= 0) {
    //       // 第一次触发立即执行
    //       func.apply(context, args);
    //       startTime = Date.now();
    //     } else {
    //       timer = setTimeout(func, remaining); //取消当前计数器并计算新的remaining
    //     }
    //   };
    // },
    search() {
      if (this.keyword.trim()) {
        this.lock = false;
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
          this.searchSuggest();
        }, 400);
      } else {
        this.suggests = [];
      }
    }
  },
  mounted() {
    if (localStorage.getItem("location")) {
      this.$store.state.location = localStorage.getItem("location");
    }
    this.getHotSearch();
  },
  watch: {},
  computed: {
    location() {
      return this.$store.state.location;
    },
    htmlLock() {
      return this.$store.state.lock;
    }
  }
};
</script>

<style scoped lang='scss'>
.top {
  height: 40px;
  line-height: 40px;
}
.button {
  background: #f4f4f4;
  border: 1px solid #e5e5e5;
  border-radius: 2px;
  color: #666;
  margin: 0 4px;
  padding: 0 2px;
  line-height: 14px;
  height: 18px;
}
.city {
  display: inline-block;
  margin: 0 4px;
}
.login {
  color: #fe8c00;
  margin-left: 15px;
}
.login1 {
  margin-left: 10px;
}
.padding {
  padding: 0 14px;
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
  &:hover {
    border-left: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
    background: white;
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
  }
}
.padding1 {
  padding: 0 14px;
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
}
.location {
  height: 14px;
  width: 14px;
}
.lastBlock {
  width: 1190px;
  left: auto;
}
.nav {
  display: flex;
  justify-content: space-around;
  line-height: 30px;
  padding: 30px 0;
  .last {
    margin-left: 30px;
  }
  .pic {
    width: 60px;
    height: 60px;
    margin: 0 10px;
  }
  .picAll {
    padding-top: 10px;
  }
  .title {
    margin-bottom: 10px;
    font-size: 14px;
    color: #222222;
    font-weight: 500;
  }
  .hotelAll {
    width: 234px;
  }
  .hotel {
    width: 33%;
  }
  .foodAll {
    width: 156px;
  }
  .food {
    width: 50%;
  }
  .movieAll {
    width: 90px;
  }
  .movie {
    width: 100%;
  }
}
.mtpic {
  width: 126px;
  height: 46px;
}
.heidden {
  width: 470px;
  border: 1px solid #e5e5e5;
  border-top: none;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  color: #999;
  background: white;
  padding: 10px;
  z-index: 99;
  .all {
    width: 470px !important;
    padding: 0 !important;
    line-height: 25px !important;
  }
  .title {
    padding-bottom: 5px;
    font-size: 1em;
  }
  .name {
    padding: 3px 10px;
    color: #333;
  }
}
.center {
  font-size: 14px;
  padding-top: 28px;
  flex: 1;
  z-index: 2;
  .all {
    padding-top: 8px;
    font-size: 12px;
    width: 550px;
    overflow: hidden;
    height: 25px;
    box-sizing: border-box;
    text-align: left;
    padding-left: 12px;
    line-height: 14px;
    .one {
      color: #999;
      margin-right: 10px;
      margin-bottom: 3px;
      display: inline-block;
    }
  }
  .inputBox {
    display: flex;
    height: 40px;
    .input {
      outline: none;
      font-size: 15px;
      padding: 9px 15px;
      width: 470px;
      border-radius: 4px 0 0 4px;
      border: 1px solid #e5e5e5;
    }
    .after {
      width: 80px;
      background: #ffc300;
      border-radius: 0 4px 4px 0;
    }
  }
}
.white {
  width: 100%;
  background: white;
}
.shadow {
  box-shadow: 0 2px 27px 0 rgba(0, 0, 0, 0.1);
}
.bottom {
  width: 1190px;
  margin: 0 auto;
}
.foot {
  display: flex;
  background: white;
  .before {
    padding: 28px 60px 40px 0;
    width: 280px;
    height: 112px;
  }
}
.classify {
  display: flex;
  .listItem {
    color: #222;
    font-weight: 700;
    font-size: 16px;
    margin: 0 20px;
    cursor: pointer;
    position: relative;
    line-height: 50px;
  }
  .color1:hover {
    color: #ed1e24;
  }
  .color2:hover {
    color: #fdc411;
  }
  .listAllStart {
    margin-left: 30px;
  }
  .allClassify {
    height: 50px;
    padding-top: 15px;
    color: #222222;
    font-size: 16px;
    font-weight: 700;
    border: 1px solid #e5e5e5;
    border-bottom: 0;
    .desc {
      width: 228px;
      padding-left: 15px;
    }
  }
}
</style>