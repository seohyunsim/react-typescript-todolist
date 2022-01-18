import React, { createContext, Dispatch, useContext, useReducer } from "react";

//상태전용 context 만들기
export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

type TodosState = Todo[];

const TodosStateContext = createContext<TodosState | undefined>(undefined);

//Action을 위한 타입 선언하기
type Action =
  | { type: "CREATE"; text: string }
  | { type: "TOGGLE"; id: number }
  | { type: "REMOVE"; id: number };

type TodosDispatch = Dispatch<Action>;
const TodosDispatchContext = createContext<TodosDispatch | undefined>(
  undefined
);

//리듀서 작성하기
function todosReducer(state: TodosState, action: Action): TodosState {
  switch (action.type) {
    case "CREATE":
      const nextId = Math.max(0, ...state.map((todo) => todo.id)) + 1;
      return state.concat({
        id: nextId,
        text: action.text,
        done: false,
      });
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case "REMOVE":
      return state.filter((todo) => todo.id !== action.id);
    default:
      throw new Error("Unhandled action");
  }
}

//TodosProvider 만들기
export function TodosContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [todos, dispatch] = useReducer(todosReducer, [
    {
      id: 1,
      text: "hello",
      done: false,
    },
    {
      id: 2,
      text: "i'm",
      done: false,
    },
    {
      id: 3,
      text: "simseohyun",
      done: true,
    },
  ]);

  return (
    <TodosDispatchContext.Provider value={dispatch}>
      <TodosStateContext.Provider value={todos}>
        {children}
      </TodosStateContext.Provider>
    </TodosDispatchContext.Provider>
  );
}

//커스텀 Hooks 작성
export const useTodosState = () => {
  const state = useContext(TodosStateContext);
  if (!state) throw new Error("TodosProvider not found");
  return state;
};

export const useTodosDispatch = () => {
  const dispatch = useContext(TodosDispatchContext);
  if (!dispatch) throw new Error("TodosProvider not found");
  return dispatch;
};
