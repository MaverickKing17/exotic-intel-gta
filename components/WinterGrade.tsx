
import React from 'react';
import { Snowflake, ThermometerSun, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Car, ProfitBreakdown } from '../types';

interface WinterGradeProps {
  car: Car;
  profit: ProfitBreakdown;
}

export const WinterGrade: React.FC<WinterGradeProps> = ({ car, profit }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 text-gray-500">
          <ShieldCheck size={14} className="text-blue-400" /> Climate Exposure Audit
        </h4>
        <span className="text-gray-600 text-[8px] font-mono">TOR-ENV-SYNC-2025</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className={`p-4 rounded-2xl border transition-all ${car.isWinterDriven ? 'bg-rose-500/10 border-rose-500/30' : 'bg-white/5 border-white/10 opacity-50'}`}>
          <div className="flex items-center justify-between mb-2">
            <Snowflake size={16} className={car.isWinterDriven ? 'text-rose-400' : 'text-gray-500'} />
            {car.isWinterDriven && <AlertTriangle size={12} className="text-rose-500 animate-pulse" />}
          </div>
          <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">Winter Driven</p>
          <p className={`text-sm font-black mt-1 ${car.isWinterDriven ? 'text-rose-400' : 'text-white'}`}>
            {car.isWinterDriven ? 'DETECTED' : 'NOT RECORDED'}
          </p>
          {car.isWinterDriven && (
            <p className="text-[8px] text-rose-500 mt-2 font-bold italic">-6.5% Valuation Delta Applied</p>
          )}
        </div>

        <div className={`p-4 rounded-2xl border transition-all ${car.hasHeatedStorage ? 'bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'bg-white/5 border-white/10 opacity-50'}`}>
          <div className="flex items-center justify-between mb-2">
            <ThermometerSun size={16} className={car.hasHeatedStorage ? 'text-emerald-400' : 'text-gray-500'} />
            {car.hasHeatedStorage && <ShieldCheck size={12} className="text-emerald-500" />}
          </div>
          <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">Heated Storage</p>
          <p className={`text-sm font-black mt-1 ${car.hasHeatedStorage ? 'text-emerald-400' : 'text-white'}`}>
            {car.hasHeatedStorage ? 'DOCUMENTED' : 'NONE'}
          </p>
          {car.hasHeatedStorage && (
            <p className="text-[8px] text-emerald-500 mt-2 font-bold italic">+4.0% Storage Premium</p>
          )}
        </div>
      </div>
    </div>
  );
};
