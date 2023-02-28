import { useState } from "react";

const TextInput: React.FC<{ setToDoList: any }> = ({ setToDoList }) => {
  const [toDoText, setToDoText] = useState<string>("");
  const handleToDoSubmit = () => {
    if (!toDoText.length) return;
    const toDo = {
      text: toDoText,
      done: false,
    };
    setToDoList((previousToDos: { text: string; done: boolean}[]) => {
      const newToDos = [toDo, ...previousToDos];
      localStorage.setItem("toDos", JSON.stringify(newToDos))
      return newToDos
    });
    setToDoText("");
  };

  return (
    <div className="flex gap-3 items-center justify-center mt-5">
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/5 p-2.5 "
        value={toDoText}
        onChange={(e) => setToDoText(e.target.value)}
        type="text"
      ></input>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 "
        onClick={handleToDoSubmit}
      >
        Add
      </button>
    </div>
  );
};

export default TextInput;
