<template lang="pug">
  header.header
    h1 todos
    input.new-todo(placeholder="What needs to be done?", autofocus="", v-model="todo", @keyup.enter="addTodo")

</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'nuxt-class-component'
  import {Action} from 'vuex-class'
  import {Route} from 'vue-router';

  interface WithRoute
  {
    $route:Route
  }

  const namespace:string = 'todos';

  @Component
  export default class Header extends Vue implements WithRoute
  {
    @Action('addTodo', {namespace}) actionAddTodo;

    // initial data
    todo:string = '';

    // methods
    addTodo():void
    {
      let value:string = this.todo && this.todo.trim();
      if (value)
      {
        this.actionAddTodo({title: value, completed: this.$route.params['slug'] === "completed"});
        this.todo = ""
      }
    }
  }

  /*
  export default {
    data() {
      return {todo: ""}
    },
    methods: {
      addTodo() {
        var value = this.todo && this.todo.trim()
        if (value) {
          this.$store.dispatch("addTodo", {title: value, completed: this.$route.params.slug === "completed"})
          this.todo = ""
        }
      }
    }
  }*/

</script>
