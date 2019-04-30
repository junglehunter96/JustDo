<template>
  <section class="real-app">
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下来要做什么呢？"
      @keyup.enter="addTodo"
    >
    <Item :todo="todo" v-for="todo in filteredTodos" :key="todo.id" @del="deleteTodo"/>
    <tabs :filter="filter" :todos="todos" @toggle="toggleFiter" @clearAll="clearCompleted"/>
  </section>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
export default {

  data () {
    return {
     todos:[],
      filter:'',
      id:0,

    }
  },
  methods: {
    addTodo (e) {
      this.todos.unshift({
        id:this.id++,
        content: e.target.value.trim(),
        completed: false,
      });
      e.target.value='';
    },
    deleteTodo(id){
      this.todos.splice(this.todos.findIndex(todo=>todo.id === id),1)
    },
    toggleFiter(state){
      this.filter = state
    },
    clearCompleted(){
       this.todos = this.todos.filter(todo=>!completed)
    }
  },
  computed:{
    //过滤器 过滤出我们想要的列表
    filteredTodos() {
      if(this.filter === 'all'){
        return this.todos
      }
      const completed = this.filter === 'completed';
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  components: {
    Item,
    Tabs
  }
}
</script>

<style lang="stylus" scoped>
.real-app {
        width 600px
        margin 0 auto
        box-shadow 0 0 5px #666
    }

    .add-input {
        position: relative;
        margin: 0;
        width: 100%;
        font-size: 20px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        outline: none;
        color: inherit;
        box-sizing: border-box;
        font-smoothing: antialiased;
        padding: 16px 16px 16px 36px;
        border: none;
        box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
    }
</style>