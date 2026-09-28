import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TicketReference } from '../../types';
import { Badge } from '../ui';
import { devices } from '../../data/seed';
import { Cpu, MemoryStick, HardDrive, Clock, ExternalLink, Monitor } from 'lucide-react';

interface SupportTicketCardProps {
  ticket: TicketReference;
}

export const SupportTicketCard: React.FC<SupportTicketCardProps> = ({ ticket }) => {
  const navigate = useNavigate();
  const device = devices.find(d => d.id === ticket.deviceId);

  const priorityStatus = ticket.priority === 'Urgente' ? 'critical' : ticket.priority === 'Alta' ? 'high' : ticket.priority === 'Média' ? 'attention' : 'info';

  return (
    <div className="bg-[#1e1e1e] border border-[#3c3c3c] rounded p-3 hover:border-[#007acc]/50 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[#569cd6] text-[12px] font-semibold">{ticket.ticketNumber}</span>
          <Badge status={priorityStatus} />
          <Badge status={ticket.status === 'Aberto' ? 'new' : ticket.status === 'Em atendimento' ? 'analyzing' : ticket.status === 'Aguardando usuário' ? 'acknowledged' : 'resolved'} />
        </div>
        <span className="text-[10px] text-[#6a6a6a]">{new Date(ticket.createdAt).toLocaleDateString('pt-BR')}</span>
      </div>

      <div className="mb-2">
        <div className="text-[12px] text-[#cccccc] font-medium">{ticket.user}</div>
        <div className="text-[11px] text-[#6a6a6a]">{ticket.department}</div>
      </div>

      <div className="text-[12px] text-[#969696] mb-2 italic">"{ticket.problem}"</div>

      {device && (
        <div className="flex items-center gap-1 mb-2">
          <Monitor size={11} className="text-[#6a6a6a]" />
          <span className="font-mono text-[11px] text-[#569cd6]">{device.hostname}</span>
        </div>
      )}

      {/* Technical context - compact */}
      {device && (
        <div className="grid grid-cols-4 gap-2 text-[10px] mb-2 pt-2 border-t border-[#3c3c3c]/50">
          <div className="flex items-center gap-1">
            <Cpu size={9} className="text-[#569cd6]" />
            <span className={device.cpuUsage > 85 ? 'text-[#f44747]' : device.cpuUsage > 70 ? 'text-[#dcdcaa]' : 'text-[#969696]'}>
              {device.cpuUsage}%
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MemoryStick size={9} className="text-[#4ec9b0]" />
            <span className={device.ramUsage > 85 ? 'text-[#f44747]' : device.ramUsage > 70 ? 'text-[#dcdcaa]' : 'text-[#969696]'}>
              {device.ramUsage}%
            </span>
          </div>
          <div className="flex items-center gap-1">
            <HardDrive size={9} className="text-[#ce9178]" />
            <span className={device.storageUsage > 85 ? 'text-[#f44747]' : device.storageUsage > 70 ? 'text-[#dcdcaa]' : 'text-[#969696]'}>
              {device.storageUsage}%
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={9} className="text-[#dcdcaa]" />
            <span className="text-[#969696]">{device.uptime}</span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 pt-2 border-t border-[#3c3c3c]/50">
        <button className="flex-1 px-2 py-1 bg-[#3c3c3c] text-[11px] text-[#cccccc] rounded hover:bg-[#4a4a4a] transition-colors flex items-center justify-center gap-1">
          <ExternalLink size={10} />
          Abrir chamado
        </button>
        {device && (
          <button
            onClick={() => navigate(`/dispositivos/${device.id}`)}
            className="flex-1 px-2 py-1 bg-[#3c3c3c] text-[11px] text-[#cccccc] rounded hover:bg-[#4a4a4a] transition-colors flex items-center justify-center gap-1"
          >
            <Monitor size={10} />
            Ver equipamento
          </button>
        )}
      </div>
    </div>
  );
};
