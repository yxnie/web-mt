<template>
  <div class="wrap" @click="close">
    <div class="all">
      <div class="top">
        <div class="title">按省份选择：</div>
        <Dropdown trigger="click" style="margin-left: 20px" class="check">
          <div class="province">
            {{checkedProvince}}
            <Icon type="md-arrow-dropdown" class="icon" />
          </div>
          <DropdownMenu slot="list" class="list">
            <div class="listTitle">省份</div>
            <div class="listAllStart">
              <DropdownItem v-for="(item,index) in province" :key="index" class="one">
                <div @click="checkProvince(item)">{{item.name}}</div>
              </DropdownItem>
            </div>
          </DropdownMenu>
        </Dropdown>
        <Dropdown trigger="click" style="margin-left: 20px" class="check" :class="{notAllow:!provinceId}">
          <div class="province" :class="{notAllow:!provinceId}" @click="getCity">
            {{checkedCity}}
            <Icon type="md-arrow-dropdown" class="icon" :disabled="true" />
          </div>
          <DropdownMenu slot="list" class="list" v-if="provinceId">
            <div class="listTitle">城市</div>
            <div class="listAllStart">
              <DropdownItem v-for="(item,index) in city" :key="index" class="one">
                <div>{{item.name}}</div>
              </DropdownItem>
            </div>
          </DropdownMenu>
        </Dropdown>
        <div class="title after">直接搜索：</div>
        <div class="inputBox">
          <input
            v-model="keyWord"
            placeholder="请输入城市中文或拼音"
            class="input"
            @input="searchCity"
            @focus="searchCity"
            @click.stop="searchCity"
          />
          <div v-if="searchList.length!==0" class="searchResultBox">
            <div class="searchResult">
              <div
                v-for="(item,index) in searchList"
                :key="index"
                class="one"
                @click.stop="saveCity(item.city)"
              >{{item}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="hotCity flex">
        <div class="title">热门城市：</div>
        <div
          v-for="(item,index) in hotCity"
          :key="index"
          class="one"
          @click="saveCity(item.city)"
        >{{item.city}}</div>
      </div>
      <div class="hotCity flex letter">
        <div class="title">按拼音首字母选择：</div>
        <div class="two" v-for="(item,index) in letter" :key="index">
          <a :href="'#'+item">{{item}}</a>
        </div>
      </div>
      <div class="footOne">
        <div v-for="(item,index) in letter" :key="index" class="letterAll block1">
          <div class="letterItem" :id="item">{{item}}</div>
          <div class="listAllStart">
            <div
              v-for="(item1,index1) in cities[item]"
              :key="index1"
              class="cityOne hand"
              :class="{orange:item1.lock}"
              @click="saveCity(item1.name)"
            >{{item1.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cities from "../../assets/city";
export default {
  data() {
    return {
      province: [], //省份列表
      city: [], //城市列表
      keyWord: "", //搜索字
      checkedProvince: "省份",
      checkedCity: "城市",
      provinceId: "",
      hotCity: [],
      cities: {},
      letter: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        "M",
        "N",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "W",
        "X",
        "Y",
        "Z"
      ],
      searchList: [],
      hotString: []
    };
  },
  layout: "top",
  components: {},
  methods: {
    //获取省份
    getProvince() {
      this.$axios.get("province").then(res => {
        // console.log(res);
        this.province = res.data.data.province;
      });
    },
    //获取城市
    getCity() {
      if (this.provinceId) {
        this.$axios.get(`citys/${this.provinceId}`).then(res => {
          console.log(res);
          this.city = res.data.data.city;
        });
      }
    },
    checkProvince(val) {
      this.checkedProvince = val.name;
      this.provinceId = val.id;
    },
    getData() {
      this.$axios.get("hotCity").then(res => {
        // console.log(res);
        res.data.data.hots.map(item => {
          if (item.name === "市辖区") {
            item.city = item.province.slice(0, 2);
          } else {
            item.city = item.name.slice(0, 2);
          }
        });
        res.data.data.hots.map(item => {
          this.hotString.push(item.city);
        });
        this.hotString = this.hotString.join("|");
        this.hotCity = res.data.data.hots;
        this.letter.map(item => {
          this.cities[item].map(item1 => {
            if (this.hotString.indexOf(item1.name) > -1) {
              item1.lock = true;
            } else {
              item1.lock = false;
            }
          });
        });
        console.log(this.cities);
      });
    },
    searchCity() {
      this.searchList = [];
      if (this.keyWord) {
        this.letter.map(item => {
          this.cities[item].map(item1 => {
            if (
              item1.spell.indexOf(this.keyWord.toLowerCase()) > -1 ||
              item1.name.indexOf(this.keyWord.toLowerCase()) > -1
            ) {
              this.searchList.push(item1.name);
            }
          });
        });
      }
      // console.log(this.searchList);
    },
    close() {
      this.searchList = [];
    },
    saveCity(val) {
      localStorage.setItem("location", val);
      this.$store.state.location = val;
      this.$router.push("/");
    }
  },
  mounted() {
    this.cities = cities.data.cities;
    this.getProvince();
    this.getData();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.wrap {
  background: white;
  margin-top: 20px;
  margin-bottom: 40px;
  .all {
    padding: 20px;
  }
}
.top {
  display: flex;
  padding-bottom: 30px;
  border-bottom: 1px solid #e5e5e5;
  height: 70px;
  .title {
    font-size: 16px;
    color: #333;
    font-weight: 500;
    line-height: 40px;
  }
  .inputBox {
    position: relative;
  }
  .input {
    padding-left: 10px;
    width: 220px;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #e5e5e5;
    margin-left: 10px;
    font-size: 14px;
    color: #666;
    box-sizing: border-box;
    outline: none;
  }
  .check {
    position: relative;
  }
  .province {
    padding: 10px 0 10px 10px;
    cursor: pointer;
    border-radius: 4px;
    display: inline-block;
    width: 150px;
    height: 40px;
    box-sizing: border-box;
    border: 1px solid #e5e5e5;
    margin: 0 10px 0 20px;
    position: relative;
    font-size: 14px;
    color: #666;
    line-height: 20px;
    .icon {
      position: absolute;
      right: 10px;
    }
  }
  .after {
    margin-left: 30px;
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
.hotCity {
  border-bottom: 1px solid #e5e5e5;
  padding: 30px 0;
  .one {
    margin: 0 20px;
    color: #666;
    display: inline-block;
    line-height: 21px;
    font-size: 14px;
  }
  .two {
    font-size: 15px;
    margin: 0 17px;
    color: #666;
    display: inline-block;
    margin: 0 10px;
    width: 25px;
    height: 25px;
    padding-top: 2px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border-radius: 50%;
    margin-top: 2px;
    &:hover {
      background: #f8f8f8;
    }
  }
  .title {
    font-size: 16px;
    color: #333;
    font-weight: 500;
    line-height: 21px;
  }
}
.letter {
  border: 0 !important;
}
.letterAll {
  display: flex;
  padding: 13px 30px 13px 10px;
  .cityOne {
    margin: 10px 20px;
    color: #666;
    display: inline-block;
    font-size: 14px;
  }
  .letterItem {
    box-sizing: border-box;
    padding-top: 10px;
    text-align: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #222222;
    background: #ffd000;
    font-size: 17px;
    color: #666;
  }
  .hand:hover {
    color: #000;
  }
}
.block1:hover {
  background: #f8f8f8;
}
.searchResult {
  position: absolute;
  top: 45px;
  left: 10px;
  overflow-y: scroll;
  min-width: 150px;
  max-height: 375px;
  padding: 0 20px 0 15px;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
  .one {
    cursor: pointer;
    font-size: 12px;
    color: #666;
    display: block;
    box-sizing: border-box;
    min-width: 40px;
    height: 20px;
    padding: 1px 8px;
    margin: 6px 38px 6px 0;
    white-space: nowrap;
    &:hover {
      color: black;
    }
  }
}
.orange {
  color: #ff6600 !important;
}
.searchResultBox::before {
  content: "";
  position: absolute;
  top: 40px;
  left: 26px;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid #e5e5e5;
  border-top: 0;
}
.searchResultBox::after {
  content: "";
  position: absolute;
  top: 42px;
  left: 26px;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid #fff;
  border-top: 0;
}
.notAllow {
  cursor: not-allowed !important;
}
</style>