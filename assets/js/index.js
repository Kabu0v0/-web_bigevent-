$(function () {
  getUserInfo()

  var layer = layui.layer;
  // 点击退出按钮，实现退出功能
  $('#out').on('click', function () {
    // 弹出提示框，是否退出
    layer.confirm('确定要退出吗？', { icon: 3, title: '提示' }, function (index) {
      // 清空本地储存中的token
      localStorage.removeItem('token');
      // 跳转到登录界面
      location.href = '/login.html'
      // 关闭询问框
      layer.close(index);
    });
  })
})

// 获取用户的基本信息
function getUserInfo() {
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',

    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg(res.message);
      }
      // 调用 renderAvatar 渲染用户的头像
      renderAvatar(res.data)
    },
    // 不论成功还是失败，最终都会调用complete回调函数
    // complete: function (res) {
    //   // console.log('执行了complete函数');
    //   // console.log(res);
    //   // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
    //   if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
    //     // 强制清空token
    //     localStorage.removeItem('token');
    //     // 强制跳转到登录界面
    //     location.href = '/login.html';
    //   }
    // }
  })
}

// 渲染用户的头像
function renderAvatar(user) {
  // 1. 获取用户的名称
  var name = user.nickname || user.username;
  // 2. 设置欢迎的文本
  $('.welcome').html('欢迎：' + name);
  // 3. 按需渲染用户的头像
  if (user.user_pic) {
    // 3.1 渲染图片头像
    $('.layui-nav-img').attr('src', user.user_pic).show();
    $('.text-avatar').hide();
  } else {
    // 3.2 渲染文本头像
    $('.layui-nav-img').hide();
    $('.text-avatar').html(name[0].toUpperCase()).show()
  }
}