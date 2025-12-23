import { useState, useEffect } from 'react'
import { getStorageData, addStorageItem, updateStorageItem, deleteStorageItem, StorageKeys } from '../../../utils/storage'
import './CadastroCampanhas.scss'

function CadastroCampanhas() {
  const [campanhas, setCampanhas] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    nome: '',
    tipo: 'online',
    dataInicio: '',
    dataFim: '',
    orcamento: '',
    status: 'ativa',
    descricao: '',
  })

  useEffect(() => {
    loadCampanhas()
  }, [])

  const loadCampanhas = () => {
    setCampanhas(getStorageData(StorageKeys.CAMPANHAS))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingId) {
      updateStorageItem(StorageKeys.CAMPANHAS, editingId, formData)
      setEditingId(null)
    } else {
      addStorageItem(StorageKeys.CAMPANHAS, formData)
    }

    setFormData({
      nome: '',
      tipo: 'online',
      dataInicio: '',
      dataFim: '',
      orcamento: '',
      status: 'ativa',
      descricao: '',
    })
    loadCampanhas()
  }

  const handleEdit = (campanha) => {
    setEditingId(campanha.id)
    setFormData({
      nome: campanha.nome || '',
      tipo: campanha.tipo || 'online',
      dataInicio: campanha.dataInicio || '',
      dataFim: campanha.dataFim || '',
      orcamento: campanha.orcamento || '',
      status: campanha.status || 'ativa',
      descricao: campanha.descricao || '',
    })
  }

  const handleDelete = (id) => {
    if (confirm('Tem certeza que deseja excluir esta campanha?')) {
      deleteStorageItem(StorageKeys.CAMPANHAS, id)
      loadCampanhas()
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData({
      nome: '',
      tipo: 'online',
      dataInicio: '',
      dataFim: '',
      orcamento: '',
      status: 'ativa',
      descricao: '',
    })
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const formatCurrency = (value) => {
    if (!value) return '-'
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(parseFloat(value))
  }

  return (
    <div className="cadastro-campanhas">
      <h2 className="cadastro-campanhas__title">Cadastro de Campanhas</h2>

      <form className="cadastro-campanhas__form" onSubmit={handleSubmit}>
        <div className="cadastro-campanhas__form-row">
          <div className="cadastro-campanhas__form-group">
            <label>Nome da Campanha *</label>
            <input
              type="text"
              required
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              placeholder="Ex: Campanha Digital 2024"
            />
          </div>

          <div className="cadastro-campanhas__form-group">
            <label>Tipo *</label>
            <select
              required
              value={formData.tipo}
              onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
            >
              <option value="online">Online</option>
              <option value="tv">TV</option>
              <option value="radio">Rádio</option>
              <option value="impresso">Impresso</option>
              <option value="outdoor">Outdoor</option>
              <option value="evento">Evento</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          <div className="cadastro-campanhas__form-group">
            <label>Status *</label>
            <select
              required
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="ativa">Ativa</option>
              <option value="pausada">Pausada</option>
              <option value="finalizada">Finalizada</option>
            </select>
          </div>

          <div className="cadastro-campanhas__form-group">
            <label>Data Início *</label>
            <input
              type="date"
              required
              value={formData.dataInicio}
              onChange={(e) => setFormData({ ...formData, dataInicio: e.target.value })}
            />
          </div>

          <div className="cadastro-campanhas__form-group">
            <label>Data Fim</label>
            <input
              type="date"
              value={formData.dataFim}
              onChange={(e) => setFormData({ ...formData, dataFim: e.target.value })}
            />
          </div>

          <div className="cadastro-campanhas__form-group">
            <label>Orçamento (R$)</label>
            <input
              type="number"
              step="0.01"
              value={formData.orcamento}
              onChange={(e) => setFormData({ ...formData, orcamento: e.target.value })}
              placeholder="Ex: 50000.00"
            />
          </div>
        </div>

        <div className="cadastro-campanhas__form-group">
          <label>Descrição</label>
          <textarea
            value={formData.descricao}
            onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
            placeholder="Descrição detalhada da campanha..."
            rows="4"
          />
        </div>

        <div className="cadastro-campanhas__form-actions">
          <button type="submit" className="btn btn-primary">
            {editingId ? 'Atualizar' : 'Cadastrar'} Campanha
          </button>
          {editingId && (
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="cadastro-campanhas__list">
        <h3>Campanhas Cadastradas ({campanhas.length})</h3>
        {campanhas.length > 0 ? (
          <div className="cadastro-campanhas__table">
            <div className="cadastro-campanhas__table-header">
              <span>Nome</span>
              <span>Tipo</span>
              <span>Status</span>
              <span>Início</span>
              <span>Fim</span>
              <span>Orçamento</span>
              <span>Ações</span>
            </div>
            {campanhas.map((campanha) => (
              <div key={campanha.id} className="cadastro-campanhas__table-row">
                <span><strong>{campanha.nome}</strong></span>
                <span>{campanha.tipo}</span>
                <span>
                  <span className={`status-badge status-${campanha.status}`}>
                    {campanha.status}
                  </span>
                </span>
                <span>{formatDate(campanha.dataInicio)}</span>
                <span>{formatDate(campanha.dataFim)}</span>
                <span>{formatCurrency(campanha.orcamento)}</span>
                <span className="cadastro-campanhas__actions">
                  <button onClick={() => handleEdit(campanha)} className="btn-icon">✏️</button>
                  <button onClick={() => handleDelete(campanha.id)} className="btn-icon">🗑️</button>
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="cadastro-campanhas__empty">Nenhuma campanha cadastrada ainda.</p>
        )}
      </div>
    </div>
  )
}

export default CadastroCampanhas

