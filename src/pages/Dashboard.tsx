import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Monitor, Wifi, WifiOff, AlertTriangle, Headphones, Package, Code2, Server } from 'lucide-react';
import { devices, alerts, assets, softwareList, tickets, secretariats } from '../data/seed';
import { KPICard, Badge, ProgressBar, SectionHeader } from '../components/ui';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const onlineCount = devices.filter(d => d.status === 'online').length;
  const offlineCount = devices.filter(d => d.status === 'offline').length;
  const alertCount = devices.filter(d => d.status === 'attention' || d.status === 'critical').length;
  const criticalCount = devices.filter(d => d.status === 'critical').length;
  const openTickets = tickets.filter(t => t.status !== 'Resolvido').length;
  const inProgressTickets = tickets.filter(t => t.status === 'Em atendimento').length;

  // Status distribution for pie chart
  const statusData = [
    { name: 'Online', value: onlineCount, color: '#4ec9b0' },
    { name: 'Offline', value: offlineCount, color: '#6a6a6a' },
    { name: 'Manutenção', value: devices.filter(d => d.status === 'maintenance').length, color: '#569cd6' },
    { name: 'Sem agente', value: devices.filter(d => d.status === 'no_agent').length, color: '#4a4a4a' },
  ];

  // OS distribution
  const osMap: Record<string, number> = {};
  devices.forEach(d => {
    const os = d.operatingSystem.includes('11') ? 'Windows 11' : d.operatingSystem.includes('10') ? 'Windows 10' : d.operatingSystem.includes('7') ? 'Windows 7' : 'Outros';
    osMap[os] = (osMap[os] || 0) + 1;
  });
  const osData = Object.entries(osMap).map(([name, value]) => ({ name, value }));

  // Devices by secretariat
  const secData = secretariats.map(s => ({
    name: s.shortName,
    total: devices.filter(d => d.secretariatId === s.id).length,
    online: devices.filter(d => d.secretariatId === s.id && d.status === 'online').length,
  }));

  // Recent alerts
  const recentAlerts = alerts.filter(a => a.status !== 'resolved' && a.status !== 'ignored').slice(0, 6);

  // Online devices
  const onlineDevices = devices.filter(d => d.status === 'online').slice(0, 6);

  return (
    <div className="space-y-4">
      <SectionHeader title="Dashboard" subtitle="Visão geral do parque de TI" />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
        <KPICard label="Computadores" value={devices.length} icon={<Monitor size={16} />} color="#cccccc" />
        <KPICard label="Online" value={onlineCount} icon={<Wifi size={16} />} color="#4ec9b0" />
        <KPICard label="Offline" value={offlineCount} icon={<WifiOff size={16} />} color="#6a6a6a" />
        <KPICard label="Com alertas" value={alertCount} subtitle={`${criticalCount} críticos`} icon={<AlertTriangle size={16} />} color="#dcdcaa" />
        <KPICard label="Chamados" value={openTickets} subtitle={`${inProgressTickets} em atendimento`} icon={<Headphones size={16} />} color="#569cd6" />
        <KPICard label="Ativos de TI" value={assets.length} icon={<Package size={16} />} color="#ce9178" />
        <KPICard label="Softwares" value={softwareList.length} icon={<Code2 size={16} />} color="#c586c0" />
        <KPICard label="Críticos" value={criticalCount} icon={<Server size={16} />} color="#f44747" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Status Pie */}
        <div className="bg-[#252526] border border-[#3c3c3c] rounded p-3">
          <h3 className="text-[12px] text-[#969696] uppercase tracking-wide mb-2">Status dos Computadores</h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={35} outerRadius={60} dataKey="value" stroke="none">
                  {statusData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#252526', border: '1px solid #3c3c3c', borderRadius: '4px', fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 mt-1">
            {statusData.map(s => (
              <div key={s.name} className="flex items-center gap-1 text-[10px] text-[#969696]">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }}></div>
                {s.name} ({s.value})
              </div>
            ))}
          </div>
        </div>

        {/* OS Distribution */}
        <div className="bg-[#252526] border border-[#3c3c3c] rounded p-3">
          <h3 className="text-[12px] text-[#969696] uppercase tracking-wide mb-2">Sistemas Operacionais</h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={osData} layout="vertical" margin={{ left: 10 }}>
                <XAxis type="number" tick={{ fontSize: 10, fill: '#6a6a6a' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#969696' }} axisLine={false} tickLine={false} width={80} />
                <Tooltip contentStyle={{ background: '#252526', border: '1px solid #3c3c3c', borderRadius: '4px', fontSize: '11px' }} />
                <Bar dataKey="value" fill="#007acc" radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* By Secretariat */}
        <div className="bg-[#252526] border border-[#3c3c3c] rounded p-3">
          <h3 className="text-[12px] text-[#969696] uppercase tracking-wide mb-2">Computadores por Secretaria</h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={secData} margin={{ left: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#969696' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#6a6a6a' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#252526', border: '1px solid #3c3c3c', borderRadius: '4px', fontSize: '11px' }} />
                <Bar dataKey="total" fill="#007acc" radius={[2, 2, 0, 0]} name="Total" />
                <Bar dataKey="online" fill="#4ec9b0" radius={[2, 2, 0, 0]} name="Online" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Alerts + Online Devices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Recent Alerts */}
        <div className="bg-[#252526] border border-[#3c3c3c] rounded p-3">
          <h3 className="text-[12px] text-[#969696] uppercase tracking-wide mb-2">Alertas Recentes</h3>
          <div className="space-y-1.5">
            {recentAlerts.map(alert => (
              <div key={alert.id} className="flex items-center gap-2 py-1 px-2 rounded hover:bg-[#2a2d2e] text-[12px]">
                <Badge status={alert.severity} />
                <span className="text-[#cccccc] flex-1 truncate">{alert.message}</span>
                <span className="text-[#6a6a6a] text-[11px]">{alert.deviceHostname}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Online Devices */}
        <div className="bg-[#252526] border border-[#3c3c3c] rounded p-3">
          <h3 className="text-[12px] text-[#969696] uppercase tracking-wide mb-2">Dispositivos Online</h3>
          <div className="grid grid-cols-2 gap-2">
            {onlineDevices.map(device => (
              <div
                key={device.id}
                className="bg-[#1e1e1e] border border-[#3c3c3c] rounded p-2 cursor-pointer hover:border-[#007acc] transition-colors"
                onClick={() => navigate(`/dispositivos/${device.id}`)}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] font-medium text-[#cccccc] font-mono">{device.hostname}</span>
                  <Badge status={device.status} />
                </div>
                <div className="text-[10px] text-[#6a6a6a] mb-1.5">{device.currentUser} • {device.secretariat}</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-[10px] text-[#969696]">
                    <span className="w-6">CPU</span>
                    <ProgressBar value={device.cpuUsage} />
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-[#969696]">
                    <span className="w-6">RAM</span>
                    <ProgressBar value={device.ramUsage} />
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-[#969696]">
                    <span className="w-6">Disco</span>
                    <ProgressBar value={device.storageUsage} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Events Table */}
      <div className="bg-[#252526] border border-[#3c3c3c] rounded p-3">
        <h3 className="text-[12px] text-[#969696] uppercase tracking-wide mb-2">Últimos Eventos</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-[#3c3c3c]">
                <th className="text-left px-2 py-1.5 text-[11px] text-[#969696] font-medium">Data/Hora</th>
                <th className="text-left px-2 py-1.5 text-[11px] text-[#969696] font-medium">Computador</th>
                <th className="text-left px-2 py-1.5 text-[11px] text-[#969696] font-medium">Usuário</th>
                <th className="text-left px-2 py-1.5 text-[11px] text-[#969696] font-medium">Evento</th>
                <th className="text-left px-2 py-1.5 text-[11px] text-[#969696] font-medium">Detalhes</th>
              </tr>
            </thead>
            <tbody>
              {recentAlerts.slice(0, 8).map(alert => {
                const device = devices.find(d => d.id === alert.deviceId);
                return (
                  <tr key={alert.id} className="border-b border-[#3c3c3c]/50 hover:bg-[#2a2d2e]">
                    <td className="px-2 py-1.5 text-[#6a6a6a] font-mono">{new Date(alert.createdAt).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</td>
                    <td className="px-2 py-1.5 text-[#cccccc] font-mono">{alert.deviceHostname}</td>
                    <td className="px-2 py-1.5 text-[#969696]">{device?.currentUser || '—'}</td>
                    <td className="px-2 py-1.5"><Badge status={alert.severity} /></td>
                    <td className="px-2 py-1.5 text-[#969696] truncate max-w-[200px]">{alert.message}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
