import React, { useState } from 'react';
import { Activity, Wifi, Search, Filter } from 'lucide-react';
import { useLiveDevices } from '../../hooks/useLiveDevices';
import { LiveDeviceCard } from './LiveDeviceCard';
import { LiveDeviceActivity } from '../../types';

type FilterType = 'all' | 'online' | 'attention' | 'critical';

export const LiveMonitoringPanel: React.FC = () => {
  const { devices, isConnected, isDemo, lastUpdate, totalOnline } = useLiveDevices();
  const [filter, setFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');

  // Ordena dispositivos: críticos primeiro, depois atenção, depois tickets, depois normais
  const sortedDevices = [...devices].sort((a, b) => {
    // Críticos primeiro
    if (a.healthStatus === 'critical' && b.healthStatus !== 'critical') return -1;
    if (b.healthStatus === 'critical' && a.healthStatus !== 'critical') return 1;
    // Atenção
    if (a.healthStatus === 'attention' && b.healthStatus !== 'attention') return -1;
    if (b.healthStatus === 'attention' && a.healthStatus !== 'attention') return 1;
    // Online normais
    return 0;
  });

  // Aplica filtros
  const filteredDevices = sortedDevices.filter(device => {
    if (filter === 'online' && device.healthStatus !== 'online') return false;
    if (filter === 'attention' && device.healthStatus !== 'attention') return false;
    if (filter === 'critical' && device.healthStatus !== 'critical') return false;
    if (search) {
      const s = search.toLowerCase();
      if (!device.hostname.toLowerCase().includes(s) && !device.userName.toLowerCase().includes(s)) {
        return false;
      }
    }
    return true;
  });

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'Todos' },
    { key: 'online', label: 'Online' },
    { key: 'attention', label: 'Atenção' },
    { key: 'critical', label: 'Críticos' },
  ];

  return (
    <div className="bg-[#252526] border border-[#3c3c3c] rounded flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#3c3c3c]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-[#007acc]" />
            <h2 className="text-sm font-semibold text-[#cccccc]">Monitoramento ao Vivo</h2>
          </div>
          <div className="flex items-center gap-1.5 text-[10px]">
            <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-[#4ec9b0]' : 'bg-[#f44747]'}`}></div>
            <span className={isConnected ? 'text-[#4ec9b0]' : 'text-[#f44747]'}>
              {isConnected ? 'Tempo real ativo' : 'Desconectado'}
            </span>
          </div>
        </div>
        <div className="text-[11px] text-[#6a6a6a]">
          {totalOnline} computadores online
        </div>
        {isDemo && (
          <div className="text-[9px] text-[#dcdcaa] mt-1 italic">
            Dados de demonstração
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="px-4 py-2 border-b border-[#3c3c3c]">
        <div className="flex gap-1 mb-2">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-2 py-1 text-[10px] rounded transition-colors ${
                filter === f.key
                  ? 'bg-[#007acc] text-white'
                  : 'bg-[#3c3c3c] text-[#969696] hover:bg-[#4a4a4a]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-[#6a6a6a]" />
          <input
            type="text"
            placeholder="Buscar computador..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1e1e1e] border border-[#3c3c3c] rounded pl-7 pr-2 py-1 text-[11px] text-[#cccccc] placeholder-[#6a6a6a] outline-none focus:border-[#007acc]"
          />
        </div>
      </div>

      {/* Device List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {filteredDevices.length === 0 ? (
          <div className="text-center py-8 text-[#6a6a6a] text-[12px]">
            Nenhum computador encontrado.
          </div>
        ) : (
          filteredDevices.map(device => (
            <LiveDeviceCard key={device.deviceId} device={device} />
          ))
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t border-[#3c3c3c] text-[9px] text-[#6a6a6a]">
        Última atualização: {new Date(lastUpdate).toLocaleTimeString('pt-BR')}
      </div>
    </div>
  );
};
