import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Monitor, Package, Shield, Activity,
  Bell, Code2, HeartPulse, Headphones, Wrench,
  Terminal, Building2, FileSearch, BarChart3,
  Settings, BrainCircuit, ChevronRight
} from 'lucide-react';

const menuItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/dispositivos', label: 'Dispositivos', icon: Monitor },
  { path: '/inventario', label: 'Inventário de TI', icon: Package },
  { path: '/patrimonio', label: 'Patrimônio de TI', icon: Shield },
  { path: '/monitoramento', label: 'Monitoramento', icon: Activity },
  { path: '/alertas', label: 'Alertas e Eventos', icon: Bell },
  { path: '/softwares', label: 'Softwares e Licenças', icon: Code2 },
  { path: '/saude', label: 'Saúde dos Equipamentos', icon: HeartPulse },
  { path: '/suporte', label: 'Suporte Técnico', icon: Headphones },
  { path: '/manutencoes', label: 'Manutenções', icon: Wrench },
  { path: '/acoes-remotas', label: 'Ações Remotas', icon: Terminal },
  { path: '/governanca', label: 'Governança', icon: Building2 },
  { path: '/auditoria', label: 'Auditoria', icon: FileSearch },
  { path: '/relatorios', label: 'Relatórios', icon: BarChart3 },
  { path: '/configuracoes', label: 'Configurações', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="w-56 bg-[#181818] border-r border-[#3c3c3c] flex flex-col h-screen fixed left-0 top-0 z-40">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#3c3c3c]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#007acc] rounded flex items-center justify-center">
            <span className="text-white font-bold text-xs">NX</span>
          </div>
          <div>
            <div className="text-sm font-semibold text-[#cccccc] tracking-wide">NEXCONTROL</div>
            <div className="text-[10px] text-[#6a6a6a] uppercase tracking-wider">SYSTENEX</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path ||
            (item.path !== '/' && location.pathname.startsWith(item.path));
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2.5 px-4 py-1.5 text-[13px] transition-colors ${
                isActive
                  ? 'bg-[#37373d] text-white border-l-2 border-[#007acc]'
                  : 'text-[#969696] hover:bg-[#2a2d2e] hover:text-[#cccccc] border-l-2 border-transparent'
              }`}
            >
              <Icon size={15} className={isActive ? 'text-[#007acc]' : ''} />
              <span>{item.label}</span>
              {isActive && <ChevronRight size={12} className="ml-auto text-[#6a6a6a]" />}
            </NavLink>
          );
        })}

        {/* Future module */}
        <div className="flex items-center gap-2.5 px-4 py-1.5 text-[13px] text-[#4a4a4a] cursor-not-allowed mt-2 border-t border-[#3c3c3c] pt-3">
          <BrainCircuit size={15} />
          <span>NEXINTELLIGENCE</span>
          <span className="text-[10px] text-[#4a4a4a] ml-auto">Em breve</span>
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-[#3c3c3c] px-4 py-3 text-[11px]">
        <div className="text-[#969696] truncate">Prefeitura Municipal de Exemplo</div>
        <div className="text-[#6a6a6a]">Ambiente Local</div>
        <div className="text-[#6a6a6a] mt-1">NEXCONTROL v0.1.0</div>
        <div className="flex items-center gap-1 mt-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#4ec9b0]"></div>
          <span className="text-[#4ec9b0]">Serviços operacionais</span>
        </div>
      </div>
    </aside>
  );
};
