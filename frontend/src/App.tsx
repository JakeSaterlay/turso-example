import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/data")
      .then((response) => response.json())
      .then((data) => setData(data.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <div className="App">
      <h1>Turso Database Data</h1>
      <ul>
        {data.map((user: any) => (
          <li>{user.first_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
