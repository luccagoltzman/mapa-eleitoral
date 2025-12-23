import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './MapaInterativo.scss'

// Fix para ícones do Leaflet no React
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Componente para ajustar o zoom quando uma zona é selecionada
function MapController({ zonaSelecionada }) {
  const map = useMap()
  
  useEffect(() => {
    if (zonaSelecionada) {
      map.setView([zonaSelecionada.lat, zonaSelecionada.lng], 13, {
        animate: true,
        duration: 1
      })
    }
  }, [zonaSelecionada, map])
  
  return null
}

function MapaInterativo({ onRegiaoSelecionada }) {
  const [zonaSelecionada, setZonaSelecionada] = useState(null)

  // Dados de zonas eleitorais (exemplo com coordenadas do Brasil)
  const zonasEleitorais = [
    {
      id: 1,
      nome: 'Zona Eleitoral 001 - Centro',
      cidade: 'São Paulo',
      estado: 'SP',
      lat: -23.5505,
      lng: -46.6333,
      votos: 12500,
      percentual: 65.8,
      eleitores: 19000,
      secao: '001-045',
      cor: '#3b82f6'
    },
    {
      id: 2,
      nome: 'Zona Eleitoral 002 - Zona Norte',
      cidade: 'São Paulo',
      estado: 'SP',
      lat: -23.4800,
      lng: -46.6200,
      votos: 8900,
      percentual: 52.3,
      eleitores: 17000,
      secao: '046-090',
      cor: '#10b981'
    },
    {
      id: 3,
      nome: 'Zona Eleitoral 003 - Zona Sul',
      cidade: 'São Paulo',
      estado: 'SP',
      lat: -23.6500,
      lng: -46.6400,
      votos: 15200,
      percentual: 71.2,
      eleitores: 21300,
      secao: '091-135',
      cor: '#f59e0b'
    },
    {
      id: 4,
      nome: 'Zona Eleitoral 004 - Zona Leste',
      cidade: 'São Paulo',
      estado: 'SP',
      lat: -23.5500,
      lng: -46.5000,
      votos: 11200,
      percentual: 58.9,
      eleitores: 19000,
      secao: '136-180',
      cor: '#ef4444'
    },
    {
      id: 5,
      nome: 'Zona Eleitoral 005 - Zona Oeste',
      cidade: 'São Paulo',
      estado: 'SP',
      lat: -23.5300,
      lng: -46.7200,
      votos: 9800,
      percentual: 48.5,
      eleitores: 20200,
      secao: '181-225',
      cor: '#8b5cf6'
    },
    {
      id: 6,
      nome: 'Zona Eleitoral 006 - Região Metropolitana',
      cidade: 'Guarulhos',
      estado: 'SP',
      lat: -23.4538,
      lng: -46.5331,
      votos: 6800,
      percentual: 42.1,
      eleitores: 16100,
      secao: '226-270',
      cor: '#06b6d4'
    },
    {
      id: 7,
      nome: 'Zona Eleitoral 007 - Interior',
      cidade: 'Campinas',
      estado: 'SP',
      lat: -22.9056,
      lng: -47.0608,
      votos: 12400,
      percentual: 68.3,
      eleitores: 18100,
      secao: '271-315',
      cor: '#ec4899'
    },
    {
      id: 8,
      nome: 'Zona Eleitoral 008 - Litoral',
      cidade: 'Santos',
      estado: 'SP',
      lat: -23.9608,
      lng: -46.3331,
      votos: 7600,
      percentual: 55.7,
      eleitores: 13600,
      secao: '316-360',
      cor: '#14b8a6'
    }
  ]

  const handleZonaClick = (zona) => {
    setZonaSelecionada(zona)
    onRegiaoSelecionada(zona)
  }

  // Calcular centro do mapa baseado nas zonas
  const centerLat = zonasEleitorais.reduce((sum, z) => sum + z.lat, 0) / zonasEleitorais.length
  const centerLng = zonasEleitorais.reduce((sum, z) => sum + z.lng, 0) / zonasEleitorais.length

  // Função para determinar cor baseada no percentual
  const getColorByPercentual = (percentual) => {
    if (percentual >= 70) return '#10b981' // Verde - Excelente
    if (percentual >= 60) return '#3b82f6' // Azul - Bom
    if (percentual >= 50) return '#f59e0b' // Laranja - Regular
    return '#ef4444' // Vermelho - Precisa atenção
  }

  return (
    <div className="mapa-interativo">
      <div className="mapa-interativo__header">
        <h2>Mapa Eleitoral Interativo</h2>
        <p>Clique nos marcadores para ver detalhes de cada zona eleitoral</p>
      </div>
      
      <div className="mapa-interativo__container">
        <MapContainer
          center={[centerLat, centerLng]}
          zoom={10}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <MapController zonaSelecionada={zonaSelecionada} />
          
          {zonasEleitorais.map((zona) => {
            const cor = getColorByPercentual(zona.percentual)
            const raio = Math.sqrt(zona.votos) * 2 // Raio proporcional aos votos
            
            return (
              <div key={zona.id}>
                <Circle
                  center={[zona.lat, zona.lng]}
                  radius={raio}
                  pathOptions={{
                    color: cor,
                    fillColor: cor,
                    fillOpacity: 0.3,
                    weight: 2
                  }}
                  eventHandlers={{
                    click: () => handleZonaClick(zona)
                  }}
                />
                <Marker
                  position={[zona.lat, zona.lng]}
                  eventHandlers={{
                    click: () => handleZonaClick(zona)
                  }}
                >
                  <Popup>
                    <div className="mapa-interativo__popup">
                      <h3>{zona.nome}</h3>
                      <p><strong>Cidade:</strong> {zona.cidade} - {zona.estado}</p>
                      <p><strong>Seções:</strong> {zona.secao}</p>
                      <p><strong>Votos:</strong> {zona.votos.toLocaleString('pt-BR')}</p>
                      <p><strong>Eleitores:</strong> {zona.eleitores.toLocaleString('pt-BR')}</p>
                      <p><strong>Percentual:</strong> <span style={{ color: cor, fontWeight: 'bold' }}>{zona.percentual}%</span></p>
                    </div>
                  </Popup>
                </Marker>
              </div>
            )
          })}
        </MapContainer>
      </div>

      <div className="mapa-interativo__legenda">
        <h3>Legenda</h3>
        <div className="mapa-interativo__legenda-itens">
          <div className="mapa-interativo__legenda-item">
            <span className="mapa-interativo__legenda-cor" style={{ backgroundColor: '#10b981' }}></span>
            <span>≥ 70% (Excelente)</span>
          </div>
          <div className="mapa-interativo__legenda-item">
            <span className="mapa-interativo__legenda-cor" style={{ backgroundColor: '#3b82f6' }}></span>
            <span>60-69% (Bom)</span>
          </div>
          <div className="mapa-interativo__legenda-item">
            <span className="mapa-interativo__legenda-cor" style={{ backgroundColor: '#f59e0b' }}></span>
            <span>50-59% (Regular)</span>
          </div>
          <div className="mapa-interativo__legenda-item">
            <span className="mapa-interativo__legenda-cor" style={{ backgroundColor: '#ef4444' }}></span>
            <span>&lt; 50% (Atenção)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapaInterativo
