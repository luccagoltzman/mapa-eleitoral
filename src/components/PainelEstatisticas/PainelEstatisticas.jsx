import './PainelEstatisticas.scss'

function PainelEstatisticas({ regiaoSelecionada }) {
  const estatisticasGerais = {
    totalVotos: 9280,
    totalRegioes: 5,
    mediaPercentual: 52.1,
  }

  return (
    <div className="painel-estatisticas">
      <div className="painel-estatisticas__header">
        <h2>Estatísticas</h2>
      </div>

      {regiaoSelecionada ? (
        <div className="painel-estatisticas__detalhes">
          <h3 className="painel-estatisticas__titulo-regiao">
            {regiaoSelecionada.nome}
          </h3>
          
          <div className="painel-estatisticas__metricas">
            <div className="painel-estatisticas__metrica">
              <span className="painel-estatisticas__metrica-label">Total de Votos</span>
              <span className="painel-estatisticas__metrica-valor">
                {regiaoSelecionada.votos.toLocaleString('pt-BR')}
              </span>
            </div>

            <div className="painel-estatisticas__metrica">
              <span className="painel-estatisticas__metrica-label">Percentual</span>
              <span className="painel-estatisticas__metrica-valor">
                {regiaoSelecionada.percentual}%
              </span>
            </div>
          </div>

          <div className="painel-estatisticas__barra-progresso">
            <div 
              className="painel-estatisticas__barra-progresso-fill"
              style={{ 
                width: `${regiaoSelecionada.percentual}%`,
                backgroundColor: regiaoSelecionada.cor,
              }}
            />
          </div>
        </div>
      ) : (
        <div className="painel-estatisticas__geral">
          <p className="painel-estatisticas__instrucao">
            Selecione uma região no mapa para ver os detalhes
          </p>

          <div className="painel-estatisticas__resumo">
            <div className="painel-estatisticas__metrica">
              <span className="painel-estatisticas__metrica-label">Total de Votos</span>
              <span className="painel-estatisticas__metrica-valor">
                {estatisticasGerais.totalVotos.toLocaleString('pt-BR')}
              </span>
            </div>

            <div className="painel-estatisticas__metrica">
              <span className="painel-estatisticas__metrica-label">Regiões</span>
              <span className="painel-estatisticas__metrica-valor">
                {estatisticasGerais.totalRegioes}
              </span>
            </div>

            <div className="painel-estatisticas__metrica">
              <span className="painel-estatisticas__metrica-label">Média Percentual</span>
              <span className="painel-estatisticas__metrica-valor">
                {estatisticasGerais.mediaPercentual}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PainelEstatisticas

