import React, { useState } from 'react';
import { auditLogs } from '../data/seed';
import { SectionHeader, FilterBar, SelectFilter } from '../components/ui';
import { FileSearch, Shield } from 'lucide-react';

export const AuditPage: React.FC = () => {
  const [filterType, setFilterType] = useState('');
  const [filterUser, setFilterUser] = useState('');

  const filtered = auditLogs.filter(log => {
    if (filterType && log.resourceType !== filterType) return false;
    if (filterUser && log.user !== filterUser) return false;
    return true;
  });

  return (
    <div>
      <SectionHeader title="Auditoria" subtitle="Log de atividades do sistema" />

      <div className="bg-[#252526] border border-[#3c3c3c] rounded p-3 mb-3">
        <div className="flex items-center gap-2 text-[12px] text-[#969696]">
          <Shield size={14} className="text-[#007acc]" />
          <span>Os registros de auditoria são imutáveis e não podem ser alterados via interface.</span>
        </div>
      </div>

      <FilterBar>
        <SelectFilter label="Tipo de recurso" value={filterType} onChange={setFilterType} options={[
          { value: 'device', label: 'Dispositivo' },
          { value: 'asset', label: 'Patrimônio' },
          { value: 'asset_movement', label: 'Movimentação' },
          { value: 'remote_action', label: 'Ação remota' },
          { value: 'alert_rule', label: 'Regra de alerta' },
          { value: 'report', label: 'Relatório' },
          { value: 'maintenance', label: 'Manutenção' },
          { value: 'alert', label: 'Alerta' },
          { value: 'settings', label: 'Configurações' },
        ]} />
        <SelectFilter label="Usuário" value={filterUser} onChange={setFilterUser} options={[
          { value: 'admin', label: 'admin' },
          { value: 'tecnico.carlos', label: 'tecnico.carlos' },
          { value: 'gestor.maria', label: 'gestor.maria' },
          { value: 'auditor.pedro', label: 'auditor.pedro' },
        ]} />
      </FilterBar>

      <div className="bg-[#252526] border border-[#3c3c3c] rounded overflow-hidden">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-[#3c3c3c]">
              <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Data/Hora</th>
              <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Usuário</th>
              <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Ação</th>
              <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Recurso</th>
              <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">IP</th>
              <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Resultado</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 40).map(log => (
              <tr key={log.id} className="border-b border-[#3c3c3c]/50 hover:bg-[#2a2d2e]">
                <td className="px-3 py-2 text-[#6a6a6a] font-mono text-[11px]">{new Date(log.timestamp).toLocaleString('pt-BR')}</td>
                <td className="px-3 py-2 text-[#cccccc] font-mono">{log.user}</td>
                <td className="px-3 py-2 text-[#cccccc]">{log.action}</td>
                <td className="px-3 py-2 text-[#969696] font-mono text-[11px]">{log.resource}</td>
                <td className="px-3 py-2 text-[#6a6a6a] font-mono">{log.ipAddress}</td>
                <td className="px-3 py-2">
                  <span className={`text-[11px] ${log.result === 'success' ? 'text-[#4ec9b0]' : 'text-[#f44747]'}`}>
                    {log.result === 'success' ? 'Sucesso' : 'Falha'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
