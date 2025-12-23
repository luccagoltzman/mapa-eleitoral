import { useState, useEffect } from 'react'
import { getStorageData, addStorageItem, updateStorageItem, deleteStorageItem, StorageKeys } from '../../../utils/storage'
import './CadastroGastos.scss'

function CadastroGastos() {
  const [gastos, setGastos] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    descricao: '',
    categoria: 'publicidade',
    valor: '',
    data: new Date().toISOString().split('T')[0],
    fornecedor: '',
    observacoes: '',
  })

  useEffect(() => {
    loadGastos()
  }, [])

  const loadGastos = () => {
    setGastos(getStorageData(StorageKeys.GASTOS))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingId) {
      updateStorageItem(StorageKeys.GASTOS, editingId, formData)
      setEditingId(null)
    } else {
      addStorageItem(StorageKeys.GASTOS, formData)
    }

    setFormData({
      descricao: '',
      categoria: 'publicidade',
      valor: '',
      data: new Date().toISOString().split('T')[0],
      fornecedor: '',
      observacoes: '',
    })
    loadGastos()
  }

  const handleEdit = (gasto) => {
    setEditingId(gasto.id)
    setFormData({
      descricao: gasto.descricao || '',
      categoria: gasto.categoria || 'publicidade',
      valor: gasto.valor || '',
      data: gasto.data || new Date().toISOString().split('T')[0],
      fornecedor: gasto.fornecedor || '',
      observacoes: gasto.observacoes || '',
    })
  }

  const handleDelete = (id) => {
    if (confirm('Tem certeza que deseja excluir este gasto?')) {
      deleteStorageItem(StorageKeys.GASTOS, id)
      loadGastos()
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData({
      descricao: '',
      categoria: 'publicidade',
      valor: '',
      data: new Date().toISOString().split('T')[0],
      fornecedor: '',
      observacoes: '',
    })
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const formatCurrency = (value) => {
    if (!value) return 'R$ 0,00'
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(parseFloat(value))
  }

  const totalGastos = gastos.reduce((sum, g) => sum + (parseFloat(g.valor) || 0), 0)

  return (
    <div className="cadastro-gastos">
      <div className="cadastro-gastos__header">
        <h2 className="cadastro-gastos__title">Cadastro de Gastos</h2>
        <div className="cadastro-gastos__total">
          <span>Total de Gastos:</span>
          <strong>{formatCurrency(totalGastos)}</strong>
        </div>
      </div>

      <form className="cadastro-gastos__form" onSubmit={handleSubmit}>
        <div className="cadastro-gastos__form-row">
          <div className="cadastro-gastos__form-group">
            <label>Descrição *</label>
            <input
              type="text"
              required
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              placeholder="Ex: Anúncio em rádio"
            />
          </div>

          <div className="cadastro-gastos__form-group">
            <label>Categoria *</label>
            <select
              required
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
            >
              <option value="publicidade">Publicidade</option>
              <option value="material">Material de Campanha</option>
              <option value="eventos">Eventos</option>
              <option value="transporte">Transporte</option>
              <option value="alimentacao">Alimentação</option>
              <option value="hospedagem">Hospedagem</option>
              <option value="pessoal">Pessoal</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          <div className="cadastro-gastos__form-group">
            <label>Valor (R$) *</label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.valor}
              onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
              placeholder="Ex: 1500.00"
            />
          </div>

          <div className="cadastro-gastos__form-group">
            <label>Data *</label>
            <input
              type="date"
              required
              value={formData.data}
              onChange={(e) => setFormData({ ...formData, data: e.target.value })}
            />
          </div>

          <div className="cadastro-gastos__form-group">
            <label>Fornecedor</label>
            <input
              type="text"
              value={formData.fornecedor}
              onChange={(e) => setFormData({ ...formData, fornecedor: e.target.value })}
              placeholder="Ex: Agência XYZ"
            />
          </div>
        </div>

        <div className="cadastro-gastos__form-group">
          <label>Observações</label>
          <textarea
            value={formData.observacoes}
            onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
            placeholder="Informações adicionais sobre o gasto..."
            rows="3"
          />
        </div>

        <div className="cadastro-gastos__form-actions">
          <button type="submit" className="btn btn-primary">
            {editingId ? 'Atualizar' : 'Cadastrar'} Gasto
          </button>
          {editingId && (
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="cadastro-gastos__list">
        <h3>Gastos Cadastrados ({gastos.length})</h3>
        {gastos.length > 0 ? (
          <div className="cadastro-gastos__table">
            <div className="cadastro-gastos__table-header">
              <span>Descrição</span>
              <span>Categoria</span>
              <span>Valor</span>
              <span>Data</span>
              <span>Fornecedor</span>
              <span>Ações</span>
            </div>
            {gastos.map((gasto) => (
              <div key={gasto.id} className="cadastro-gastos__table-row">
                <span><strong>{gasto.descricao}</strong></span>
                <span>{gasto.categoria}</span>
                <span className="cadastro-gastos__valor">{formatCurrency(gasto.valor)}</span>
                <span>{formatDate(gasto.data)}</span>
                <span>{gasto.fornecedor || '-'}</span>
                <span className="cadastro-gastos__actions">
                  <button onClick={() => handleEdit(gasto)} className="btn-icon">✏️</button>
                  <button onClick={() => handleDelete(gasto.id)} className="btn-icon">🗑️</button>
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="cadastro-gastos__empty">Nenhum gasto cadastrado ainda.</p>
        )}
      </div>
    </div>
  )
}

export default CadastroGastos

