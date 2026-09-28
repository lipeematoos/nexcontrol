import { useState, useEffect } from 'react';
import { LiveDeviceActivity, LiveMonitoringState } from '../types';
import { liveDeviceActivity } from '../data/seed';

/**
 * Hook para gerenciar dados de monitoramento ao vivo.
 * Atualmente usa dados de demonstração, mas está preparado para integração
 * com WebSocket, Server-Sent Events ou polling periódico no futuro.
 */
export function useLiveDevices(): LiveMonitoringState {
  const [devices, setDevices] = useState<LiveDeviceActivity[]>(liveDeviceActivity);
  const [lastUpdate, setLastUpdate] = useState(new Date().toISOString());

  // Simula atualizações periódicas (futuramente será WebSocket/SSE)
  useEffect(() => {
    const interval = setInterval(() => {
      // Simula pequenas variações nos dados
      setDevices(prev => prev.map(device => ({
        ...device,
        cpuUsage: Math.max(0, Math.min(100, device.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(0, Math.min(100, device.memoryUsage + (Math.random() - 0.5) * 5)),
        lastHeartbeat: new Date().toISOString(),
      })));
      setLastUpdate(new Date().toISOString());
    }, 5000); // Atualiza a cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  const totalOnline = devices.filter(d => d.online).length;

  return {
    devices,
    isConnected: true, // Futuramente virá do WebSocket
    isDemo: true, // Indica que são dados de demonstração
    lastUpdate,
    totalOnline,
  };
}
