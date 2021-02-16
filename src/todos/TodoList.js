import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { todoListState } from "../recoil/todo";
import { uid } from "react-uid";

const TodoList = () => {
    const todoList = useRecoilValue(todoListState);
    const setTodoList = useSetRecoilState(todoListState);

    const handleComplete = (id) => {
        setTodoList((oldTodoList) => {
            return oldTodoList.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        isCompleted: true
                    };
                }

                return item;
            });
        });
    };

    const handleDelete = (id) => {
        setTodoList((oldTodoList) => {
            return oldTodoList.filter((item) => item.id !== id);
        });
    };

    return (
        <>
          <TodoForm />
          <ul>
            {todoList.map((item) => {
              return (
                <li key={item.id}>
                  <span
                    style={{
                      textDecoration: item.isCompleted ? "line-through" : "unset"
                    }}
                  >
                    {item.text}{" "}
                  </span>
                  {!item.isCompleted ? (
                    <button onClick={() => handleComplete(item.id)}>Done</button>
                  ) : null}
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </li>
              );
            })}
          </ul>
        </>
      );
    }
    
    function TodoForm() {
      const [inputValue, setInputValue] = useState("");
      const setTodoList = useSetRecoilState(todoListState);
    
      const addItem = () => {
        setTodoList((oldTodoList) => [
          ...oldTodoList,
          {
            id: uid(`${inputValue}-${oldTodoList.length}`),
            text: inputValue,
            isCompleted: false
          }
        ]);
    
        return setInputValue("");
      };
      return (
        <>
          <input
            id="todo-field"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={addItem}>할일추가</button>
        </>
      );
}


export default TodoList;