<template>
	<view class="container">
		<uni-card :title="title">
			{{strings}}
		</uni-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				strings: ''
			}
		},
		onLoad(e) {
			this.getNesInfo(e.id);
		},
		methods: {
			getNesInfo(id) {
				uni.showLoading({
					title: "加载中...."
				})
				uni.request({
					url: 'https://unidemo.dcloud.net.cn/api/news/36kr/' + id,
					method: 'GET',
					data: {},
					success: res => {
						if (res.statusCode == 200) {
							uni.hideLoading();
							this.title = res.data.title;
							this.strings = res.data.content;
						}
					},
					fail: () => {},
					complete: () => {}
				});

			}
		}
	}
</script>

<style>
	.container {
		width: 100%;
	}
</style>
