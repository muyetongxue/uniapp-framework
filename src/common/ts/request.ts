/**
 * @author: caisheng.
 * @date: 2022/2/21
 * @description:请求封装
 */

import ajax from "uni-ajax"
import utils from "./utils"

let requestNum = 0

declare interface Instance {
    instance : object | any
    get? : (url : string, params : object, header : object, type : string) => object
    post? : (url : string, data : object, header : object, type : string) => object
}

class Interceptors implements Instance {
    public readonly instance : object | any

    constructor() {
        this.instance = ajax.create()

        this.instance.interceptors.request.use(
            (config : any) => {
                requestNum++
                uni.showLoading({
                    title : '努力加载中',
                    mask : true,
                })
                return config
            },
            (error : any) => {
                return Promise.reject(error)
            }
        )

        this.instance.interceptors.response.use(
            (response : any) => {
                requestNum--
                if (requestNum <= 0) {
                    uni.hideLoading()
                } else {
                    uni.showLoading({
                        title : '努力加载中',
                        mask : true,
                    })
                }
                return response.data
            },
            (error : any) => {
                console.log(error)
                requestNum = 0
                uni.hideLoading()
                if (error.statusCode >= 500) {
                    utils.toast('网络异常，请联系管理员')
                }
            }
        )
    }
}

class Request extends Interceptors implements Instance {
    public get = (url : string, params : object, header : object = {"Content-Type" : " "}, type : string = '') : any => {
        params = Object.assign(type === 'token' ? {} : {access_token : uni.getStorageSync('access_token')}, utils.bodyParams, params)
        return new Promise((resolve, reject) => {
            this.instance({
                method : 'GET',
                baseURL : utils.baseURL,
                timeout : utils.timeout,
                url : url,
                params : params,
                header : header
            }).then((response : any) => {
                resolve(response)
            }, (error : any) => {
                reject(error)
            }).catch((error : any) => {
                reject(error)
            })
        })
    }

    public post = (url : string, data : object, header : object = {"Content-Type" : "application/json"}, type : string = '') : any => {
        type === 'token' && (url = `${url}?${utils.queryParams(data, false)}`)
        data = Object.assign(type === 'token' ? {} : {access_token : uni.getStorageSync('access_token')}, utils.bodyParams, data)
        return new Promise((resolve, reject) => {
            this.instance({
                method : 'POST',
                baseURL : utils.baseURL,
                timeout : utils.timeout,
                url : url,
                data : data,
                header : header
            }).then((response : any) => {
                resolve(response)
            }, (error : any) => {
                reject(error)
            }).catch((error : any) => {
                reject(error)
            })
        })
    }
}

const get : any = new Request().get
const post : any = new Request().post
export {get, post}
