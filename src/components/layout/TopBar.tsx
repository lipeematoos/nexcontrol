import React, { useState } from 'react';
import { Search, Bell, Settings, User, ChevronDown } from 'lucide-react';
import { alerts } from '../../data/seed';

export const TopBar: React.FC = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const criticalAlerts = alerts.filter(a => a.status !== 'resolved' && a.status !== 'ignored');

  return (
    <header className="h-11 bg-[#252526] border-b border-[#3c3c3c] flex items-center px-4 gap-4 sticky top-0 z-30">
      {/* Global Search */}
      <div className={`flex-1 max-w-xl relative ${searchFocused ? 'ring-1 ring-[#007acc]' : ''}`}>
        <div className="flex items-center bg-[#3c3c3c] rounded px-2.5 py-1">
          <Search size={14} className="text-[#6a6a6a] mr-2" />
          <input
            type="text"
            placeholder="Buscar computador, usuário, patrimônio, IP, software..."
            className="bg-transparent text-[13px] text-[#cccccc] placeholder-[#6a6a6a] outline-none w-full"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <kbd className="text-[10px] text-[#6a6a6a] bg-[#252526] px-1.5 py-0.5 rounded">Ctrl+K</kbd>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1">
        {/* Alerts */}
        <button className="relative p-1.5 rounded hover:bg-[#37373d] transition-colors">
          <Bell size={16} className="text-[#969696]" />
          {criticalAlerts.length > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#f44747] text-white text-[9px] rounded-full flex items-center justify-center font-medium">
              {criticalAlerts.length > 9 ? '9+' : criticalAlerts.length}
            </span>
          )}
        </button>

        {/* Settings */}
        <button className="p-1.5 rounded hover:bg-[#37373d] transition-colors">
          <Settings size={16} className="text-[#969696]" />
        </button>

        {/* Separator */}
        <div className="w-px h-5 bg-[#3c3c3c] mx-1"></div>

        {/* User */}
        <button className="flex items-center gap-2 px-2 py-1 rounded hover:bg-[#37373d] transition-colors">
          <div className="w-6 h-6 bg-[#007acc] rounded flex items-center justify-center">
            <User size={12} className="text-white" />
          </div>
          <div className="text-left">
            <div className="text-[12px] text-[#cccccc]">Admin</div>
            <div className="text-[10px] text-[#6a6a6a]">Administrador Master</div>
          </div>
          <ChevronDown size={12} className="text-[#6a6a6a]" />
        </button>
      </div>
    </header>
  );
};
