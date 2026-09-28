import React, { useState } from 'react';
import { softwareList } from '../data/seed';
import { Badge, SectionHeader, FilterBar, SelectFilter } from '../components/ui';
import { Software } from '../types';

export const SoftwarePage: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState('');
  const [search, setSearch] = useState('');

  const filtered = softwareList.filter(s => {
    if (filterCategory && s.category !== filterCategory) return false;
    if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <SectionHeader title="Softwares e Licenças" subtitle={`${softwareList.length} softwares detectados`} />

      <FilterBar>
        <input type="text" placeholder="Buscar software..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-[#3c3c3c] text-[12px] text-[#cccccc] border border-[#4a4a4a] rounded px-2 py-1 outline-none focus:border-[#007acc] w-56" />
        <SelectFilter label="Classificação" value={filterCategory} onChange={setFilterCategory} options={[{ value: 'approved', label: 'Homologado' }, { value: 'allowed', label: 'Permitido' }, { value: 'not_approved', label: 'Não homologado' }, { value: 'prohibited', label: 'Proibido' }]} />
      </FilterBar>

      <div className="bg-[#252526] border border-[#3c3c3c] rounded overflow-hidden">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-[#3c3c3c]">
              <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Aplicação</th>
              <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Versão</th>
              <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Fabricante</th>
              <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Dispositivos</th>
              <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Classificação</th>
              <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Última detecção</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(sw => (
              <tr key={sw.id} className="border-b border-[#3c3c3c]/50 hover:bg-[#2a2d2e]">
                <td className="px-3 py-2 text-[#cccccc] font-medium">{sw.name}</td>
                <td className="px-3 py-2 text-[#969696] font-mono">{sw.version}</td>
                <td className="px-3 py-2 text-[#969696]">{sw.vendor}</td>
                <td className="px-3 py-2 text-[#cccccc]">{sw.deviceCount}</td>
                <td className="px-3 py-2"><Badge status={sw.category} /></td>
                <td className="px-3 py-2 text-[#6a6a6a] text-[11px]">{new Date(sw.lastDetected).toLocaleDateString('pt-BR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
