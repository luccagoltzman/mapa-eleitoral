import './Header.scss'
import headerImage from '../../assets/img/4116831.jpg'

function Header({ currentView, onViewChange }) {
  return (
    <header className="header" style={{ backgroundImage: `url(${headerImage})` }}>
      <div className="header__overlay"></div>
      <div className="header__container">
        <h1 className="header__title">Mapa Eleitoral</h1>
        <p className="header__subtitle">Gestão de Campanhas Eleitorais - São Luís/MA</p>
        
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
