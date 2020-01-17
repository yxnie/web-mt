<template>
  <div>
    <Carousel
      v-model="value"
      :autoplay="setting.autoplay"
      :autoplay-speed="setting.autoplaySpeed"
      :dots="setting.dots"
      :radius-dot="setting.radiusDot"
      :trigger="setting.trigger"
      :arrow="setting.arrow"
      class="all"
    >
      <CarouselItem v-for="(item,index) in banner" :key="index">
        <div class="pic">
          <img :src="item.img" alt />
        </div>
      </CarouselItem>
    </Carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 0,
      setting: {
        autoplay: true,
        autoplaySpeed: 2000,
        dots: "inside",
        radiusDot: false,
        trigger: "hover",
        arrow: "hover"
      }
    };
  },
  components: {},
  props: {
    banner: {
      type: Array,
      default: () => []
    }
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.all {
  width: 550px;
  height: 240px;
}
.pic {
  width: 550px;
  height: 240px;
}
</style>