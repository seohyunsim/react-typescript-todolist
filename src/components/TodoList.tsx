import React from "react";
import styled from "styled-components";
import { useTodosState } from "../contexts/TodosContext";
import { TodoItem } from "./TodoItem";

const ListWrap = styled.div`
  padding: 1rem;
`;

const CreateComment = styled.span`
  color: gray;
`;

export const TodoList = () => {
  const todos = useTodosState();
  return (
    <ListWrap>
      {todos.length === 0 ? (
        <CreateComment>할 일을 등록하세요.</CreateComment>
      ) : (
        todos.map((todo) => <TodoItem todo={todo} key={todo.id} />)
      )}
    </ListWrap>
  );
};
