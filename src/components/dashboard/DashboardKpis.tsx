import React from 'react';
import { Monitor, Wifi, WifiOff, AlertTriangle, Headphones, Server } from 'lucide-react';
import { KPICard } from '../ui';
import { devices, tickets } from '../../data/seed';

export const DashboardKpis: React.FC = () => {
  const onlineCount = devices.filter(d => d.status === 'online').length;
  const offlineCount = devices.filter(d => d.status === 'offline').length;
  const alertCount = devices.filter(d => d.status === 'attention' || d.status === 'critical').length;
  const criticalCount = devices.filter(d => d.status === 'critical').length;
  const openTickets = tickets.filter(t => t.status !== 'Resolvido').length;
  const inProgressTickets = tickets.filter(t => t.status === 'Em atendimento').length;

  // SLA simulado (92% dos chamados resolvidos dentro do prazo)
  const sla = 92;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
      <KPICard label="Computadores" value={devices.length} icon={<Monitor size={16} />} color="#cccccc" />
      <KPICard label="Online" value={onlineCount} icon={<Wifi size={16} />} color="#4ec9b0" />
      <KPICard label="Offline" value={offlineCount} icon={<WifiOff size={16} />} color="#6a6a6a" />
      <KPICard label="Alertas" value={alertCount} icon={<AlertTriangle size={16} />} color="#dcdcaa" />
      <KPICard label="Críticos" value={criticalCount} icon={<Server size={16} />} color="#f44747" />
      <KPICard label="Chamados" value={openTickets} icon={<Headphones size={16} />} color="#569cd6" />
      <KPICard label="Em atendimento" value={inProgressTickets} icon={<Headphones size={16} />} color="#ce9178" />
      <KPICard label="SLA" value={`${sla}%`} icon={<Monitor size={16} />} color="#4ec9b0" />
    </div>
  );
};
