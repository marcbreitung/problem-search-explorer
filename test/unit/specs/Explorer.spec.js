import Vue from 'vue'
import Explorer from '@/components/Explorer'

describe('Explorer.vue', () => {
    it('should render correct contents', () => {
        const Constructor = Vue.extend(Explorer)
        const vm = new Constructor().$mount()
        expect(vm.$el.querySelector('.menu__header').textContent)
            .to.equal('Problem Search Explorer')
    })
})
