import React, { useState } from 'react';
import { alerts, devices } from '../data/seed';
import { Badge, DataTable, SectionHeader, FilterBar, SelectFilter, KPICard } from '../components/ui';
import { Alert } from '../types';
import { Bell, AlertTriangle, CheckCircle, Eye } from 'lucide-react';

export const AlertsPage: React.FC = () => {
  const [filterSeverity, setFilterSeverity] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [search, setSearch] = useState('');

  const filtered = alerts.filter(a => {
    if (filterSeverity && a.severity !== filterSeverity) return false;
    if (filterStatus && a.status !== filterStatus) return false;
    if (search) {
      const s = search.toLowerCase();
      if (!a.deviceHostname.toLowerCase().includes(s) && !a.message.toLowerCase().includes(s)) return false;
    }
    return true;
  });

  const newCount = alerts.filter(a => a.status === 'new').length;
  const criticalCount = alerts.filter(a => a.severity === 'critical' && a.status !== 'resolved').length;

  const columns = [
    { key: 'createdAt', label: 'Data/Hora', render: (a: Alert) => <span className="text-[11px] text-[#6a6a6a] font-mono">{new Date(a.createdAt).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</span> },
    { key: 'severity', label: 'Severidade', render: (a: Alert) => <Badge status={a.severity} /> },
    { key: 'deviceHostname', label: 'Dispositivo', render: (a: Alert) => <span className="font-mono text-[#569cd6]">{a.deviceHostname}</span> },
    { key: 'message', label: 'Mensagem', render: (a: Alert) => <span className="text-[#cccccc]">{a.message}</span> },
    { key: 'status', label: 'Status', render: (a: Alert) => <Badge status={a.status} /> },
  ];

  return (
    <div>
      <SectionHeader title="Alertas e Eventos" subtitle={`${filtered.length} alertas`} />

      <div className="grid grid-cols-4 gap-2 mb-3">
        <KPICard label="Total" value={alerts.length} icon={<Bell size={16} />} color="#cccccc" />
        <KPICard label="Novos" value={newCount} icon={<Eye size={16} />} color="#569cd6" />
        <KPICard label="Críticos ativos" value={criticalCount} icon={<AlertTriangle size={16} />} color="#f44747" />
        <KPICard label="Resolvidos" value={alerts.filter(a => a.status === 'resolved').length} icon={<CheckCircle size={16} />} color="#4ec9b0" />
      </div>

      <FilterBar>
        <input type="text" placeholder="Buscar dispositivo, mensagem..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-[#3c3c3c] text-[12px] text-[#cccccc] border border-[#4a4a4a] rounded px-2 py-1 outline-none focus:border-[#007acc] w-56" />
        <SelectFilter label="Severidade" value={filterSeverity} onChange={setFilterSeverity} options={[{ value: 'info', label: 'Informativo' }, { value: 'attention', label: 'Atenção' }, { value: 'high', label: 'Alto' }, { value: 'critical', label: 'Crítico' }]} />
        <SelectFilter label="Status" value={filterStatus} onChange={setFilterStatus} options={[{ value: 'new', label: 'Novo' }, { value: 'acknowledged', label: 'Reconhecido' }, { value: 'analyzing', label: 'Em análise' }, { value: 'resolved', label: 'Resolvido' }, { value: 'ignored', label: 'Ignorado' }]} />
      </FilterBar>

      <div className="bg-[#252526] border border-[#3c3c3c] rounded overflow-hidden">
        <DataTable columns={columns} data={filtered} />
      </div>
    </div>
  );
};
