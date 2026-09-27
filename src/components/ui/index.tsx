import React from 'react';
import { AlertSeverity } from '../../types';

// Status Badge
const statusColors: Record<string, string> = {
  online: 'bg-[#4ec9b0]/15 text-[#4ec9b0] border-[#4ec9b0]/30',
  offline: 'bg-[#6a6a6a]/15 text-[#969696] border-[#6a6a6a]/30',
  attention: 'bg-[#dcdcaa]/15 text-[#dcdcaa] border-[#dcdcaa]/30',
  critical: 'bg-[#f44747]/15 text-[#f44747] border-[#f44747]/30',
  maintenance: 'bg-[#569cd6]/15 text-[#569cd6] border-[#569cd6]/30',
  no_agent: 'bg-[#6a6a6a]/15 text-[#6a6a6a] border-[#6a6a6a]/30',
  new: 'bg-[#569cd6]/15 text-[#569cd6] border-[#569cd6]/30',
  acknowledged: 'bg-[#dcdcaa]/15 text-[#dcdcaa] border-[#dcdcaa]/30',
  analyzing: 'bg-[#ce9178]/15 text-[#ce9178] border-[#ce9178]/30',
  resolved: 'bg-[#4ec9b0]/15 text-[#4ec9b0] border-[#4ec9b0]/30',
  ignored: 'bg-[#6a6a6a]/15 text-[#6a6a6a] border-[#6a6a6a]/30',
  info: 'bg-[#569cd6]/15 text-[#569cd6] border-[#569cd6]/30',
  high: 'bg-[#ce9178]/15 text-[#ce9178] border-[#ce9178]/30',
  in_use: 'bg-[#4ec9b0]/15 text-[#4ec9b0] border-[#4ec9b0]/30',
  available: 'bg-[#569cd6]/15 text-[#569cd6] border-[#569cd6]/30',
  transferred: 'bg-[#ce9178]/15 text-[#ce9178] border-[#ce9178]/30',
  retired: 'bg-[#6a6a6a]/15 text-[#969696] border-[#6a6a6a]/30',
  missing: 'bg-[#f44747]/15 text-[#f44747] border-[#f44747]/30',
  awaiting_verification: 'bg-[#dcdcaa]/15 text-[#dcdcaa] border-[#dcdcaa]/30',
  open: 'bg-[#569cd6]/15 text-[#569cd6] border-[#569cd6]/30',
  in_maintenance: 'bg-[#ce9178]/15 text-[#ce9178] border-[#ce9178]/30',
  awaiting_part: 'bg-[#dcdcaa]/15 text-[#dcdcaa] border-[#dcdcaa]/30',
  awaiting_supplier: 'bg-[#dcdcaa]/15 text-[#dcdcaa] border-[#dcdcaa]/30',
  completed: 'bg-[#4ec9b0]/15 text-[#4ec9b0] border-[#4ec9b0]/30',
  approved: 'bg-[#4ec9b0]/15 text-[#4ec9b0] border-[#4ec9b0]/30',
  allowed: 'bg-[#569cd6]/15 text-[#569cd6] border-[#569cd6]/30',
  not_approved: 'bg-[#dcdcaa]/15 text-[#dcdcaa] border-[#dcdcaa]/30',
  prohibited: 'bg-[#f44747]/15 text-[#f44747] border-[#f44747]/30',
  pending: 'bg-[#dcdcaa]/15 text-[#dcdcaa] border-[#dcdcaa]/30',
  executing: 'bg-[#569cd6]/15 text-[#569cd6] border-[#569cd6]/30',
  failed: 'bg-[#f44747]/15 text-[#f44747] border-[#f44747]/30',
  cancelled: 'bg-[#6a6a6a]/15 text-[#6a6a6a] border-[#6a6a6a]/30',
};

const statusLabels: Record<string, string> = {
  online: 'Online',
  offline: 'Offline',
  attention: 'Atenção',
  critical: 'Crítico',
  maintenance: 'Manutenção',
  no_agent: 'Sem agente',
  new: 'Novo',
  acknowledged: 'Reconhecido',
  analyzing: 'Em análise',
  resolved: 'Resolvido',
  ignored: 'Ignorado',
  info: 'Informativo',
  high: 'Alto',
  in_use: 'Em uso',
  available: 'Disponível',
  transferred: 'Transferido',
  retired: 'Retirado',
  missing: 'Não localizado',
  awaiting_verification: 'Aguardando verificação',
  open: 'Aberta',
  in_maintenance: 'Em manutenção',
  awaiting_part: 'Aguardando peça',
  awaiting_supplier: 'Aguardando fornecedor',
  completed: 'Concluída',
  approved: 'Homologado',
  allowed: 'Permitido',
  not_approved: 'Não homologado',
  prohibited: 'Proibido',
  pending: 'Pendente',
  executing: 'Executando',
  failed: 'Falhou',
  cancelled: 'Cancelado',
};

interface BadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ status, size = 'sm' }) => {
  const colors = statusColors[status] || 'bg-[#6a6a6a]/15 text-[#969696] border-[#6a6a6a]/30';
  const label = statusLabels[status] || status;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${colors} ${size === 'md' ? 'text-xs px-2.5 py-1' : ''}`}>
      {label}
    </span>
  );
};

// Severity Badge
export const SeverityBadge: React.FC<{ severity: AlertSeverity }> = ({ severity }) => {
  return <Badge status={severity} />;
};

// KPI Card
interface KPICardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  color?: string;
}

export const KPICard: React.FC<KPICardProps> = ({ label, value, subtitle, icon, color = '#007acc' }) => {
  return (
    <div className="bg-[#252526] border border-[#3c3c3c] rounded p-3">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[11px] text-[#969696] uppercase tracking-wide mb-1">{label}</div>
          <div className="text-2xl font-bold text-[#cccccc]" style={{ color }}>{value}</div>
          {subtitle && <div className="text-[11px] text-[#6a6a6a] mt-0.5">{subtitle}</div>}
        </div>
        {icon && <div className="text-[#6a6a6a]">{icon}</div>}
      </div>
    </div>
  );
};

// Data Table
interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
}

export function DataTable<T extends { id: string }>({ columns, data, onRowClick, emptyMessage = 'Nenhum registro encontrado.' }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[12px]">
        <thead>
          <tr className="border-b border-[#3c3c3c]">
            {columns.map((col) => (
              <th key={col.key} className="text-left px-3 py-2 text-[11px] text-[#969696] uppercase tracking-wide font-medium" style={{ width: col.width }}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-8 text-[#6a6a6a]">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr
                key={item.id}
                className={`border-b border-[#3c3c3c]/50 ${onRowClick ? 'cursor-pointer hover:bg-[#2a2d2e]' : ''}`}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-3 py-2 text-[#cccccc]">
                    {col.render ? col.render(item) : (item as Record<string, unknown>)[col.key] as string}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// Progress Bar
export const ProgressBar: React.FC<{ value: number; max?: number; color?: string }> = ({ value, max = 100, color }) => {
  const pct = Math.min((value / max) * 100, 100);
  const barColor = color || (pct > 90 ? '#f44747' : pct > 75 ? '#dcdcaa' : '#4ec9b0');
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-[#3c3c3c] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: barColor }}></div>
      </div>
      <span className="text-[11px] text-[#969696] w-8 text-right">{value}%</span>
    </div>
  );
};

// Section Header
export const SectionHeader: React.FC<{ title: string; subtitle?: string; action?: React.ReactNode }> = ({ title, subtitle, action }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="text-base font-semibold text-[#cccccc]">{title}</h2>
        {subtitle && <p className="text-[12px] text-[#6a6a6a] mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
};

// Filter Bar
export const FilterBar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex items-center gap-2 mb-3 flex-wrap">
      {children}
    </div>
  );
};

// Select Filter
interface SelectFilterProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

export const SelectFilter: React.FC<SelectFilterProps> = ({ label, value, onChange, options }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-[#3c3c3c] text-[12px] text-[#cccccc] border border-[#4a4a4a] rounded px-2 py-1 outline-none focus:border-[#007acc]"
    >
      <option value="">{label}</option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
};
