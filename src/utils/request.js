import axios from "axios";
import qs from 'qs'

var service = axios.create({
    // baseURL: "http://ipad.com/index.php?c=Student&a=doHomeworkshouji&student_id=113896&course_id=38405&chapter_id=169300",
    baseURL: process.env.BASE_API,
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded'
	    "Content-Type":"application/x-www-form-urlencoded",
	    // "from":"web",
	    "version":"1.3.5",
    },
    timeout: 20000
});
//git请求过滤数据
function http_builder_url(url, data) {
  if(typeof(url) == 'undefined' || url == null || url == '') {
    return '';
  }
  if(typeof(data) == 'undefined' || data == null || typeof(data) != 'object') {
    return '';
  }
  url += (url.indexOf("?") != -1) ? "" : "?";
  for(var k in data) {
    url += ((url.indexOf("=") != -1) ? "&" : "") + k + "=" + encodeURI(data[k]);
  }
  return url;
}

service.interceptors.request.use(

    config => {



	    let user = JSON.parse(localStorage.getItem("user"));

	    config.headers["userId"] = `${user.userId}`
	    config.headers["ticket"] = `${user.ticket}`;

	    // git接口
      if(config.method == 'get'){
        config.url = http_builder_url(config.url,config.data)
      }
	    if(config.method == 'post'){
		    config.data = qs.stringify(config.data)

	    }
      // //判断是否转换fromData的请求方式
      // if(config.qs == true){
      // }
      return config
    }
);
service.interceptors.response.use(
    success => {
        return success.data
    },
    error => {
        return Promise.reject("daError=====" + error);
    }
);
export default service;
