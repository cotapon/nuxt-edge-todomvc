<template lang="pug">
  footer.footer(v-if="todos.length")
    span.todo-count
      strong {{ remaining }}
      | item
      span(v-if="remaining > 1")
      | left
    ul.filters
      li
        nuxt-link(to="/", exact="") All
      li
        nuxt-link(to="/active") Active
      li
        nuxt-link(to="/completed") Completed
    button.clear-completed(@click="removeCompleted", v-if="todos.length > remaining")
      | Clear completed

</template>


<script lang="ts">
  import Vue from 'vue'
  import Component from 'nuxt-class-component'
  import {Getter, Action} from 'vuex-class'

  const namespace:string = 'todos';

  @Component
  export default class Footer extends Vue
  {
    @Getter('allTodos', {namespace}) readonly getAllTodos;
    @Getter('activeTodos', {namespace}) readonly getActiveTodos;

    @Action('setTodos', {namespace}) actionSetTodos;

    // computed
    get todos()
    {
      return this.getAllTodos
    }

    get actives()
    {
      return this.getActiveTodos
    }

    get remaining()
    {
      return this.getActiveTodos.length
    }

    // methods
    removeCompleted() {
      this.actionSetTodos(this.actives)
    }
  }

  /*
  export default {
    computed: {
      todos() {
        return this.$store.getters.allTodos
      },
      actives() {
        return this.$store.getters.activeTodos
      },
      remaining() {
        return this.$store.getters.activeTodos.length
      }
    },
    methods: {
      removeCompleted() {
        this.$store.dispatch("setTodos", this.actives)
      }
    }
  }
  */
</script>

<style scoped>

</style>
