import React from 'react';
import { Bell } from 'lucide-react';
import { alerts } from '../../data/seed';
import { Badge } from '../ui';

export const RecentAlertsPanel: React.FC = () => {
  const recentAlerts = alerts
    .filter(a => a.status !== 'resolved' && a.status !== 'ignored')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);

  return (
    <div className="bg-[#252526] border border-[#3c3c3c] rounded">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#3c3c3c]">
        <div className="flex items-center gap-2">
          <Bell size={16} className="text-[#dcdcaa]" />
          <h2 className="text-sm font-semibold text-[#cccccc]">Alertas Recentes</h2>
        </div>
        <span className="text-[11px] text-[#6a6a6a]">{recentAlerts.length} ativos</span>
      </div>

      <div className="p-3">
        {recentAlerts.length === 0 ? (
          <div className="text-center py-6 text-[#6a6a6a] text-[12px]">
            Nenhum alerta ativo no momento.
          </div>
        ) : (
          <div className="space-y-1.5">
            {recentAlerts.map(alert => (
              <div key={alert.id} className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-[#2a2d2e] text-[12px]">
                <Badge status={alert.severity} />
                <span className="text-[#cccccc] flex-1 truncate">{alert.message}</span>
                <span className="font-mono text-[#569cd6] text-[11px]">{alert.deviceHostname}</span>
                <span className="text-[#6a6a6a] text-[10px]">
                  {new Date(alert.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
