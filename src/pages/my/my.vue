<template>
	<view class="my">
		<view class="title">
			<view class="status-bar" :style="{ 'height': statusBarHeight + 'px'}"></view>
			<view class="nav-bar" :style="{ 'height': navbarHeight + 'px'}">个人中心</view>
			<view class="baseinfo">
				<button color="#ffffff" class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
					<image class="avatar" :src="avatarUrl"></image>
				</button>
				<text class="username">测试</text>
			</view>
		</view>
		<view class="orders">
			<view class="subtitle">
				<text class="txt-left">我的订单</text>
				<view class="right-txt">
					<text>全部订单</text>
					<text class="iconfont icon-gengduo"></text>
				</view>
			</view>
			<view class="content-item">
				<view class="item">
					<text class="iconfont icon-dingdan-daizhifu"></text>
					<text class="desc">待支付</text>
				</view>
				<view class="item">
					<text class="iconfont icon-dingdan-yizhifu"></text>
					<text class="desc">已支付</text>
				</view>
				<view class="item">
					<text class="iconfont icon-dingdan-yiquxiao"></text>
					<text class="desc">已取消</text>
				</view>
			</view>
		</view>
		<view class="list-options">
			<view class="line">
				<text class="iconfont icon-wodeyouhuiquan left"></text>
				<text class="txt">我的优惠券</text>
				<view class="right-area">
					<text class="iconfont icon-gengduo"></text>
				</view>
			</view>
			<view class="line">
				<text class="iconfont icon-shoucang left"></text>
				<text class="txt">收藏</text>
				<view class="right-area">
					<text class="iconfont icon-gengduo"></text>
				</view>
			</view>
			<view class="line">
				<text class="iconfont icon-shoucang-1 left"></text>
				<text class="txt">问诊记录</text>
				<view class="right-area">
					<text class="iconfont icon-gengduo"></text>
				</view>
			</view>
			<view class="line">
				<text class="iconfont icon-wodechufang left"></text>
				<text class="txt">家人管理</text>
				<view class="right-area">
					<text class="iconfont icon-gengduo"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import {onLoad, onShow} from "@dcloudio/uni-app"
import {ref} from 'vue'

const statusBarHeight : any = ref('')
const navbarHeight : any = ref('')
const avatarUrl : any = ref('https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0')

onLoad(() => {
})

onShow(() => {
	let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
	statusBarHeight.value = uni.getSystemInfoSync().statusBarHeight
	navbarHeight.value = (menuButtonInfo.top - statusBarHeight.value) * 2 + menuButtonInfo.height
})

const onChooseAvatar = (event : any) => {
	avatarUrl.value = event.detail.avatarUrl
}


</script>

<style lang="scss" scoped>
@import "my";
</style>
