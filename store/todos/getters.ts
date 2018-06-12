import {GetterTree} from "vuex";
import {TodosState} from "~/store/todos/types";
import {RootState} from "~/store/types";

export const getters:GetterTree<TodosState, RootState> = {
  allTodos(state) {
    return state.todos;
  },
  activeTodos(state) {
    console.log('#activeTodos');
    return state.todos.filter(todo => !todo.completed);
  },
  completedTodos(state) {
    return state.todos.filter(todo => todo.completed);
  }
};



/*
export default {
  allTodos(state, getters) {
    return state.todos;
  },
  activeTodos(state) {
    return state.todos.filter(todo => !todo.completed);
  },
  completedTodos(state) {
    return state.todos.filter(todo => todo.completed);
  },
  me(state, getters) {
    return state.me
  }
}
*/
