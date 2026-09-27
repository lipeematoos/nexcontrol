import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, HardDrive, MemoryStick, Clock } from 'lucide-react';
import { devices } from '../../data/seed';
import { Badge } from '../ui';

export const CriticalDevicesPanel: React.FC = () => {
  const navigate = useNavigate();

  // Dispositivos que precisam de atenção (críticos ou com problemas)
  const criticalDevices = devices
    .filter(d => d.status === 'critical' || d.status === 'attention' || d.status === 'offline')
    .sort((a, b) => {
      // Prioriza críticos
      if (a.status === 'critical' && b.status !== 'critical') return -1;
      if (b.status === 'critical' && a.status !== 'critical') return 1;
      // Depois atenção
      if (a.status === 'attention' && b.status !== 'attention') return -1;
      if (b.status === 'attention' && a.status !== 'attention') return 1;
      return 0;
    })
    .slice(0, 6);

  const getMainIssue = (device: typeof devices[0]) => {
    if (device.status === 'offline') {
      const hoursOffline = Math.floor((Date.now() - new Date(device.lastHeartbeat).getTime()) / 3600000);
      return { icon: Clock, label: 'Offline', value: `${hoursOffline}h`, color: '#6a6a6a' };
    }
    if (device.storageUsage > 90) {
      const freeGB = Math.round(device.storage * (1 - device.storageUsage / 100));
      return { icon: HardDrive, label: 'Disco', value: `${device.storageUsage}%`, subvalue: `${freeGB} GB livre`, color: '#f44747' };
    }
    if (device.ramUsage > 90) {
      return { icon: MemoryStick, label: 'RAM', value: `${device.ramUsage}%`, color: '#f44747' };
    }
    if (device.cpuUsage > 90) {
      return { icon: AlertTriangle, label: 'CPU', value: `${device.cpuUsage}%`, color: '#f44747' };
    }
    if (device.storageUsage > 80) {
      return { icon: HardDrive, label: 'Disco', value: `${device.storageUsage}%`, color: '#dcdcaa' };
    }
    if (device.ramUsage > 80) {
      return { icon: MemoryStick, label: 'RAM', value: `${device.ramUsage}%`, color: '#dcdcaa' };
    }
    return { icon: AlertTriangle, label: 'Atenção', value: '', color: '#dcdcaa' };
  };

  return (
    <div className="bg-[#252526] border border-[#3c3c3c] rounded">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#3c3c3c]">
        <div className="flex items-center gap-2">
          <AlertTriangle size={16} className="text-[#f44747]" />
          <h2 className="text-sm font-semibold text-[#cccccc]">Computadores que precisam de atenção</h2>
        </div>
        <span className="text-[11px] text-[#6a6a6a]">{criticalDevices.length} dispositivos</span>
      </div>

      <div className="p-3">
        {criticalDevices.length === 0 ? (
          <div className="text-center py-6 text-[#6a6a6a] text-[12px]">
            Nenhum computador crítico no momento.
          </div>
        ) : (
          <div className="space-y-2">
            {criticalDevices.map(device => {
              const issue = getMainIssue(device);
              const Icon = issue.icon;
              return (
                <div
                  key={device.id}
                  className="bg-[#1e1e1e] border border-[#3c3c3c] rounded p-3 hover:border-[#007acc]/50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/dispositivos/${device.id}`)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-mono text-[#569cd6] text-[12px] font-semibold">{device.hostname}</div>
                      <div className="text-[10px] text-[#6a6a6a]">{device.currentUser} • {device.secretariat}</div>
                    </div>
                    <Badge status={device.status} />
                  </div>

                  <div className="flex items-center gap-2 text-[11px]">
                    <Icon size={12} style={{ color: issue.color }} />
                    <span className="text-[#969696]">{issue.label}:</span>
                    <span className="font-semibold" style={{ color: issue.color }}>{issue.value}</span>
                    {issue.subvalue && <span className="text-[#6a6a6a]">({issue.subvalue})</span>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
