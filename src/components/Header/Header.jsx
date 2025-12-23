import './Header.scss'

function Header({ currentView, onViewChange }) {
  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__title">Mapa Eleitoral</h1>
        <p className="header__subtitle">Gestão de Campanhas Eleitorais</p>
        
        <nav className="header__nav">
          <button
            className={`header__nav-item ${currentView === 'mapa' ? 'active' : ''}`}
            onClick={() => onViewChange('mapa')}
          >
            🗺️ Mapa
          </button>
          <button
            className={`header__nav-item ${currentView === 'gestao' ? 'active' : ''}`}
            onClick={() => onViewChange('gestao')}
          >
            📊 Gestão
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
