<template>
  <div class="wrap">
    <div class="all">
      <div class="more" v-if="checkedLock" @mouseenter="mouseenter1" @mouseleave="mouseleave">
        <div v-for="(item,index) in menu[checked].child" :key="index" class="oneAll">
          <div class="title">
            <div class="con">
              <span class="hand">{{item.title}}</span>
            </div>
            <div class="right">
              <div>更多</div>
              <Icon type="ios-arrow-forward" class="iconRight" />
            </div>
          </div>
          <div class="listAllStart">
            <div v-for="(item1,index1) in item.child" :key="index1" class="one handRed">{{item1}}</div>
          </div>
        </div>
      </div>
      <div class="leftList">
        <div
          v-for="(item,index) in menu"
          :key="index"
          class="one"
          @mouseenter="mouseenter(index)"
          @mouseleave="mouseleave"
        >
          <i class="iconfont icon" :class="icons[index].icon" :style="{color:icons[index].color}"></i>
          <span class="name">{{item.name}}</span>
          <span class="tag" v-if="index===2">HOT</span>
          <Icon type="ios-arrow-forward" class="iconRight" />
        </div>
      </div>
      <div class="center">
        <div class="flex">
          <banner :banner="banner"></banner>
          <div class="pic1">
            <img src="http://p0.meituan.net/codeman/e473bb428f070321269b23370ff02ba956209.jpg" alt />
          </div>
        </div>
        <div class="flex">
          <div class="pic2">
            <img src="http://p1.meituan.net/codeman/8cce56c467a17e04f3094d1e455462a0132772.png" alt />
          </div>
          <div class="pic2">
            <img src="http://p1.meituan.net/codeman/16442c19da1f1c4544f794e29d99c92051716.jpg" alt />
          </div>
          <div class="pic3">
            <img src="http://p1.meituan.net/codeman/5b21cddb4bb1cbc3a9c3bce0f726c75940469.jpg" alt />
          </div>
        </div>
      </div>
      <div class="right">
        <right></right>
      </div>
    </div>
    <plate></plate>
  </div>
</template>

<script>
import banner from "../components/home/banner";
import right from "../components/home/right";
import plate from "../components/home/plate";
export default {
  data() {
    return {
      banner: [],
      menu: [],
      icons: [
        { icon: "iconfood", color: "#ff8200" },
        { icon: "iconwaimai", color: "#ffb500" },
        { icon: "iconHotel", color: "#9B5E3E" },
        { icon: "iconzhenguo", color: "#ffb500" },
        { icon: "iconArtboard", color: "#ff3d00" },
        { icon: "iconjiaotong-lunchuan", color: "#03A9F4" },
        { icon: "iconktv", color: "#00BF96" },
        { icon: "iconlife", color: "#00BF96" },
        { icon: "iconliren", color: "#FF4081" },
        { icon: "iconmarried", color: "#FF4081" },
        { icon: "iconchild", color: "#FF4081" },
        { icon: "iconsport", color: "#03A9F4" },
        { icon: "icondecorate", color: "#00BF96" },
        { icon: "iconeducation", color: "#00BF96" },
        { icon: "iconmedical", color: "#03A9F4" },
        { icon: "iconbar", color: "#00BF96" }
      ],
      checked: null,
      checkedLock: false
    };
  },
  layout: "top",
  components: {
    banner,
    right,
    plate
  },
  methods: {
    mouseenter(val) {
      (this.checked = val), (this.checkedLock = true);
    },
    mouseenter1() {
      this.checkedLock = true;
    },
    mouseleave() {
      this.checkedLock = false;
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.state.lock = false;
    next()
  },
  mounted() {
    this.$store.state.lock = true;
  },
  async asyncData(ctx) {
      let [res1, res2, res3] = await Promise.all([
        ctx.$axios.get("banner"),
        ctx.$axios.get("position"),
        ctx.$axios.get("menu")
      ]);
      let city = res2.data.data.city.replace("市", "");
      if(!ctx.store.state.location){
        ctx.store.state.location = city;
      }
      return {
        banner: res1.data.data,
        menu: res3.data.data.menu
      };
    
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.all {
  position: relative;
  display: flex;
  .more {
    position: absolute;
    top: 11px;
    left: 230px;
    width: 400px;
    height: 416px;
    background-color: #fff;
    z-index: 199;
    color: #666;
    overflow: hidden;
    .oneAll {
      padding: 0 30px;
      .one {
        color: #999;
        font-size: 12px;
        line-height: 15px;
        display: inline-block;
        margin-right: 16px;
        margin-top: 10px;
        cursor: pointer;
      }
      .title {
        margin-top: 24px;
        height: 32px;
        line-height: 22px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e5e5e5;
        position: relative;
        .right {
          position: absolute;
          cursor: pointer;
          right: 0;
          top: 0;
          font-size: 12px;
          color: #999;
          font-weight: 400;
          margin-right: 6px;
          display: flex;
        }
        .con {
          font-size: 16px;
          font-weight: 500;
          color: #222;
          .hand {
            width: auto;
          }
        }
        .iconRight {
          position: relative;
          top: 5px;
          margin-left: 5px;
        }
      }
    }
  }
}
.leftList {
  padding: 10px 0 8px;
  height: 425px;
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid #e5e5e5;
  border-top: 0;
  width: 230px;
  .one {
    padding: 2px 12px;
    height: 26px;
    position: relative;
    &:hover {
      background: #fff7eb;
      color: black;
      .tag {
        background: #ffc900;
        color: black;
      }
    }
    .icon {
      position: relative;
      top: 2px;
    }
    .name {
      margin-left: 11px;
      font-size: 13px;
      color: #646464;
    }
    .tag {
      font-size: 12px;
      color: #222222;
      background: #fff3cc;
      display: inline-block;
      border-radius: 10px;
      padding: 0 7px;
      margin-left: 5px;
      transform: scale(0.9);
      position: relative;
      opacity: 1;
      line-height: 20px;
    }
    .iconRight {
      position: absolute;
      right: 12px;
      top: 6px;
    }
  }
}
.center {
  margin-left: 10px;
  margin-top: 10px;
  .pic1 {
    margin: 0 10px;
    width: 150px;
    height: 240px;
  }
  .pic2 {
    width: 270px;
    height: 165px;
    margin-top: 10px;
    margin-right: 10px;
  }
  .pic3 {
    margin-top: 10px;
    margin-right: 10px;
    width: 150px;
    height: 165px;
  }
}
@media screen and (max-width: 1200px) {
  .pic1 {
    display: none;
  }
  .pic3 {
    display: none;
  }
}
</style>