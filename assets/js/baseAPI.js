// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  // 统一为有权限的接口，设置headers请求头
  if (options.url.indexOf('/my/') !== -1) {
    options.headers= {
      Authorization: localStorage.getItem('token') || ''
    }
  }
  // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
  options.url = 'http://ajax.frontend.itheima.net' + options.url

  options.complete=function (res) {
    // console.log('执行了complete函数');
    // console.log(res);
    // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
    if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
      // 强制清空token
      localStorage.removeItem('token');
      // 强制跳转到登录界面
      location.href = '/login.html';
    }
  }
})

