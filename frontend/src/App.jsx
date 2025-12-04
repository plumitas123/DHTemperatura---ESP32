import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:3000/dht/ultimo");
      setData(res.data);
    };

    fetchData();

    const interval = setInterval(fetchData, 2000); // actualiza cada 2s
    return () => clearInterval(interval);
  }, []);

  if (!data) return <p>Cargando...</p>;

  return (
    <div className="app">
      <h1>Última medición</h1>
      <div className="data">
        <section className="card">
          <p className="dht">Temperatura: {data.temperatura} °C</p>
        </section>
        <section className="card">
          <p className="dht">Humedad: {data.humedad} %</p>
        </section>
        <section className="card">
          <p className="dht">Hora: {new Date(data.timestamp).toLocaleString()}</p>
        </section>
      </div>
    </div>
  );
}