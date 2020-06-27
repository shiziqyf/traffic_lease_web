import axios from 'axios';
import store from '@/store/index';
import router from '@/router/index';

import { Message } from 'element-ui';
axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.timeout = 8000

//请求异常拦截
axios.interceptors.request.use(config => {
    let url = config.url
    if( url.indexOf('https://restapi.amap.com') == -1) {
        config.headers.Authorization = store.state.token
    }

    return config;
}, err => {
    console.log('错误')
})


// 响应拦截器
axios.interceptors.response.use (
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
        // 否则的话抛出错误
        if (response.status == 200 ) {

            if(response.data.code == 0) {
                response.data=response.data.data
                return Promise.resolve(response)
            }

            if(response.data.code == '400') {
                Message.error(response.data.message)
                return Promise.reject(response);
            }
            if(response.data.code == '402') {
                Message.error(response.data.message)
                router.push('/login')
                return Promise.reject(response);
            }

            if(response.data.code == '403') {
                Message.error('权限不足')
                return Promise.reject(response);
            }
           
            if(response.data.code == '500') {
                Message.error('系统出错')
                return Promise.reject(response);
            }
            
            return Promise.resolve(response)
            
        } else {
            Message.error('发生错误，请检查网络')
            return Promise.reject(response);
            
        }
    },
    // 服务器状态码不是2开头的的情况
    // 这里可以跟你们的后台开发人员协商好统一的错误状态码    
    // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    // 下面列举几个常见的操作，其他需求可自行扩展
    error => {

        Message.error("发生错误，请检查网络")
        if (error.response.status) {
            return Promise.reject(error.response);
        }

    })


// POST 方法封装  (参数处理)

export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: url,
        data: params,
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}

export const getRequest = (url) => {
    return axios({
        method: 'get',
        url: url
    });
}