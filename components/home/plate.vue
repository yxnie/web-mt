<template>
  <div class="plateAll">
    <div class="top">
      <div class="first">有格调</div>
      <div
        v-for="(item,index) in list"
        :key="index"
        class="one"
        @mouseenter="mouseenter(item.keyword)"
      >
        <Icon type="md-arrow-dropup" class="icon" size="30" v-if="item.keyword===keyword" />
        <div>{{item.title}}</div>
      </div>
    </div>
    <div class="foot">
      <div class="listAllStart">
        <div v-for="(item,index) in data" :key="index" class="one handBg">
          <div class="pic" :style="{backgroundImage:'url('+item.photos[0].url+')'}"></div>
          <div class="title">{{item.name}}</div>
          <div class="type">
            <div v-for="(item1,index1) in item.type" :key="index1" class="tag">{{item1}}</div>
          </div>
          <div v-if="item.address" class="listAll">
            <div v-if="item.biz_ext.cost.length===0" class="price">
              <span class="priceIcon">￥</span>0
              <span class="priceIcon">/起</span>
            </div>
            <div v-else class="price">
              <span class="priceIcon">￥</span>
              {{item.biz_ext.cost}}
              <span class="priceIcon">/起</span>
            </div>
            <div v-if="item.address.length===1" class="after">{{item.address[0]}}</div>
            <div v-else class="after">{{item.address}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { title: "全部", keyword: "全部" },
        { title: "约会聚餐", keyword: "美食" },
        { title: "丽人spa", keyword: "丽人" },
        { title: "电影演出", keyword: "电影" },
        { title: "品质出游", keyword: "旅游" }
      ],
      keyword: "全部",
      data: []
    };
  },
  components: {},
  methods: {
    getData() {
      this.$axios
        .get(`results?city=${this.city}&keyword=${this.keyword}`)
        .then(res => {
          res.data.data.pois.map((item, index) => {
            if (item.photos.length === 0) {
              res.data.data.pois.splice(index, 1);
            }
          });
          res.data.data.pois.map((item, index) => {
            item.type = item.type.split(";");
            item.address = /^\D+(?=\d)/.exec(item.address);
          });
          this.data = res.data.data.pois.slice(0, 6);
        });
    },
    mouseenter(val) {
      if (this.keyword !== val) {
        this.keyword = val;
        this.getData();
      }
    }
  },
  mounted() {
    this.getData();
  },
  watch: {},
  computed: {
    city() {
      return this.$store.state.location;
    }
  }
};
</script>

<style scoped lang='scss'>
.plateAll {
  margin: 40px auto;
}
.top {
  background-color: rgb(190, 164, 116);
  background-image: linear-gradient(
    to right,
    rgb(194, 176, 142) 3%,
    rgb(190, 164, 116) 100%
  );
  width: 100%;
  height: 44px;
  line-height: 44px;
  box-sizing: border-box;
  font-size: 14px;
  color: #fff;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  display: flex;
  .icon {
    position: absolute;
    bottom: -11px;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .first {
    font-size: 18px;
    margin-left: 13px;
    margin-right: 10px;
  }
  .one {
    padding: 0 5px;
    position: relative;
    cursor: pointer;
    text-transform: uppercase;
  }
}
.foot {
  width: 100%;
  padding: 11px 10px 10px;
  background-color: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  box-sizing: border-box;
  border-left: 1px solid #e5e5e5;
  border-right: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  .one {
    width: 33.3%;
    height: 314px;
    padding: 10px;
    box-sizing: border-box;
    background: #fff;
    .listAll {
      height: 27px;
      overflow: hidden;
      margin-bottom: 10px;
    }
    .after {
      font-size: 12px;
      color: #999;
      margin-top: 10px;
      cursor: pointer;
    }
    .priceIcon {
      font-size: 14px;
      color: #be9e4d;
      font-weight: 500;
    }
    .price {
      font-size: 22px;
      color: #be9e4d;
      margin-right: 6px;
      letter-spacing: -0.8px;
      cursor: pointer;
    }
  }
  .pic {
    background-size: cover;
    background-position: 50% 50%;
    max-width: 100%;
    height: 208px;
    margin-bottom: 11px;
    cursor: pointer;
  }
  .title {
    font-size: 16px;
    color: #222;
    height: 22px;
    line-height: 22px;
    margin-bottom: 8px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
  }
  .type {
    font-size: 12px;
    color: #999;
    height: 20px;
    overflow: hidden;
    margin-bottom: 5px;
    .tag {
      height: 18px;
      line-height: 18px;
      text-align: center;
      border: 1px solid #d8d8d8;
      border-radius: 2px;
      float: left;
      margin-right: 10px;
      margin-bottom: 5px;
      padding: 0 3px;
      cursor: pointer;
    }
  }
}
.handBg:hover {
  background-color: #f4f4f4;
  transition: background-color 0.5s;
}
</style>