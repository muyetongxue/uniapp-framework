<template>
	<view class="test2">
		<view class="item item-1">1</view>
		<view class="item item-2">2</view>
		<view class="item item-3">3</view>
		<view class="item item-4">4</view>
		<view class="item item-5">5</view>
		<view class="item item-6">6</view>
		<view class="item item-7">7</view>
		<view class="item item-8">8</view>
		<view class="item item-9">9</view>
	</view>
</template>

<script setup lang="ts">
import {onLoad, onShow} from "@dcloudio/uni-app"

onLoad(options => {
	console.log(options)
})

onShow(() => {
})

</script>

<style lang="scss">
.test2 {
	width: vw(750);
	height: vw(750);
	display: grid;
	grid-template-columns: 100px 100px 100px;
	grid-template-rows: 100px 100px 100px;
	gap: vw(10);
	grid-auto-rows: 50px;
	//grid-template-areas: "header header header" "main main main" "footer footer footer";
}

.item {
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 2em;
	border: 1px solid #e5e4e9;
}
.item-1 {
	background-color: #ef342a;
	//grid-column-start: 1;
	//grid-column-end: 3;
}
.item-2 {
	background-color: #f68f26;
	//grid-column-start: 1;
	//grid-column-end: 3;
}
.item-3 {
	background-color: #4ba946;
}
.item-4 {
	background-color: #0376c2;
}
.item-5 {
	background-color: #c077af;
}
.item-6 {
	background-color: #f8d29d;
}
.item-7 {
	background-color: #b5a87f;
}
.item-8 {
	background-color: #d0e4a9;
	grid-row: 4 / 5;
	grid-column: 2 / 4;
}
.item-9 {
	background-color: #4dc7ec;
	grid-row-start: 5;
	grid-column-start: 3;
}
</style>
