import React, { useState } from 'react';
import { assets } from '../data/seed';
import { Badge, DataTable, SectionHeader, FilterBar, SelectFilter } from '../components/ui';
import { ITAsset } from '../types';

export const InventoryPage: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterSec, setFilterSec] = useState('');
  const [search, setSearch] = useState('');

  const categories = [...new Set(assets.map(a => a.category))];

  const filtered = assets.filter(a => {
    if (filterCategory && a.category !== filterCategory) return false;
    if (filterStatus && a.status !== filterStatus) return false;
    if (filterSec && a.secretariat !== filterSec) return false;
    if (search) {
      const s = search.toLowerCase();
      if (!a.assetNumber.toLowerCase().includes(s) && !a.manufacturer.toLowerCase().includes(s) && !a.model.toLowerCase().includes(s) && !a.serialNumber.toLowerCase().includes(s)) return false;
    }
    return true;
  });

  const columns = [
    { key: 'assetNumber', label: 'Patrimônio', render: (a: ITAsset) => <span className="font-mono text-[#569cd6]">{a.assetNumber}</span> },
    { key: 'category', label: 'Categoria' },
    { key: 'manufacturer', label: 'Fabricante' },
    { key: 'model', label: 'Modelo' },
    { key: 'serialNumber', label: 'Nº Série', render: (a: ITAsset) => <span className="font-mono text-[11px] text-[#969696]">{a.serialNumber}</span> },
    { key: 'secretariat', label: 'Secretaria' },
    { key: 'building', label: 'Local' },
    { key: 'responsible', label: 'Responsável' },
    { key: 'status', label: 'Status', render: (a: ITAsset) => <Badge status={a.status} /> },
  ];

  return (
    <div>
      <SectionHeader title="Inventário de TI" subtitle={`${filtered.length} de ${assets.length} ativos`} />
      <FilterBar>
        <input type="text" placeholder="Buscar patrimônio, fabricante, modelo..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-[#3c3c3c] text-[12px] text-[#cccccc] border border-[#4a4a4a] rounded px-2 py-1 outline-none focus:border-[#007acc] w-56" />
        <SelectFilter label="Categoria" value={filterCategory} onChange={setFilterCategory} options={categories.map(c => ({ value: c, label: c }))} />
        <SelectFilter label="Status" value={filterStatus} onChange={setFilterStatus} options={[{ value: 'in_use', label: 'Em uso' }, { value: 'available', label: 'Disponível' }, { value: 'maintenance', label: 'Manutenção' }, { value: 'retired', label: 'Retirado' }, { value: 'missing', label: 'Não localizado' }]} />
        <SelectFilter label="Secretaria" value={filterSec} onChange={setFilterSec} options={['ADM', 'OBRAS', 'SAUDE', 'EDUC', 'FINAN', 'ASIST'].map(s => ({ value: s, label: s }))} />
      </FilterBar>
      <div className="bg-[#252526] border border-[#3c3c3c] rounded overflow-hidden">
        <DataTable columns={columns} data={filtered} />
      </div>
    </div>
  );
};
