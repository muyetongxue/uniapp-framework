<template>
	<view class="index">
		<view class="title-bg"></view>
		<view class="business-main">
			<view class="business-item" @click="toWebView">图文问诊</view>
			<view class="business-item">视频问诊</view>
			<view class="business-item">电话问诊</view>
		</view>
		<view class="rotation-area">
			<swiper class="swiper"
							circular
							autoplay
							:duration="500"
							@change="onChange">
				<swiper-item class="swiper-item">
					<view class="item"></view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<view class="item"></view>
				</swiper-item>
			</swiper>
		</view>
		<view class="business-secondary">
			<view class="business-item">医疗地图</view>
			<view class="business-item">就诊记录</view>
			<view class="business-item">检验报告</view>
			<view class="business-item">检查报告</view>
			<view class="business-item">健康食谱</view>
			<view class="business-item">疫苗预约</view>
		</view>
		<view class="news-healthy">
			<view class="subtitle">健康资讯</view>
			<view class="list">
				<view class="item-news" v-for="(value,index) in list.value" :key="index">
					<view class="left-area">
						<text class="title-news">{{ value.title }}</text>
						<text class="date-news">{{ value.date }}</text>
					</view>
					<view class="thumbnail"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import {onLoad, onReachBottom, onShow} from "@dcloudio/uni-app"
import {onBeforeMount, onMounted, reactive} from 'vue'
import {getToken} from "../../common/api"
import utils from "../../common/ts/utils"

const list = reactive({
	value : [
		{
			title : '资讯标题资讯标题资讯标题资讯标题资讯标题资讯标题',
			date : '2021.11.26'
		},
		{
			title : '资讯标题资讯标题资讯标题资讯标题资讯标题资讯标题',
			date : '2021.11.26'
		},
		{
			title : '资讯标题资讯标题资讯标题资讯标题资讯标题资讯标题',
			date : '2021.11.26'
		}
	]
})

onReachBottom(() => {
	const arr : any = [
		{
			title : '资讯标题资讯标题资讯标题资讯标题资讯标题资讯标题',
			date : '2021.11.26'
		},
		{
			title : '资讯标题资讯标题资讯标题资讯标题资讯标题资讯标题',
			date : '2021.11.26'
		},
		{
			title : '资讯标题资讯标题资讯标题资讯标题资讯标题资讯标题',
			date : '2021.11.26'
		}
	]
	list.value = list.value.concat(arr)
})

onLoad(() => {
	getToken(Object.assign({}, utils.tokenParams)).then((res : any) => {
		if (res.code === '0') {
			uni.setStorageSync('access_token', res.data.access_token)
			uni.setStorageSync('params', res.data.params)
		} else {
			utils.toast(res.msg)
		}
	})
})

onShow(() => {
})

onBeforeMount(() => {
})

onMounted(() => {
	//const db = uniCloud.database()
	//db.collection('user').add({phone : "18627179643"})

	/*let collection = db.collection("user")
	collection.where({phone : '18162309038'})
		.update({
			phone : "123",
		})*/
})

const onChange = (() => {
})

const toWebView = (() => {
	let url = `https://dzjkk.jkxtapp.com/mobile/#/autoLogin?from=healthCard&idNo=420105199001103615&phone=18627179643&name=蔡升`
	uni.navigateTo({
		url : `/pages/webview/webview?url=${encodeURIComponent(url)}`
	})
})

</script>

<style lang="scss" scoped>
@import "index";
</style>
