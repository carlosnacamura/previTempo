import { useRef, useState } from "react";
import axios from "axios";
import "./App.css";
import InformacaoClima from "./componentes/InformacaoiClima/InformacaoClima";
import InformacaoClimaCincoD from "./componentes/InformacaoiClimaCincoD/InformacaoClimaCincoD";

function App() {
  const [clima, setClima] = useState();
  const [climaCincoD, setClimaCincoD] = useState();
  const inputRef = useRef();

  async function buscarCidade() {
    const cidade = inputRef.current.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chaveWeather}&lang=pt_br&units=metric`;
    const urlCincoD = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${chaveWeather}&lang=pt_br&units=metric`;

    try {
      const dataAxios = await axios.get(url);
      const dataAxiosCincoD = await axios.get(urlCincoD);
      setClima(dataAxios.data);
      setClimaCincoD(dataAxiosCincoD.data);
    } catch (error) {
      console.error("Erro ao buscar dados do clima:", error);
      alert("Não foi possível encontrar a cidade. Tente novamente.");
    }
  }

  return (
    <div className="container">
      <h1>PreviTempo</h1>

      {/* NOVIDADE: Adicionado o wrapper input-group para layout flex no CSS */}
      <div className="input-group">
        <input ref={inputRef} type="text" placeholder="Buscar cidade" />
        <button onClick={buscarCidade}>Buscar</button>
      </div>

      {clima && <InformacaoClima clima={clima} />}
      {climaCincoD && <InformacaoClimaCincoD climaCincoD={climaCincoD} />}
    </div>
  );
}

export default App;
