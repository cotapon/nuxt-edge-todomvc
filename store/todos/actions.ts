import axios from 'axios'
import {TodosState} from "~/store/todos/types"
import {RootState} from "~/store/types"
import {ActionTree} from "vuex"

export const actions:ActionTree<TodosState, RootState> = {
  addTodo({commit}, todo) {
    console.log('ADD_TODO', todo);
    commit('ADD_TODO', todo);
  },
  setTodos({commit}, todos) {
    console.log('SET_TODO');
    commit('SET_TODOS', todos);
  },
  removeTodo({commit}, todo) {
    console.log('REMOVE_TODO');
    commit('REMOVE_TODO', todo);
  },
  allDone({state, commit}) {
    console.log('ALL_DONE FILTER_TODOS');
    let value = state.todos.filter(todo => todo.completed).length === state.todos.length;
    commit('FILTER_TODOS', value);
  },
  saveTodos({state}) {
    console.log('saveTodos:actions.ts', state);
    axios.put('/api/todos', {todos: state.todos});
  }
};

/*
export default {
  addTodo({commit}, todo) {
    commit('ADD_TODO', todo);
  },
  setTodos({commit}, todos) {
    commit('SET_TODOS', todos);
  },
  removeTodo({commit}, todo) {
    commit('REMOVE_TODO', todo);
  },
  allDone({state, commit}) {
    let value = state.todos.filter(todo => todo.completed).length === state.todos.length;
    commit('FILTER_TODOS', value);
  },
  saveTodos({state}) {
    axios.put('/api/todos', {todos: state.todos});
  },
  nuxtServerInit({commit}, {req}) {
    // 最初にサーバーサイドでセッションを取得する
    console.log('# session'); // eslint-disable-line no-console
    console.log(req.session); // eslint-disable-line no-console
    commit('SET_TODOS', req.session ? (req.session.todos) || [] : []);
  }
}
*/
