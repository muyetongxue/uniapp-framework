# uni-app移动端（微信小程序、H5、APP-PLUS等）前端框架

### 本框架通过vue-cli（Vue3/Vite,以typescript开发）构建，项目调试需在对应平台开发工具中预览，项目结构遵循uni-app框架标准，具体请参照[uni-app官网](https://uniapp.dcloud.io/quickstart-cli)

## 环境依赖

node v8.0.0+

## 本地运行

下载项目

```bash
  git clone http://192.168.10.7:12000/uniapp-framework/app.git
```

选择项目目录

```bash
  cd app
```

升级框架内置编辑器

```bash
  npm update
```

安装依赖项

```bash
  npm install
```

启动编译

```bash
  npm run dev:%PLATFORM%
```

**%PLATFORM%** 可取值如下：

| 值 | 平台 |
| :------: | :------: |
| app-plus | app平台生成打包资源（支持npm run build:app-plus，可用于持续集成。不支持run，运行调试仍需在HBuilderX中操作）|
| h5 | H5 |
| mp-weixin | 微信小程序 |
| mp-alipay | 支付宝小程序 |

启动相应平台的开发者工具（或浏览器），导入编译完成后应用所在文件夹

## 目录结构描述

```vue
|── dist                                         应用
|── src                                          主目录
    ├── common                                   公共资源
    ├── components                               公共组件
    ├── pages                                    主包
    ├── static                                   主包静态文件
    ├── uni_modules                              uni-app插件模块
    ├── App.vue                                  应用级生命周期
    ├── initializeConfiguration.json             应用初始化配置
    ├── main.ts                                  应用主入口                         
    ├── manifest.json                            uni-app配置
    ├── pages.json                               应用页面管理
    └── uni.scss                                 应用全局样式
├── .npmrc                                       npm配置
├── index.html                                   应用主入口
├── package.json                                 应用依赖描述
├── postcss.config.js                            postcss配置
├── README.md                                    帮助
├── tsconfig.json                                typescript依赖描述
└── vite.config.js                               vite配置
```

## 结构说明及注意事项

### pages

项目主包所在文件夹。包含项目所需公共样式，工具方法，请求方法等。因小程序平台限制单个分包大小为2M，故该文件夹不应包含业务模块功能代码

### common

项目公共资源所在文件夹。

api：同名业务模块所依赖的接口目录（如分包命名为test，则该分包接口目录应命名为test.ts）；

fonts：iconfont字体图标（因Android协议限制，引入路径('https://at.alicdn.com/t/font_2943807_z2h4u0fs77.woff2?t=1637132474788'),
地址前缀需修改为https:）或其他字体文件目录；

ts：公共工具类方法目录。

### components

自定义组件所在目录。因业务逻辑与接口返回经常调整，为尽量降低代码耦合，建议编写的组件不包含任何接口调用和业务逻辑，组件所需静态资源应独立置于该组件内

### uni.scss

公共样式文件。包含全局公共样式变量及方法函数等。原则上为保证页面展示的一致性，禁止书写覆盖全局UI框架自带样式代码，如需覆盖，请在各种页面样式文件中修改

### manifest.json

uni-app全局配置文件，用于指定项目的名称、图标、权限等。具体请参照 [uni-app官网](https://uniapp.dcloud.io/collocation/manifest)

### pages.json

项目页面路径路由全局配置文件，决定页面文件的路径、窗口样式、原生的导航栏、底部的原生tabbar等。具体请参照 [uni-app官网](https://uniapp.dcloud.io/collocation/pages)

## 编码规范和注意事项

1.所有样式应写在scss文件中,以class属性挂载

2.优先使用uni-app原生组件,如不满足再使用 [uni-ui](https://uniapp.dcloud.io/component/uniui/uni-ui.html) 组件

3.优先使用图标字体代替图片，如需使用图片，先使用图片压缩插件或 [网站压缩](https://tinypng.com/) 后，置于分包下static文件夹内。压缩后超过40KB的文件一律上传图片服务器。

4.非template中需要渲染的数据，避免使用响应性对象；响应性对象统一使用value取值和渲染。

```typescript
const num = ref(0)

const str = ref('')

const bool = ref(false)

const arr = reactive({value : []})

const obj = reactive({value : {}})
```

## 内置插件、组件

### moment

JavaScript日期处理类库，详见 [Moment.js](http://momentjs.cn/) 。

### crypto-js

JavaScript加解密库，详见 [crypto-js](https://cryptojs.gitbook.io/docs/) 。

### webview

跳转webView第三方网页的公共路径。如在小程序内使用，需在网页根目录下放置校验文件，并在小程序后台配置业务域名。

代码演示

```vue

<script setup lang="ts">
const toWebview = (() => {
	let url = `https://dzjkk.jkxtapp.com/mobile/#/autoLogin?from=healthCard&idNo=420105199601103615&phone=18627179643&name=蔡升`
	uni.navigateTo({
		url : `/pages/webview/webview?url=${encodeURIComponent(url)}`
	})
})
</script>
```
