import React, { useEffect, useState } from "react";
import Card from "./Card";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { AiOutlinePlus } from "react-icons/ai";
import { createTodos } from "../actions/todos";
import { useDispatch, useSelector } from "react-redux";

function DragColumns({ todos, title, id, name, themeColor }) {
  const todos1 = useSelector((state) => state.todos[id]);

  const dispatch = useDispatch();
  const [add, setAdd] = useState(false);
  const [finalTodo, setFinalTodo] = useState(todos);
  const [value, setValue] = useState({
    creator: name,
    title: "",
    description: "",
    status: id,
  });
  useEffect(() => {
    if (todos1) {
      setFinalTodo(todos1);
    }
  }, [todos1]);

  const deleteTodo = (id) => {
    setFinalTodo((prev) => prev.filter((todo) => todo._id !== id));
  };
  const handleSubmit = () => {
    if (!add) {
      setAdd(true);
      return;
    }
    if (value.title === "" || value.description === "") return;
    console.log(value);
    dispatch(createTodos(value)).then(() => setFinalTodo((prev) => [...prev]));

    setValue({
      creator: name,
      title: "",
      description: "",
      status: id,
    });
    setAdd(false);
  };

  const handleChange = (e) => {
    setValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div
      style={{ background: `${themeColor}` }}
      className={`w-[300px]  min-h-[450px] rounded-md shadow-md p-4 text-sm flex flex-col gap-4`}
    >
      <div className="flex justify-between ">
        <span className="font-medium">{title}</span>
        <div className="h-7 w-7 rounded-full bg-[#ECF3F3] p-1 text-center text-green-500">
          {finalTodo.length}
        </div>
      </div>
      <button
        className="w-[100%] p-2 grid place-content-center bg-[#ECF3F3]  text-green-500 rounded"
        onClick={handleSubmit}
      >
        {add ? "Add Task" : <AiOutlinePlus size={20} />}
      </button>
      {add && (
        <form className="w-[100%] p-3 flex flex-col gap-1 bg-white rounded-md">
          <input
            type="text"
            name="title"
            className="w-[100%] text-base placeholder:text-[#A4ABB3 p-2 outline-none"
            placeholder="Give your task a title"
            value={value.title}
            onChange={handleChange}
          />
          <textarea
            type="text"
            name="description"
            className="w-[100%] text-[12px] min-h-[70px] leading-4 font-light text-[ #6B6B6B] placeholder:text-[#A4ABB3 p-2 outline-none"
            placeholder="Description..."
            value={value.description}
            onChange={handleChange}
          />
          <img src="./assets/1.png" alt="avatar" className="h-5 w-5" />
        </form>
      )}
      <Droppable droppableId={`${id}`}>
        {(provided) => (
          <div
            className="flex flex-col gap-7"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {finalTodo.map((todo, index) => {
              return (
                <Draggable
                  draggableId={`${todo._id}`}
                  key={todo._id}
                  index={index}
                >
                  {(provided) => (
                    <Card
                      todo={todo}
                      provided={provided}
                      deleteTodo={deleteTodo}
                    />
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default DragColumns;
