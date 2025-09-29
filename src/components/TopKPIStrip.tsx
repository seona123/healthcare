import React from 'react';
import { TrendingUp, TrendingDown, Footprints, Flame, Heart, Moon, Droplets, Weight } from 'lucide-react';
import { KPIData } from '../types';

interface TopKPIStripProps {
  data: KPIData;
}

const TopKPIStrip: React.FC<TopKPIStripProps> = ({ data }) => {
  const kpis = [
    {
      key: 'steps',
      label: '걸음',
      value: data.steps.toLocaleString(),
      unit: '',
      icon: Footprints,
      change: +5.2,
      target: '10,000'
    },
    {
      key: 'kcal',
      label: '칼로리',
      value: data.kcal.toLocaleString(),
      unit: 'kcal',
      icon: Flame,
      change: +2.1,
      target: '2,200'
    },
    {
      key: 'hrAvg',
      label: '평균 심박',
      value: data.hrAvg.toString(),
      unit: 'bpm',
      icon: Heart,
      change: -1.4,
      target: '70'
    },
    {
      key: 'sleep',
      label: '수면',
      value: data.sleep.toString(),
      unit: 'h',
      icon: Moon,
      change: -8.5,
      target: '8.0h'
    },
    {
      key: 'water',
      label: '수분',
      value: data.water.toString(),
      unit: 'L',
      icon: Droplets,
      change: +12.3,
      target: '2.0L'
    },
    {
      key: 'weight',
      label: '체중',
      value: data.weight.toString(),
      unit: 'kg',
      icon: Weight,
      change: data.weightDelta,
      target: '68.0kg'
    }
  ];

  return (
    <div className="border-b border-gray-800 bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            const isPositive = kpi.key === 'weight' ? kpi.change < 0 : kpi.change > 0;
            
            return (
              <div
                key={kpi.key}
                className="group relative rounded-xl bg-slate-800/50 p-4 hover:bg-slate-800/70 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className="h-5 w-5 text-emerald-400" />
                  <div className={`flex items-center space-x-1 text-xs ${
                    isPositive ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {isPositive ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    <span>{Math.abs(kpi.change)}%</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xl font-semibold text-gray-100">
                    {kpi.value}
                    <span className="text-sm text-gray-400 ml-1">{kpi.unit}</span>
                  </div>
                  <div className="text-xs text-gray-500">{kpi.label}</div>
                </div>

                {/* Mini sparkline placeholder */}
                <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full transition-all"
                    style={{ width: `${Math.random() * 100}%` }}
                  ></div>
                </div>

                {/* Tooltip */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-xs text-gray-200 px-2 py-1 rounded-md whitespace-nowrap">
                  목표: {kpi.target}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopKPIStrip;