import React from 'react';
import { tickets, devices } from '../data/seed';
import { Badge, SectionHeader } from '../components/ui';
import { Headphones, Cpu, MemoryStick, HardDrive, AlertTriangle } from 'lucide-react';

export const SupportPage: React.FC = () => {
  return (
    <div>
      <SectionHeader title="Suporte Técnico" subtitle="Chamados integrados via NEXUNITAS" />

      <div className="bg-[#252526] border border-[#3c3c3c] rounded p-3 mb-3">
        <div className="flex items-center gap-2 text-[12px] text-[#969696]">
          <Headphones size={14} className="text-[#007acc]" />
          <span>Os chamados são originados no <strong className="text-[#cccccc]">NEXUNITAS</strong>. NEXCONTROL recebe contexto técnico automaticamente.</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {tickets.map(ticket => {
          const device = devices.find(d => d.id === ticket.deviceId);
          return (
            <div key={ticket.id} className="bg-[#252526] border border-[#3c3c3c] rounded p-3 hover:border-[#007acc]/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[#569cd6] text-[12px]">{ticket.ticketNumber}</span>
                  <Badge status={ticket.priority === 'Urgente' ? 'critical' : ticket.priority === 'Alta' ? 'high' : ticket.priority === 'Média' ? 'attention' : 'info'} />
                </div>
                <span className="text-[11px] text-[#6a6a6a]">{new Date(ticket.createdAt).toLocaleDateString('pt-BR')}</span>
              </div>

              <div className="text-[12px] text-[#cccccc] mb-2">{ticket.problem}</div>

              <div className="grid grid-cols-2 gap-1 text-[11px] mb-2">
                <div><span className="text-[#6a6a6a]">Usuário:</span> <span className="text-[#969696]">{ticket.user}</span></div>
                <div><span className="text-[#6a6a6a]">Secretaria:</span> <span className="text-[#969696]">{ticket.department}</span></div>
                <div><span className="text-[#6a6a6a]">Dispositivo:</span> <span className="text-[#569cd6] font-mono">{ticket.deviceHostname}</span></div>
                <div><span className="text-[#6a6a6a]">Status:</span> <span className="text-[#969696]">{ticket.status}</span></div>
              </div>

              {device && (
                <div className="border-t border-[#3c3c3c] pt-2 mt-2">
                  <div className="text-[10px] text-[#6a6a6a] uppercase tracking-wide mb-1">Contexto técnico</div>
                  <div className="grid grid-cols-4 gap-2 text-[11px]">
                    <div className="flex items-center gap-1"><Cpu size={10} className="text-[#569cd6]" /><span className={device.cpuUsage > 85 ? 'text-[#f44747]' : 'text-[#969696]'}>{device.cpuUsage}%</span></div>
                    <div className="flex items-center gap-1"><MemoryStick size={10} className="text-[#4ec9b0]" /><span className={device.ramUsage > 85 ? 'text-[#f44747]' : 'text-[#969696]'}>{device.ramUsage}%</span></div>
                    <div className="flex items-center gap-1"><HardDrive size={10} className="text-[#ce9178]" /><span className={device.storageUsage > 85 ? 'text-[#f44747]' : 'text-[#969696]'}>{device.storageUsage}%</span></div>
                    <div className="flex items-center gap-1"><AlertTriangle size={10} className="text-[#dcdcaa]" /><span className="text-[#969696]">{device.uptime}</span></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
