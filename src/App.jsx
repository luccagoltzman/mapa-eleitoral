import { useState } from 'react'
import Header from './components/Header/Header'
import MapaInterativo from './components/MapaInterativo/MapaInterativo'
import PainelEstatisticas from './components/PainelEstatisticas/PainelEstatisticas'
import './App.scss'

function App() {
  const [regiaoSelecionada, setRegiaoSelecionada] = useState(null)

  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <div className="app__container">
          <MapaInterativo 
            onRegiaoSelecionada={setRegiaoSelecionada}
          />
          <PainelEstatisticas 
            regiaoSelecionada={regiaoSelecionada}
          />
        </div>
      </main>
    </div>
  )
}

export default App

