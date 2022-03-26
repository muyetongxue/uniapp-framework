import {get, post} from "../ts/request"

//获取token
export const getToken = (params : object) => post("/pay/token/getToken", params, {"Content-Type" : "application/json"}, 'token')

//查询行政区划
export const sysarealist = (params : object) => get("/admin/sysarea/list", params)

//查询机构列表
export const getHospitalInfo = (params : object) => post("/wechat/order/getHospitalInfo", params)
