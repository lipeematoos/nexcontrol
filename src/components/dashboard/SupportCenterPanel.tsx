import React from 'react';
import { Headphones, ArrowRight } from 'lucide-react';
import { tickets } from '../../data/seed';
import { SupportTicketCard } from './SupportTicketCard';

export const SupportCenterPanel: React.FC = () => {
  const newTickets = tickets.filter(t => t.status === 'Aberto').length;
  const urgentTickets = tickets.filter(t => t.priority === 'Urgente').length;
  const inProgress = tickets.filter(t => t.status === 'Em atendimento').length;
  const awaitingUser = tickets.filter(t => t.status === 'Aguardando usuário').length;
  const resolvedToday = tickets.filter(t => t.status === 'Resolvido').length;

  // Mostrar chamados mais recentes/importantes
  const recentTickets = tickets
    .sort((a, b) => {
      // Prioriza urgentes e novos
      if (a.priority === 'Urgente' && b.priority !== 'Urgente') return -1;
      if (b.priority === 'Urgente' && a.priority !== 'Urgente') return 1;
      if (a.status === 'Aberto' && b.status !== 'Aberto') return -1;
      if (b.status === 'Aberto' && a.status !== 'Aberto') return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .slice(0, 4);

  return (
    <div className="bg-[#252526] border border-[#3c3c3c] rounded">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#3c3c3c]">
        <div className="flex items-center gap-2">
          <Headphones size={16} className="text-[#007acc]" />
          <h2 className="text-sm font-semibold text-[#cccccc]">Central de TI</h2>
        </div>
        <button className="flex items-center gap-1 px-3 py-1.5 bg-[#007acc] text-white text-[12px] rounded hover:bg-[#0e639c] transition-colors">
          Abrir Central de TI
          <ArrowRight size={12} />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-3 px-4 py-3 border-b border-[#3c3c3c]">
        <div className="text-center">
          <div className="text-xl font-bold text-[#569cd6]">{newTickets}</div>
          <div className="text-[10px] text-[#6a6a6a] uppercase tracking-wide">Novos</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-[#f44747]">{urgentTickets}</div>
          <div className="text-[10px] text-[#6a6a6a] uppercase tracking-wide">Urgentes</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-[#ce9178]">{inProgress}</div>
          <div className="text-[10px] text-[#6a6a6a] uppercase tracking-wide">Em atendimento</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-[#dcdcaa]">{awaitingUser}</div>
          <div className="text-[10px] text-[#6a6a6a] uppercase tracking-wide">Aguardando</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-[#4ec9b0]">{resolvedToday}</div>
          <div className="text-[10px] text-[#6a6a6a] uppercase tracking-wide">Resolvidos hoje</div>
        </div>
      </div>

      {/* Recent Tickets */}
      <div className="p-4">
        <h3 className="text-[11px] text-[#969696] uppercase tracking-wide mb-2">Chamados Recentes</h3>
        <div className="space-y-2">
          {recentTickets.map(ticket => (
            <SupportTicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </div>
    </div>
  );
};
