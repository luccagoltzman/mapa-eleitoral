import { useState, useEffect } from 'react'
import './Header.scss'
import headerImage from '../../assets/img/4116831.jpg'
import { getPerfilCandidato } from '../../utils/storage'

function Header({ currentView, onViewChange }) {
  const [perfil, setPerfil] = useState(null)

  useEffect(() => {
    const loadPerfil = () => {
      const perfilSalvo = getPerfilCandidato()
      setPerfil(perfilSalvo)
    }
    
    // Carregar imediatamente
    loadPerfil()
    
    // Atualizar quando o storage mudar (outra aba)
    const handleStorageChange = () => {
      loadPerfil()
    }
    
    // Atualizar quando evento customizado for disparado (mesma aba)
    const handlePerfilUpdate = () => {
      loadPerfil()
    }
    
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('perfilUpdated', handlePerfilUpdate)
    
    // Verificar periodicamente (fallback) - mais frequente
    const interval = setInterval(loadPerfil, 500)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('perfilUpdated', handlePerfilUpdate)
      clearInterval(interval)
    }
  }, [])

  const getCargoLabel = (cargo) => {
    const cargos = {
      prefeito: 'Prefeito',
      vice_prefeito: 'Vice-Prefeito',
      governador: 'Governador',
      vice_governador: 'Vice-Governador',
      vereador: 'Vereador',
      deputado_estadual: 'Deputado Estadual',
      deputado_federal: 'Deputado Federal',
      senador: 'Senador',
      presidente: 'Presidente',
      vice_presidente: 'Vice-Presidente',
    }
    return cargos[cargo] || cargo
  }

  return (
    <header className="header" style={{ backgroundImage: `url(${headerImage})` }}>
      <div className="header__overlay"></div>
      <div className="header__container">
        <div className="header__top">
          <div className="header__left">
            <h1 className="header__title">Mapa Eleitoral</h1>
            <p className="header__subtitle">
              {perfil 
                ? `${getCargoLabel(perfil.cargo)} - ${perfil.cidade}/${perfil.estado}`
                : 'Gestão de Campanhas Eleitorais - São Luís/MA'
              }
            </p>
          </div>
          
          <div className="header__welcome">
            {perfil ? (
              <>
                <div className="header__welcome-content">
                  <div className="header__welcome-text">
                    <p className="header__welcome-greeting">
                      Olá, <strong>{perfil.nome ? perfil.nome.split(' ')[0] : 'Candidato'}</strong>
                    </p>
                    <p className="header__welcome-message">Bem vindo de volta</p>
                  </div>
                  <div className="header__welcome-foto">
                    {perfil.foto ? (
                      <img 
                        src={perfil.foto} 
                        alt={perfil.nome || 'Candidato'}
                        className="header__foto-perfil"
                      />
                    ) : (
                      <div className="header__foto-placeholder">
                        {perfil.nome ? perfil.nome.charAt(0).toUpperCase() : 'C'}
                      </div>
                    )}
                  </div>
                </div>
                {perfil.numero && (
                  <div className="header__candidato-numero-badge">
                    #{perfil.numero}
                  </div>
                )}
              </>
            ) : (
              <div className="header__welcome-content">
                <div className="header__welcome-text">
                  <p className="header__welcome-greeting">
                    Olá, <strong>Candidato</strong>
                  </p>
                  <p className="header__welcome-message">Complete seu perfil</p>
                </div>
                <div className="header__welcome-foto">
                  <div className="header__foto-placeholder">
                    👤
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
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
