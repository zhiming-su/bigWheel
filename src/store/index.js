import { createStore } from 'vuex'

export default createStore({
    state: {
        count: 0
    },
    mutations: {
        increment(state,num) {
            state.count+=num
        }
    },
    actions: {
        incrementAsync(context,num) {

            setTimeout(() => {
                context.commit('increment',num)
            }, 1000)
        }
    }
})