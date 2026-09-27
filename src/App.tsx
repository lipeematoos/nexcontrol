import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { DashboardPage } from './pages/Dashboard';
import { DevicesPage } from './pages/Devices';
import { DeviceDetailPage } from './pages/DeviceDetail';
import { InventoryPage } from './pages/Inventory';
import { AssetsPage } from './pages/Assets';
import { MonitoringPage } from './pages/Monitoring';
import { AlertsPage } from './pages/Alerts';
import { SoftwarePage } from './pages/Software';
import { HealthPage } from './pages/Health';
import { SupportPage } from './pages/Support';
import { MaintenancePage } from './pages/Maintenance';
import { RemoteActionsPage } from './pages/RemoteActions';
import { GovernancePage } from './pages/Governance';
import { AuditPage } from './pages/Audit';
import { ReportsPage } from './pages/Reports';
import { SettingsPage } from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dispositivos" element={<DevicesPage />} />
          <Route path="/dispositivos/:id" element={<DeviceDetailPage />} />
          <Route path="/inventario" element={<InventoryPage />} />
          <Route path="/patrimonio" element={<AssetsPage />} />
          <Route path="/monitoramento" element={<MonitoringPage />} />
          <Route path="/alertas" element={<AlertsPage />} />
          <Route path="/softwares" element={<SoftwarePage />} />
          <Route path="/saude" element={<HealthPage />} />
          <Route path="/suporte" element={<SupportPage />} />
          <Route path="/manutencoes" element={<MaintenancePage />} />
          <Route path="/acoes-remotas" element={<RemoteActionsPage />} />
          <Route path="/governanca" element={<GovernancePage />} />
          <Route path="/auditoria" element={<AuditPage />} />
          <Route path="/relatorios" element={<ReportsPage />} />
          <Route path="/configuracoes" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
