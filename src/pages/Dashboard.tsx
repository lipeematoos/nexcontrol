import React from 'react';
import { DashboardKpis } from '../components/dashboard/DashboardKpis';
import { SupportCenterPanel } from '../components/dashboard/SupportCenterPanel';
import { CriticalDevicesPanel } from '../components/dashboard/CriticalDevicesPanel';
import { EnvironmentHealthPanel } from '../components/dashboard/EnvironmentHealthPanel';
import { RecentAlertsPanel } from '../components/dashboard/RecentAlertsPanel';
import { InventorySummaryPanel } from '../components/dashboard/InventorySummaryPanel';
import { LiveMonitoringPanel } from '../components/dashboard/LiveMonitoringPanel';

export const DashboardPage: React.FC = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-4">
      {/* Main Content Area - Left */}
      <div className="flex-1 space-y-4 min-w-0">
        {/* KPIs */}
        <DashboardKpis />

        {/* Central de TI */}
        <SupportCenterPanel />

        {/* Two-column sub-grid for critical devices and health */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CriticalDevicesPanel />
          <EnvironmentHealthPanel />
        </div>

        {/* Recent Alerts */}
        <RecentAlertsPanel />

        {/* Inventory Summary */}
        <InventorySummaryPanel />
      </div>

      {/* Live Monitoring Panel - Right (desktop: sticky sidebar, mobile: below) */}
      <div className="xl:w-[400px] xl:flex-shrink-0 xl:sticky xl:top-0 xl:h-[calc(100vh-4rem)]">
        <div className="xl:h-full h-[600px]">
          <LiveMonitoringPanel />
        </div>
      </div>
    </div>
  );
};
