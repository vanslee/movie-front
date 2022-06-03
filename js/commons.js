// import axios from './axios'
// let commonURL = "http://192.168.50.115:8081";
// 设置后台服务地址
// request拦截器，将用户token放入头中
// 请求携带token
const request = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 4000
})
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    //从前端拿到user对象 登陆时进行了存储
    let user = localStorage.getItem("user")
    if (user) {
        config.headers.Authorization = user //设置请求头
    }
    return config
}, error => {
    return Promise.reject(error)
});
// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        let res = response.data;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }

        // 当权限验证不通过的时候给出提示
        if(res.code === '401'){
            location.href("http://localhost:8082/login.html")
        }
        return res;
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)

