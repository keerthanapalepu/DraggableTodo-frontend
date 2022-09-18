import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { deleteTodos } from "../actions/todos";
import { useDispatch } from "react-redux";

function Card({ todo, provided, deleteTodo }) {
  const dispatch = useDispatch();
  const { title, description, _id, status } = todo;
  const handleDelete = (id, status) => {
    dispatch(deleteTodos(id, status));
  };
  return (
    <div
      className="w-[100%] p-3 flex flex-col gap-2 bg-white rounded-md"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onClick={() => {}}
    >
      <h1 className="font-medium">{title}</h1>
      <p className="text-[12px] leading-4 font-light text-[ #6B6B6B] mb-2">
        {description}
      </p>
      <div className="flex justify-between items-center">
        <img src="/assets/avatar.png" alt="profile" className="w-6 h-6" />
        <div
          className="border-[#6B6B6B] border-l px-1"
          onClick={() => {
            handleDelete(_id, status);
            deleteTodo(_id);
          }}
        >
          <AiOutlineDelete size={16} color={"#6B6B6B"} />
        </div>
      </div>
    </div>
  );
}

export default Card;
