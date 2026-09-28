import React from 'react';
import { reports } from '../data/seed';
import { SectionHeader } from '../components/ui';
import { BarChart3, Download, FileText } from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const categories = [...new Set(reports.map(r => r.category))];

  return (
    <div>
      <SectionHeader title="Relatórios" subtitle="Geração e exportação de relatórios" />

      <div className="space-y-4">
        {categories.map(category => (
          <div key={category} className="bg-[#252526] border border-[#3c3c3c] rounded p-3">
            <h3 className="text-[12px] text-[#969696] uppercase tracking-wide mb-3">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {reports.filter(r => r.category === category).map(report => (
                <div key={report.id} className="bg-[#1e1e1e] border border-[#3c3c3c] rounded p-3 hover:border-[#007acc]/50 transition-colors">
                  <div className="flex items-start gap-2 mb-2">
                    <FileText size={14} className="text-[#007acc] mt-0.5" />
                    <div>
                      <div className="text-[12px] text-[#cccccc] font-medium">{report.name}</div>
                      <div className="text-[11px] text-[#6a6a6a] mt-0.5">{report.description}</div>
                    </div>
                  </div>
                  <div className="flex gap-1.5 mt-2">
                    <button className="flex items-center gap-1 px-2 py-1 bg-[#3c3c3c] text-[11px] text-[#cccccc] rounded hover:bg-[#4a4a4a]">
                      <Download size={10} /> PDF
                    </button>
                    <button className="flex items-center gap-1 px-2 py-1 bg-[#3c3c3c] text-[11px] text-[#cccccc] rounded hover:bg-[#4a4a4a]">
                      <Download size={10} /> XLSX
                    </button>
                    <button className="flex items-center gap-1 px-2 py-1 bg-[#3c3c3c] text-[11px] text-[#cccccc] rounded hover:bg-[#4a4a4a]">
                      <Download size={10} /> CSV
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
