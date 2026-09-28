// NEXCONTROL Type Definitions

export type DeviceStatus = 'online' | 'offline' | 'attention' | 'critical' | 'maintenance' | 'no_agent';
export type AlertSeverity = 'info' | 'attention' | 'high' | 'critical';
export type AlertStatus = 'new' | 'acknowledged' | 'analyzing' | 'resolved' | 'ignored';
export type AssetStatus = 'in_use' | 'available' | 'maintenance' | 'transferred' | 'retired' | 'missing' | 'awaiting_verification';
export type MaintenanceStatus = 'open' | 'analyzing' | 'in_maintenance' | 'awaiting_part' | 'awaiting_supplier' | 'completed';
export type SoftwareCategory = 'approved' | 'allowed' | 'not_approved' | 'prohibited';
export type RemoteActionStatus = 'pending' | 'executing' | 'completed' | 'failed' | 'cancelled';

export interface Organization {
  id: string;
  name: string;
  environment: string;
  version: string;
}

export interface Secretariat {
  id: string;
  name: string;
  shortName: string;
}

export interface Department {
  id: string;
  name: string;
  secretariatId: string;
}

export interface Device {
  id: string;
  hostname: string;
  deviceName: string;
  currentUser: string;
  department: string;
  secretariat: string;
  secretariatId: string;
  ipAddress: string;
  macAddress: string;
  operatingSystem: string;
  osVersion: string;
  cpu: string;
  cpuUsage: number;
  ram: number;
  ramUsage: number;
  storage: number;
  storageUsage: number;
  manufacturer: string;
  model: string;
  serialNumber: string;
  agentVersion: string;
  status: DeviceStatus;
  lastHeartbeat: string;
  lastInventory: string;
  healthScore: number;
  uptime: string;
  assetNumber?: string;
}

export interface Alert {
  id: string;
  deviceId: string;
  deviceHostname: string;
  type: string;
  message: string;
  severity: AlertSeverity;
  status: AlertStatus;
  createdAt: string;
  resolvedAt?: string;
  acknowledgedBy?: string;
}

export interface ITAsset {
  id: string;
  assetNumber: string;
  category: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  description: string;
  secretariat: string;
  department: string;
  building: string;
  room: string;
  responsible: string;
  acquisitionDate: string;
  supplier: string;
  purchaseProcess: string;
  invoice: string;
  value: number;
  warrantyExpiration: string;
  hostname?: string;
  ipAddress?: string;
  operatingSystem?: string;
  status: AssetStatus;
  deviceId?: string;
}

export interface Software {
  id: string;
  name: string;
  version: string;
  vendor: string;
  category: SoftwareCategory;
  deviceCount: number;
  lastDetected: string;
}

export interface Maintenance {
  id: string;
  deviceId: string;
  deviceHostname: string;
  assetNumber?: string;
  openingDate: string;
  technician: string;
  type: string;
  problem: string;
  diagnosis: string;
  actionPerformed: string;
  replacedComponents: string[];
  cost: number;
  supplier: string;
  conclusionDate?: string;
  status: MaintenanceStatus;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  resourceType: string;
  ipAddress: string;
  result: 'success' | 'failure';
  details: string;
}

export interface TicketReference {
  id: string;
  ticketNumber: string;
  user: string;
  department: string;
  deviceHostname: string;
  deviceId: string;
  problem: string;
  status: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
}

export interface RemoteAction {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
}

export interface RemoteActionExecution {
  id: string;
  actionId: string;
  actionName: string;
  targetDevice: string;
  targetHostname: string;
  requestedBy: string;
  reason: string;
  timestamp: string;
  status: RemoteActionStatus;
  result?: string;
}

export interface TelemetryPoint {
  timestamp: string;
  cpu: number;
  ram: number;
  disk: number;
  network: number;
}

export interface Report {
  id: string;
  name: string;
  description: string;
  category: string;
  lastGenerated?: string;
}

// Live monitoring types
export interface LiveDeviceActivity {
  deviceId: string;
  hostname: string;
  userName: string;
  secretariatName: string;
  applicationName: string;
  windowTitle?: string;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  online: boolean;
  healthStatus: DeviceStatus;
  lastHeartbeat: string;
  activeSince: string;
}

export interface LiveMonitoringState {
  devices: LiveDeviceActivity[];
  isConnected: boolean;
  isDemo: boolean;
  lastUpdate: string;
  totalOnline: number;
}
