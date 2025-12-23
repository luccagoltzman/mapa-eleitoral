import { useState, useEffect } from 'react'
import { getStorageData, addStorageItem, deleteStorageItem, StorageKeys } from '../../../utils/storage'
import './Pesquisas.scss'

function Pesquisas() {
  const [pesquisas, setPesquisas] = useState([])
  const [votosCadastrados, setVotosCadastrados] = useState([])
  const [showImportForm, setShowImportForm] = useState(false)
  const [formData, setFormData] = useState({
    orgao: '',
    data: new Date().toISOString().split('T')[0],
    tipo: 'eleitoral',
    zona: '',
    votos: '',
    percentual: '',
    eleitores: '',
    observacoes: '',
  })
  const [comparacao, setComparacao] = useState(null)
  const [pesquisaSelecionada, setPesquisaSelecionada] = useState(null)

  useEffect(() => {
    loadPesquisas()
    loadVotosCadastrados()
  }, [])

  const loadPesquisas = () => {
    setPesquisas(getStorageData(StorageKeys.PESQUISAS))
  }

  const loadVotosCadastrados = () => {
    setVotosCadastrados(getStorageData(StorageKeys.VOTOS))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addStorageItem(StorageKeys.PESQUISAS, formData)
    setFormData({
      orgao: '',
      data: new Date().toISOString().split('T')[0],
      tipo: 'eleitoral',
      zona: '',
      votos: '',
      percentual: '',
      eleitores: '',
      observacoes: '',
    })
    setShowImportForm(false)
    loadPesquisas()
  }

  const handleFileImport = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const text = event.target.result
        const lines = text.split('\n')
        const headers = lines[0].split(',').map(h => h.trim())
        
        const imported = []
        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue
          const values = lines[i].split(',').map(v => v.trim())
          const pesquisa = {
            orgao: values[headers.indexOf('orgao')] || 'Importado',
            data: values[headers.indexOf('data')] || new Date().toISOString().split('T')[0],
            tipo: values[headers.indexOf('tipo')] || 'eleitoral',
            zona: values[headers.indexOf('zona')] || '',
            votos: values[headers.indexOf('votos')] || '',
            percentual: values[headers.indexOf('percentual')] || '',
            eleitores: values[headers.indexOf('eleitores')] || '',
            observacoes: values[headers.indexOf('observacoes')] || '',
          }
          imported.push(pesquisa)
        }

        imported.forEach(p => addStorageItem(StorageKeys.PESQUISAS, p))
        loadPesquisas()
        alert(`${imported.length} pesquisa(s) importada(s) com sucesso!`)
      } catch (error) {
        alert('Erro ao importar arquivo. Verifique o formato CSV.')
        console.error(error)
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const handleComparar = (pesquisa) => {
    setPesquisaSelecionada(pesquisa)
    
    // Encontrar votos cadastrados na mesma zona
    const votosNaZona = votosCadastrados.filter(v => 
      v.zona && pesquisa.zona && 
      v.zona.toLowerCase().includes(pesquisa.zona.toLowerCase())
    )

    if (votosNaZona.length === 0) {
      setComparacao({
        pesquisa,
        votosEncontrados: [],
        diferenca: null,
        mensagem: 'Nenhum voto cadastrado encontrado para esta zona.'
      })
      return
    }

    const totalVotosCadastrados = votosNaZona.reduce((sum, v) => 
      sum + (parseFloat(v.quantidade) || 0), 0
    )
    const votosPesquisa = parseFloat(pesquisa.votos) || 0
    const diferenca = votosPesquisa - totalVotosCadastrados
    const diferencaPercentual = pesquisa.percentual 
      ? (parseFloat(pesquisa.percentual) - (totalVotosCadastrados / (parseFloat(pesquisa.eleitores) || 1) * 100))
      : null

    setComparacao({
      pesquisa,
      votosEncontrados: votosNaZona,
      totalVotosCadastrados,
      diferenca,
      diferencaPercentual,
      mensagem: null
    })
  }

  const handleAplicarCorrecao = () => {
    if (!comparacao || !comparacao.pesquisa) return

    const confirmacao = confirm(
      `Deseja atualizar os votos cadastrados com base na pesquisa?\n\n` +
      `Pesquisa: ${comparacao.pesquisa.votos} votos\n` +
      `Cadastrado: ${comparacao.totalVotosCadastrados} votos\n` +
      `Diferença: ${comparacao.diferenca > 0 ? '+' : ''}${comparacao.diferenca} votos`
    )

    if (confirmacao) {
      // Aqui você poderia atualizar os votos cadastrados
      // Por enquanto, apenas mostra uma mensagem
      alert('Funcionalidade de correção automática será implementada em breve.')
    }
  }

  const handleDelete = (id) => {
    if (confirm('Tem certeza que deseja excluir esta pesquisa?')) {
      deleteStorageItem(StorageKeys.PESQUISAS, id)
      loadPesquisas()
      if (pesquisaSelecionada?.id === id) {
        setPesquisaSelecionada(null)
        setComparacao(null)
      }
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  return (
    <div className="pesquisas">
      <div className="pesquisas__header">
        <h2 className="pesquisas__title">Pesquisas Eleitorais</h2>
        <div className="pesquisas__actions">
          <label className="btn btn-secondary">
            📁 Importar CSV
            <input
              type="file"
              accept=".csv"
              onChange={handleFileImport}
              style={{ display: 'none' }}
            />
          </label>
          <button
            className="btn btn-primary"
            onClick={() => setShowImportForm(!showImportForm)}
          >
            ➕ Adicionar Pesquisa
          </button>
        </div>
      </div>

      {showImportForm && (
        <form className="pesquisas__form" onSubmit={handleSubmit}>
          <h3>Cadastrar Nova Pesquisa</h3>
          <div className="pesquisas__form-row">
            <div className="pesquisas__form-group">
              <label>Órgão/Instituto *</label>
              <input
                type="text"
                required
                value={formData.orgao}
                onChange={(e) => setFormData({ ...formData, orgao: e.target.value })}
                placeholder="Ex: Datafolha, Ibope, etc."
              />
            </div>

            <div className="pesquisas__form-group">
              <label>Data da Pesquisa *</label>
              <input
                type="date"
                required
                value={formData.data}
                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
              />
            </div>

            <div className="pesquisas__form-group">
              <label>Tipo *</label>
              <select
                required
                value={formData.tipo}
                onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
              >
                <option value="eleitoral">Eleitoral</option>
                <option value="intencao">Intenção de Voto</option>
                <option value="rejeicao">Rejeição</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div className="pesquisas__form-group">
              <label>Zona Eleitoral</label>
              <input
                type="text"
                value={formData.zona}
                onChange={(e) => setFormData({ ...formData, zona: e.target.value })}
                placeholder="Ex: Zona 001"
              />
            </div>

            <div className="pesquisas__form-group">
              <label>Votos *</label>
              <input
                type="number"
                required
                value={formData.votos}
                onChange={(e) => setFormData({ ...formData, votos: e.target.value })}
                placeholder="Ex: 15000"
              />
            </div>

            <div className="pesquisas__form-group">
              <label>Percentual (%)</label>
              <input
                type="number"
                step="0.1"
                value={formData.percentual}
                onChange={(e) => setFormData({ ...formData, percentual: e.target.value })}
                placeholder="Ex: 45.5"
              />
            </div>

            <div className="pesquisas__form-group">
              <label>Total de Eleitores</label>
              <input
                type="number"
                value={formData.eleitores}
                onChange={(e) => setFormData({ ...formData, eleitores: e.target.value })}
                placeholder="Ex: 33000"
              />
            </div>
          </div>

          <div className="pesquisas__form-group">
            <label>Observações</label>
            <textarea
              value={formData.observacoes}
              onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
              placeholder="Informações adicionais sobre a pesquisa..."
              rows="3"
            />
          </div>

          <div className="pesquisas__form-actions">
            <button type="submit" className="btn btn-primary">
              Salvar Pesquisa
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowImportForm(false)}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="pesquisas__content">
        <div className="pesquisas__list">
          <h3>Pesquisas Importadas ({pesquisas.length})</h3>
          {pesquisas.length > 0 ? (
            <div className="pesquisas__table">
              <div className="pesquisas__table-header">
                <span>Órgão</span>
                <span>Data</span>
                <span>Zona</span>
                <span>Votos</span>
                <span>Percentual</span>
                <span>Ações</span>
              </div>
              {pesquisas.map((pesquisa) => (
                <div key={pesquisa.id} className="pesquisas__table-row">
                  <span><strong>{pesquisa.orgao}</strong></span>
                  <span>{formatDate(pesquisa.data)}</span>
                  <span>{pesquisa.zona || '-'}</span>
                  <span>{parseInt(pesquisa.votos || 0).toLocaleString('pt-BR')}</span>
                  <span>{pesquisa.percentual ? `${pesquisa.percentual}%` : '-'}</span>
                  <span className="pesquisas__actions">
                    <button
                      onClick={() => handleComparar(pesquisa)}
                      className="btn-icon"
                      title="Comparar"
                    >
                      🔍
                    </button>
                    <button
                      onClick={() => handleDelete(pesquisa.id)}
                      className="btn-icon"
                      title="Excluir"
                    >
                      🗑️
                    </button>
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="pesquisas__empty">Nenhuma pesquisa importada ainda.</p>
          )}
        </div>

        {comparacao && (
          <div className="pesquisas__comparacao">
            <h3>Comparação de Dados</h3>
            
            {comparacao.mensagem ? (
              <p className="pesquisas__mensagem">{comparacao.mensagem}</p>
            ) : (
              <>
                <div className="pesquisas__comparacao-cards">
                  <div className="pesquisas__card">
                    <h4>📊 Pesquisa Externa</h4>
                    <p><strong>Órgão:</strong> {comparacao.pesquisa.orgao}</p>
                    <p><strong>Data:</strong> {formatDate(comparacao.pesquisa.data)}</p>
                    <p><strong>Zona:</strong> {comparacao.pesquisa.zona || '-'}</p>
                    <p className="pesquisas__valor">
                      <strong>Votos:</strong> {parseInt(comparacao.pesquisa.votos || 0).toLocaleString('pt-BR')}
                    </p>
                    {comparacao.pesquisa.percentual && (
                      <p className="pesquisas__valor">
                        <strong>Percentual:</strong> {comparacao.pesquisa.percentual}%
                      </p>
                    )}
                  </div>

                  <div className="pesquisas__card">
                    <h4>📝 Dados Cadastrados</h4>
                    <p><strong>Zona:</strong> {comparacao.pesquisa.zona || '-'}</p>
                    <p><strong>Registros Encontrados:</strong> {comparacao.votosEncontrados.length}</p>
                    <p className="pesquisas__valor">
                      <strong>Total de Votos:</strong> {comparacao.totalVotosCadastrados.toLocaleString('pt-BR')}
                    </p>
                  </div>

                  <div className={`pesquisas__card ${comparacao.diferenca >= 0 ? 'diferenca-positiva' : 'diferenca-negativa'}`}>
                    <h4>⚖️ Diferença</h4>
                    <p className="pesquisas__diferenca">
                      <strong>
                        {comparacao.diferenca > 0 ? '+' : ''}
                        {comparacao.diferenca.toLocaleString('pt-BR')} votos
                      </strong>
                    </p>
                    {comparacao.diferencaPercentual !== null && (
                      <p className="pesquisas__diferenca">
                        <strong>
                          {comparacao.diferencaPercentual > 0 ? '+' : ''}
                          {comparacao.diferencaPercentual.toFixed(2)}%
                        </strong>
                      </p>
                    )}
                    <p className="pesquisas__interpretacao">
                      {comparacao.diferenca > 0 
                        ? 'A pesquisa indica mais votos do que o cadastrado.'
                        : comparacao.diferenca < 0
                        ? 'O cadastrado tem mais votos do que a pesquisa indica.'
                        : 'Os valores são idênticos.'}
                    </p>
                  </div>
                </div>

                {comparacao.votosEncontrados.length > 0 && (
                  <div className="pesquisas__detalhes">
                    <h4>Detalhes dos Votos Cadastrados</h4>
                    <div className="pesquisas__detalhes-list">
                      {comparacao.votosEncontrados.map((voto) => (
                        <div key={voto.id} className="pesquisas__detalhe-item">
                          <span><strong>{parseInt(voto.quantidade || 0).toLocaleString('pt-BR')}</strong> votos</span>
                          <span>{voto.local || '-'}</span>
                          <span>{formatDate(voto.data)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pesquisas__acoes">
                  <button
                    onClick={handleAplicarCorrecao}
                    className="btn btn-primary"
                  >
                    ✅ Aplicar Correção
                  </button>
                  <button
                    onClick={() => {
                      setComparacao(null)
                      setPesquisaSelecionada(null)
                    }}
                    className="btn btn-secondary"
                  >
                    Fechar
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Pesquisas

