$(function () {
  // 点击“去注册账号”的链接
  $('#links-reg').on('click', function() {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击“去登录”的链接
  $('#links-login').on('click', function() {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  // 表单验证功能
  var form = layui.form
  var layer = layui.layer
  form.verify({
    // 自定义了一个pwd表单验证
    pwd:[
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ],
    repwd: function (value) {
      var pwd = $('.reg-box [name=password]').val()
      if (pwd != value) {
        return '两次密码不一致'
      }
    }
  })

  // 监听注册表单的提交事件
  $('#form-reg').on('submit', function (e) {
    // 阻止默认提交行为
    e.preventDefault();
    // 发起POST请求
    $.post('/api/reguser', { username: $('#form-reg [name=username]').val(), password: $('#form-reg [name=password]').val() }, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      layer.msg('注册成功！');
      // 注册成功之后跳转登录界面
      $('#links-login').click();
    })
  })

  // 监听登录表单的提交事件
  $('#form-login').submit(function (e) {
    e.preventDefault();
    $.ajax({
      url:'/api/login',
      type: 'POST',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg('登录成功！')
        localStorage.setItem('token', res.token);
        location.href = '/index.html';
      }
    })
  })
})