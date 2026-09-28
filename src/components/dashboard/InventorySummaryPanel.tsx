import React from 'react';
import { Package, CheckCircle, AlertTriangle, MapPin, RefreshCw } from 'lucide-react';
import { assets } from '../../data/seed';

export const InventorySummaryPanel: React.FC = () => {
  const totalAssets = assets.length;
  const withDevice = assets.filter(a => a.deviceId).length;
  const compliance = Math.round((withDevice / totalAssets) * 100);
  const divergences = 31; // Simulado
  const missing = assets.filter(a => a.status === 'missing').length;
  const oldAssets = assets.filter(a => {
    const year = new Date(a.acquisitionDate).getFullYear();
    return year <= 2020;
  }).length;

  const indicators = [
    { label: 'Ativos de TI', value: totalAssets, icon: Package, color: '#cccccc' },
    { label: 'Inventário conciliado', value: `${compliance}%`, icon: CheckCircle, color: '#4ec9b0' },
    { label: 'Divergências', value: divergences, icon: AlertTriangle, color: '#dcdcaa' },
    { label: 'Não localizados', value: missing, icon: MapPin, color: '#f44747' },
    { label: 'Possível substituição', value: oldAssets, icon: RefreshCw, color: '#ce9178' },
  ];

  return (
    <div className="bg-[#252526] border border-[#3c3c3c] rounded">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#3c3c3c]">
        <div className="flex items-center gap-2">
          <Package size={16} className="text-[#ce9178]" />
          <h2 className="text-sm font-semibold text-[#cccccc]">Indicadores de Inventário</h2>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-5 gap-3">
          {indicators.map(indicator => {
            const Icon = indicator.icon;
            return (
              <div key={indicator.label} className="text-center">
                <Icon size={16} className="mx-auto mb-1" style={{ color: indicator.color }} />
                <div className="text-lg font-bold" style={{ color: indicator.color }}>
                  {indicator.value}
                </div>
                <div className="text-[9px] text-[#6a6a6a] uppercase tracking-wide leading-tight">
                  {indicator.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
