import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ArrowLeft, Cpu, HardDrive, MemoryStick, Network, Clock, Shield, AlertTriangle } from 'lucide-react';
import { devices, alerts, maintenances, generateTelemetry } from '../data/seed';
import { Badge, SectionHeader, ProgressBar } from '../components/ui';

export const DeviceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const device = devices.find(d => d.id === id);
  const telemetry = generateTelemetry();
  const deviceAlerts = alerts.filter(a => a.deviceId === id);
  const deviceMaintenances = maintenances.filter(m => m.deviceId === id);

  if (!device) {
    return (
      <div className="text-center py-20">
        <p className="text-[#969696]">Dispositivo não encontrado.</p>
        <button onClick={() => navigate('/dispositivos')} className="text-[#007acc] text-sm mt-2 hover:underline">Voltar aos dispositivos</button>
      </div>
    );
  }

  const tabs = [
    { key: 'overview', label: 'Visão Geral' },
    { key: 'hardware', label: 'Hardware' },
    { key: 'software', label: 'Software' },
    { key: 'monitoring', label: 'Monitoramento' },
    { key: 'history', label: 'Histórico' },
    { key: 'alerts', label: 'Alertas' },
    { key: 'actions', label: 'Ações' },
  ];

  const softwareList = [
    { name: 'Microsoft Office 365', version: '16.0', vendor: 'Microsoft', status: 'approved' },
    { name: 'Google Chrome', version: '120.0', vendor: 'Google', status: 'approved' },
    { name: 'Firefox', version: '121.0', vendor: 'Mozilla', status: 'approved' },
    { name: 'Adobe Reader', version: '23.001', vendor: 'Adobe', status: 'approved' },
    { name: 'Java Runtime', version: '8u391', vendor: 'Oracle', status: 'approved' },
    { name: 'WinRAR', version: '6.24', vendor: 'RARLAB', status: 'not_approved' },
    { name: '7-Zip', version: '23.01', vendor: 'Igor Pavlov', status: 'allowed' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate('/dispositivos')} className="p-1 rounded hover:bg-[#37373d]">
          <ArrowLeft size={16} className="text-[#969696]" />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-[#cccccc] font-mono">{device.hostname}</h1>
            <Badge status={device.status} size="md" />
          </div>
          <p className="text-[12px] text-[#6a6a6a]">{device.deviceName} • {device.secretariat}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#3c3c3c] mb-4">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-2 text-[12px] border-b-2 transition-colors ${
              activeTab === tab.key ? 'border-[#007acc] text-[#cccccc]' : 'border-transparent text-[#6a6a6a] hover:text-[#969696]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="lg:col-span-2 bg-[#252526] border border-[#3c3c3c] rounded p-4">
            <h3 className="text-[12px] text-[#969696] uppercase tracking-wide mb-3">Informações do Dispositivo</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[12px]">
              <div className="flex justify-between"><span className="text-[#6a6a6a]">Usuário atual</span><span className="text-[#cccccc]">{device.currentUser}</span></div>
              <div className="flex justify-between"><span className="text-[#6a6a6a]">Secretaria</span><span className="text-[#cccccc]">{device.secretariat}</span></div>
              <div className="flex justify-between"><span className="text-[#6a6a6a]">Departamento</span><span className="text-[#cccccc]">{device.department}</span></div>
              <div className="flex justify-between"><span className="text-[#6a6a6a]">Patrimônio</span><span className="text-[#cccccc] font-mono">{device.assetNumber || '—'}</span></div>
              <div className="flex justify-between"><span className="text-[#6a6a6a]">Hostname</span><span className="text-[#cccccc] font-mono">{device.hostname}</span></div>
              <div className="flex justify-between"><span className="text-[#6a6a6a]">IP</span><span className="text-[#cccccc] font-mono">{device.ipAddress}</span></div>
              <div className="flex justify-between"><span className="text-[#6a6a6a]">Sistema Operacional</span><span className="text-[#cccccc]">{device.operatingSystem}</span></div>
              <div className="flex justify-between"><span className="text-[#6a6a6a]">Uptime</span><span className="text-[#cccccc]">{device.uptime}</span></div>
              <div className="flex justify-between"><span className="text-[#6a6a6a]">Último contato</span><span className="text-[#cccccc]">{new Date(device.lastHeartbeat).toLocaleString('pt-BR')}</span></div>
              <div className="flex justify-between"><span className="text-[#6a6a6a]">Agente</span><span className="text-[#cccccc] font-mono">{device.agentVersion || 'Não instalado'}</span></div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#3c3c3c]">
              <div className="flex items-center gap-2 mb-2">
                <Shield size={14} className="text-[#007acc]" />
                <span className="text-[12px] text-[#969696]">Score de Saúde</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <ProgressBar value={device.healthScore} color={device.healthScore > 75 ? '#4ec9b0' : device.healthScore > 50 ? '#dcdcaa' : '#f44747'} />
                </div>
                <span className="text-lg font-bold" style={{ color: device.healthScore > 75 ? '#4ec9b0' : device.healthScore > 50 ? '#dcdcaa' : '#f44747' }}>{device.healthScore}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#252526] border border-[#3c3c3c] rounded p-4">
            <h3 className="text-[12px] text-[#969696] uppercase tracking-wide mb-3">Recursos em Tempo Real</h3>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 text-[12px] text-[#969696]"><Cpu size={12} /> CPU</div>
                  <span className="text-[12px] text-[#cccccc]">{device.cpuUsage}%</span>
                </div>
                <ProgressBar value={device.cpuUsage} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 text-[12px] text-[#969696]"><MemoryStick size={12} /> RAM ({device.ram} GB)</div>
                  <span className="text-[12px] text-[#cccccc]">{device.ramUsage}%</span>
                </div>
                <ProgressBar value={device.ramUsage} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 text-[12px] text-[#969696]"><HardDrive size={12} /> Disco ({device.storage >= 1024 ? `${device.storage / 1024} TB` : `${device.storage} GB`})</div>
                  <span className="text-[12px] text-[#cccccc]">{device.storageUsage}%</span>
                </div>
                <ProgressBar value={device.storageUsage} />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'hardware' && (
        <div className="bg-[#252526] border border-[#3c3c3c] rounded p-4">
          <h3 className="text-[12px] text-[#969696] uppercase tracking-wide mb-3">Hardware</h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[12px]">
            <div className="flex justify-between py-1 border-b border-[#3c3c3c]/50"><span className="text-[#6a6a6a]">Processador</span><span className="text-[#cccccc]">{device.cpu}</span></div>
            <div className="flex justify-between py-1 border-b border-[#3c3c3c]/50"><span className="text-[#6a6a6a]">Memória RAM</span><span className="text-[#cccccc]">{device.ram} GB DDR4</span></div>
            <div className="flex justify-between py-1 border-b border-[#3c3c3c]/50"><span className="text-[#6a6a6a]">Disco Principal</span><span className="text-[#cccccc]">SSD {device.storage >= 1024 ? `${device.storage / 1024} TB` : `${device.storage} GB`}</span></div>
            <div className="flex justify-between py-1 border-b border-[#3c3c3c]/50"><span className="text-[#6a6a6a]">Placa-mãe</span><span className="text-[#cccccc]">{device.manufacturer} {device.model}</span></div>
            <div className="flex justify-between py-1 border-b border-[#3c3c3c]/50"><span className="text-[#6a6a6a]">BIOS</span><span className="text-[#cccccc] font-mono">v2.14 ({device.manufacturer})</span></div>
            <div className="flex justify-between py-1 border-b border-[#3c3c3c]/50"><span className="text-[#6a6a6a]">Número de Série</span><span className="text-[#cccccc] font-mono">{device.serialNumber}</span></div>
            <div className="flex justify-between py-1 border-b border-[#3c3c3c]/50"><span className="text-[#6a6a6a]">Adaptador de Rede</span><span className="text-[#cccccc]">Intel Ethernet I219-LM</span></div>
            <div className="flex justify-between py-1 border-b border-[#3c3c3c]/50"><span className="text-[#6a6a6a]">MAC Address</span><span className="text-[#cccccc] font-mono">{device.macAddress}</span></div>
          </div>
        </div>
      )}

      {activeTab === 'software' && (
        <div className="bg-[#252526] border border-[#3c3c3c] rounded overflow-hidden">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-[#3c3c3c]">
                <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Aplicação</th>
                <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Versão</th>
                <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Fabricante</th>
                <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {softwareList.map((sw, i) => (
                <tr key={i} className="border-b border-[#3c3c3c]/50 hover:bg-[#2a2d2e]">
                  <td className="px-3 py-2 text-[#cccccc]">{sw.name}</td>
                  <td className="px-3 py-2 text-[#969696] font-mono">{sw.version}</td>
                  <td className="px-3 py-2 text-[#969696]">{sw.vendor}</td>
                  <td className="px-3 py-2"><Badge status={sw.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'monitoring' && (
        <div className="space-y-3">
          <div className="bg-[#252526] border border-[#3c3c3c] rounded p-4">
            <h3 className="text-[12px] text-[#969696] uppercase tracking-wide mb-3">CPU — Últimas 24 horas</h3>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={telemetry}>
                  <XAxis dataKey="timestamp" tick={{ fontSize: 9, fill: '#6a6a6a' }} tickFormatter={(v) => new Date(v).getHours() + 'h'} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#6a6a6a' }} axisLine={false} tickLine={false} domain={[0, 100]} />
                  <Tooltip contentStyle={{ background: '#252526', border: '1px solid #3c3c3c', borderRadius: '4px', fontSize: '11px' }} />
                  <Area type="monotone" dataKey="cpu" stroke="#569cd6" fill="#569cd6" fillOpacity={0.1} name="CPU %" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#252526] border border-[#3c3c3c] rounded p-4">
              <h3 className="text-[12px] text-[#969696] uppercase tracking-wide mb-3">RAM — Últimas 24 horas</h3>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={telemetry}>
                    <XAxis dataKey="timestamp" tick={{ fontSize: 9, fill: '#6a6a6a' }} tickFormatter={(v) => new Date(v).getHours() + 'h'} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#6a6a6a' }} axisLine={false} tickLine={false} domain={[0, 100]} />
                    <Tooltip contentStyle={{ background: '#252526', border: '1px solid #3c3c3c', borderRadius: '4px', fontSize: '11px' }} />
                    <Line type="monotone" dataKey="ram" stroke="#4ec9b0" strokeWidth={1.5} dot={false} name="RAM %" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-[#252526] border border-[#3c3c3c] rounded p-4">
              <h3 className="text-[12px] text-[#969696] uppercase tracking-wide mb-3">Disco — Últimas 24 horas</h3>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={telemetry}>
                    <XAxis dataKey="timestamp" tick={{ fontSize: 9, fill: '#6a6a6a' }} tickFormatter={(v) => new Date(v).getHours() + 'h'} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#6a6a6a' }} axisLine={false} tickLine={false} domain={[0, 100]} />
                    <Tooltip contentStyle={{ background: '#252526', border: '1px solid #3c3c3c', borderRadius: '4px', fontSize: '11px' }} />
                    <Line type="monotone" dataKey="disk" stroke="#ce9178" strokeWidth={1.5} dot={false} name="Disco %" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-[#252526] border border-[#3c3c3c] rounded p-4">
          <h3 className="text-[12px] text-[#969696] uppercase tracking-wide mb-3">Histórico de Manutenções</h3>
          {deviceMaintenances.length === 0 ? (
            <p className="text-[12px] text-[#6a6a6a] py-4 text-center">Nenhuma manutenção registrada para este dispositivo.</p>
          ) : (
            <div className="space-y-2">
              {deviceMaintenances.map(m => (
                <div key={m.id} className="border border-[#3c3c3c] rounded p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[12px] text-[#cccccc] font-medium">{m.type}</span>
                    <Badge status={m.status} />
                  </div>
                  <p className="text-[11px] text-[#969696]">{m.problem}</p>
                  <div className="flex items-center gap-4 mt-2 text-[10px] text-[#6a6a6a]">
                    <span>{m.technician}</span>
                    <span>{new Date(m.openingDate).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'alerts' && (
        <div className="bg-[#252526] border border-[#3c3c3c] rounded overflow-hidden">
          {deviceAlerts.length === 0 ? (
            <div className="p-6 text-center text-[#6a6a6a] text-[12px]">
              <AlertTriangle size={20} className="mx-auto mb-2 text-[#4a4a4a]" />
              Nenhum alerta registrado para este dispositivo.
            </div>
          ) : (
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-[#3c3c3c]">
                  <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Data</th>
                  <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Severidade</th>
                  <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Mensagem</th>
                  <th className="text-left px-3 py-2 text-[11px] text-[#969696] font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {deviceAlerts.map(a => (
                  <tr key={a.id} className="border-b border-[#3c3c3c]/50 hover:bg-[#2a2d2e]">
                    <td className="px-3 py-2 text-[#6a6a6a] font-mono">{new Date(a.createdAt).toLocaleString('pt-BR')}</td>
                    <td className="px-3 py-2"><Badge status={a.severity} /></td>
                    <td className="px-3 py-2 text-[#cccccc]">{a.message}</td>
                    <td className="px-3 py-2"><Badge status={a.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === 'actions' && (
        <div className="bg-[#252526] border border-[#3c3c3c] rounded p-4">
          <h3 className="text-[12px] text-[#969696] uppercase tracking-wide mb-3">Ações Remotas Disponíveis</h3>
          <div className="grid grid-cols-3 gap-2">
            {['Coletar inventário', 'Atualizar telemetria', 'Reiniciar computador', 'Limpar temporários', 'Coletar logs', 'Executar diagnóstico', 'Sincronizar agente'].map(action => (
              <button key={action} className="bg-[#1e1e1e] border border-[#3c3c3c] rounded p-3 text-left hover:border-[#007acc] transition-colors">
                <div className="text-[12px] text-[#cccccc]">{action}</div>
                <div className="text-[10px] text-[#6a6a6a] mt-1">Requer autorização</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
