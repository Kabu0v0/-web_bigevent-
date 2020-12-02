$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image');
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  };
// 1.3 创建裁剪区域
  $image.cropper(options);


  // 点击上传按钮，触发上传文件
  $('#up').on('click', function () {
    $('#file').click();
  })

  var layer = layui.layer;
  // 为文件选择框绑定 change 事件
  $('#file').on('change', function (e) {
    // 获取用户选择的文件
    var files = e.target.files;
    if (files.length === 0) {
      return layer.msg('请选择头像！')
    }
    var file = e.target.files[0]
    var imgURL = URL.createObjectURL(file);
    $image.cropper('destroy').attr('src', imgURL).cropper(options);
  })

  $('#sure').on('click', function () {
    var dataURL = $image.cropper('getCroppedCanvas', {
      // 创建一个 Canvas 画布
      width: 100,
      height: 100
    }).toDataURL('image/png')
  
    $.ajax({
      type: 'POST',
      url: '/my/update/avatar',
      data: {
        avatar: dataURL
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('更换头像成功！')
        window.parent.getUserInfo()
      }
    })
  })
})