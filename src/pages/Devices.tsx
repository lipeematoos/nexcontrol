import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { devices, secretariats } from '../data/seed';
import { Badge, DataTable, SectionHeader, FilterBar, SelectFilter } from '../components/ui';
import { Device } from '../types';

export const DevicesPage: React.FC = () => {
  const navigate = useNavigate();
  const [filterSec, setFilterSec] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterOS, setFilterOS] = useState('');
  const [search, setSearch] = useState('');

  const filtered = devices.filter(d => {
    if (filterSec && d.secretariatId !== filterSec) return false;
    if (filterStatus && d.status !== filterStatus) return false;
    if (filterOS) {
      if (filterOS === 'win11' && !d.operatingSystem.includes('11')) return false;
      if (filterOS === 'win10' && !d.operatingSystem.includes('10')) return false;
      if (filterOS === 'win7' && !d.operatingSystem.includes('7')) return false;
    }
    if (search) {
      const s = search.toLowerCase();
      if (!d.hostname.toLowerCase().includes(s) && !d.currentUser.toLowerCase().includes(s) && !d.ipAddress.includes(s)) return false;
    }
    return true;
  });

  const columns = [
    { key: 'hostname', label: 'Hostname', render: (d: Device) => <span className="font-mono text-[#569cd6]">{d.hostname}</span> },
    { key: 'currentUser', label: 'Usuário', render: (d: Device) => <span className="text-[#cccccc]">{d.currentUser}</span> },
    { key: 'secretariat', label: 'Secretaria' },
    { key: 'ipAddress', label: 'IP', render: (d: Device) => <span className="font-mono text-[#969696]">{d.ipAddress}</span> },
    { key: 'os', label: 'SO', render: (d: Device) => <span className="text-[11px]">{d.operatingSystem}</span> },
    { key: 'cpuUsage', label: 'CPU', render: (d: Device) => <span className={d.cpuUsage > 85 ? 'text-[#f44747]' : d.cpuUsage > 70 ? 'text-[#dcdcaa]' : 'text-[#4ec9b0]'}>{d.cpuUsage}%</span> },
    { key: 'ramUsage', label: 'RAM', render: (d: Device) => <span className={d.ramUsage > 85 ? 'text-[#f44747]' : d.ramUsage > 70 ? 'text-[#dcdcaa]' : 'text-[#4ec9b0]'}>{d.ramUsage}%</span> },
    { key: 'storageUsage', label: 'Disco', render: (d: Device) => <span className={d.storageUsage > 85 ? 'text-[#f44747]' : d.storageUsage > 70 ? 'text-[#dcdcaa]' : 'text-[#4ec9b0]'}>{d.storageUsage}%</span> },
    { key: 'status', label: 'Status', render: (d: Device) => <Badge status={d.status} /> },
    { key: 'lastHeartbeat', label: 'Último contato', render: (d: Device) => <span className="text-[11px] text-[#6a6a6a]">{new Date(d.lastHeartbeat).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</span> },
  ];

  return (
    <div>
      <SectionHeader title="Dispositivos" subtitle={`${filtered.length} de ${devices.length} dispositivos`} />

      <FilterBar>
        <input
          type="text"
          placeholder="Buscar hostname, usuário, IP..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[#3c3c3c] text-[12px] text-[#cccccc] border border-[#4a4a4a] rounded px-2 py-1 outline-none focus:border-[#007acc] w-56"
        />
        <SelectFilter
          label="Secretaria"
          value={filterSec}
          onChange={setFilterSec}
          options={secretariats.map(s => ({ value: s.id, label: s.shortName }))}
        />
        <SelectFilter
          label="Status"
          value={filterStatus}
          onChange={setFilterStatus}
          options={[
            { value: 'online', label: 'Online' },
            { value: 'offline', label: 'Offline' },
            { value: 'attention', label: 'Atenção' },
            { value: 'critical', label: 'Crítico' },
            { value: 'maintenance', label: 'Manutenção' },
            { value: 'no_agent', label: 'Sem agente' },
          ]}
        />
        <SelectFilter
          label="Sistema Operacional"
          value={filterOS}
          onChange={setFilterOS}
          options={[
            { value: 'win11', label: 'Windows 11' },
            { value: 'win10', label: 'Windows 10' },
            { value: 'win7', label: 'Windows 7' },
          ]}
        />
      </FilterBar>

      <div className="bg-[#252526] border border-[#3c3c3c] rounded overflow-hidden">
        <DataTable columns={columns} data={filtered} onRowClick={(d) => navigate(`/dispositivos/${d.id}`)} />
      </div>
    </div>
  );
};
