import { useState } from 'react'
import './MapaInterativo.scss'

function MapaInterativo({ onRegiaoSelecionada }) {
  const [regioes] = useState([
    { id: 1, nome: 'Região Norte', votos: 1250, percentual: 35.2, cor: '#3b82f6' },
    { id: 2, nome: 'Região Sul', votos: 2100, percentual: 58.9, cor: '#10b981' },
    { id: 3, nome: 'Região Leste', votos: 980, percentual: 27.5, cor: '#f59e0b' },
    { id: 4, nome: 'Região Oeste', votos: 1750, percentual: 49.1, cor: '#ef4444' },
    { id: 5, nome: 'Região Centro', votos: 3200, percentual: 89.8, cor: '#8b5cf6' },
  ])

  const handleRegiaoClick = (regiao) => {
    onRegiaoSelecionada(regiao)
  }

  return (
    <div className="mapa-interativo">
      <div className="mapa-interativo__header">
        <h2>Mapa Interativo</h2>
        <p>Clique em uma região para ver os detalhes</p>
      </div>
      
      <div className="mapa-interativo__canvas">
        {regioes.map((regiao) => (
          <div
            key={regiao.id}
            className="mapa-interativo__regiao"
            style={{ 
              backgroundColor: regiao.cor,
              opacity: 0.7,
            }}
            onClick={() => handleRegiaoClick(regiao)}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
          >
            <div className="mapa-interativo__regiao-info">
              <span className="mapa-interativo__regiao-nome">{regiao.nome}</span>
              <span className="mapa-interativo__regiao-votos">{regiao.votos} votos</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MapaInterativo

