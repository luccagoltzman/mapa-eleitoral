import { useState } from 'react'
import Dashboard from './Dashboard/Dashboard'
import CadastroVotos from './CadastroVotos/CadastroVotos'
import CadastroPasseatas from './CadastroPasseatas/CadastroPasseatas'
import CadastroCampanhas from './CadastroCampanhas/CadastroCampanhas'
import CadastroGastos from './CadastroGastos/CadastroGastos'
import Pesquisas from './Pesquisas/Pesquisas'
import './Gestao.scss'

function Gestao() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const tabs = [
    { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
    { id: 'votos', label: '🗳️ Votos', icon: '🗳️' },
    { id: 'passeatas', label: '🚶 Passeatas', icon: '🚶' },
    { id: 'campanhas', label: '📢 Campanhas', icon: '📢' },
    { id: 'gastos', label: '💰 Gastos', icon: '💰' },
    { id: 'pesquisas', label: '📈 Pesquisas', icon: '📈' },
  ]

  return (
    <div className="gestao">
      <div className="gestao__tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`gestao__tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="gestao__content">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'votos' && <CadastroVotos />}
        {activeTab === 'passeatas' && <CadastroPasseatas />}
        {activeTab === 'campanhas' && <CadastroCampanhas />}
        {activeTab === 'gastos' && <CadastroGastos />}
        {activeTab === 'pesquisas' && <Pesquisas />}
      </div>
    </div>
  )
}

export default Gestao


