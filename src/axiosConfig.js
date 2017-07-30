import axios from 'axios'

axios.defaults.timeout = 8000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = '/';

axios.defaults.withCredentials = true;

//添加一个请求拦截器
axios.interceptors.request.use(function(config){
  // console.log(config)
  return config;
},function(err){
  // message.error("错误的传参");
  message.error(res.data.data);
  return Promise.reject(error);
});


//添加一个响应拦截器
axios.interceptors.response.use(function(res){
  // if(!res.data.success){
  //        message.error(res.data.msg);
  //       return Promise.reject(res);
  // }
  return res;

},function(error){
    if(error.status){
       console.error(error.status)
   }else{
       console.error(error.status)
   }

  return Promise.reject(error);
})

export default axios;
