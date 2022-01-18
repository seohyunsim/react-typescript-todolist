import React from "react";
import styled from "styled-components";
import { Todo, useTodosDispatch } from "../contexts/TodosContext";

export type TodoItemProps = {
  todo: Todo;
};

const ItemWrap = styled.div`
  box-shadow: 0px 0px 5px 0px #c4c4c492;
  width: 41vw;
  margin: 0 auto;
  margin-top: 15px;
  display: flex;
  justify-content: space-around;
  padding: 1.5rem;
  border-bottom: 0.5px solid #c4c4c492;
  border-radius: 4px;
`;

const TodoWrap = styled.div`
  min-width: 100px;
`;

const TodoNum = styled.span`
  font-size: 13px;
`;

const DeleteBtn = styled.button`
  border: none;
  background-color: rgba(211, 47, 47, 0.076);
  padding: 4px 9px;
  font-size: 13px;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: #d32f2f40;
  }
`;

export const TodoItem = ({ todo }: TodoItemProps) => {
  const dispatch = useTodosDispatch();

  const onClick = () => {
    dispatch({
      type: "REMOVE",
      id: todo.id,
    });
  };
  return (
    <ItemWrap>
      <TodoWrap>
        <TodoNum>{todo.id}</TodoNum>
      </TodoWrap>
      <TodoWrap>
        <span>{todo.text}</span>
      </TodoWrap>
      <TodoWrap>
        <DeleteBtn onClick={onClick}>삭제</DeleteBtn>
      </TodoWrap>
    </ItemWrap>
  );
};
