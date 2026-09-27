import React, { useState } from 'react';
import { maintenances } from '../data/seed';
import { Badge, SectionHeader, FilterBar, SelectFilter } from '../components/ui';
import { Maintenance } from '../types';
import { Wrench } from 'lucide-react';

export const MaintenancePage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('');

  const filtered = maintenances.filter(m => !filterStatus || m.status === filterStatus);

  return (
    <div>
      <SectionHeader title="Manutenções" subtitle={`${maintenances.length} registros`} />

      <FilterBar>
        <SelectFilter label="Status" value={filterStatus} onChange={setFilterStatus} options={[
          { value: 'open', label: 'Aberta' },
          { value: 'analyzing', label: 'Em análise' },
          { value: 'in_maintenance', label: 'Em manutenção' },
          { value: 'awaiting_part', label: 'Aguardando peça' },
          { value: 'awaiting_supplier', label: 'Aguardando fornecedor' },
          { value: 'completed', label: 'Concluída' },
        ]} />
      </FilterBar>

      <div className="bg-[#252526] border border-[#3c3c3c] rounded overflow-hidden">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-[#3c3c3c]">
              <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Dispositivo</th>
              <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Tipo</th>
              <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Problema</th>
              <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Técnico</th>
              <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Abertura</th>
              <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Custo</th>
              <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(m => (
              <tr key={m.id} className="border-b border-[#3c3c3c]/50 hover:bg-[#2a2d2e]">
                <td className="px-3 py-2 font-mono text-[#569cd6]">{m.deviceHostname}</td>
                <td className="px-3 py-2 text-[#cccccc]">{m.type}</td>
                <td className="px-3 py-2 text-[#969696] truncate max-w-[200px]">{m.problem}</td>
                <td className="px-3 py-2 text-[#969696]">{m.technician}</td>
                <td className="px-3 py-2 text-[#6a6a6a]">{new Date(m.openingDate).toLocaleDateString('pt-BR')}</td>
                <td className="px-3 py-2 text-[#cccccc]">R$ {m.cost.toLocaleString('pt-BR')}</td>
                <td className="px-3 py-2"><Badge status={m.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
