<template>
  <div>
    <div class="wrap">
      <div class="top">
        <span class="handRed">{{keyword}}</span>>
        <span class="handRed">{{location}}</span>
      </div>
    </div>
    <div class="wrap all">
      <div class="before">
        <div class="topBar">
          <div class="classify">分类</div>
          <div class="center">全部</div>
          <div class="conOne">
            <Dropdown trigger="click" style="margin-left: 20px" class="check">
              <div class="province">
                {{top}}
                <Icon type="md-arrow-dropdown" class="icon" />
              </div>
              <DropdownMenu slot="list" class="list">
                <div class="listTitle">top</div>
                <div class="listAllStart">
                  <!-- <DropdownItem v-for="(item,index) in province" :key="index" class="one">
                  <div @click="checkProvince(item)">{{item.name}}</div>
                  </DropdownItem>-->
                </div>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div class="topBar topBar1">
          <div class="classify">分类</div>
          <div class="center">全部</div>
          <div class="con">
            <div class="conOne">
              <Dropdown trigger="click" style="margin-left: 20px" class="check">
                <div class="province">
                  {{top}}
                  <Icon type="md-arrow-dropdown" class="icon" />
                </div>
                <DropdownMenu slot="list" class="list">
                  <div class="listTitle">top</div>
                  <div class="listAllStart">
                    <!-- <DropdownItem v-for="(item,index) in province" :key="index" class="one">
                  <div @click="checkProvince(item)">{{item.name}}</div>
                    </DropdownItem>-->
                  </div>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "top",
  data() {
    return {
      keyword: "",
      top: "top"
    };
  },
  components: {},
  methods: {
    getData(){
      this.$axios.get(`results?city=${this.location}&keyword=${this.keyword}`).then(res=>{
        console.log(res,1);
      })
      this.$axios.get(`crumbs?city=${this.location}`).then(res=>{
        console.log(res,2);
      })
    }
  },
  mounted() {
    if (localStorage.getItem("location")) {
      this.$store.state.location = localStorage.getItem("location");
    }
    this.keyword = this.$route.query.keyword;
    this.getData()
  },
  watch: {},
  computed: {
    location() {
      return this.$store.state.location;
    }
  }
};
</script>

<style scoped lang='scss'>
.top {
  margin: 20px 0 10px;
  color: #222;
}
.all {
  display: flex;
}
.check {
  position: relative;
  .province {
    padding: 0 10px;
    color: #666;
    cursor: pointer;
    line-height: 28px;
    font-size: 15px;
    .icon {
      position: absolute;
      top: 10px;
    }
  }
  .list {
    width: 260px;
    padding: 20px 0 20px 15px;
    box-sizing: border-box;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    position: absolute;
    top: 0px;
    left: -70px;
    .listTitle {
      font-size: 16px;
      color: #ccc;
      margin-bottom: 11px;
    }
    .one {
      // width: 33%;
      cursor: pointer;
      font-size: 12px;
      color: #666;
      display: table;
      box-sizing: border-box;
      height: 20px;
      padding: 1px 8px;
      margin: 6px 20px 6px 0;
    }
  }
  .list::after {
    content: "";
    position: absolute;
    top: -5px;
    left: 26px;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #fff;
    border-top: 0;
  }
  .list::before {
    content: "";
    position: absolute;
    top: -7px;
    left: 26px;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #e5e5e5;
    border-top: 0;
  }
}
.before {
  margin-top: 10px;
  padding: 15px;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  color: #333;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  width: 950px;
  .con {

  }
  .topBar1 {
    margin-top: 15px;
  }
  .topBar {
    display: flex;
    font-size: 14px;
    line-height: 22px;
  }
  .classify {
    width: 80px;
    height: 22px;
    line-height: 22px;
  }
  .center {
    border-radius: 100px;
    background: linear-gradient(to bottom right, #ffd000, #ffbd00);
    color: #222222;
    height: 22px;
    line-height: 22px;
    cursor: pointer;
    padding: 0 10px;
  }
  .conOne {
    min-width: 120px;
  }
}
</style>