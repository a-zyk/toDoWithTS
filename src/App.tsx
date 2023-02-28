import "./App.css";
import { useState, useEffect } from "react";
import Text from "./Text";

const deleteIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
    />
  </svg>
);

const doneIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const App: React.FC = () => {
  const [toDoList, setToDoList] = useState<{ text: string; done: boolean }[]>(
    []
  );

  useEffect(() => {
    const localToDos = localStorage.getItem("toDos");
    const result = localToDos ? JSON.parse(localToDos) : undefined;
    setToDoList(result);
  }, []);

  const onDelete = (i: number) => {
    const newToDoList = toDoList.filter((item, index) => {
      return index !== i;
    });
    setToDoList(newToDoList);
  };

  const onDone = (i: number) => {
    const doneToTrue = toDoList.map((item, index) => {
      if (index === i) {
        item.done = true;
      }
      return item;
    });
    setToDoList(doneToTrue);
  };

  return (
    <div>
      <Text setToDoList={setToDoList} />
      <div>
        {toDoList.map((item, i) => (
          <div
            className="flex items-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
            key={i}
          >
            <span>{item.text}</span>
            <div className="flex flex-grow"></div>
            <div>{item.done ? "y" : "n"}</div>
            <button onClick={() => onDone(i)}>{doneIcon}</button>
            <button onClick={() => onDelete(i)}>{deleteIcon}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
