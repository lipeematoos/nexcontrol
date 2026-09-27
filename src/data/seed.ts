import { Device, Alert, ITAsset, Software, Maintenance, AuditLog, TicketReference, RemoteAction, RemoteActionExecution, Secretariat, Report, Organization, TelemetryPoint } from '../types';

export const organization: Organization = {
  id: 'org-001',
  name: 'Prefeitura Municipal de Exemplo',
  environment: 'Ambiente Local',
  version: 'v0.1.0'
};

export const secretariats: Secretariat[] = [
  { id: 'sec-01', name: 'Secretaria de Administração', shortName: 'ADM' },
  { id: 'sec-02', name: 'Secretaria de Obras', shortName: 'OBRAS' },
  { id: 'sec-03', name: 'Secretaria de Saúde', shortName: 'SAUDE' },
  { id: 'sec-04', name: 'Secretaria de Educação', shortName: 'EDUC' },
  { id: 'sec-05', name: 'Secretaria de Fazenda', shortName: 'FINAN' },
  { id: 'sec-06', name: 'Secretaria de Assistência Social', shortName: 'ASIST' },
];

const cpuModels = ['Intel Core i5-10400', 'Intel Core i7-10700', 'Intel Core i5-12400', 'Intel Core i3-10100', 'AMD Ryzen 5 5600G', 'Intel Core i5-8400', 'Intel Core i7-8700', 'Intel Pentium G6400'];
const manufacturers = ['Dell', 'HP', 'Lenovo', 'Positivo', 'Acer', 'Samsung'];
const models = ['OptiPlex 3080', 'ProDesk 400 G7', 'ThinkCentre M70q', 'Master+', 'Veriton M460', 'Galaxy A'];
const users = ['Carlos Almeida', 'Maria Santos', 'João Silva', 'Ana Oliveira', 'Pedro Costa', 'Lucia Ferreira', 'Roberto Lima', 'Fernanda Souza', 'Marcos Pereira', 'Juliana Mendes', 'Ricardo Gomes', 'Patricia Ramos', 'André Nascimento', 'Camila Ribeiro', 'Thiago Araújo'];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateDevices(): Device[] {
  const devices: Device[] = [];
  const prefixes = ['ADM', 'OBRAS', 'SAUDE', 'EDUC', 'FINAN', 'ASIST'];
  const secretariatMap: Record<string, { id: string; name: string }> = {
    'ADM': { id: 'sec-01', name: 'Administração' },
    'OBRAS': { id: 'sec-02', name: 'Obras' },
    'SAUDE': { id: 'sec-03', name: 'Saúde' },
    'EDUC': { id: 'sec-04', name: 'Educação' },
    'FINAN': { id: 'sec-05', name: 'Fazenda' },
    'ASIST': { id: 'sec-06', name: 'Assistência Social' },
  };
  const departments = ['Departamento Administrativo', 'Setor de Protocolo', 'Divisão Técnica', 'Seção de Atendimento', 'Núcleo de Planejamento'];
  const osVersions = ['Windows 11 Pro', 'Windows 10 Pro', 'Windows 10 Pro', 'Windows 10 Pro', 'Windows 7 Pro'];

  let id = 1;
  for (const prefix of prefixes) {
    const count = prefix === 'ADM' ? 14 : prefix === 'OBRAS' ? 12 : prefix === 'SAUDE' ? 16 : prefix === 'EDUC' ? 10 : prefix === 'FINAN' ? 8 : 6;
    for (let i = 1; i <= count; i++) {
      const num = String(i).padStart(2, '0');
      const hostname = `${prefix}-PC${num}`;
      const cpuUsage = Math.floor(Math.random() * 100);
      const ramUsage = Math.floor(Math.random() * 100);
      const storageUsage = Math.floor(Math.random() * 100);
      const isOffline = Math.random() < 0.08;
      const isCritical = storageUsage > 92 || ramUsage > 93 || cpuUsage > 95;
      const isAttention = storageUsage > 80 || ramUsage > 80 || cpuUsage > 80;
      const isMaintenance = Math.random() < 0.04;

      let status: Device['status'] = 'online';
      if (isOffline) status = 'offline';
      else if (isMaintenance) status = 'maintenance';
      else if (isCritical) status = 'critical';
      else if (isAttention) status = 'attention';
      else if (Math.random() < 0.03) status = 'no_agent';

      const os = randomFrom(osVersions);
      const ram = [4, 8, 8, 16, 16][Math.floor(Math.random() * 5)];
      const storage = [256, 512, 512, 1024][Math.floor(Math.random() * 4)];

      const hoursAgo = isOffline ? Math.floor(Math.random() * 72) + 2 : Math.floor(Math.random() * 5);
      const lastHeartbeat = new Date(Date.now() - hoursAgo * 3600000).toISOString();

      devices.push({
        id: `dev-${String(id).padStart(3, '0')}`,
        hostname,
        deviceName: `${secretariatMap[prefix].name} - Estação ${num}`,
        currentUser: randomFrom(users),
        department: randomFrom(departments),
        secretariat: secretariatMap[prefix].name,
        secretariatId: secretariatMap[prefix].id,
        ipAddress: `192.168.${prefixes.indexOf(prefix) + 1}.${100 + i}`,
        macAddress: `AA:BB:CC:DD:${String(prefixes.indexOf(prefix) + 1).padStart(2, '0')}:${String(i).padStart(2, '0')}`,
        operatingSystem: os,
        osVersion: os,
        cpu: randomFrom(cpuModels),
        cpuUsage,
        ram,
        ramUsage,
        storage,
        storageUsage,
        manufacturer: randomFrom(manufacturers),
        model: randomFrom(models),
        serialNumber: `SN${String(Math.floor(Math.random() * 900000) + 100000)}`,
        agentVersion: status === 'no_agent' ? '' : `1.${Math.floor(Math.random() * 3)}.${Math.floor(Math.random() * 10)}`,
        status,
        lastHeartbeat,
        lastInventory: new Date(Date.now() - Math.floor(Math.random() * 24) * 3600000).toISOString(),
        healthScore: isCritical ? Math.floor(Math.random() * 30) + 10 : isAttention ? Math.floor(Math.random() * 20) + 50 : Math.floor(Math.random() * 15) + 85,
        uptime: isOffline ? '—' : `${Math.floor(Math.random() * 30) + 1}d ${Math.floor(Math.random() * 24)}h`,
        assetNumber: `PAT-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      });
      id++;
    }
  }
  return devices;
}

function generateAlerts(devices: Device[]): Alert[] {
  const alerts: Alert[] = [];
  const alertTypes = [
    { type: 'disk_critical', message: 'Disco crítico — uso acima de 95%', severity: 'critical' as const },
    { type: 'ram_high', message: 'Memória RAM elevada — uso acima de 90%', severity: 'high' as const },
    { type: 'cpu_high', message: 'CPU elevada — uso acima de 90%', severity: 'high' as const },
    { type: 'offline', message: 'Equipamento offline há mais de 2 horas', severity: 'attention' as const },
    { type: 'unapproved_software', message: 'Software não autorizado detectado', severity: 'high' as const },
    { type: 'update_pending', message: 'Atualização do Windows pendente', severity: 'info' as const },
    { type: 'agent_offline', message: 'Agente não reporta há mais de 24h', severity: 'critical' as const },
    { type: 'disk_warning', message: 'Espaço em disco abaixo de 15%', severity: 'attention' as const },
    { type: 'service_stopped', message: 'Serviço crítico parado', severity: 'high' as const },
  ];
  const statuses: Alert['status'][] = ['new', 'acknowledged', 'analyzing', 'resolved', 'ignored'];

  let id = 1;
  for (const device of devices) {
    if (device.status === 'critical' || device.status === 'attention' || Math.random() < 0.3) {
      const numAlerts = device.status === 'critical' ? Math.floor(Math.random() * 3) + 1 : 1;
      for (let i = 0; i < numAlerts; i++) {
        const alertType = randomFrom(alertTypes);
        const hoursAgo = Math.floor(Math.random() * 48);
        alerts.push({
          id: `alert-${String(id).padStart(3, '0')}`,
          deviceId: device.id,
          deviceHostname: device.hostname,
          type: alertType.type,
          message: alertType.message,
          severity: alertType.severity,
          status: randomFrom(statuses),
          createdAt: new Date(Date.now() - hoursAgo * 3600000).toISOString(),
        });
        id++;
      }
    }
  }
  return alerts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

function generateAssets(): ITAsset[] {
  const assets: ITAsset[] = [];
  const categories = ['Desktop', 'Notebook', 'Servidor', 'Monitor', 'Impressora', 'Switch', 'Roteador', 'Access Point', 'Nobreak', 'Projetor', 'Tablet', 'Smartphone'];
  const statuses: ITAsset['status'][] = ['in_use', 'in_use', 'in_use', 'available', 'maintenance', 'transferred', 'retired', 'missing'];
  const buildings = ['Sede Administrativa', 'Centro de Saúde', 'Escola Municipal', 'Secretaria de Obras', 'Ginásio Poliesportivo'];
  const rooms = ['Sala 01', 'Sala 02', 'Sala 03', 'Almoxarifado', 'Recepção', 'Diretoria', 'Sala de Reuniões', 'Laboratório'];

  for (let i = 0; i < 85; i++) {
    const cat = randomFrom(categories);
    const sec = randomFrom(secretariats);
    const status = randomFrom(statuses);
    assets.push({
      id: `asset-${String(i + 1).padStart(3, '0')}`,
      assetNumber: `PAT-${String(1000 + i).padStart(5, '0')}`,
      category: cat,
      manufacturer: randomFrom(manufacturers),
      model: randomFrom(models),
      serialNumber: `SN${String(Math.floor(Math.random() * 900000) + 100000)}`,
      description: `${cat} ${randomFrom(manufacturers)} ${randomFrom(models)}`,
      secretariat: sec.shortName,
      department: randomFrom(['Administração', 'Técnico', 'Atendimento', 'Planejamento', 'Financeiro']),
      building: randomFrom(buildings),
      room: randomFrom(rooms),
      responsible: randomFrom(users),
      acquisitionDate: `${2018 + Math.floor(Math.random() * 7)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-01`,
      supplier: randomFrom(['InfoTech Ltda', 'MegaSupply SA', 'TechBrasil', 'Digital Solutions']),
      purchaseProcess: `PE-${2020 + Math.floor(Math.random() * 5)}/${String(Math.floor(Math.random() * 200) + 1).padStart(3, '0')}`,
      invoice: `NF-${String(Math.floor(Math.random() * 90000) + 10000)}`,
      value: Math.floor(Math.random() * 15000) + 500,
      warrantyExpiration: `${2025 + Math.floor(Math.random() * 3)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-01`,
      status,
    });
  }
  return assets;
}

function generateSoftware(): Software[] {
  return [
    { id: 'sw-001', name: 'Microsoft Office 365', version: '16.0', vendor: 'Microsoft', category: 'approved', deviceCount: 62, lastDetected: new Date().toISOString() },
    { id: 'sw-002', name: 'Google Chrome', version: '120.0', vendor: 'Google', category: 'approved', deviceCount: 58, lastDetected: new Date().toISOString() },
    { id: 'sw-003', name: 'Firefox', version: '121.0', vendor: 'Mozilla', category: 'approved', deviceCount: 34, lastDetected: new Date().toISOString() },
    { id: 'sw-004', name: 'Adobe Reader', version: '23.001', vendor: 'Adobe', category: 'approved', deviceCount: 45, lastDetected: new Date().toISOString() },
    { id: 'sw-005', name: 'LibreOffice', version: '7.6', vendor: 'The Document Foundation', category: 'approved', deviceCount: 28, lastDetected: new Date().toISOString() },
    { id: 'sw-006', name: '7-Zip', version: '23.01', vendor: 'Igor Pavlov', category: 'allowed', deviceCount: 41, lastDetected: new Date().toISOString() },
    { id: 'sw-007', name: 'VLC Media Player', version: '3.0.20', vendor: 'VideoLAN', category: 'allowed', deviceCount: 22, lastDetected: new Date().toISOString() },
    { id: 'sw-008', name: 'WinRAR', version: '6.24', vendor: 'RARLAB', category: 'not_approved', deviceCount: 12, lastDetected: new Date().toISOString() },
    { id: 'sw-009', name: 'uTorrent', version: '3.6', vendor: 'BitTorrent', category: 'prohibited', deviceCount: 3, lastDetected: new Date().toISOString() },
    { id: 'sw-010', name: 'TeamViewer', version: '15.48', vendor: 'TeamViewer', category: 'not_approved', deviceCount: 5, lastDetected: new Date().toISOString() },
    { id: 'sw-011', name: 'Spotify', version: '1.2', vendor: 'Spotify AB', category: 'prohibited', deviceCount: 2, lastDetected: new Date().toISOString() },
    { id: 'sw-012', name: 'Java Runtime', version: '8u391', vendor: 'Oracle', category: 'approved', deviceCount: 38, lastDetected: new Date().toISOString() },
    { id: 'sw-013', name: 'Zoom', version: '5.17', vendor: 'Zoom Video', category: 'approved', deviceCount: 31, lastDetected: new Date().toISOString() },
    { id: 'sw-014', name: 'Antivírus Kaspersky', version: '21.3', vendor: 'Kaspersky', category: 'approved', deviceCount: 66, lastDetected: new Date().toISOString() },
    { id: 'sw-015', name: 'GIMP', version: '2.10', vendor: 'GIMP Team', category: 'not_approved', deviceCount: 4, lastDetected: new Date().toISOString() },
  ];
}

function generateMaintenances(devices: Device[]): Maintenance[] {
  const maintenances: Maintenance[] = [];
  const types = ['Preventiva', 'Corretiva', 'Upgrade', 'Limpeza', 'Troca de componente'];
  const problems = ['Computador lento', 'Disco com defeito', 'Memória com erro', 'Fonte queimando', 'Tela azul frequente', 'Sem vídeo', 'Superaquecimento', 'Rede instável'];
  const techs = ['Téc. Ricardo Mendes', 'Téc. Amanda Costa', 'Téc. Felipe Barros'];
  const statuses: Maintenance['status'][] = ['open', 'analyzing', 'in_maintenance', 'awaiting_part', 'completed', 'completed', 'completed'];

  for (let i = 0; i < 18; i++) {
    const device = randomFrom(devices);
    const status = randomFrom(statuses);
    maintenances.push({
      id: `maint-${String(i + 1).padStart(3, '0')}`,
      deviceId: device.id,
      deviceHostname: device.hostname,
      assetNumber: device.assetNumber,
      openingDate: new Date(Date.now() - Math.floor(Math.random() * 60) * 86400000).toISOString(),
      technician: randomFrom(techs),
      type: randomFrom(types),
      problem: randomFrom(problems),
      diagnosis: 'Diagnóstico realizado após análise técnica do equipamento.',
      actionPerformed: status === 'completed' ? 'Componente substituído e testes realizados com sucesso.' : 'Aguardando execução.',
      replacedComponents: status === 'completed' ? [randomFrom(['HD SSD 240GB', 'Memória RAM 8GB', 'Fonte 500W', 'Ventoinha CPU'])] : [],
      cost: Math.floor(Math.random() * 2000) + 100,
      supplier: randomFrom(['InfoTech Ltda', 'PeçasTech', 'Hardware Express']),
      conclusionDate: status === 'completed' ? new Date(Date.now() - Math.floor(Math.random() * 10) * 86400000).toISOString() : undefined,
      status,
    });
  }
  return maintenances;
}

function generateAuditLogs(): AuditLog[] {
  const logs: AuditLog[] = [];
  const actions = [
    { action: 'Visualizou dispositivo', resourceType: 'device' },
    { action: 'Executou ação remota', resourceType: 'remote_action' },
    { action: 'Alterou patrimônio', resourceType: 'asset' },
    { action: 'Transferiu ativo', resourceType: 'asset_movement' },
    { action: 'Alterou regra de alerta', resourceType: 'alert_rule' },
    { action: 'Exportou relatório', resourceType: 'report' },
    { action: 'Visualizou dados técnicos', resourceType: 'device' },
    { action: 'Criou manutenção', resourceType: 'maintenance' },
    { action: 'Reconheceu alerta', resourceType: 'alert' },
    { action: 'Alterou configuração', resourceType: 'settings' },
  ];
  const usersList = ['admin', 'tecnico.carlos', 'gestor.maria', 'auditor.pedro'];

  for (let i = 0; i < 50; i++) {
    const act = randomFrom(actions);
    logs.push({
      id: `audit-${String(i + 1).padStart(3, '0')}`,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 72) * 3600000).toISOString(),
      user: randomFrom(usersList),
      action: act.action,
      resource: `${act.resourceType}-${Math.floor(Math.random() * 100)}`,
      resourceType: act.resourceType,
      ipAddress: `192.168.1.${Math.floor(Math.random() * 254) + 1}`,
      result: Math.random() < 0.95 ? 'success' : 'failure',
      details: `Operação realizada com sucesso via interface web.`,
    });
  }
  return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

function generateTickets(devices: Device[]): TicketReference[] {
  const tickets: TicketReference[] = [];
  const problems = [
    'Meu computador está muito lento.',
    'Impressora não está imprimindo.',
    'Não consigo acessar o sistema.',
    'Tela azul ao iniciar o Windows.',
    'Internet desconectando com frequência.',
    'Programa de ponto não abre.',
    'Preciso de instalação de software.',
    'Computador travando constantemente.',
  ];
  const priorities = ['Baixa', 'Média', 'Alta', 'Urgente'];
  const statuses = ['Aberto', 'Em atendimento', 'Aguardando usuário', 'Resolvido'];

  for (let i = 0; i < 12; i++) {
    const device = randomFrom(devices);
    tickets.push({
      id: `ticket-${String(i + 1).padStart(3, '0')}`,
      ticketNumber: `TI-2026-${String(184 + i).padStart(5, '0')}`,
      user: device.currentUser,
      department: device.secretariat,
      deviceHostname: device.hostname,
      deviceId: device.id,
      problem: randomFrom(problems),
      status: randomFrom(statuses),
      priority: randomFrom(priorities),
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 7) * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - Math.floor(Math.random() * 2) * 86400000).toISOString(),
    });
  }
  return tickets;
}

export const remoteActions: RemoteAction[] = [
  { id: 'ra-001', name: 'Coletar inventário', description: 'Solicita coleta completa de inventário do dispositivo', category: 'Inventário', icon: 'ClipboardList' },
  { id: 'ra-002', name: 'Atualizar telemetria', description: 'Força envio imediato de dados de telemetria', category: 'Monitoramento', icon: 'Activity' },
  { id: 'ra-003', name: 'Reiniciar computador', description: 'Reinicia o dispositivo remotamente', category: 'Sistema', icon: 'RotateCw' },
  { id: 'ra-004', name: 'Reiniciar serviço', description: 'Reinicia um serviço aprovado do Windows', category: 'Sistema', icon: 'RefreshCw' },
  { id: 'ra-005', name: 'Limpar arquivos temporários', description: 'Remove arquivos temporários do sistema', category: 'Manutenção', icon: 'Trash2' },
  { id: 'ra-006', name: 'Atualizar software', description: 'Executa atualização de software homologado', category: 'Software', icon: 'Download' },
  { id: 'ra-007', name: 'Coletar logs', description: 'Coleta logs do Windows para análise', category: 'Diagnóstico', icon: 'FileText' },
  { id: 'ra-008', name: 'Executar diagnóstico', description: 'Executa diagnóstico completo do sistema', category: 'Diagnóstico', icon: 'Stethoscope' },
  { id: 'ra-009', name: 'Sincronizar agente', description: 'Força sincronização do agente com o servidor', category: 'Agente', icon: 'RefreshCw' },
];

function generateActionExecutions(): RemoteActionExecution[] {
  const executions: RemoteActionExecution[] = [];
  const statuses: RemoteActionExecution['status'][] = ['completed', 'completed', 'completed', 'failed', 'executing', 'pending'];

  for (let i = 0; i < 15; i++) {
    const action = randomFrom(remoteActions);
    executions.push({
      id: `exec-${String(i + 1).padStart(3, '0')}`,
      actionId: action.id,
      actionName: action.name,
      targetDevice: `dev-${String(Math.floor(Math.random() * 66) + 1).padStart(3, '0')}`,
      targetHostname: `${randomFrom(['ADM', 'OBRAS', 'SAUDE', 'EDUC', 'FINAN'])}-PC${String(Math.floor(Math.random() * 14) + 1).padStart(2, '0')}`,
      requestedBy: randomFrom(['admin', 'tecnico.carlos', 'gestor.maria']),
      reason: randomFrom(['Diagnóstico de problema', 'Manutenção preventiva', 'Solicitação do usuário', 'Rotina programada']),
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 48) * 3600000).toISOString(),
      status: randomFrom(statuses),
      result: Math.random() < 0.7 ? 'Execução concluída com sucesso.' : undefined,
    });
  }
  return executions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export function generateTelemetry(): TelemetryPoint[] {
  const points: TelemetryPoint[] = [];
  const now = Date.now();
  for (let i = 23; i >= 0; i--) {
    points.push({
      timestamp: new Date(now - i * 3600000).toISOString(),
      cpu: Math.floor(Math.random() * 60) + 20,
      ram: Math.floor(Math.random() * 40) + 50,
      disk: Math.floor(Math.random() * 15) + 75,
      network: Math.floor(Math.random() * 80) + 5,
    });
  }
  return points;
}

export const reports: Report[] = [
  { id: 'rpt-001', name: 'Inventário completo', description: 'Lista completa de todos os ativos de TI', category: 'Inventário' },
  { id: 'rpt-002', name: 'Equipamentos por secretaria', description: 'Distribuição de equipamentos por secretaria', category: 'Inventário' },
  { id: 'rpt-003', name: 'Equipamentos críticos', description: 'Dispositivos com status crítico', category: 'Monitoramento' },
  { id: 'rpt-004', name: 'Equipamentos offline', description: 'Dispositivos atualmente offline', category: 'Monitoramento' },
  { id: 'rpt-005', name: 'Saúde do parque', description: 'Visão geral da saúde de todos os dispositivos', category: 'Monitoramento' },
  { id: 'rpt-006', name: 'Sistemas operacionais', description: 'Distribuição de sistemas operacionais', category: 'Inventário' },
  { id: 'rpt-007', name: 'Softwares instalados', description: 'Lista de softwares detectados', category: 'Software' },
  { id: 'rpt-008', name: 'Softwares não homologados', description: 'Softwares fora do catálogo aprovado', category: 'Software' },
  { id: 'rpt-009', name: 'Inventário anual', description: 'Resultado do inventário anual', category: 'Governança' },
  { id: 'rpt-010', name: 'Divergências patrimoniais', description: 'Divergências entre inventário e patrimônio', category: 'Governança' },
  { id: 'rpt-011', name: 'Movimentações', description: 'Histórico de movimentações de ativos', category: 'Governança' },
  { id: 'rpt-012', name: 'Manutenções', description: 'Relatório de manutenções realizadas', category: 'Manutenção' },
  { id: 'rpt-013', name: 'Chamados por equipamento', description: 'Chamados vinculados a dispositivos', category: 'Suporte' },
  { id: 'rpt-014', name: 'Alertas', description: 'Histórico de alertas gerados', category: 'Monitoramento' },
  { id: 'rpt-015', name: 'Auditoria', description: 'Log de auditoria do sistema', category: 'Segurança' },
];

// Generate all data
export const devices = generateDevices();
export const alerts = generateAlerts(devices);
export const assets = generateAssets();
export const softwareList = generateSoftware();
export const maintenances = generateMaintenances(devices);
export const auditLogs = generateAuditLogs();
export const tickets = generateTickets(devices);
export const actionExecutions = generateActionExecutions();
