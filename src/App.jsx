import { useState } from 'react'
import Header from './components/Header/Header'
import MapaInterativo from './components/MapaInterativo/MapaInterativo'
import PainelEstatisticas from './components/PainelEstatisticas/PainelEstatisticas'
import Gestao from './components/Gestao/Gestao'
import './App.scss'

function App() {
  const [regiaoSelecionada, setRegiaoSelecionada] = useState(null)
  const [currentView, setCurrentView] = useState('mapa')

  return (
    <div className="app">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      <main className="app__main">
        {currentView === 'mapa' ? (
          <div className="app__container">
            <MapaInterativo 
              onRegiaoSelecionada={setRegiaoSelecionada}
            />
            <PainelEstatisticas 
              regiaoSelecionada={regiaoSelecionada}
            />
          </div>
        ) : (
          <Gestao />
        )}
      </main>
    </div>
  )
}

export default App

