<template>
	<view class="container">

		<uni-list>
			<uni-list-item v-for="item in news" :key="item.post_id" clickable :title="item.title" :note="item.created_at" :thumb="item.author_avatar"
			 thumb-size="lg" @click="viewInfo($event,item.post_id)">
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				news: []
			}
		},
		onLoad() {
			this.getNewsList();
		},
		methods: {
			getNewsList() {
				uni.showLoading({
					title: "加载中...."
				})
				uni.request({
					url: 'https://unidemo.dcloud.net.cn/api/news',
					method: 'GET',
					data: {},
					success: res => {
						if (res.statusCode == 200) {
							uni.hideLoading();
							this.news = res.data;
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			viewInfo(e, id) {
				uni.navigateTo({
					url: './info?id=' + id
				})
			}
		}
	}
</script>

<style>
	.container {
		width: 100%;
	}
</style>
