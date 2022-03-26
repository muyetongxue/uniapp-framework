/**
 * @author: caisheng.
 * @date: 2022/2/21
 * @description:公用方法
 */

import moment from "moment"
import encrypt from "./encrypt"
import config from "../../initializeConfiguration.json"

declare interface UtilsInterface {
    weixinAppid : string //微信小程序appid
    baseURL : string //请求URL前缀
    staticURL : string //静态资源URL路径
    baseColor : string //基础色
    timeout : number //请求超时时间
    tokenParams : object | any //token请求参数
    bodyParams : object | any //body请求参数
    getLocationParam : (url : string, name : string) => string  //获取url参数
    toast : (val : string) => void  //轻提示
    isPhone : (value : string) => boolean  //手机号校验
    isEmail : (value : string) => boolean  //Email校验
    replaceIdCard : (val : string) => string  //身份证脱敏
    replaceNumber : (val : string) => string  //手机号脱敏
    toThousands : (num : string) => string  //每三位加逗号
    openMap : (name : string, address : string, longitude : number, latitude : number) => void  //地图配置
    queryParams : (data : object | any, isPrefix : boolean) => string  //对象转url参数格式
    getTimeList : (begin : string, end : string, days : number) => Array<object>  //获取时间轴数组
}

class Utils implements UtilsInterface {
    public weixinAppid = config.appid['mp-weixin']
    public baseURL = config.baseURL
    public staticURL = config.staticURL
    public baseColor = config.baseColor
    public timeout = config.timeout
    public tokenParams = config.tokenParams
    public bodyParams = Object.assign(config.bodyParams, {req_time : encrypt.encryptByDES()})
    public getLocationParam = (url : string, name : string) : string => {
        const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", 'i')
        const search = url.substring(url.indexOf('?'), url.length)
        const result = search.substr(1).match(reg)
        if (result !== null) return result[2]
        return ''
    }
    public toast = (val : string = '') => {
        uni.showToast({
            title : val,
            icon : 'none',
            mask : true,
            duration : 1500,
        })
    }
    public isPhone = (value : string) : boolean => {
        return /^1[3|4|5|6|7|8|9]\d{9}$/.test(value)
    }
    public isEmail = (value : string) => {
        return /^\w+@[a-z0-9]+\.[a-z]{2,4}$/.test(value)
    }
    public replaceIdCard = (val : string) : string => {
        let str : string = ''
        if (val && val.length === 15) {
            str = val.replace(val.slice(4, 11), '*******')
        } else if (val && val.length === 18) {
            str = val.replace(val.slice(4, 14), '**********')
        } else {
            str = val.replace(val.slice(1, val.length - 1), '*')
        }
        return str
    }
    public replaceNumber = (val : string) : string => {
        if (val) return val.replace(val.slice(2, 9), '******')
        return ''
    }
    public toThousands = (num : string) : string => {
        let result = '', counter = 0
        num = num || '0'
        for (let i = num.length - 1; i >= 0; i--) {
            counter++
            result = num.charAt(i) + result
            if (!(counter % 3) && i !== 0) result = ',' + result
        }
        return result
    }
    public openMap = (name : string, address : string, longitude : number, latitude : number) : void => {
        uni.openLocation({
            name : name,
            address : address,
            longitude : longitude,
            latitude : latitude,
            scale : 17,
            success : () => {
            },
            fail : err => {
                console.log(err)
            },
        })
    }
    public queryParams = (data : object | any, isPrefix : boolean = false) : string => {
        let prefix = isPrefix ? '?' : '', result = []
        for (let key in data) {
            let value = data[key]
            if (['', undefined, null].includes(value)) continue
            if (value.constructor === Array) {
                value.forEach(item => {
                    result.push(key + '[]=' + item)
                })
            } else {
                result.push(key + '=' + value)
            }
        }
        return result.length ? prefix + result.join('&') : ''
    }
    public getTimeList = (begin : string, end : string, days : number) : Array<object> => {
        let ab = moment(begin).format('YYYY-MM-DD').split('-'),
            ae = moment(end).format('YYYY-MM-DD').split('-'),
            db = new Date(),
            de = new Date(),
            arr = []
        db.setUTCFullYear(parseInt(ab[0]), parseInt(ab[1]) - 1, parseInt(ab[2]))
        de.setUTCFullYear(parseInt(ae[0]), parseInt(ae[1]) - 1, parseInt(ae[2]))
        let unixDb = db.getTime(),
            unixDe = de.getTime(),
            weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
        for (let k = unixDb; k <= unixDe;) {
            let obj : object | any = {}
            obj.date = moment(k).format('YYYY-MM-DD')
            obj.day = weeks[moment(obj.date).day()]
            arr.push(obj)
            k = k + 24 * 60 * 60 * 1000
        }
        return arr.slice(0, days)
    }
}

export default new Utils()
