import { useState } from "react";
import "./App.css";

function App() {
  const [orderClick, setOrderClick] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  const arrayLights = config.flat();

  function deactivateLights() {
    setIsDeactivating(true);

    const interval = setInterval(() => {
      setOrderClick((prev) => {
        const updated = [...prev];
        updated.pop();
        if (updated.length === 0) {
          clearInterval(interval);
          setIsDeactivating(false);
        }
        return updated;
      });
    }, 300);
  }

  function handleClick(index) {
    const newOrder = [...orderClick, index];
    setOrderClick(newOrder);
    if (newOrder.length === arrayLights.filter(Boolean).length) {
      deactivateLights();
    }
  }
  const isActivated = (index) =>
    orderClick.includes(index) ? "bg-green-400" : "";

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="grid grid-cols-3 w-[400px] mx-auto h-[400px] ">
        {arrayLights.map((el, index) => (
          <button
            className={`flex items-center justify-center p-4 ${
              el === 1 ? "border" : ""
            } m-4 ${isActivated(index)}`}
            key={index}
            onClick={() => handleClick(index)}
            disabled={isActivated(index) || isDeactivating}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default App;
