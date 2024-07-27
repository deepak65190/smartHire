import { ADD_Todo, EDIT_Todo, DELETE_Todo } from "./action";

const addTodo = (payload) => {
  return {
    type: ADD_Todo,
    payload,
  };
};
const editTodo = ({ id, title ,content }) => {
  return {
    type: EDIT_Todo,
    payload: { id, title ,content },
  };
};
const deleteTodo = (id) => {
  return {
    type: DELETE_Todo,
    payload: id,
  };
};

export { addTodo, editTodo, deleteTodo };
