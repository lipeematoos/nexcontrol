import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LiveDeviceActivity } from '../../types';
import { Badge, ProgressBar } from '../ui';
import { Monitor, Eye, Activity, Clock, X } from 'lucide-react';
import { Drawer } from '../ui/Drawer';

interface LiveDeviceCardProps {
  device: LiveDeviceActivity;
}

export const LiveDeviceCard: React.FC<LiveDeviceCardProps> = ({ device }) => {
  const navigate = useNavigate();
  const [showActivity, setShowActivity] = useState(false);

  // Calcula tempo ativo
  const activeMinutes = Math.floor((Date.now() - new Date(device.activeSince).getTime()) / 60000);
  const activeText = activeMinutes < 60 ? `${activeMinutes} min` : `${Math.floor(activeMinutes / 60)}h ${activeMinutes % 60}min`;

  // Gera atividade simulada (futuramente virá do agente)
  const recentActivity = [
    { time: '18:42', app: device.applicationName },
    { time: '18:23', app: 'NEXUNITAS' },
    { time: '17:51', app: 'Microsoft Word' },
    { time: '17:36', app: 'Windows Explorer' },
    { time: '17:12', app: 'Google Chrome' },
  ];

  return (
    <>
      <div className="bg-[#1e1e1e] border border-[#3c3c3c] rounded p-3 hover:border-[#007acc]/50 transition-colors">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-mono text-[#569cd6] text-[12px] font-semibold truncate">{device.hostname}</span>
              <Badge status={device.healthStatus} />
            </div>
            <div className="text-[10px] text-[#6a6a6a] truncate">
              {device.userName} • {device.secretariatName}
            </div>
          </div>
        </div>

        {/* Current Application */}
        <div className="mb-2 py-1.5 px-2 bg-[#252526] rounded border border-[#3c3c3c]/50">
          <div className="text-[9px] text-[#6a6a6a] uppercase tracking-wide mb-0.5">Aplicação atual</div>
          <div className="text-[11px] text-[#cccccc] truncate">{device.applicationName}</div>
        </div>

        {/* Metrics */}
        <div className="space-y-1.5 mb-2">
          <div className="flex items-center gap-2 text-[10px]">
            <span className="text-[#6a6a6a] w-8">CPU</span>
            <ProgressBar value={Math.round(device.cpuUsage)} />
          </div>
          <div className="flex items-center gap-2 text-[10px]">
            <span className="text-[#6a6a6a] w-8">RAM</span>
            <ProgressBar value={Math.round(device.memoryUsage)} />
          </div>
          <div className="flex items-center gap-2 text-[10px]">
            <span className="text-[#6a6a6a] w-8">Disco</span>
            <ProgressBar value={Math.round(device.diskUsage)} />
          </div>
        </div>

        {/* Active Time */}
        <div className="flex items-center gap-1 text-[10px] text-[#6a6a6a] mb-2">
          <Clock size={9} />
          <span>Ativo há {activeText}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-1.5 pt-2 border-t border-[#3c3c3c]/50">
          <button
            onClick={() => navigate(`/dispositivos/${device.deviceId}`)}
            className="flex-1 px-2 py-1 bg-[#3c3c3c] text-[10px] text-[#cccccc] rounded hover:bg-[#4a4a4a] transition-colors flex items-center justify-center gap-1"
          >
            <Monitor size={9} />
            Detalhes
          </button>
          <button
            onClick={() => setShowActivity(true)}
            className="flex-1 px-2 py-1 bg-[#3c3c3c] text-[10px] text-[#cccccc] rounded hover:bg-[#4a4a4a] transition-colors flex items-center justify-center gap-1"
          >
            <Activity size={9} />
            Atividade
          </button>
          <button
            disabled
            title="Visualização da tela — Indisponível"
            className="px-2 py-1 bg-[#2a2a2a] text-[10px] text-[#4a4a4a] rounded cursor-not-allowed flex items-center justify-center gap-1"
          >
            <Eye size={9} />
          </button>
        </div>
      </div>

      {/* Activity Drawer */}
      <Drawer isOpen={showActivity} onClose={() => setShowActivity(false)} title={`Atividade — ${device.hostname}`}>
        <div className="space-y-2">
          <div className="text-[11px] text-[#969696] mb-3">
            Atividade recente do usuário <span className="text-[#cccccc]">{device.userName}</span>
          </div>
          {recentActivity.map((activity, idx) => (
            <div key={idx} className="flex items-start gap-3 py-2 border-b border-[#3c3c3c]/50">
              <span className="font-mono text-[11px] text-[#6a6a6a] w-12">{activity.time}</span>
              <div className="flex-1">
                <div className="text-[12px] text-[#cccccc]">{activity.app}</div>
              </div>
            </div>
          ))}
          <div className="mt-4 p-3 bg-[#252526] border border-[#3c3c3c] rounded text-[11px] text-[#6a6a6a]">
            <strong className="text-[#969696]">Nota:</strong> Dados de atividade são fornecidos pelo agente NEX. 
            Nenhuma captura de teclado, tela ou dados sensíveis é realizada.
          </div>
        </div>
      </Drawer>
    </>
  );
};
