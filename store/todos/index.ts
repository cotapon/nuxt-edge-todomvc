import {TodosState} from './types'
import {RootState} from "~/store/types"
import {Module} from "vuex"
import {getters} from "~/store/todos/getters"
import {actions} from "~/store/todos/actions"
import {mutations} from "~/store/todos/mutations"

export const state:TodosState = {
  todos: []
};

const namespaced:boolean = true;

export const todos:Module<TodosState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
}
