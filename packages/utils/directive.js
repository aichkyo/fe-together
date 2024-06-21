/**
 * 自定义指令工具
 */

// 拖拽元素自定义指令
export const draggable = {
  bind (el) {
    let isDragging = false

    let offset = { x: 0, y: 0 }
    let start = { x: 0, y: 0 }

    el.addEventListener('touchstart', touchstart, false)
    el.addEventListener('touchmove', touchmove, false)
    el.addEventListener('touchend', touchend, false)

    function touchstart (event) {
      isDragging = true

      start.x = event.touches[0].clientX
      start.y = event.touches[0].clientY

      offset.x = el.offsetLeft
      offset.y = el.offsetTop
    }

    function touchmove (event) {
      if (!isDragging) return

      let x = offset.x + (event.touches[0].clientX - start.x)
      let y = offset.y + (event.touches[0].clientY - start.y)

      // 边界判断
      if (x < 0) {
        x = 0
      }

      if (x > document.documentElement.clientWidth - el.offsetWidth) {
        x = document.documentElement.clientWidth - el.offsetWidth
      }

      if (y < 0) {
        y = 0
      }

      if (y > document.documentElement.clientHeight - el.offsetHeight) {
        y = document.documentElement.clientHeight - el.offsetHeight
      }

      el.style.left = x + 'px'
      el.style.top = y + 'px'
    }

    function touchend () {
      isDragging = false
    }
  }
}
