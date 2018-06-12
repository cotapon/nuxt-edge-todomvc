import {ActionTree, Getter, ModuleTree, MutationTree} from "vuex";

export interface Module<S, R> {
  namespaced?: boolean;
  state?: S | (() => S);
  getters?: GetterTree<S, R>;
  actions?: ActionTree<S, R>;
  mutations?: MutationTree<S>;
  modules?: ModuleTree<R>;
}

export interface GetterTree<S, R> {
  [key: string]: Getter<S, R>;
}
