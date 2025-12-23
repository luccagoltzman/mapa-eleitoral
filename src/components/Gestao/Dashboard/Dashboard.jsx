import { useState, useEffect } from 'react'
import { getStorageData, StorageKeys } from '../../../utils/storage'
import './Dashboard.scss'

function Dashboard() {
  const [stats, setStats] = useState({
    totalVotos: 0,
    totalPasseatas: 0,
    totalCampanhas: 0,
    totalGastos: 0,
    ultimosVotos: [],
    proximasPasseatas: [],
    campanhasAtivas: [],
  })

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = () => {
    const votos = getStorageData(StorageKeys.VOTOS)
    const passeatas = getStorageData(StorageKeys.PASSEATAS)
    const campanhas = getStorageData(StorageKeys.CAMPANHAS)
    const gastos = getStorageData(StorageKeys.GASTOS)

    const totalVotos = votos.reduce((sum, v) => sum + (parseFloat(v.quantidade) || 0), 0)
    const totalGastos = gastos.reduce((sum, g) => sum + (parseFloat(g.valor) || 0), 0)

    const agora = new Date()
    const proximasPasseatas = passeatas
      .filter(p => new Date(p.data) >= agora)
      .sort((a, b) => new Date(a.data) - new Date(b.data))
      .slice(0, 5)

    const campanhasAtivas = campanhas.filter(c => c.status === 'ativa').slice(0, 5)

    const ultimosVotos = votos
      .sort((a, b) => new Date(b.createdAt || b.data) - new Date(a.createdAt || a.data))
      .slice(0, 5)

    setStats({
      totalVotos,
      totalPasseatas: passeatas.length,
      totalCampanhas: campanhas.length,
      totalGastos,
      ultimosVotos,
      proximasPasseatas,
      campanhasAtivas,
    })
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  return (
    <div className="dashboard">
      <h2 className="dashboard__title">Dashboard - Visão Geral</h2>

      <div className="dashboard__cards">
        <div className="dashboard__card">
          <div className="dashboard__card-icon">🗳️</div>
          <div className="dashboard__card-content">
            <h3>Total de Votos</h3>
            <p className="dashboard__card-value">{stats.totalVotos.toLocaleString('pt-BR')}</p>
          </div>
        </div>

        <div className="dashboard__card">
          <div className="dashboard__card-icon">🚶</div>
          <div className="dashboard__card-content">
            <h3>Passeatas</h3>
            <p className="dashboard__card-value">{stats.totalPasseatas}</p>
          </div>
        </div>

        <div className="dashboard__card">
          <div className="dashboard__card-icon">📢</div>
          <div className="dashboard__card-content">
            <h3>Campanhas</h3>
            <p className="dashboard__card-value">{stats.totalCampanhas}</p>
          </div>
        </div>

        <div className="dashboard__card">
          <div className="dashboard__card-icon">💰</div>
          <div className="dashboard__card-content">
            <h3>Total Gastos</h3>
            <p className="dashboard__card-value">{formatCurrency(stats.totalGastos)}</p>
          </div>
        </div>
      </div>

      <div className="dashboard__sections">
        <div className="dashboard__section">
          <h3>Últimos Votos Cadastrados</h3>
          {stats.ultimosVotos.length > 0 ? (
            <div className="dashboard__list">
              {stats.ultimosVotos.map((voto) => (
                <div key={voto.id} className="dashboard__list-item">
                  <span><strong>{voto.quantidade}</strong> votos</span>
                  <span>{voto.zona || voto.local}</span>
                  <span>{formatDate(voto.data || voto.createdAt)}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="dashboard__empty">Nenhum voto cadastrado ainda.</p>
          )}
        </div>

        <div className="dashboard__section">
          <h3>Próximas Passeatas</h3>
          {stats.proximasPasseatas.length > 0 ? (
            <div className="dashboard__list">
              {stats.proximasPasseatas.map((passeata) => (
                <div key={passeata.id} className="dashboard__list-item">
                  <span><strong>{passeata.nome}</strong></span>
                  <span>{passeata.local}</span>
                  <span>{formatDate(passeata.data)}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="dashboard__empty">Nenhuma passeata agendada.</p>
          )}
        </div>

        <div className="dashboard__section">
          <h3>Campanhas Ativas</h3>
          {stats.campanhasAtivas.length > 0 ? (
            <div className="dashboard__list">
              {stats.campanhasAtivas.map((campanha) => (
                <div key={campanha.id} className="dashboard__list-item">
                  <span><strong>{campanha.nome}</strong></span>
                  <span>{campanha.tipo}</span>
                  <span>{formatDate(campanha.dataInicio)}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="dashboard__empty">Nenhuma campanha ativa.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

