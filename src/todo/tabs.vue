<template>
  <div class="helper">
    <span class="left">{{unFinishedTodoLength}}items left</span>
    <span class="tabs">
      <span v-for="state in states" :key="state" :class="[filter === state?'active':'']" @click="toggleFiter(state)">
      {{state}}
      </span>
    </span>
    <span class="clear" @click="clearAllCompleted">Clear completed</span>
  </div>
</template>

<script>
  export default {
    props: {
      filter:{
        types:String,
        required:true,
      },
      todos:{
        types:Array,
        required:true,
      }
    },
    computed:{
          unFinishedTodoLength(){
            return this.todos.filter(todo => !todo.completed).length
          }
    },
    data(){
      return{
        states:['all','active','completed']
      }
    },
    methods:{
      toggleFiter(state){
        this.$emit('toggle',state)
      },
      clearAllCompleted(){
        this.$emit('clearAll')
      }

    }
  }
</script>

<style lang="stylus" scoped>
 .helper {
        font-weight 100
        display flex
        justify-content space-between
        padding 5px 0
        line-height 30px
        background-color #ffffff
        font-size 14px
        font-smoothing: antialiased;
    }

    .left, .clear, .tabs {
        padding 0 10px
        box-sizing border-box
    }

    .left, .clear {
        width 150px
    }

    .left {
        text-align left
    }

    .clear {
        text-align: right
        cursor pointer
    }

    .tabs {
        width 200px
        display flex
        justify-content space-around
        * {
            display inline-block
            padding 0 10px
            cursor pointer
            border 1px solid rgba(175, 47, 47, 0)
            &.active {
                border-color rgba(100, 100, 100, 0.3)
                border-radius 7px
            }
        }
    }

</style>