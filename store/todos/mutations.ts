import {MutationTree} from "vuex";
import {TodosState} from "~/store/todos/types";

export const mutations:MutationTree<TodosState> = {
  SET_TODOS(state, todos) {
    state.todos = todos;
  },
  ADD_TODO(state, todo) {
    state.todos.push(todo);
  },
  REMOVE_TODO(state, todo) {
    let i = state.todos.indexOf(todo);
    state.todos.splice(i, 1);
  },
  FILTER_TODOS(state, value) {
    state.todos.forEach((todo) => {
      todo.completed = !value;
    });
  }
}

/*
export default {
  SET_TODOS(state, todos) {
    state.todos = todos;
  },
  ADD_TODO(state, todo) {
    state.todos.push(todo);
  },
  REMOVE_TODO(state, todo) {
    let i = state.todos.indexOf(todo);
    state.todos.splice(i, 1);
  },
  FILTER_TODOS(state, value) {
    state.todos.forEach((todo) => {
      todo.completed = !value;
    });
  }
}
*/
