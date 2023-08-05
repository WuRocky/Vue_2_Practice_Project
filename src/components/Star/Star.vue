<template>
  <div class="star">
    <!-- itmeClass: on、half、off -->

		<span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
    </span>
  </div>
</template>

<script>
// 星星長度
const LENGTH = 5;

// 星星對應 class
const CLS_ON = "on";
const CLS_HALF = "half";
const CLS_OFF = "off";

export default {
  props: {
    score: {
      type: Number
    }
  },
  computed: {
    itemClasses() {
      let result = [];
      // 4.7 => 4.5   3.9 => 3.5  4.1 => 4.0
      // 對分數進行處理，向下取0.5的倍數
      let score = Math.floor(this.score * 2) / 2;
      // 小數，控制半星
      let hasDecimal = score % 1 !== 0;
      // 整數，控制全星
      let integer = Math.floor(score);

      // 全星
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
      }
      // 半星
      if (hasDecimal) {
        result.push(CLS_HALF);
      }
      // 補齊
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }

      return result;
    }
  }
};
</script>

<style>
.star {
  font-size: 0;
}
.star .star-item {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 3px;
  background-repeat: no-repeat;
  background-size: 10px 10px;
}

.star .star-item:last-child {
  margin-right: 0;
}

/* 三種圖片類型 */
.star .on {
  background-image: url(star24_on@2x.png);
}
.star .half {
  background-image: url(star24_half@2x.png);
}
.star .off {
  background-image: url(star24_off@2x.png);
}
</style>
