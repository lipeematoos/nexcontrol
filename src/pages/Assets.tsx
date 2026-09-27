import React, { useState } from 'react';
import { assets } from '../data/seed';
import { Badge, SectionHeader, KPICard } from '../components/ui';
import { Package, AlertTriangle, MapPin, Users, ArrowRightLeft, FileWarning } from 'lucide-react';

export const AssetsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const inUse = assets.filter(a => a.status === 'in_use').length;
  const available = assets.filter(a => a.status === 'available').length;
  const missing = assets.filter(a => a.status === 'missing').length;
  const maintenance = assets.filter(a => a.status === 'maintenance').length;

  const movements = [
    { id: '1', asset: 'PAT-01001', from: 'Administração', to: 'Obras', date: '2025-11-15', reason: 'Transferência por necessidade operacional', operator: 'admin' },
    { id: '2', asset: 'PAT-01023', from: 'Saúde', to: 'Educação', date: '2025-10-22', reason: 'Remanejamento', operator: 'tecnico.carlos' },
    { id: '3', asset: 'PAT-01045', from: 'Fazenda', to: 'Administração', date: '2025-09-08', reason: 'Substituição de equipamento', operator: 'gestor.maria' },
    { id: '4', asset: 'PAT-01067', from: 'Obras', to: 'Assistência Social', date: '2025-08-14', reason: 'Doação interna', operator: 'admin' },
    { id: '5', asset: 'PAT-01089', from: 'Educação', to: 'Saúde', date: '2025-07-30', reason: 'Empréstimo técnico', operator: 'tecnico.carlos' },
  ];

  const divergences = [
    { id: '1', asset: 'PAT-01012', type: 'RAM cadastrada: 8 GB — RAM detectada: 16 GB', severity: 'attention' },
    { id: '2', asset: 'PAT-01034', type: 'Equipamento sem vínculo patrimonial', severity: 'critical' },
    { id: '3', asset: 'PAT-01056', type: 'Hostname diferente do cadastrado', severity: 'attention' },
    { id: '4', asset: 'PAT-01078', type: 'Serial divergente', severity: 'critical' },
    { id: '5', asset: 'PAT-01091', type: 'Ativo não localizado na última verificação', severity: 'high' },
  ];

  const tabs = [
    { key: 'overview', label: 'Visão Geral' },
    { key: 'movements', label: 'Movimentações' },
    { key: 'divergences', label: 'Divergências' },
    { key: 'annual', label: 'Inventário Anual' },
  ];

  return (
    <div>
      <SectionHeader title="Patrimônio de TI" subtitle="Governança e conciliação patrimonial" />

      <div className="flex border-b border-[#3c3c3c] mb-4">
        {tabs.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`px-3 py-2 text-[12px] border-b-2 transition-colors ${activeTab === tab.key ? 'border-[#007acc] text-[#cccccc]' : 'border-transparent text-[#6a6a6a] hover:text-[#969696]'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            <KPICard label="Total de Ativos" value={assets.length} icon={<Package size={16} />} color="#cccccc" />
            <KPICard label="Em uso" value={inUse} icon={<Users size={16} />} color="#4ec9b0" />
            <KPICard label="Disponíveis" value={available} icon={<Package size={16} />} color="#569cd6" />
            <KPICard label="Em manutenção" value={maintenance} icon={<AlertTriangle size={16} />} color="#dcdcaa" />
            <KPICard label="Não localizados" value={missing} icon={<MapPin size={16} />} color="#f44747" />
            <KPICard label="Divergências" value={divergences.length} icon={<FileWarning size={16} />} color="#ce9178" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="bg-[#252526] border border-[#3c3c3c] rounded p-3">
              <h3 className="text-[12px] text-[#969696] uppercase tracking-wide mb-2">Distribuição por Categoria</h3>
              <div className="space-y-1.5">
                {['Desktop', 'Notebook', 'Monitor', 'Impressora', 'Servidor', 'Switch', 'Nobreak', 'Outros'].map(cat => {
                  const count = assets.filter(a => a.category === cat).length;
                  const pct = Math.round((count / assets.length) * 100);
                  return (
                    <div key={cat} className="flex items-center gap-2 text-[12px]">
                      <span className="text-[#969696] w-20">{cat}</span>
                      <div className="flex-1 h-2 bg-[#3c3c3c] rounded-full overflow-hidden">
                        <div className="h-full bg-[#007acc] rounded-full" style={{ width: `${pct}%` }}></div>
                      </div>
                      <span className="text-[#6a6a6a] w-8 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-[#252526] border border-[#3c3c3c] rounded p-3">
              <h3 className="text-[12px] text-[#969696] uppercase tracking-wide mb-2">Últimas Movimentações</h3>
              <div className="space-y-2">
                {movements.slice(0, 5).map(m => (
                  <div key={m.id} className="flex items-center gap-2 text-[12px] py-1 border-b border-[#3c3c3c]/50">
                    <span className="font-mono text-[#569cd6]">{m.asset}</span>
                    <span className="text-[#6a6a6a]">{m.from}</span>
                    <ArrowRightLeft size={10} className="text-[#4a4a4a]" />
                    <span className="text-[#969696]">{m.to}</span>
                    <span className="text-[#6a6a6a] ml-auto text-[11px]">{new Date(m.date).toLocaleDateString('pt-BR')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'movements' && (
        <div className="bg-[#252526] border border-[#3c3c3c] rounded overflow-hidden">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-[#3c3c3c]">
                <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Patrimônio</th>
                <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Origem</th>
                <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Destino</th>
                <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Data</th>
                <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Motivo</th>
                <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Operador</th>
              </tr>
            </thead>
            <tbody>
              {movements.map(m => (
                <tr key={m.id} className="border-b border-[#3c3c3c]/50 hover:bg-[#2a2d2e]">
                  <td className="px-3 py-2 font-mono text-[#569cd6]">{m.asset}</td>
                  <td className="px-3 py-2 text-[#969696]">{m.from}</td>
                  <td className="px-3 py-2 text-[#cccccc]">{m.to}</td>
                  <td className="px-3 py-2 text-[#6a6a6a]">{new Date(m.date).toLocaleDateString('pt-BR')}</td>
                  <td className="px-3 py-2 text-[#969696]">{m.reason}</td>
                  <td className="px-3 py-2 text-[#6a6a6a] font-mono">{m.operator}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'divergences' && (
        <div className="bg-[#252526] border border-[#3c3c3c] rounded overflow-hidden">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-[#3c3c3c]">
                <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Patrimônio</th>
                <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Divergência</th>
                <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Severidade</th>
              </tr>
            </thead>
            <tbody>
              {divergences.map(d => (
                <tr key={d.id} className="border-b border-[#3c3c3c]/50 hover:bg-[#2a2d2e]">
                  <td className="px-3 py-2 font-mono text-[#569cd6]">{d.asset}</td>
                  <td className="px-3 py-2 text-[#cccccc]">{d.type}</td>
                  <td className="px-3 py-2"><Badge status={d.severity} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'annual' && (
        <div className="space-y-3">
          <div className="bg-[#252526] border border-[#3c3c3c] rounded p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-[#cccccc]">Inventário Anual 2026</h3>
              <Badge status="in_maintenance" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="text-center p-3 bg-[#1e1e1e] rounded border border-[#3c3c3c]">
                <div className="text-2xl font-bold text-[#cccccc]">{assets.length}</div>
                <div className="text-[11px] text-[#6a6a6a]">Total esperado</div>
              </div>
              <div className="text-center p-3 bg-[#1e1e1e] rounded border border-[#3c3c3c]">
                <div className="text-2xl font-bold text-[#4ec9b0]">52</div>
                <div className="text-[11px] text-[#6a6a6a]">Confirmados auto</div>
              </div>
              <div className="text-center p-3 bg-[#1e1e1e] rounded border border-[#3c3c3c]">
                <div className="text-2xl font-bold text-[#569cd6]">18</div>
                <div className="text-[11px] text-[#6a6a6a]">Confirmados manual</div>
              </div>
              <div className="text-center p-3 bg-[#1e1e1e] rounded border border-[#3c3c3c]">
                <div className="text-2xl font-bold text-[#f44747]">8</div>
                <div className="text-[11px] text-[#6a6a6a]">Não localizados</div>
              </div>
              <div className="text-center p-3 bg-[#1e1e1e] rounded border border-[#3c3c3c]">
                <div className="text-2xl font-bold text-[#dcdcaa]">7</div>
                <div className="text-[11px] text-[#6a6a6a]">Com divergência</div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="px-3 py-1.5 bg-[#007acc] text-white text-[12px] rounded hover:bg-[#0e639c]">Iniciar inventário</button>
              <button className="px-3 py-1.5 bg-[#3c3c3c] text-[#cccccc] text-[12px] rounded hover:bg-[#4a4a4a]">Exportar relatório</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
