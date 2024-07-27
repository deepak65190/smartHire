import { ADD_Todo, EDIT_Todo, DELETE_Todo } from "./action";

// Initial state
const initialTodo = {
  todo: JSON.parse(localStorage.getItem("todo")) || [],
};

const TodoReducer = (state = initialTodo, action) => {
  switch (action.type) {
    case ADD_Todo: {
      const newTodo = [
        ...state.todo,
        {
          ...action.payload,
          timeStamp: {
            created: new Date().toLocaleTimeString(),
            updated: new Date().toLocaleTimeString(),
          },
        },
      ];

      localStorage.setItem("todo", JSON.stringify(newTodo));
      return { ...state, todo: newTodo };
    }
    
    case EDIT_Todo: {
      const newTodo = state.todo.map((el) =>
        el.id === action.payload.id
          ? {
              ...el,
              title: action.payload.title,
              content: action.payload.content,
              timeStamp: {
                ...el.timeStamp,
                updated: new Date().toLocaleTimeString(),
              },
            }
          : el
      );
      localStorage.setItem("todo", JSON.stringify(newTodo));

      return { ...state, todo: newTodo };
    }
    
    case DELETE_Todo: {
      const newTodo = state.todo.filter((el) => el.id !== action.payload);
      localStorage.setItem("todo", JSON.stringify(newTodo));
      return { ...state, todo: newTodo };
    }

    default: {
      return state;
    }
  }
};

export default TodoReducer;
