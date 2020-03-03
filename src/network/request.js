
import axios from 'axios'
export function request(config) {

    const instance = axios.create({
        baseURL: 'http://106.54.54.237:8000/api/wh',
        //timeout: 5000
    })
    instance.interceptors.request.use(config => {
        // console.log('来到了request拦截success中');
        // 1.当发送网络请求时, 在页面中添加一个loading组件, 作为动画
        // 2.某些请求要求用户必须登录, 判断用户是否有token, 如果没有token跳转到login页面
        // 3.对请求的参数进行序列化(看服务器是否需要序列化)
        // config.data = qs.stringify(config.data)
        // console.log(config);
        return config
    }, err => {
        // eslint-disable-next-line no-console
        console.log(err)
    })
    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        // eslint-disable-next-line no-console
        console.log(err)
    })
    return instance(config)
}

