import React from 'react';
import { devices, assets } from '../data/seed';
import { SectionHeader, KPICard } from '../components/ui';
import { Building2, CheckCircle, AlertTriangle, XCircle, TrendingUp } from 'lucide-react';

export const GovernancePage: React.FC = () => {
  const totalAssets = assets.length;
  const withDevice = assets.filter(a => a.deviceId).length;
  const compliance = Math.round((withDevice / totalAssets) * 100);

  return (
    <div className="space-y-4">
      <SectionHeader title="Governança" subtitle="Controle e conformidade do parque de TI" />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        <KPICard label="Total de Ativos" value={totalAssets} icon={<Building2 size={16} />} color="#cccccc" />
        <KPICard label="Com vínculo técnico" value={withDevice} icon={<CheckCircle size={16} />} color="#4ec9b0" />
        <KPICard label="Sem vínculo" value={totalAssets - withDevice} icon={<AlertTriangle size={16} />} color="#dcdcaa" />
        <KPICard label="Conformidade" value={`${compliance}%`} icon={<TrendingUp size={16} />} color="#569cd6" />
        <KPICard label="Não localizados" value={assets.filter(a => a.status === 'missing').length} icon={<XCircle size={16} />} color="#f44747" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="bg-[#252526] border border-[#3c3c3c] rounded p-4">
          <h3 className="text-[12px] text-[#969696] uppercase tracking-wide mb-3">Conformidade por Secretaria</h3>
          <div className="space-y-2">
            {['ADM', 'OBRAS', 'SAUDE', 'EDUC', 'FINAN', 'ASIST'].map(sec => {
              const secAssets = assets.filter(a => a.secretariat === sec);
              const secWithDevice = secAssets.filter(a => a.deviceId).length;
              const pct = secAssets.length > 0 ? Math.round((secWithDevice / secAssets.length) * 100) : 0;
              return (
                <div key={sec} className="flex items-center gap-3">
                  <span className="text-[12px] text-[#969696] w-12">{sec}</span>
                  <div className="flex-1 h-2 bg-[#3c3c3c] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: pct > 80 ? '#4ec9b0' : pct > 50 ? '#dcdcaa' : '#f44747' }}></div>
                  </div>
                  <span className="text-[11px] text-[#6a6a6a] w-10 text-right">{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-[#252526] border border-[#3c3c3c] rounded p-4">
          <h3 className="text-[12px] text-[#969696] uppercase tracking-wide mb-3">Indicadores de Governança</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-[#3c3c3c]/50">
              <span className="text-[12px] text-[#969696]">Ativos com agente instalado</span>
              <span className="text-[12px] text-[#4ec9b0]">{devices.filter(d => d.agentVersion).length} / {devices.length}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[#3c3c3c]/50">
              <span className="text-[12px] text-[#969696]">Dispositivos online agora</span>
              <span className="text-[12px] text-[#4ec9b0]">{devices.filter(d => d.status === 'online').length}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[#3c3c3c]/50">
              <span className="text-[12px] text-[#969696]">Software não homologado</span>
              <span className="text-[12px] text-[#f44747]">3 instalações</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[#3c3c3c]/50">
              <span className="text-[12px] text-[#969696]">Ativos sem localização definida</span>
              <span className="text-[12px] text-[#dcdcaa]">12</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[#3c3c3c]/50">
              <span className="text-[12px] text-[#969696]">Último inventário completo</span>
              <span className="text-[12px] text-[#969696]">15/03/2025</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-[12px] text-[#969696]">Próximo inventário anual</span>
              <span className="text-[12px] text-[#569cd6]">Março/2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
