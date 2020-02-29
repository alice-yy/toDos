import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    initList: 'aaa',
    nextId: 5,
    inputkey: 'all'
  },
  mutations: {
    showList (state, list) {
      // 对state重新赋值
      state.list = list
    },
    inputValue (state, val) {
      state.initList = val
    },
    addItem (state) {
      const obj = {
        id: state.nextId,
        info: state.initList.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.initList = ''
    },
    remove (state, id) {
      const index = state.list.findIndex(ele => ele.id === id)
      if (index !== -1) {
        state.list.splice(index, 1)
      }
    },
    changecheck (state, para) {
      const index = state.list.findIndex(x => x.id === para.id)
      if (index !== -1) {
        state.list[index].done = para.staute
      }
    },
    cleanDone (state) {
      state.list = state.list.filter(x => x.done === false)
    },
    changes (state, key) {
      state.inputkey = key
    }
  },
  actions: {
    // axios请求是异步的，需要在actions里面使用
    getList (context) {
      axios.get('/list.json').then(({ data }) => {
        // console.log(data)
        context.commit('showList', data)
      })
    }
  },
  getters: {
    unfinsh (state) {
      return state.list.filter(x => x.done === false).length
    },
    infoList (state) {
      if (state.inputkey === 'all') {
        return state.list
      } else if (state.inputkey === 'undone') {
        return state.list.filter(x => x.done === false)
      } else {
        return state.list.filter(x => x.done === true)
      }
    }
  }
})
