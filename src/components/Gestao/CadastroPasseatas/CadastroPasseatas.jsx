import { useState, useEffect } from 'react'
import { getStorageData, addStorageItem, updateStorageItem, deleteStorageItem, StorageKeys } from '../../../utils/storage'
import './CadastroPasseatas.scss'

function CadastroPasseatas() {
  const [passeatas, setPasseatas] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    nome: '',
    local: '',
    data: '',
    hora: '',
    participantes: '',
    observacoes: '',
  })

  useEffect(() => {
    loadPasseatas()
  }, [])

  const loadPasseatas = () => {
    setPasseatas(getStorageData(StorageKeys.PASSEATAS))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingId) {
      updateStorageItem(StorageKeys.PASSEATAS, editingId, formData)
      setEditingId(null)
    } else {
      addStorageItem(StorageKeys.PASSEATAS, formData)
    }

    setFormData({
      nome: '',
      local: '',
      data: '',
      hora: '',
      participantes: '',
      observacoes: '',
    })
    loadPasseatas()
  }

  const handleEdit = (passeata) => {
    setEditingId(passeata.id)
    setFormData({
      nome: passeata.nome || '',
      local: passeata.local || '',
      data: passeata.data || '',
      hora: passeata.hora || '',
      participantes: passeata.participantes || '',
      observacoes: passeata.observacoes || '',
    })
  }

  const handleDelete = (id) => {
    if (confirm('Tem certeza que deseja excluir esta passeata?')) {
      deleteStorageItem(StorageKeys.PASSEATAS, id)
      loadPasseatas()
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData({
      nome: '',
      local: '',
      data: '',
      hora: '',
      participantes: '',
      observacoes: '',
    })
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  return (
    <div className="cadastro-passeatas">
      <h2 className="cadastro-passeatas__title">Cadastro de Passeatas</h2>

      <form className="cadastro-passeatas__form" onSubmit={handleSubmit}>
        <div className="cadastro-passeatas__form-row">
          <div className="cadastro-passeatas__form-group">
            <label>Nome da Passeata *</label>
            <input
              type="text"
              required
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              placeholder="Ex: Passeata pela Educação"
            />
          </div>

          <div className="cadastro-passeatas__form-group">
            <label>Local *</label>
            <input
              type="text"
              required
              value={formData.local}
              onChange={(e) => setFormData({ ...formData, local: e.target.value })}
              placeholder="Ex: Avenida Paulista, São Paulo - SP"
            />
          </div>

          <div className="cadastro-passeatas__form-group">
            <label>Data *</label>
            <input
              type="date"
              required
              value={formData.data}
              onChange={(e) => setFormData({ ...formData, data: e.target.value })}
            />
          </div>

          <div className="cadastro-passeatas__form-group">
            <label>Hora</label>
            <input
              type="time"
              value={formData.hora}
              onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
            />
          </div>

          <div className="cadastro-passeatas__form-group">
            <label>Nº de Participantes Estimados</label>
            <input
              type="number"
              value={formData.participantes}
              onChange={(e) => setFormData({ ...formData, participantes: e.target.value })}
              placeholder="Ex: 5000"
            />
          </div>
        </div>

        <div className="cadastro-passeatas__form-group">
          <label>Observações</label>
          <textarea
            value={formData.observacoes}
            onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
            placeholder="Informações adicionais sobre a passeata..."
            rows="3"
          />
        </div>

        <div className="cadastro-passeatas__form-actions">
          <button type="submit" className="btn btn-primary">
            {editingId ? 'Atualizar' : 'Cadastrar'} Passeata
          </button>
          {editingId && (
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="cadastro-passeatas__list">
        <h3>Passeatas Cadastradas ({passeatas.length})</h3>
        {passeatas.length > 0 ? (
          <div className="cadastro-passeatas__table">
            <div className="cadastro-passeatas__table-header">
              <span>Nome</span>
              <span>Local</span>
              <span>Data</span>
              <span>Hora</span>
              <span>Participantes</span>
              <span>Ações</span>
            </div>
            {passeatas.map((passeata) => (
              <div key={passeata.id} className="cadastro-passeatas__table-row">
                <span><strong>{passeata.nome}</strong></span>
                <span>{passeata.local}</span>
                <span>{formatDate(passeata.data)}</span>
                <span>{passeata.hora || '-'}</span>
                <span>{passeata.participantes ? parseInt(passeata.participantes).toLocaleString('pt-BR') : '-'}</span>
                <span className="cadastro-passeatas__actions">
                  <button onClick={() => handleEdit(passeata)} className="btn-icon">✏️</button>
                  <button onClick={() => handleDelete(passeata.id)} className="btn-icon">🗑️</button>
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="cadastro-passeatas__empty">Nenhuma passeata cadastrada ainda.</p>
        )}
      </div>
    </div>
  )
}

export default CadastroPasseatas

