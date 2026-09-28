import React, { useState } from 'react';
import { remoteActions, actionExecutions, devices } from '../data/seed';
import { Badge, SectionHeader } from '../components/ui';
import { Terminal, Play, Shield, AlertTriangle } from 'lucide-react';

export const RemoteActionsPage: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [reason, setReason] = useState('');

  return (
    <div className="space-y-4">
      <SectionHeader title="Ações Remotas" subtitle="Catálogo de comandos autorizados" />

      <div className="bg-[#252526] border border-[#3c3c3c] rounded p-3 mb-3">
        <div className="flex items-center gap-2 text-[12px] text-[#dcdcaa]">
          <Shield size={14} />
          <span>Todas as ações remotas são registradas em auditoria e requerem justificativa. Nenhum shell remoto irrestrito é permitido.</span>
        </div>
      </div>

      {/* Action Catalog */}
      <div className="bg-[#252526] border border-[#3c3c3c] rounded p-3">
        <h3 className="text-[12px] text-[#969696] uppercase tracking-wide mb-3">Catálogo de Ações</h3>
        <div className="grid grid-cols-3 gap-2">
          {remoteActions.map(action => (
            <div
              key={action.id}
              className={`border rounded p-3 cursor-pointer transition-colors ${selectedAction === action.id ? 'border-[#007acc] bg-[#007acc]/5' : 'border-[#3c3c3c] hover:border-[#4a4a4a]'}`}
              onClick={() => setSelectedAction(action.id)}
            >
              <div className="flex items-center gap-2 mb-1">
                <Terminal size={14} className="text-[#007acc]" />
                <span className="text-[12px] text-[#cccccc] font-medium">{action.name}</span>
              </div>
              <p className="text-[11px] text-[#6a6a6a]">{action.description}</p>
              <span className="text-[10px] text-[#4a4a4a] mt-1 inline-block">{action.category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Execute Action */}
      {selectedAction && (
        <div className="bg-[#252526] border border-[#007acc]/30 rounded p-4">
          <h3 className="text-[12px] text-[#007acc] uppercase tracking-wide mb-3">Executar Ação</h3>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-[11px] text-[#969696] block mb-1">Dispositivo alvo</label>
              <select value={selectedDevice} onChange={(e) => setSelectedDevice(e.target.value)} className="w-full bg-[#3c3c3c] text-[12px] text-[#cccccc] border border-[#4a4a4a] rounded px-2 py-1.5 outline-none focus:border-[#007acc]">
                <option value="">Selecione um dispositivo...</option>
                {devices.filter(d => d.status === 'online').map(d => (
                  <option key={d.id} value={d.id}>{d.hostname} — {d.currentUser}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] text-[#969696] block mb-1">Justificativa</label>
              <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Motivo da execução..." className="w-full bg-[#3c3c3c] text-[12px] text-[#cccccc] border border-[#4a4a4a] rounded px-2 py-1.5 outline-none focus:border-[#007acc]" />
            </div>
          </div>
          <button className="px-4 py-1.5 bg-[#007acc] text-white text-[12px] rounded hover:bg-[#0e639c] flex items-center gap-1.5">
            <Play size={12} /> Executar ação
          </button>
        </div>
      )}

      {/* Execution History */}
      <div className="bg-[#252526] border border-[#3c3c3c] rounded p-3">
        <h3 className="text-[12px] text-[#969696] uppercase tracking-wide mb-2">Histórico de Execuções</h3>
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-[#3c3c3c]">
              <th className="text-left px-2 py-1.5 text-[11px] text-[#969696] font-medium">Data</th>
              <th className="text-left px-2 py-1.5 text-[11px] text-[#969696] font-medium">Ação</th>
              <th className="text-left px-2 py-1.5 text-[11px] text-[#969696] font-medium">Dispositivo</th>
              <th className="text-left px-2 py-1.5 text-[11px] text-[#969696] font-medium">Solicitante</th>
              <th className="text-left px-2 py-1.5 text-[11px] text-[#969696] font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {actionExecutions.map(exec => (
              <tr key={exec.id} className="border-b border-[#3c3c3c]/50 hover:bg-[#2a2d2e]">
                <td className="px-2 py-1.5 text-[#6a6a6a] font-mono">{new Date(exec.timestamp).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</td>
                <td className="px-2 py-1.5 text-[#cccccc]">{exec.actionName}</td>
                <td className="px-2 py-1.5 font-mono text-[#569cd6]">{exec.targetHostname}</td>
                <td className="px-2 py-1.5 text-[#969696]">{exec.requestedBy}</td>
                <td className="px-2 py-1.5"><Badge status={exec.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
