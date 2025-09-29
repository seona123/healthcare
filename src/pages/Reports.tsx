import React, { useState } from 'react';
import { Calendar, Download, TrendingUp, TrendingDown, FileText, BarChart3, Activity } from 'lucide-react';

const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');

  const periods = [
    { id: 'weekly', label: '주간' },
    { id: 'monthly', label: '월간' },
    { id: 'quarterly', label: '분기' }
  ];

  const weeklyReport = {
    period: '2025-01-20 ~ 2025-01-26',
    highlights: [
      { type: 'success', title: '걸음 수 목표 달성', value: '7일 연속' },
      { type: 'improvement', title: '수면 시간 증가', value: '+45분' },
      { type: 'warning', title: '수분 섭취 부족', value: '-20%' }
    ],
    improvements: [
      '수면 시간을 30분 더 늘려보세요',
      '수분 섭취량을 하루 500ml 증가시키세요',
      '주 3회 근력 운동을 추가해보세요'
    ],
    achievements: [
      '10,000걸음 7일 연속 달성',
      '운동 목표 120% 달성',
      '체중 관리 목표 진행 중'
    ]
  };

  const handleDownloadPDF = () => {
    // PDF download logic would go here
    console.log('Downloading PDF report...');
  };

  const handleDownloadCSV = () => {
    // CSV download logic would go here
    console.log('Downloading CSV data...');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">건강 리포트</h1>
          <p className="text-gray-400 mt-1">건강 데이터를 종합 분석한 리포트를 확인하세요</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="rounded-xl border border-gray-600 bg-gray-700 px-4 py-2 text-gray-100 focus:border-emerald-500 focus:outline-none"
          >
            {periods.map((period) => (
              <option key={period.id} value={period.id}>
                {period.label} 리포트
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Report Overview */}
      <div className="rounded-2xl border border-gray-700 bg-slate-800/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="rounded-full bg-blue-500/20 p-3">
              <BarChart3 className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-100">주간 건강 요약</h2>
              <p className="text-gray-400">{weeklyReport.period}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleDownloadCSV}
              className="flex items-center space-x-2 rounded-xl border border-gray-600 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700"
            >
              <Download className="h-4 w-4" />
              <span>CSV</span>
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center space-x-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
            >
              <FileText className="h-4 w-4" />
              <span>PDF 내보내기</span>
            </button>
          </div>
        </div>

        {/* Key Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {weeklyReport.highlights.map((highlight, index) => {
            const getConfig = () => {
              switch (highlight.type) {
                case 'success':
                  return {
                    icon: TrendingUp,
                    bgColor: 'bg-emerald-500/20',
                    borderColor: 'border-emerald-500/30',
                    textColor: 'text-emerald-400'
                  };
                case 'improvement':
                  return {
                    icon: TrendingUp,
                    bgColor: 'bg-blue-500/20',
                    borderColor: 'border-blue-500/30',
                    textColor: 'text-blue-400'
                  };
                case 'warning':
                  return {
                    icon: TrendingDown,
                    bgColor: 'bg-yellow-500/20',
                    borderColor: 'border-yellow-500/30',
                    textColor: 'text-yellow-400'
                  };
                default:
                  return {
                    icon: Activity,
                    bgColor: 'bg-gray-500/20',
                    borderColor: 'border-gray-500/30',
                    textColor: 'text-gray-400'
                  };
              }
            };

            const config = getConfig();
            const Icon = config.icon;

            return (
              <div key={index} className={`rounded-xl border ${config.borderColor} ${config.bgColor} p-4`}>
                <div className="flex items-center space-x-3 mb-2">
                  <Icon className={`h-5 w-5 ${config.textColor}`} />
                  <span className={`text-sm font-medium ${config.textColor}`}>
                    {highlight.value}
                  </span>
                </div>
                <div className="text-gray-100 font-medium">{highlight.title}</div>
              </div>
            );
          })}
        </div>

        {/* Charts Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-6">
            <h3 className="font-semibold text-gray-100 mb-4">주간 활동 트렌드</h3>
            <div className="h-48 flex items-center justify-center bg-gray-700/30 rounded-lg">
              <div className="text-center text-gray-400">
                <BarChart3 className="h-8 w-8 mx-auto mb-2" />
                <div className="text-sm">활동 데이터 차트</div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-6">
            <h3 className="font-semibold text-gray-100 mb-4">수면 패턴 분석</h3>
            <div className="h-48 flex items-center justify-center bg-gray-700/30 rounded-lg">
              <div className="text-center text-gray-400">
                <Activity className="h-8 w-8 mx-auto mb-2" />
                <div className="text-sm">수면 패턴 차트</div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements & Improvements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6">
            <h3 className="font-semibold text-emerald-400 mb-4 flex items-center">
              <span className="mr-2">🏆</span>
              주요 성과
            </h3>
            <ul className="space-y-2">
              {weeklyReport.achievements.map((achievement, index) => (
                <li key={index} className="flex items-center space-x-3 text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  <span className="text-sm">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-6">
            <h3 className="font-semibold text-blue-400 mb-4 flex items-center">
              <span className="mr-2">💡</span>
              개선 제안
            </h3>
            <ul className="space-y-2">
              {weeklyReport.improvements.map((improvement, index) => (
                <li key={index} className="flex items-center space-x-3 text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <span className="text-sm">{improvement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Historical Reports */}
      <div className="rounded-2xl border border-gray-700 bg-slate-800/50 p-6">
        <h2 className="text-lg font-semibold text-gray-100 mb-4">이전 리포트</h2>
        <div className="space-y-3">
          {[
            { period: '2025-01-13 ~ 2025-01-19', type: '주간', status: 'completed' },
            { period: '2025-01-06 ~ 2025-01-12', type: '주간', status: 'completed' },
            { period: '2024년 12월', type: '월간', status: 'completed' },
            { period: '2024 Q4', type: '분기', status: 'completed' }
          ].map((report, index) => (
            <div key={index} className="flex items-center justify-between rounded-xl border border-gray-700 p-4 hover:bg-gray-700/30">
              <div className="flex items-center space-x-4">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="font-medium text-gray-100">{report.period}</div>
                  <div className="text-sm text-gray-400">{report.type} 리포트</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2 py-1 text-xs text-emerald-400">
                  완료
                </span>
                <button className="rounded-lg border border-gray-600 p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;