<template>
	<view class="webview">
		<web-view :src="url" :webview-styles="webviewStyles"></web-view>
	</view>
</template>

<script lang="ts" setup>
import {onLoad} from "@dcloudio/uni-app"
import {reactive, ref} from "vue"

const url = ref('')
const webviewStyles = reactive({
	webviewStyles : {
		progress : false
	}
})

onLoad((options : any) => {
	options.url && (url.value = decodeURIComponent(options.url))
})
</script>

<style lang="scss" scoped></style>
