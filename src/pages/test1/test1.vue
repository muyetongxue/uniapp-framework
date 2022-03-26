<template>
	<view class="test1">
		<PersonInfo isOrg @init="perChange"></PersonInfo>
		<AreaSelection ref="area" :show="show"
									 :topArea="topArea"
									 @close="close"
									 @sure="sure"></AreaSelection>
		<button size="mini" @click="open">地区选择</button>
		<TimeLine beginDate="2022-03-24" endDate="2022-03-31" @callback="dateEvent"></TimeLine>
		<!--		<NoRecord height="50"></NoRecord>-->
		<!--		<blueStarTimeLine :dateObj="dateObj" @callback="dateEvent"></blueStarTimeLine>-->
	</view>
	<!-- #ifdef MP-WEIXIN -->
	<!--	<canvas id="canvas" style="width: 300px;height: 300px;" type="2d"/>-->
	<!-- #endif -->

	<!-- #ifndef MP-WEIXIN -->
	<!--	<canvas id="canvas" canvas-id="canvas" style="width: 300px;height: 300px;"/>-->
	<!-- #endif -->
	<!--	<Qrcode size="250" text="https://www.baidu.com"></Qrcode>-->
</template>

<script setup lang="ts">
//import blueStarTimeLine from "bluestar-timeline"
//import "bluestar-timeline/style.css"
import PersonInfo from "@/uni_modules/bluestar-PersonInfo/components/bluestar-PersonInfo/bluestar-PersonInfo.vue"
import TimeLine from "@/uni_modules/bluestar-TimeLine/components/bluestar-TimeLine/bluestar-TimeLine.vue"
import AreaSelection
	from "@/uni_modules/bluestar-AreaSelection/components/bluestar-AreaSelection/bluestar-AreaSelection.vue"
//import NoRecord from "@/uni_modules/bluestar-NoRecord/components/bluestar-NoRecord/bluestar-NoRecord.vue"
import {onLoad, onReady, onShow} from "@dcloudio/uni-app"
import {onBeforeMount, onMounted, reactive, ref} from "vue"
import utils from "../../common/ts/utils"
//import {useDrawPoster} from 'u-draw-poster'
//import drawQrCode from 'u-draw-poster/plugins/drawQrCode'

const area = ref(null) as any
const show = ref(false)
const list : any[] = reactive([])
const topArea : any = reactive({
	areaName : '仙桃市',
	areaCode : utils.bodyParams.req_data.vercode,
})

onLoad(() => {
})

onShow(() => {
})

onReady(async () => {
	/*const dp = await useDrawPoster("canvas", {
		// 单独引入二维码插件
		plugins : [drawQrCode()]
	})
	dp.canvas.width = 300
	dp.canvas.height = 300
	dp.draw(ctx => {
		ctx.drawQrCode({
			x : 0,
			y : 0,
			text : "http://www.baidu.com",
			size : 300,
			//errorCorrectLevel : errorCorrectLevel.L
		})
	})
	dp.render()*/
})

onBeforeMount(() => {
})

onMounted(() => {
})

const perChange = (perInfo : any, orgInfo : any) => {
	console.log(perInfo)
	console.log(orgInfo)
}

const open = () => {
	show.value = true
}

const close = () => {
	show.value = false
}

const sure = (obj : object) => {
	console.log(obj)
}

const dateEvent = (obj : object) => {
	console.log(obj)
}

</script>

<style lang="scss" scoped>
.test1 {
	padding: vw(20);
}
</style>
