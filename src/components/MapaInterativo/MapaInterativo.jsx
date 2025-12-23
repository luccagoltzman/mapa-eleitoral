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

  // Dados de zonas eleitorais de São Luís - MA e Maranhão
  const zonasEleitorais = [
    {
      id: 1,
      nome: 'Zona Eleitoral 001 - Centro Histórico',
      cidade: 'São Luís',
      estado: 'MA',
      bairro: 'Centro Histórico',
      lat: -2.5297,
      lng: -44.3028,
      votos: 18500,
      percentual: 72.5,
      eleitores: 25500,
      secao: '001-048',
      cor: '#10b981'
    },
    {
      id: 2,
      nome: 'Zona Eleitoral 002 - Renascença',
      cidade: 'São Luís',
      estado: 'MA',
      bairro: 'Renascença',
      lat: -2.5400,
      lng: -44.2800,
      votos: 14200,
      percentual: 68.3,
      eleitores: 20800,
      secao: '049-096',
      cor: '#3b82f6'
    },
    {
      id: 3,
      nome: 'Zona Eleitoral 003 - Cohab',
      cidade: 'São Luís',
      estado: 'MA',
      bairro: 'Cohab',
      lat: -2.5500,
      lng: -44.2900,
      votos: 11200,
      percentual: 58.9,
      eleitores: 19000,
      secao: '097-144',
      cor: '#f59e0b'
    },
    {
      id: 4,
      nome: 'Zona Eleitoral 004 - Cohama',
      cidade: 'São Luís',
      estado: 'MA',
      bairro: 'Cohama',
      lat: -2.5200,
      lng: -44.2700,
      votos: 16800,
      percentual: 65.2,
      eleitores: 25700,
      secao: '145-192',
      cor: '#3b82f6'
    },
    {
      id: 5,
      nome: 'Zona Eleitoral 005 - Anjo da Guarda',
      cidade: 'São Luís',
      estado: 'MA',
      bairro: 'Anjo da Guarda',
      lat: -2.5100,
      lng: -44.3100,
      votos: 9800,
      percentual: 52.4,
      eleitores: 18700,
      secao: '193-240',
      cor: '#f59e0b'
    },
    {
      id: 6,
      nome: 'Zona Eleitoral 006 - Itaqui-Bacanga',
      cidade: 'São Luís',
      estado: 'MA',
      bairro: 'Itaqui-Bacanga',
      lat: -2.5600,
      lng: -44.3200,
      votos: 8900,
      percentual: 48.6,
      eleitores: 18300,
      secao: '241-288',
      cor: '#ef4444'
    },
    {
      id: 7,
      nome: 'Zona Eleitoral 007 - Coroado',
      cidade: 'São Luís',
      estado: 'MA',
      bairro: 'Coroado',
      lat: -2.5350,
      lng: -44.2950,
      votos: 12400,
      percentual: 61.8,
      eleitores: 20000,
      secao: '289-336',
      cor: '#3b82f6'
    },
    {
      id: 8,
      nome: 'Zona Eleitoral 008 - Tirirical',
      cidade: 'São Luís',
      estado: 'MA',
      bairro: 'Tirirical',
      lat: -2.5150,
      lng: -44.2850,
      votos: 10500,
      percentual: 55.3,
      eleitores: 19000,
      secao: '337-384',
      cor: '#f59e0b'
    },
    {
      id: 9,
      nome: 'Zona Eleitoral 009 - Cohajap',
      cidade: 'São Luís',
      estado: 'MA',
      bairro: 'Cohajap',
      lat: -2.5450,
      lng: -44.2750,
      votos: 13200,
      percentual: 63.5,
      eleitores: 20800,
      secao: '385-432',
      cor: '#3b82f6'
    },
    {
      id: 10,
      nome: 'Zona Eleitoral 010 - Raposa',
      cidade: 'Raposa',
      estado: 'MA',
      bairro: 'Centro',
      lat: -2.4167,
      lng: -44.0833,
      votos: 4200,
      percentual: 58.2,
      eleitores: 7200,
      secao: '433-456',
      cor: '#3b82f6'
    },
    {
      id: 11,
      nome: 'Zona Eleitoral 011 - Paço do Lumiar',
      cidade: 'Paço do Lumiar',
      estado: 'MA',
      bairro: 'Centro',
      lat: -2.5333,
      lng: -44.1000,
      votos: 6800,
      percentual: 51.5,
      eleitores: 13200,
      secao: '457-504',
      cor: '#f59e0b'
    },
    {
      id: 12,
      nome: 'Zona Eleitoral 012 - São José de Ribamar',
      cidade: 'São José de Ribamar',
      estado: 'MA',
      bairro: 'Centro',
      lat: -2.5500,
      lng: -44.0500,
      votos: 9200,
      percentual: 59.7,
      eleitores: 15400,
      secao: '505-552',
      cor: '#3b82f6'
    }
  ]

  const handleZonaClick = (zona) => {
    setZonaSelecionada(zona)
    onRegiaoSelecionada(zona)
  }

  // Centro do mapa: São Luís - MA
  const centerLat = -2.5297
  const centerLng = -44.3028

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
        <h2>Mapa Eleitoral - São Luís/MA</h2>
        <p>Clique nos marcadores para ver detalhes de cada zona eleitoral de São Luís e região metropolitana</p>
      </div>
      
      <div className="mapa-interativo__container">
        <MapContainer
          center={[centerLat, centerLng]}
          zoom={11}
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
                      {zona.bairro && <p><strong>Bairro:</strong> {zona.bairro}</p>}
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
