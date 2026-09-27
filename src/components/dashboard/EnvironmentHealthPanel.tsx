import React from 'react';
import { Heart } from 'lucide-react';
import { devices } from '../../data/seed';

export const EnvironmentHealthPanel: React.FC = () => {
  const normal = devices.filter(d => d.healthScore >= 80).length;
  const attention = devices.filter(d => d.healthScore >= 50 && d.healthScore < 80).length;
  const critical = devices.filter(d => d.healthScore < 50).length;
  const offline = devices.filter(d => d.status === 'offline').length;

  const total = devices.length;

  const healthData = [
    { label: 'Normal', value: normal, color: '#4ec9b0', percentage: Math.round((normal / total) * 100) },
    { label: 'Atenção', value: attention, color: '#dcdcaa', percentage: Math.round((attention / total) * 100) },
    { label: 'Crítico', value: critical, color: '#f44747', percentage: Math.round((critical / total) * 100) },
    { label: 'Offline', value: offline, color: '#6a6a6a', percentage: Math.round((offline / total) * 100) },
  ];

  return (
    <div className="bg-[#252526] border border-[#3c3c3c] rounded">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#3c3c3c]">
        <div className="flex items-center gap-2">
          <Heart size={16} className="text-[#4ec9b0]" />
          <h2 className="text-sm font-semibold text-[#cccccc]">Saúde do Parque</h2>
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-3">
          {healthData.map(item => (
            <div key={item.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[12px] text-[#969696]">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-semibold" style={{ color: item.color }}>{item.value}</span>
                  <span className="text-[10px] text-[#6a6a6a]">({item.percentage}%)</span>
                </div>
              </div>
              <div className="h-2 bg-[#3c3c3c] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-4 pt-3 border-t border-[#3c3c3c]">
          <div className="grid grid-cols-2 gap-2 text-center">
            <div>
              <div className="text-lg font-bold text-[#4ec9b0]">{Math.round((normal / total) * 100)}%</div>
              <div className="text-[10px] text-[#6a6a6a] uppercase tracking-wide">Saudáveis</div>
            </div>
            <div>
              <div className="text-lg font-bold text-[#f44747]">{critical + offline}</div>
              <div className="text-[10px] text-[#6a6a6a] uppercase tracking-wide">Requer ação</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
