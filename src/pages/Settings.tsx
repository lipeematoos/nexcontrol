import React from 'react';
import { SectionHeader } from '../components/ui';
import { Settings as SettingsIcon, Users, Shield, Bell, Database, Globe, Key } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  return (
    <div>
      <SectionHeader title="Configurações" subtitle="Configurações do sistema NEXCONTROL" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="bg-[#252526] border border-[#3c3c3c] rounded p-4 hover:border-[#007acc]/50 transition-colors cursor-pointer">
          <div className="flex items-center gap-2 mb-2">
            <Users size={16} className="text-[#007acc]" />
            <span className="text-[13px] text-[#cccccc] font-medium">Usuários e Perfis</span>
          </div>
          <p className="text-[11px] text-[#6a6a6a]">Gerenciar usuários, papéis e permissões RBAC.</p>
        </div>

        <div className="bg-[#252526] border border-[#3c3c3c] rounded p-4 hover:border-[#007acc]/50 transition-colors cursor-pointer">
          <div className="flex items-center gap-2 mb-2">
            <Shield size={16} className="text-[#007acc]" />
            <span className="text-[13px] text-[#cccccc] font-medium">Segurança</span>
          </div>
          <p className="text-[11px] text-[#6a6a6a]">Políticas de segurança, autenticação e tokens.</p>
        </div>

        <div className="bg-[#252526] border border-[#3c3c3c] rounded p-4 hover:border-[#007acc]/50 transition-colors cursor-pointer">
          <div className="flex items-center gap-2 mb-2">
            <Bell size={16} className="text-[#007acc]" />
            <span className="text-[13px] text-[#cccccc] font-medium">Regras de Alerta</span>
          </div>
          <p className="text-[11px] text-[#6a6a6a]">Configurar limites e notificações de alertas.</p>
        </div>

        <div className="bg-[#252526] border border-[#3c3c3c] rounded p-4 hover:border-[#007acc]/50 transition-colors cursor-pointer">
          <div className="flex items-center gap-2 mb-2">
            <Database size={16} className="text-[#007acc]" />
            <span className="text-[13px] text-[#cccccc] font-medium">Banco de Dados</span>
          </div>
          <p className="text-[11px] text-[#6a6a6a]">Conexão PostgreSQL, backups e manutenção.</p>
        </div>

        <div className="bg-[#252526] border border-[#3c3c3c] rounded p-4 hover:border-[#007acc]/50 transition-colors cursor-pointer">
          <div className="flex items-center gap-2 mb-2">
            <Globe size={16} className="text-[#007acc]" />
            <span className="text-[13px] text-[#cccccc] font-medium">Integrações</span>
          </div>
          <p className="text-[11px] text-[#6a6a6a]">NEXUNITAS, Active Directory, OIDC.</p>
        </div>

        <div className="bg-[#252526] border border-[#3c3c3c] rounded p-4 hover:border-[#007acc]/50 transition-colors cursor-pointer">
          <div className="flex items-center gap-2 mb-2">
            <Key size={16} className="text-[#007acc]" />
            <span className="text-[13px] text-[#cccccc] font-medium">Agente NEX</span>
          </div>
          <p className="text-[11px] text-[#6a6a6a]">Configuração de tokens e comunicação com agentes.</p>
        </div>
      </div>

      <div className="mt-4 bg-[#252526] border border-[#3c3c3c] rounded p-4">
        <h3 className="text-[12px] text-[#969696] uppercase tracking-wide mb-3">Informações do Sistema</h3>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[12px]">
          <div className="flex justify-between py-1 border-b border-[#3c3c3c]/50"><span className="text-[#6a6a6a]">Versão</span><span className="text-[#cccccc] font-mono">0.1.0</span></div>
          <div className="flex justify-between py-1 border-b border-[#3c3c3c]/50"><span className="text-[#6a6a6a]">Ambiente</span><span className="text-[#cccccc]">Local (On-premise)</span></div>
          <div className="flex justify-between py-1 border-b border-[#3c3c3c]/50"><span className="text-[#6a6a6a]">Banco de dados</span><span className="text-[#cccccc]">PostgreSQL 15</span></div>
          <div className="flex justify-between py-1 border-b border-[#3c3c3c]/50"><span className="text-[#6a6a6a]">API</span><span className="text-[#cccccc]">NestJS + REST</span></div>
          <div className="flex justify-between py-1 border-b border-[#3c3c3c]/50"><span className="text-[#6a6a6a]">Cache</span><span className="text-[#cccccc]">Redis (preparado)</span></div>
          <div className="flex justify-between py-1 border-b border-[#3c3c3c]/50"><span className="text-[#6a6a6a]">Armazenamento</span><span className="text-[#cccccc]">MinIO (preparado)</span></div>
          <div className="flex justify-between py-1 border-b border-[#3c3c3c]/50"><span className="text-[#6a6a6a]">Deploy</span><span className="text-[#cccccc]">Docker Compose</span></div>
          <div className="flex justify-between py-1 border-b border-[#3c3c3c]/50"><span className="text-[#6a6a6a]">Organização</span><span className="text-[#cccccc]">Prefeitura Municipal de Exemplo</span></div>
        </div>
      </div>
    </div>
  );
};
