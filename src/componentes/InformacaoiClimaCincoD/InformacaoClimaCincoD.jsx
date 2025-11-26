import "./InformacaoClimaCincoD.css";

function InformacaoClimaCincoD({ climaCincoD }) {
  if (!climaCincoD || !climaCincoD.list) {
    return (
      <div className="climaContainer">
        Nenhuma previsão de 5 dias disponível.
      </div>
    );
  }

  const previsoesAgrupadas = climaCincoD.list.reduce((acc, previsao) => {
    const dataKey = new Date(previsao.dt * 1000).toISOString().split("T")[0];
    if (!acc[dataKey]) {
      acc[dataKey] = [];
    }
    acc[dataKey].push(previsao);
    return acc;
  }, {});

  const previsoesDiarias = Object.keys(previsoesAgrupadas).map((dataKey) => {
    const diaData = previsoesAgrupadas[dataKey];

    let previsaoMeioDia =
      diaData.find(
        (p) =>
          new Date(p.dt * 1000).getHours() >= 11 &&
          new Date(p.dt * 1000).getHours() <= 15
      ) ||
      diaData[Math.floor(diaData.length / 2)] ||
      diaData[0];

    const minTemp = Math.min(...diaData.map((p) => p.main.temp_min));
    const maxTemp = Math.max(...diaData.map((p) => p.main.temp_max));

    return {
      dt: previsaoMeioDia.dt,
      data: new Date(previsaoMeioDia.dt * 1000),
      min: minTemp,
      max: maxTemp,
      icon: previsaoMeioDia.weather?.[0]?.icon,
      description: previsaoMeioDia.weather?.[0]?.description,
    };
  });

  const proximosCincoDias = previsoesDiarias.slice(1, 6);

  const formatarDiaSemana = (data) => {
    const opcoes = { weekday: "short" };
    return data.toLocaleDateString("pt-BR", opcoes);
  };

  return (
    <div className="climaContainer cincoDias">
      <h3 className="tituloPrevisao">Próximos 5 Dias</h3>

      <div className="previsaoDiariaGrid">
        {proximosCincoDias.map((forecast) => (
          <div key={forecast.dt} className="diaPrevisaoCard">
            <p className="diaSemana">{formatarDiaSemana(forecast.data)}</p>

            <img
              src={`http://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
              alt="ícone do clima"
              className="iconeClima"
            />

            <p className="descricaoClima">{forecast.description}</p>

            <p className="minMaxTemp">
              <span className="max">{Math.round(forecast.max)}ºC</span> /
              <span className="min">{Math.round(forecast.min)}ºC</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InformacaoClimaCincoD;
