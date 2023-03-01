import "./App.css";
import { useState, useEffect } from "react";
import Text from "./Text";
import ToDoList from "./ToDoList";

interface toDoItem {
  text: string;
  done: boolean;
}

const App: React.FC = () => {
  const [toDoList, setToDoList] = useState<toDoItem[]>([]);

  useEffect(() => {
    const localToDos = localStorage.getItem("toDos");
    const result = localToDos ? JSON.parse(localToDos) : [];
    setToDoList(result);
  }, []);

  const onDelete = (i: number) => {
    const newToDoList = toDoList.filter((item, index) => {
      return index !== i;
    });
    setToDoList(newToDoList);
    localStorage.setItem("toDos", JSON.stringify(newToDoList));
  };

  const onDone = (i: number) => {
    const doneToTrue = toDoList.map((item, index) => {
      if (index === i) {
        item.done = true;
      }
      return item;
    });

    setToDoList(doneToTrue);
    localStorage.setItem("toDos", JSON.stringify(doneToTrue));
  };

  const onNewToDo = (toDo: toDoItem) => {
    setToDoList((previousToDos: toDoItem[]) => {
      const newToDos = [toDo, ...previousToDos];
      localStorage.setItem("toDos", JSON.stringify(newToDos));
      return newToDos;
    });
  };

  return (
    <div>
      <Text onNewToDo={onNewToDo} />
      <ToDoList onDone={onDone} onDelete={onDelete} toDoList={toDoList} />
    </div>
  );
};

export default App;
