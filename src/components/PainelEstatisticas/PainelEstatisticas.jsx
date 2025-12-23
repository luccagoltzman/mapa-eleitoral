import './PainelEstatisticas.scss'

function PainelEstatisticas({ regiaoSelecionada }) {
  // Calcular estatísticas gerais (seria ideal vir de uma API ou contexto)
  const estatisticasGerais = {
    totalVotos: 84600,
    totalZonas: 8,
    totalEleitores: 144300,
    mediaPercentual: 58.6,
  }

  // Função para determinar status baseado no percentual
  const getStatus = (percentual) => {
    if (percentual >= 70) return { texto: 'Excelente', cor: '#10b981' }
    if (percentual >= 60) return { texto: 'Bom', cor: '#3b82f6' }
    if (percentual >= 50) return { texto: 'Regular', cor: '#f59e0b' }
    return { texto: 'Atenção', cor: '#ef4444' }
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

          <div className="painel-estatisticas__localizacao">
            <p>
              <strong>📍 Localização:</strong> {regiaoSelecionada.cidade} - {regiaoSelecionada.estado}
            </p>
            <p>
              <strong>📋 Seções Eleitorais:</strong> {regiaoSelecionada.secao}
            </p>
          </div>
          
          <div className="painel-estatisticas__metricas">
            <div className="painel-estatisticas__metrica">
              <span className="painel-estatisticas__metrica-label">Total de Votos</span>
              <span className="painel-estatisticas__metrica-valor">
                {regiaoSelecionada.votos.toLocaleString('pt-BR')}
              </span>
            </div>

            <div className="painel-estatisticas__metrica">
              <span className="painel-estatisticas__metrica-label">Total de Eleitores</span>
              <span className="painel-estatisticas__metrica-valor">
                {regiaoSelecionada.eleitores.toLocaleString('pt-BR')}
              </span>
            </div>

            <div className="painel-estatisticas__metrica">
              <span className="painel-estatisticas__metrica-label">Percentual de Votos</span>
              <span 
                className="painel-estatisticas__metrica-valor"
                style={{ color: getStatus(regiaoSelecionada.percentual).cor }}
              >
                {regiaoSelecionada.percentual}%
              </span>
            </div>

            <div className="painel-estatisticas__metrica">
              <span className="painel-estatisticas__metrica-label">Status</span>
              <span 
                className="painel-estatisticas__metrica-valor"
                style={{ color: getStatus(regiaoSelecionada.percentual).cor }}
              >
                {getStatus(regiaoSelecionada.percentual).texto}
              </span>
            </div>
          </div>

          <div className="painel-estatisticas__barra-progresso-container">
            <div className="painel-estatisticas__barra-progresso-label">
              <span>Percentual de Votos</span>
              <span>{regiaoSelecionada.percentual}%</span>
            </div>
            <div className="painel-estatisticas__barra-progresso">
              <div 
                className="painel-estatisticas__barra-progresso-fill"
                style={{ 
                  width: `${regiaoSelecionada.percentual}%`,
                  backgroundColor: getStatus(regiaoSelecionada.percentual).cor,
                }}
              />
            </div>
          </div>

          <div className="painel-estatisticas__info-adicional">
            <h4>Informações Adicionais</h4>
            <div className="painel-estatisticas__info-item">
              <span>Abstenção:</span>
              <span>{(100 - regiaoSelecionada.percentual).toFixed(1)}%</span>
            </div>
            <div className="painel-estatisticas__info-item">
              <span>Votos não computados:</span>
              <span>{(regiaoSelecionada.eleitores - regiaoSelecionada.votos).toLocaleString('pt-BR')}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="painel-estatisticas__geral">
          <p className="painel-estatisticas__instrucao">
            👆 Selecione uma zona eleitoral no mapa para ver os detalhes
          </p>

          <div className="painel-estatisticas__resumo">
            <h3>Resumo Geral</h3>
            
            <div className="painel-estatisticas__metrica">
              <span className="painel-estatisticas__metrica-label">Total de Votos</span>
              <span className="painel-estatisticas__metrica-valor">
                {estatisticasGerais.totalVotos.toLocaleString('pt-BR')}
              </span>
            </div>

            <div className="painel-estatisticas__metrica">
              <span className="painel-estatisticas__metrica-label">Total de Eleitores</span>
              <span className="painel-estatisticas__metrica-valor">
                {estatisticasGerais.totalEleitores.toLocaleString('pt-BR')}
              </span>
            </div>

            <div className="painel-estatisticas__metrica">
              <span className="painel-estatisticas__metrica-label">Zonas Eleitorais</span>
              <span className="painel-estatisticas__metrica-valor">
                {estatisticasGerais.totalZonas}
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
