import { useState, useEffect } from 'react'
import { getPerfilCandidato, setPerfilCandidato } from '../../../utils/storage'
import './PerfilCandidato.scss'

function PerfilCandidato() {
  const [perfil, setPerfil] = useState(null)
  const [formData, setFormData] = useState({
    nome: '',
    cargo: '',
    partido: '',
    numero: '',
    cidade: 'São Luís',
    estado: 'MA',
    biografia: '',
    email: '',
    telefone: '',
    foto: '',
  })
  const [fotoPreview, setFotoPreview] = useState(null)

  useEffect(() => {
    loadPerfil()
  }, [])

  const loadPerfil = () => {
    const perfilSalvo = getPerfilCandidato()
    if (perfilSalvo) {
      setPerfil(perfilSalvo)
      setFormData({
        nome: perfilSalvo.nome || '',
        cargo: perfilSalvo.cargo || '',
        partido: perfilSalvo.partido || '',
        numero: perfilSalvo.numero || '',
        cidade: perfilSalvo.cidade || 'São Luís',
        estado: perfilSalvo.estado || 'MA',
        biografia: perfilSalvo.biografia || '',
        email: perfilSalvo.email || '',
        telefone: perfilSalvo.telefone || '',
        foto: perfilSalvo.foto || '',
      })
      if (perfilSalvo.foto) {
        setFotoPreview(perfilSalvo.foto)
      }
    }
  }

  const handleFotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result
        setFormData({ ...formData, foto: base64String })
        setFotoPreview(base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const perfilCompleto = {
      ...formData,
      foto: fotoPreview || formData.foto,
      updatedAt: new Date().toISOString(),
    }
    setPerfilCandidato(perfilCompleto)
    setPerfil(perfilCompleto)
    
    // Disparar evento para atualizar header
    window.dispatchEvent(new CustomEvent('perfilUpdated'))
    
    alert('Perfil salvo com sucesso!')
  }

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
    <div className="perfil-candidato">
      <h2 className="perfil-candidato__title">Perfil do Candidato</h2>
      <p className="perfil-candidato__description">
        Configure suas informações de candidatura para personalizar o sistema
      </p>

      {perfil && (
        <div className="perfil-candidato__resumo">
          <h3>Informações Atuais</h3>
          <div className="perfil-candidato__card">
            <div className="perfil-candidato__card-header">
              {perfil.foto && (
                <img 
                  src={perfil.foto} 
                  alt={perfil.nome}
                  className="perfil-candidato__card-foto"
                />
              )}
              <div className="perfil-candidato__card-info">
                <h4>{perfil.nome}</h4>
                <span className="perfil-candidato__badge">
                  {getCargoLabel(perfil.cargo)}
                </span>
              </div>
            </div>
            <div className="perfil-candidato__card-body">
              <p><strong>Partido:</strong> {perfil.partido}</p>
              {perfil.numero && <p><strong>Número:</strong> {perfil.numero}</p>}
              <p><strong>Local:</strong> {perfil.cidade} - {perfil.estado}</p>
            </div>
          </div>
        </div>
      )}

      <form className="perfil-candidato__form" onSubmit={handleSubmit}>
        <div className="perfil-candidato__form-section">
          <h3>Foto de Perfil</h3>
          
          <div className="perfil-candidato__foto-upload">
            {fotoPreview ? (
              <div className="perfil-candidato__foto-preview">
                <img src={fotoPreview} alt="Preview" />
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setFotoPreview(null)
                    setFormData({ ...formData, foto: '' })
                  }}
                >
                  Remover Foto
                </button>
              </div>
            ) : (
              <label className="perfil-candidato__foto-label">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFotoChange}
                  style={{ display: 'none' }}
                />
                <div className="perfil-candidato__foto-placeholder">
                  <span>📷</span>
                  <span>Clique para adicionar foto</span>
                </div>
              </label>
            )}
          </div>
        </div>

        <div className="perfil-candidato__form-section">
          <h3>Informações Básicas</h3>
          
          <div className="perfil-candidato__form-row">
            <div className="perfil-candidato__form-group">
              <label>Nome Completo *</label>
              <input
                type="text"
                required
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                placeholder="Ex: João Silva"
              />
            </div>

            <div className="perfil-candidato__form-group">
              <label>Cargo *</label>
              <select
                required
                value={formData.cargo}
                onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
              >
                <option value="">Selecione o cargo</option>
                <option value="prefeito">Prefeito</option>
                <option value="vice_prefeito">Vice-Prefeito</option>
                <option value="governador">Governador</option>
                <option value="vice_governador">Vice-Governador</option>
                <option value="vereador">Vereador</option>
                <option value="deputado_estadual">Deputado Estadual</option>
                <option value="deputado_federal">Deputado Federal</option>
                <option value="senador">Senador</option>
                <option value="presidente">Presidente</option>
                <option value="vice_presidente">Vice-Presidente</option>
              </select>
            </div>
          </div>

          <div className="perfil-candidato__form-row">
            <div className="perfil-candidato__form-group">
              <label>Partido/Coligação *</label>
              <input
                type="text"
                required
                value={formData.partido}
                onChange={(e) => setFormData({ ...formData, partido: e.target.value })}
                placeholder="Ex: PT, PSDB, MDB, etc."
              />
            </div>

            <div className="perfil-candidato__form-group">
              <label>Número do Candidato</label>
              <input
                type="text"
                value={formData.numero}
                onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                placeholder="Ex: 13, 45, 12345"
                maxLength="5"
              />
            </div>
          </div>

          <div className="perfil-candidato__form-row">
            <div className="perfil-candidato__form-group">
              <label>Cidade *</label>
              <input
                type="text"
                required
                value={formData.cidade}
                onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                placeholder="Ex: São Luís"
              />
            </div>

            <div className="perfil-candidato__form-group">
              <label>Estado *</label>
              <input
                type="text"
                required
                value={formData.estado}
                onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                placeholder="Ex: MA"
                maxLength="2"
              />
            </div>
          </div>
        </div>

        <div className="perfil-candidato__form-section">
          <h3>Contato</h3>
          
          <div className="perfil-candidato__form-row">
            <div className="perfil-candidato__form-group">
              <label>E-mail</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Ex: candidato@email.com"
              />
            </div>

            <div className="perfil-candidato__form-group">
              <label>Telefone</label>
              <input
                type="tel"
                value={formData.telefone}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                placeholder="Ex: (98) 99999-9999"
              />
            </div>
          </div>
        </div>

        <div className="perfil-candidato__form-section">
          <h3>Biografia</h3>
          
          <div className="perfil-candidato__form-group">
            <label>Biografia/Histórico</label>
            <textarea
              value={formData.biografia}
              onChange={(e) => setFormData({ ...formData, biografia: e.target.value })}
              placeholder="Conte um pouco sobre você e sua trajetória política..."
              rows="5"
            />
          </div>
        </div>

        <div className="perfil-candidato__form-actions">
          <button type="submit" className="btn btn-primary">
            {perfil ? 'Atualizar' : 'Salvar'} Perfil
          </button>
        </div>
      </form>
    </div>
  )
}

export default PerfilCandidato

