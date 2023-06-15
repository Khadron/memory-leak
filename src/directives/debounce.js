export default {
    install(Vue) {
        // 防止重复点击
        Vue.directive('debounce', {
            bind: (el, binding) => {
                if (typeof binding.value !== 'function') {
                    throw new Error('v-debounce not a function')
                }
                let timer = null
                el.addEventListener('click', () => {
                    if (timer) clearTimeout(timer)
                    timer = setTimeout(() => {
                        binding.value()
                        timer = null
                    }, 1000)
                })
            },
            unbind:()=>{
            }
        })
    }
}
