function HoverLater(el, seconds, done, undone) {
  this.$el = el
  this.$seconds = seconds
  this.$done = done
  this.$undone = undone
  // 定义一个定时器
  let timeout

  // 清除定时器函数
  var clearTimer = function () {
    timeout && clearTimeout(timeout)
  }

  let $me = this
  // 重启定时器
  var rebuildTimer = function () {
    var context = this
    var args = arguments    
    $me.$undone.apply(context, args)
    clearTimer()
    timeout = setTimeout(() => {
      $me.$done.apply(context, args)
    }, $me.$seconds)
  }
  
  var HoverEndLis = function () {
    clearTimer()
    $me.$el.removeEventListener('mousemove', rebuildTimer)
    $me.$el.removeEventListener('mouseleave', HoverEndLis)
  }

  this.HoverBegLis = function () {
    $me.$el.addEventListener('mousemove', rebuildTimer)
    $me.$el.addEventListener('mouseleave', HoverEndLis)
  }
}

export default HoverLater
