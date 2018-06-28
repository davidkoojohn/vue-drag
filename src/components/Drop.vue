<template>
  <div class="fluid container">
    <div  class="item">
      <draggable class="list-group"
                 element="ul"
                 v-model="list"
                 :options="dragOptions"
                 :move="onMove"
                 @start="isDragging=true"
                 @end="isDragging=false">
        <transition-group type="transition" :name="'flip-list'">
          <li class="list-group-item" v-for="element in list" :key="element.order">
            {{element.name}}
          </li>
        </transition-group>
      </draggable>
    </div>

    <div  class="item">
      <draggable element="span"
                 v-model="list2"
                 :options="dragOptions"
                 :move="onMove">
        <transition-group name="no" class="list-group" tag="ul">
          <li class="list-group-item" v-for="element in list2" :key="element.order">
            {{element.name}}
          </li>
        </transition-group>
      </draggable>
    </div>

    <div  class="list-group item">
      <pre>{{listString}}</pre>
    </div>
    <div  class="list-group item">
      <pre>{{list2String}}</pre>
    </div>
  </div>
</template>

<script>

  import draggable from 'vuedraggable'
  const message = [
    'vue.draggable',
    'draggable',
    'component',
    'for',
    'vue.js 2.0',
    'based',
    'on',
    'Sortablejs'
  ]

  export default {
    name: 'Drop',
    components: {
      draggable
    },
    data () {
      return {
        list: message.map((name, index) => {
          return {name, order: index+1, fixed: false};
        }),
        list2:[],
        editable:true,
        isDragging: false,
        delayedDragging:false
      }
    },
    methods:{
      onMove({relatedContext, draggedContext}) {
        const relatedElement = relatedContext.element;
        const draggedElement = draggedContext.element;
        return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      }
    },
    computed: {
      dragOptions () {
        return  {
          animation: 0,
          group: 'description',
          disabled: !this.editable,
          ghostClass: 'ghost'
        };
      },

      /*list: {
        get() {
          return this.message.map((name, index) => {
            return {name, order: index+1, fixed: false};
          })
        },
        set(newValue) {
          // console.log(newValue)
        }
      },*/

      listString(){
        return JSON.stringify(this.list, null, 2);
      },
      list2String(){
        return JSON.stringify(this.list2, null, 2);
      }
    },
    watch: {
      isDragging(newValue) {
        if (newValue){
          this.delayedDragging= true
          return
        }
        this.$nextTick(() =>{
          this.delayedDragging =false
        })
      },
      list2(newValue, oldValue) {
        console.log(newValue, oldValue)
      },
      list(newValue, oldValue) {
        console.log(newValue, oldValue)
      }
    },

    mounted(e) {
      // console.log(this.list)
    }
  }
</script>

<style scoped lang="scss">

  .container {
    display: flex;

    .item {
      margin: 0 10px;
      min-width: 250px;
      border: 1px solid;
    }
  }

  .flip-list-move {
    transition: transform 0.5s;
  }

  .no-move {
    transition: transform 0s;
  }

  .ghost {
    opacity: .5;
    background: #C8EBFB;
  }

  .flip-list-move {
    transition: transform 0.5s;
  }

  .no-move {
    transition: transform 0s;
  }

  .ghost {
    opacity: .5;
    background: #C8EBFB;
  }

  .list-group {
    min-height: 20px;
    padding: 0 10px;
  }

  .list-group-item {
    margin-bottom: 10px;
    list-style: none;
    cursor: move;
    border: 1px solid;

    i {
      cursor: pointer;
    }
  }
</style>
