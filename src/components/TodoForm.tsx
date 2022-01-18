import React, { useState } from "react";
import styled from "styled-components";
import { useTodosDispatch } from "../contexts/TodosContext";

const FromWrap = styled.form`
  width: 40vw;
  margin: 0 auto;
  border-bottom: 1.5px dashed #c4c4c4;
  padding: 2rem;
  padding-top: 80px;
  display: flex;
  justify-content: center;
`;

const CreateTodo = styled.input`
  margin-right: 15px;
  padding: 13px 30px;
  border-radius: 15px;
  border: 1.3px solid #c4c4c492;
  &:focus {
    outline: none;
  }
`;

const CreateBtn = styled.button`
  border: none;
  border-radius: 5px;
  padding: 0px 13px;
  cursor: pointer;
  &:hover {
    filter: brightness(90%);
  }
`;

export const TodoForm = () => {
  const [todo, setTodo] = useState<string>("");
  const dispatch = useTodosDispatch();

  const onChange = (e: any) => {
    setTodo(e.target.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({
      type: "CREATE",
      text: todo,
    });
    setTodo("");
  };

  return (
    <div>
      <FromWrap onSubmit={onSubmit}>
        <CreateTodo
          value={todo}
          placeholder="오늘의 할 일"
          onChange={onChange}
        />
        <CreateBtn>등록</CreateBtn>
      </FromWrap>
    </div>
  );
};
