$(function () {

  var form = layui.form
  var layer = layui.layer;
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度必须在 1 ~ 6  之间'
      }
    }
  })


  initUserInfo()
  function initUserInfo() {
    $.ajax({
      type: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        console.log(res);
        form.val('formUserInfo', res.data)
      }
    })
  }

  $('#btnReset').on('click', function (e) {
    e.preventDefault();
    // 点击重置按钮，再发起一次请求
    initUserInfo()
  })

  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('更新用户信息成功！')
        window.parent.getUserInfo()
      }
    })
  })
})