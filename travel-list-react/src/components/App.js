import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import Stats from "./Stats";
import PackingList from "./PackingList";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 4, packed: false },
  { id: 3, description: "Charger", quantity: 2, packed: false },
];

export default function App() {
  const [items, setItems] = useState([...initialItems]); // closest parent of both form and packinglist

  function handleAddItems(item) {
    // new state depends on current state, need a callback function
    // react cannot directly mutate the state, but create a new array
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : { ...item }
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm("Delete all items 👀?");
    if (confirmed) setItems((items) => []);
  }

  return (
    <div className="app">
      <Logo />
      {/* pass function as the prop */}
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
