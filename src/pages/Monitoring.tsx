import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { devices, secretariats, generateTelemetry } from '../data/seed';
import { SectionHeader, FilterBar, SelectFilter, Badge } from '../components/ui';

export const MonitoringPage: React.FC = () => {
  const [filterSec, setFilterSec] = useState('');
  const [filterDevice, setFilterDevice] = useState('');
  const telemetry = generateTelemetry();

  const filteredDevices = filterSec ? devices.filter(d => d.secretariatId === filterSec) : devices;
  const avgCpu = Math.round(filteredDevices.reduce((s, d) => s + d.cpuUsage, 0) / filteredDevices.length);
  const avgRam = Math.round(filteredDevices.reduce((s, d) => s + d.ramUsage, 0) / filteredDevices.length);
  const avgDisk = Math.round(filteredDevices.reduce((s, d) => s + d.storageUsage, 0) / filteredDevices.length);

  return (
    <div className="space-y-3">
      <SectionHeader title="Monitoramento" subtitle="Telemetria em tempo real dos endpoints" />

      <FilterBar>
        <SelectFilter label="Secretaria" value={filterSec} onChange={setFilterSec} options={secretariats.map(s => ({ value: s.id, label: s.shortName }))} />
        <SelectFilter label="Dispositivo" value={filterDevice} onChange={setFilterDevice} options={devices.slice(0, 20).map(d => ({ value: d.id, label: d.hostname }))} />
      </FilterBar>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[#252526] border border-[#3c3c3c] rounded p-3 text-center">
          <div className="text-2xl font-bold text-[#569cd6]">{avgCpu}%</div>
          <div className="text-[11px] text-[#6a6a6a]">CPU médio</div>
        </div>
        <div className="bg-[#252526] border border-[#3c3c3c] rounded p-3 text-center">
          <div className="text-2xl font-bold text-[#4ec9b0]">{avgRam}%</div>
          <div className="text-[11px] text-[#6a6a6a]">RAM médio</div>
        </div>
        <div className="bg-[#252526] border border-[#3c3c3c] rounded p-3 text-center">
          <div className="text-2xl font-bold text-[#ce9178]">{avgDisk}%</div>
          <div className="text-[11px] text-[#6a6a6a]">Disco médio</div>
        </div>
      </div>

      {/* Charts */}
      <div className="bg-[#252526] border border-[#3c3c3c] rounded p-4">
        <h3 className="text-[12px] text-[#969696] uppercase tracking-wide mb-3">Telemetria — Últimas 24 horas</h3>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={telemetry}>
              <XAxis dataKey="timestamp" tick={{ fontSize: 9, fill: '#6a6a6a' }} tickFormatter={(v) => new Date(v).getHours() + 'h'} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#6a6a6a' }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip contentStyle={{ background: '#252526', border: '1px solid #3c3c3c', borderRadius: '4px', fontSize: '11px' }} />
              <Area type="monotone" dataKey="cpu" stroke="#569cd6" fill="#569cd6" fillOpacity={0.08} name="CPU %" />
              <Area type="monotone" dataKey="ram" stroke="#4ec9b0" fill="#4ec9b0" fillOpacity={0.08} name="RAM %" />
              <Area type="monotone" dataKey="disk" stroke="#ce9178" fill="#ce9178" fillOpacity={0.08} name="Disco %" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-4 mt-2">
          <div className="flex items-center gap-1 text-[10px] text-[#969696]"><div className="w-2 h-2 rounded-full bg-[#569cd6]"></div>CPU</div>
          <div className="flex items-center gap-1 text-[10px] text-[#969696]"><div className="w-2 h-2 rounded-full bg-[#4ec9b0]"></div>RAM</div>
          <div className="flex items-center gap-1 text-[10px] text-[#969696]"><div className="w-2 h-2 rounded-full bg-[#ce9178]"></div>Disco</div>
        </div>
      </div>

      {/* Device Grid */}
      <div className="bg-[#252526] border border-[#3c3c3c] rounded p-3">
        <h3 className="text-[12px] text-[#969696] uppercase tracking-wide mb-2">Status dos Endpoints ({filteredDevices.length})</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-[#3c3c3c]">
                <th className="text-left px-2 py-1.5 text-[11px] text-[#969696] font-medium">Hostname</th>
                <th className="text-left px-2 py-1.5 text-[11px] text-[#969696] font-medium">Status</th>
                <th className="text-left px-2 py-1.5 text-[11px] text-[#969696] font-medium">CPU</th>
                <th className="text-left px-2 py-1.5 text-[11px] text-[#969696] font-medium">RAM</th>
                <th className="text-left px-2 py-1.5 text-[11px] text-[#969696] font-medium">Disco</th>
                <th className="text-left px-2 py-1.5 text-[11px] text-[#969696] font-medium">Uptime</th>
                <th className="text-left px-2 py-1.5 text-[11px] text-[#969696] font-medium">Último heartbeat</th>
              </tr>
            </thead>
            <tbody>
              {filteredDevices.slice(0, 30).map(d => (
                <tr key={d.id} className="border-b border-[#3c3c3c]/50 hover:bg-[#2a2d2e]">
                  <td className="px-2 py-1.5 font-mono text-[#569cd6]">{d.hostname}</td>
                  <td className="px-2 py-1.5"><Badge status={d.status} /></td>
                  <td className="px-2 py-1.5"><span className={d.cpuUsage > 85 ? 'text-[#f44747]' : d.cpuUsage > 70 ? 'text-[#dcdcaa]' : 'text-[#4ec9b0]'}>{d.cpuUsage}%</span></td>
                  <td className="px-2 py-1.5"><span className={d.ramUsage > 85 ? 'text-[#f44747]' : d.ramUsage > 70 ? 'text-[#dcdcaa]' : 'text-[#4ec9b0]'}>{d.ramUsage}%</span></td>
                  <td className="px-2 py-1.5"><span className={d.storageUsage > 85 ? 'text-[#f44747]' : d.storageUsage > 70 ? 'text-[#dcdcaa]' : 'text-[#4ec9b0]'}>{d.storageUsage}%</span></td>
                  <td className="px-2 py-1.5 text-[#6a6a6a]">{d.uptime}</td>
                  <td className="px-2 py-1.5 text-[#6a6a6a] text-[11px]">{new Date(d.lastHeartbeat).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
