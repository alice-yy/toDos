<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value="initList" @change="handle" />
    <a-button type="primary" @click="addList">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="(e)=>{cbchange(e,item.id)}">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItem(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{unfinsh}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="inputkey=='all'? 'primary':'dafault' " @click="changeList('all')">全部</a-button>
          <a-button
            :type="inputkey=='undone'? 'primary':'dafault' "
            @click="changeList('undone')"
          >未完成</a-button>
          <a-button :type="inputkey=='done'? 'primary':'dafault' " @click="changeList('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'app',
  data () {
    return {}
  },
  created () {
    this.$store.dispatch('getList')
  },
  computed: {
    ...mapState(['initList', 'inputkey']),
    ...mapGetters(['unfinsh', 'infoList'])
  },
  methods: {
    handle (e) {
      console.log(e.target.value)
      this.$store.commit('inputValue', e.target.value)
    },
    addList () {
      if (this.initList.trim().length <= 0) {
        return this.$message.warning('输入内容不能为空')
      }
      this.$store.commit('addItem')
    },
    removeItem (id) {
      this.$store.commit('remove', id)
    },
    cbchange (e, id) {
      console.log(id)
      // 接收相应的 id 和 状态
      const para = {
        id: id,
        staute: e.target.checked
      }
      this.$store.commit('changecheck', para)
    },
    clean () {
      // 清除操作需要触发mutations里面的数据
      this.$store.commit('cleanDone')
    },
    changeList (key) {
      this.$store.commit('changes', key)
    }
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
