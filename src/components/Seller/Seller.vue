<template>
  <div class="seller">
    <div class="seller-wrapper">
      <Split></Split>
      <div class="seller-view">
				<div class="address-wrapper">
					<div class="address-left">
						{{seller.address}}
					</div>
					<div class="address-right">
						<div class="content"></div>
					</div>
				</div>
				<div class="pics-wrapper" v-if="seller.poi_env" ref='picsView'>
					<ul class="pics-list" ref='picsList'>
						<li class="pics-item" v-for="imgurl in seller.poi_env.thumbnails_url_list" ref='picsItem'>
							<img :src="imgurl" />
						</li>
					</ul>
				</div>
				<div class="safety-wrapper">
					查看食品安全檔案
					<span class="icon-keyboard_arrow_right"></span>
				</div>
			</div>
      
      <Split></Split>
      <div class="tip-wrapper">
        <div class="delivery-wrapper">
					配送服務: {{seller.app_delivery_tip}}
				</div>
				<div class="shipping-wrapper">
					配送時間: {{seller.shipping_time}}
				</div>
      </div>
      
      <Split></Split>
      <div class="other-wrapper">
        <div class="server-wrapper">
					商家服務
					<div class="poi-server" v-for="item in seller.poi_service">
						<img :src="item.icon" /> {{item.content}}
					</div>
				</div>
				<div class="discounts-wrapper">
					<div class="discounts-item" v-for="item in seller.discounts2">
						<div class="icon">
							<img :src="item.icon_url" />
						</div>
						<div class="text">
							{{item.info}}
						</div>
					</div>
				</div>
      </div>
      <Split class="bottom"></Split>
    </div>
  </div>
</template>

<script>
// 導入Split組價
	import Split from 'components/Split/Split'
	// 導入BScroll
	import BScroll from 'better-scroll';

	export default {
		data() {
			return {
				seller: {}
			}
		},
		created() {
			// 通過axios發起get請求
			let that = this;
			this.$axios.get('/api/seller')
				.then(function(response) { // 獲取到數據
					var dataSource = response.data;
					if(dataSource.code == 0) {
						that.seller = dataSource.data;

						// 初始化
						that.$nextTick(() => {
							if(that.seller.poi_env.thumbnails_url_list) {
								let imgW = that.$refs.picsItem[0].clientWidth;
								let marginR = 11;
								let width = (imgW + marginR) * that.seller.poi_env.thumbnails_url_list.length;

								that.$refs.picsList.style.width = width + 'px';

								that.scroll = new BScroll(that.$refs.picsView, {
									scrollX: true
								});
							}
							
							that.sellerView = new BScroll(that.$refs.sellerView);
							
						});
					}

				})
				.catch(function(error) { // 出錯處理
					console.log(error);
				});
		},
		components: {
			Split,
			BScroll
		}
	}
</script>

<style>
.seller {
  position: absolute;
  left: 0;
  top: 191px;
  bottom: 0px;
  width: 100%;
  background: #F4F4F4;
  overflow: hidden;
}

.seller .seller-wrapper {
  background: white;
}

.seller .seller-wrapper .seller-view {
  padding-left: 15px;
}

.seller .seller-wrapper .seller-view .address-wrapper {
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid #F4F4F4;
}

.seller .seller-wrapper .seller-view .address-wrapper .address-left {
  flex: 1;
  background: url(address.png) no-repeat left center;
  padding-left: 26px;
  padding-right: 31px;
  background-size: 14px 16px;
  font-size: 14px;
  line-height: 19px;
}

.seller .seller-wrapper .seller-view .address-wrapper .address-right {
  flex: 0 0 60px;
  background: url(line.png) no-repeat left center;
  background-size: 1px 15px;
}

.seller .seller-wrapper .seller-view .address-wrapper .address-right .content {
  width: 100%;
  height: 100%;
  background: url(phone.png) no-repeat center center;
  background-size: 18px 18px;
}

.seller .seller-wrapper .seller-view .pics-wrapper {
  padding: 10px 0;
  overflow: hidden;
  border-bottom: 1px solid #F4F4F4;
  white-space: nowrap;
}

.seller .seller-wrapper .seller-view .pics-wrapper .pics-list .pics-item {
  display: inline-block;
  margin-right: 11px;
  width: 93px;
  height: 75px;
}

.seller .seller-wrapper .seller-view .pics-wrapper .pics-list .pics-item img {
  width: 100%;
  height: 100%;
  border-radius: 2px;
}

.seller .seller-wrapper .seller-view .safety-wrapper {
  padding: 15px 14px 15px 25px;
  background: url(safety.png) no-repeat left center;
  background-size: 14px 16px;
  font-size: 14px;
}

.seller .seller-wrapper .tip-wrapper {
  padding-left: 15px;
}

.seller .seller-wrapper .seller-view .safety-wrapper span {
  float: right;
  font-size: 14px;
}

.seller .seller-wrapper .tip-wrapper .delivery-wrapper {
  background: url(delivery.png) no-repeat left center;
  background-size: 14px 16px;
  padding: 15px 0 15px 25px;
  font-size: 14px;
  border-bottom: 1px solid #F4F4F4;
}

.seller .seller-wrapper .tip-wrapper .shipping-wrapper {
  background: url(time.png) no-repeat left center;
  padding: 15px 17px 15px 25px;
  background-size: 15px 15px;
  font-size: 14px;
  line-height: 18px;
}

.seller .seller-wrapper .other-wrapper {
  padding-left: 15px;
}

.seller .seller-wrapper .other-wrapper .server-wrapper {
  background: url(server.png) no-repeat left center;
  background-size: 15px 15px;
  padding: 15px 0 17px 25px;
  font-size: 14px;
  border-bottom: 1px solid #F4F4F4;
}

.seller .seller-wrapper .other-wrapper .server-wrapper .poi-server {
  display: inline-block;
  margin-left: 17px;
}

.seller .seller-wrapper .other-wrapper .server-wrapper .poi-server img {
  width: 15px;
  height: 15px;
  margin-right: 6px;
  vertical-align: middle;
}

.seller .seller-wrapper .other-wrapper .discounts-wrapper {
  padding: 17px 24px 19px 0;
}

.seller .seller-wrapper .other-wrapper .discounts-wrapper .discounts-item {
  display: flex;
}

.seller .seller-wrapper .other-wrapper .discounts-wrapper .discounts-item .icon {
  flex: 0 0 25px;
}

.seller .seller-wrapper .other-wrapper .discounts-wrapper .discounts-item .icon img {
  width: 15px;
  height: 15px;
}

.seller .seller-wrapper .other-wrapper .discounts-wrapper .discounts-item .text {
  flex: 1;
  font-size: 14px;
}

.seller .seller-wrapper .bottom{
  height: 28px;
}
</style>
