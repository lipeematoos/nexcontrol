import React from 'react';
import { devices } from '../data/seed';
import { SectionHeader, KPICard, Badge } from '../components/ui';
import { HeartPulse, Activity, AlertTriangle, CheckCircle } from 'lucide-react';

export const HealthPage: React.FC = () => {
  const healthy = devices.filter(d => d.healthScore >= 80).length;
  const attention = devices.filter(d => d.healthScore >= 50 && d.healthScore < 80).length;
  const critical = devices.filter(d => d.healthScore < 50).length;

  const sortedByHealth = [...devices].sort((a, b) => a.healthScore - b.healthScore).slice(0, 20);

  return (
    <div className="space-y-4">
      <SectionHeader title="Saúde dos Equipamentos" subtitle="Score de saúde de todos os endpoints" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <KPICard label="Saudáveis" value={healthy} icon={<CheckCircle size={16} />} color="#4ec9b0" />
        <KPICard label="Atenção" value={attention} icon={<AlertTriangle size={16} />} color="#dcdcaa" />
        <KPICard label="Críticos" value={critical} icon={<Activity size={16} />} color="#f44747" />
        <KPICard label="Total" value={devices.length} icon={<HeartPulse size={16} />} color="#cccccc" />
      </div>

      <div className="bg-[#252526] border border-[#3c3c3c] rounded p-3">
        <h3 className="text-[12px] text-[#969696] uppercase tracking-wide mb-3">Equipamentos com menor score de saúde</h3>
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-[#3c3c3c]">
              <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Hostname</th>
              <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Secretaria</th>
              <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">CPU</th>
              <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">RAM</th>
              <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Disco</th>
              <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Status</th>
              <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Score</th>
            </tr>
          </thead>
          <tbody>
            {sortedByHealth.map(d => (
              <tr key={d.id} className="border-b border-[#3c3c3c]/50 hover:bg-[#2a2d2e]">
                <td className="px-3 py-2 font-mono text-[#569cd6]">{d.hostname}</td>
                <td className="px-3 py-2 text-[#969696]">{d.secretariat}</td>
                <td className="px-3 py-2"><span className={d.cpuUsage > 85 ? 'text-[#f44747]' : d.cpuUsage > 70 ? 'text-[#dcdcaa]' : 'text-[#4ec9b0]'}>{d.cpuUsage}%</span></td>
                <td className="px-3 py-2"><span className={d.ramUsage > 85 ? 'text-[#f44747]' : d.ramUsage > 70 ? 'text-[#dcdcaa]' : 'text-[#4ec9b0]'}>{d.ramUsage}%</span></td>
                <td className="px-3 py-2"><span className={d.storageUsage > 85 ? 'text-[#f44747]' : d.storageUsage > 70 ? 'text-[#dcdcaa]' : 'text-[#4ec9b0]'}>{d.storageUsage}%</span></td>
                <td className="px-3 py-2"><Badge status={d.status} /></td>
                <td className="px-3 py-2">
                  <span className={`font-bold ${d.healthScore >= 80 ? 'text-[#4ec9b0]' : d.healthScore >= 50 ? 'text-[#dcdcaa]' : 'text-[#f44747]'}`}>
                    {d.healthScore}
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
