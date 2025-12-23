import { useState, useEffect } from 'react'
import { getStorageData, addStorageItem, updateStorageItem, deleteStorageItem, StorageKeys } from '../../../utils/storage'
import './CadastroVotos.scss'

function CadastroVotos() {
  const [votos, setVotos] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    quantidade: '',
    zona: '',
    local: '',
    data: new Date().toISOString().split('T')[0],
    observacoes: '',
  })

  useEffect(() => {
    loadVotos()
  }, [])

  const loadVotos = () => {
    setVotos(getStorageData(StorageKeys.VOTOS))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingId) {
      updateStorageItem(StorageKeys.VOTOS, editingId, formData)
      setEditingId(null)
    } else {
      addStorageItem(StorageKeys.VOTOS, formData)
    }

    setFormData({
      quantidade: '',
      zona: '',
      local: '',
      data: new Date().toISOString().split('T')[0],
      observacoes: '',
    })
    loadVotos()
  }

  const handleEdit = (voto) => {
    setEditingId(voto.id)
    setFormData({
      quantidade: voto.quantidade || '',
      zona: voto.zona || '',
      local: voto.local || '',
      data: voto.data || new Date().toISOString().split('T')[0],
      observacoes: voto.observacoes || '',
    })
  }

  const handleDelete = (id) => {
    if (confirm('Tem certeza que deseja excluir este voto?')) {
      deleteStorageItem(StorageKeys.VOTOS, id)
      loadVotos()
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData({
      quantidade: '',
      zona: '',
      local: '',
      data: new Date().toISOString().split('T')[0],
      observacoes: '',
    })
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  return (
    <div className="cadastro-votos">
      <h2 className="cadastro-votos__title">Cadastro de Votos</h2>

      <form className="cadastro-votos__form" onSubmit={handleSubmit}>
        <div className="cadastro-votos__form-row">
          <div className="cadastro-votos__form-group">
            <label>Quantidade de Votos *</label>
            <input
              type="number"
              required
              value={formData.quantidade}
              onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })}
              placeholder="Ex: 1500"
            />
          </div>

          <div className="cadastro-votos__form-group">
            <label>Zona Eleitoral</label>
            <input
              type="text"
              value={formData.zona}
              onChange={(e) => setFormData({ ...formData, zona: e.target.value })}
              placeholder="Ex: Zona 001"
            />
          </div>

          <div className="cadastro-votos__form-group">
            <label>Local</label>
            <input
              type="text"
              value={formData.local}
              onChange={(e) => setFormData({ ...formData, local: e.target.value })}
              placeholder="Ex: Centro, São Paulo - SP"
            />
          </div>

          <div className="cadastro-votos__form-group">
            <label>Data *</label>
            <input
              type="date"
              required
              value={formData.data}
              onChange={(e) => setFormData({ ...formData, data: e.target.value })}
            />
          </div>
        </div>

        <div className="cadastro-votos__form-group">
          <label>Observações</label>
          <textarea
            value={formData.observacoes}
            onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
            placeholder="Informações adicionais sobre os votos..."
            rows="3"
          />
        </div>

        <div className="cadastro-votos__form-actions">
          <button type="submit" className="btn btn-primary">
            {editingId ? 'Atualizar' : 'Cadastrar'} Voto
          </button>
          {editingId && (
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="cadastro-votos__list">
        <h3>Votos Cadastrados ({votos.length})</h3>
        {votos.length > 0 ? (
          <div className="cadastro-votos__table">
            <div className="cadastro-votos__table-header">
              <span>Quantidade</span>
              <span>Zona</span>
              <span>Local</span>
              <span>Data</span>
              <span>Ações</span>
            </div>
            {votos.map((voto) => (
              <div key={voto.id} className="cadastro-votos__table-row">
                <span><strong>{parseInt(voto.quantidade || 0).toLocaleString('pt-BR')}</strong></span>
                <span>{voto.zona || '-'}</span>
                <span>{voto.local || '-'}</span>
                <span>{formatDate(voto.data)}</span>
                <span className="cadastro-votos__actions">
                  <button onClick={() => handleEdit(voto)} className="btn-icon">✏️</button>
                  <button onClick={() => handleDelete(voto.id)} className="btn-icon">🗑️</button>
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="cadastro-votos__empty">Nenhum voto cadastrado ainda.</p>
        )}
      </div>
    </div>
  )
}

export default CadastroVotos

