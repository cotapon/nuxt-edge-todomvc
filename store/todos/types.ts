export interface Todo {
  title:string
  completed:boolean
}

export interface TodosState {
  todos:Array<Todo>
}
