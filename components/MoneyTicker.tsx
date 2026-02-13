
import React from 'react';
import { formatCurrency } from '../utils';

interface MoneyTickerProps {
  totalProfit: number;
  exchangeRate: number;
}

export const MoneyTicker: React.FC<MoneyTickerProps> = ({ totalProfit, exchangeRate }) => {
  return (
    <div className="w-full bg-black/90 text-white py-2 px-6 flex justify-between items-center text-xs font-mono tracking-widest border-b border-white/10 uppercase sticky top-0 z-50 overflow-hidden">
      <div className="flex gap-8 items-center">
        <div className="flex items-center gap-2">
          <span className="text-gray-500">EXCHANGE RATE:</span>
          <span className="text-emerald-400 font-bold">CAD/USD {exchangeRate.toFixed(4)}</span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <span className="text-gray-500">MARKET STATUS:</span>
          <span className="text-emerald-400 font-bold">ACTIVE / TORONTO HUB</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <span className="text-gray-500">TOTAL UNLOCKED PROFIT:</span>
        <div className="flex items-baseline gap-1">
          <span className="text-amber-400 text-sm font-black animate-pulse">
            {formatCurrency(totalProfit)}
          </span>
          <span className="text-[10px] text-amber-600">USD</span>
        </div>
      </div>
    </div>
  );
};
