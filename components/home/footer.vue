<template>
  <div>
    <div class="footer">
      <div class="all">
        <div v-for="(item,index) in data" :key="index" class="item" :class="{height:index===4}">
          <div class="title" :class="{handRed:index>data.length-3}">{{item.title}}</div>
          <div v-if="item.list">
            <div
              v-for="(item1,index1) in item.list"
              :key="index1"
              class="item1"
              :class="{handRed:index<data.length-5}"
            >{{item1}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="before listAllStart">
        <div
          v-for="(item,index) in data1"
          :key="index"
          class="one"
          :class="{handRed:index!==0}"
        >{{item}}</div>
      </div>
      <div class="after">
        <div class="handRed top">京公网安备11010502025545号</div>
        <div class="data2">
          <div v-for="(item,index) in data2" :key="index" class="one handRed">
            <div><img :src="item.src" alt="" class="pic" :class="{picOne:index===0}"></div>
            <div v-if="item.text">{{item.text}}</div>
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
      data: [
        {
          title: "用户帮助",
          list: [
            "申请退款",
            "查看美团券密码",
            "常见问题",
            "用户协议",
            "隐私政策",
            "反诈骗公告",
            "消费者权益保障"
          ]
        },
        {
          title: "美团服务",
          list: [
            "美团外卖",
            "美团酒店",
            "猫眼电影",
            "美团配送",
            "美团云",
            "大众点评",
            "美团民宿",
            "无人配送"
          ]
        },
        {
          title: "商家合作",
          list: [
            "美团餐饮商户中心",
            "美食商家入驻(非外卖)",
            "美团外卖开店申请",
            "美团收银官网",
            "外卖配送加盟申请",
            "美团点评餐饮学院",
            "酒店商家入驻",
            "境内度假商家入驻",
            "综合商家入驻",
            "美团民宿房东商家入驻",
            "商家开票申请",
            "美团点评智能收银机",
            "美团点评餐饮开放平台",
            "美团点评收单",
            "免费使用美团排队",
            "快驴进货商家合作",
            "美团闪购商家入驻"
          ]
        },
        {
          title: "代理商加盟",
          list: [
            "美团外卖代理商招募",
            "到店餐饮代理商招募",
            "非餐饮代理商招募",
            "美团联盟",
            "美团收银招募线上分销商",
            "美团点评5S服务商招募",
            "美团收单渠道代理商招募"
          ]
        },
        {
          title: "美团规则",
          list: ["规则中心", "规则目录", "规则评议院"]
        },
        {
          title: "关注美团",
          list: ["美团新浪微博"]
        },
        {
          title: "公司信息",
          list: [
            "关于我们",
            "投资者关系",
            "加入我们",
            "商户诚信公约及管理办法",
            "保险经纪资质"
          ]
        },
        {
          title: "廉正举报",
          list: ["廉政邮箱"]
        },
        {
          title: "知识产权",
          list: ["知识产权维权平台"]
        },
        {
          title: "消费者服务热线",
          list: [
            "外卖消费者：10109777",
            "猫眼消费者：10105335",
            "其他消费者：10107888"
          ]
        },
        {
          title: "商家服务热线",
          list: [
            "外卖&餐饮商家：10105557",
            "休闲娱乐、丽人、ktv、教育、结婚、亲子、家装等商家：10100107"
          ]
        },
        {
          title: "投诉举报热线",
          list: [
            "违法和不良信息举报电话：4006018900",
            "举报邮箱：tousujubao@meituan.com"
          ]
        },
        {
          title: "商家自助入驻美团入口"
        },
        {
          title: "供应商注册入口"
        }
      ],
      data1: [
        "美团网团购 meituan.com",
        "京ICP证070791号",
        "京ICP备10211739号",
        "广播电视节目制作经营许可证（京）字第03889号",
        "食品经营许可证",
        "互联网药品信息服务资格证",
        "医疗器械网络交易服务第三方平台备案：（京）网械平台备字[2018]第00004号"
      ],
      data2: [
        {
          src:
            "https://p1.meituan.net/travelcube/3e7f8a17e55bace814166b667618b459366061.png@76h_76w_2e",
          text: "北京三快科技有限公司"
        },
        { src: require("../../assets/images/website.png") },
        { src: require("../../assets/images/kexin.png") },
        { src: require("../../assets/images/12315.png") }
      ]
    };
  },
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.footer {
  padding: 40px 45px;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  .all {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 456px;
  }
  .item {
    width: 220px;
    line-height: 24px;
    padding-bottom: 20px;
    .title {
      color: #333;
      font-size: 14px;
      font-weight: 500;
    }
    .item1 {
      color: #666;
    }
  }
  .height {
    padding-bottom: 120px;
  }
}
.bottom {
  padding-left: 20px;
  padding-top: 15px;
  padding-bottom: 30px;
  display: flex;
  justify-content: space-between;
  .before {
    width: 440px;
    line-height: 19px;
    .one {
      margin-right: 20px;
    }
  }
  .after {
    .top {
      text-align: right;
      line-height: 19px;
      margin-bottom: 5px;
    }
    .data2 {
      display: flex;
      line-height: 38px;
      .one {
        display: flex;
      }
    }
    .pic {
      height: 38px;
      margin-right: 2px;
    }
    .picOne {
      width: 38px;
    }
  }
}
</style>