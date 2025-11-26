import "./InformacaoClima.css";

function InformacaoClima({ clima }) {
  const formatarHora = (ts) => {
    if (!ts) return "--:--";

    const offset = clima?.timezone ? clima.timezone * 1000 : 0;
    const dataLocal = new Date(ts * 1000 + offset).toUTCString();

    return new Date(dataLocal).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const Detalhe = ({ label, valor }) => (
    <p>
      <span className="label">{label}:</span>{" "}
      <span className="valor">{valor}</span>
    </p>
  );

  return (
    <div className="climaContainer">
      <h2>{clima?.name || "Localização Desconhecida"}</h2>

      <div className="climaInfo">
        <img
          src={`http://openweathermap.org/img/wn/${clima?.weather?.[0]?.icon}@2x.png`}
          alt="ícone do clima"
        />
        <p className="temperatura">
          {Math.round(clima?.main?.temp) || "--"} ºC
        </p>
      </div>

      <p className="descricao">
        {clima?.weather?.[0]?.description || "Condição indisponível"}
      </p>

      <div className="climaDetalhes">
        <Detalhe
          label="Sensação térmica"
          valor={`${Math.round(clima?.main?.feels_like) || "--"} ºC`}
        />

        <Detalhe
          label="Visibilidade"
          valor={`${(clima?.visibility / 1000).toFixed(1) || "--"} km`}
        />

        <Detalhe label="Umidade" valor={`${clima?.main?.humidity || "--"}%`} />

        <Detalhe label="Vento" valor={`${clima?.wind?.speed || "--"} m/s`} />

        <Detalhe
          label="Pressão"
          valor={`${clima?.main?.pressure || "--"} hPa`}
        />

        <Detalhe
          label="Nascer do sol"
          valor={formatarHora(clima?.sys?.sunrise)}
        />

        <p
          className="minMax"
          style={{
            gridColumn: "1 / span 2",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          MÁX:{" "}
          <span className="valor">
            {Math.round(clima?.main?.temp_max) || "--"} ºC
          </span>{" "}
          | MÍN:{" "}
          <span className="valor">
            {Math.round(clima?.main?.temp_min) || "--"} ºC
          </span>
        </p>

        <Detalhe label="Pôr do sol" valor={formatarHora(clima?.sys?.sunset)} />
      </div>
    </div>
  );
}

export default InformacaoClima;
