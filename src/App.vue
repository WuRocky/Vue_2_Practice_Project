<template>
  <div id="app">
    <!-- haader -->
    <MyHeader :poiInfo="poiInfo"></MyHeader>
    <!-- nav -->
    <MyNav :commentNum="commentNum"></MyNav>
    <!-- main -->
    <!-- 路由出口 -->
    <!-- 路由匹配到的組件將渲染在這裡 -->
    <keep-alive>
			<router-view ></router-view>
		</keep-alive>
  </div>
</template>

<script>
// 1. 導入
import MyHeader from "components/Header/Header";
import MyNav from "components/Nav/Nav";
export default {
  name: "App",
  components: {
    // 註冊
    MyHeader,
    MyNav
  },
  data() {
    return {
      // header 組件需要的訊息(店家訊息)
      poiInfo: {},
      commentNum: 0
    };
  },
  // 發起異步請求，獲取數據
  created() {
    let that = this;

    // 通過 axios 發起 get 請求
    this.$axios
      .get("/api/goods")
      .then(function(response) {
        // 獲取到數據
        // console.log(response);

        let dataSource = response.data;
        if (dataSource.code == 0) {
          that.poiInfo = dataSource.data.poi_info;
        }
      })
      .catch(function(error) {
        // 出錯處理
        console.log(error);
      });

    // 通過 axios 發起 get 請求
    this.$axios
      .get("/api/ratings")
      .then(function(response) {
        let dataSource = response.data;
        if (dataSource.code == 0) {
          that.commentNum = dataSource.data.comment_num;
        }
      })
      .catch(function(error) {
        // 出錯處理
        console.log(error);
      });
    
  }
};
</script>

<style></style>
