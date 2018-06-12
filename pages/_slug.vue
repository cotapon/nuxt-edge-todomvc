<template lang="pug">
  section.todoapp
    todo-header
    section.main(v-if="todos.length")
      input#toggle-all(type="checkbox", @click="allDone")
      label(for="toggle-all") Mark all as complete
      ul.todo-list
        li(v-for="todo in todos", :class="{'completed': todo.completed, 'editing': todo === editedTodo}")
          .view
            input.toggle(type="checkbox", v-model="todo.completed")
            label(@dblclick="editTodo(todo)") {{ todo.title }}
            button.destroy(@click="removeTodo(todo)")
          input.edit(type="text", v-model="todo.title", v-todo-focus="todo == editedTodo", @blur="doneEdit(todo)", @keyup.enter="doneEdit(todo)", @keyup.esc="cancelEdit(todo)")
    todo-footer
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'nuxt-class-component'
  import {Getter, Action} from 'vuex-class'
  import {Watch} from 'vue-property-decorator'
  import {Route} from 'vue-router'

  import TodoHeader from '~/components/header'
  import TodoFooter from '~/components/footer'
  import {Todo} from "../store/todos/types";

  interface WithRoute
  {
    $route:Route
  }

  const namespace:string = 'todos';

  @Component<any>({
    components: {
      TodoHeader,
      TodoFooter
    },
    validate({params})
    {
      return !params['slug'] || params['slug'] === "active" || params['slug'] === "completed"
    },
    head()
    {
      return {
        title:         this.$route.params['slug'] || "all", // slugがあれば%s(string)で返し、なければallを返す
        titleTemplate: "Nuxt TodoMVC : %s todos"
      }
    },
    directives: {
      "todo-focus"(el, binding)
      {
        if (binding.value)
        {
          el.focus()
        }
      }
    }
  })

  export default class Slug extends Vue implements WithRoute
  {
    @Getter('activeTodos', {namespace}) getterActiveTodos;
    @Getter('completedTodos', {namespace}) getterCompletedTodos;
    @Getter('allTodos', {namespace}) getterAllTodos;

    @Action('saveTodos', {namespace}) actionSaveTodos;
    @Action('allDone', {namespace}) actionAllDone;
    @Action('removeTodo', {namespace}) actionRemoveTodo;

    @Watch('todos', {deep: true})
    save()
    {
      this.actionSaveTodos("saveTodos")
    }

    // initial data
    name:string = 'slug';
    editedTodo:any = null;
    beforeEditCache:any = null;

    // computed
    get todos():Array<Todo>
    {
      if (this.$route.params['slug'] === "active")
      {
        console.log("active"); // eslint-disable-line no-console
        return this.getterActiveTodos
      }
      if (this.$route.params['slug'] === "completed")
      {
        console.log("completed"); // eslint-disable-line no-console
        return this.getterCompletedTodos
      }
      console.log('all');
      return this.getterAllTodos
    }

    // methods
    allDone():void
    {
      this.actionAllDone("allDone")
    }

    editTodo(todo):void
    {

      this.beforeEditCache = todo.title
      this.editedTodo = todo
    }

    doneEdit(todo):void
    {
      this.editedTodo = null;
      todo.title = todo.title.trim();
      if (!todo.title)
        this.actionRemoveTodo(todo)
    }

    cancelEdit(todo):void
    {
      this.editedTodo = null;
      todo.title = this.beforeEditCache
    }

    removeTodo(todo):void
    {
      this.actionRemoveTodo(todo)
    }
  }

  /*
  export default {
    name: "slug",
    validate({params}) {
      return !params.slug || params.slug === "active" || params.slug === "completed"
    },
    head() {
      return {
        title: this.$route.params.slug || "all", // slugがあれば%s(string)で返し、なければallを返す
        titleTemplate: "Nuxt TodoMVC : %s todos"
      }
    },
    data() {
      return {
        editedTodo: null
      }
    },
    watch: {
      // todosの状態を監視する
      todos: {
        deep: true,
        handler: "save" // 変化が合った時にmethodのsaveを叩く
      }
    },
    computed: {
      todos() {
        //return [{title:'unko', completed:false}]
        if (this.$route.params.slug === "active") {
          console.log("active") // eslint-disable-line no-console
          return [{title:'unko', completed:false}]
          //return this.$store.getters.activeTodos
        }
        if (this.$route.params.slug === "completed") {
          console.log("completed") // eslint-disable-line no-console
          return [{title:'unko', completed:false}]
          //return this.$store.getters.completedTodos
        }
        console.log('all')
        return [{title:'unko', completed:false}]
        //return this.$store.getters.allTodos
      }
    },
    components: {
      TodoHeader,
      TodoFooter
    },
    methods: {
      allDone() {
        this.$store.dispatch("allDone")
      },
      editTodo(todo) {
        this.beforeEditCache = todo.title
        this.editedTodo = todo
      },
      doneEdit(todo) {
        this.editedTodo = null
        todo.title = todo.title.trim()
        if (!todo.title) {
          this.$store.dispatch("removeTodo", todo)
        }
      },
      cancelEdit(todo) {
        this.editedTodo = null
        todo.title = this.beforeEditCache
      },
      removeTodo(todo) {
        this.$store.dispatch("removeTodo", todo)
      },
      save() {
        this.$store.dispatch("saveTodos")
      }
    },
    directives: {
      "todo-focus"(el, binding) {
        if (binding.value) {
          el.focus()
        }
      }
    }
  }
  */
</script>

<style scoped>

</style>
