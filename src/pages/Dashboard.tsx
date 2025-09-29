import React from 'react';
import { TrendingUp, Activity, Target, Calendar, Zap, Brain, AlertTriangle } from 'lucide-react';
import { MOCK_KPI_DATA } from '../constants';

const Dashboard: React.FC = () => {
  const insights = [
    {
      type: 'warning',
      icon: AlertTriangle,
      title: '수면 부족 감지',
      message: '이틀 연속 6시간 미만 수면. 오늘은 가벼운 스트레칭 5분을 추천해요.',
      action: '스트레칭 시작하기'
    },
    {
      type: 'success',
      icon: TrendingUp,
      title: '걸음 수 목표 달성',
      message: '7일 연속 목표 달성! 이번 주 평균보다 12% 증가했어요.',
      action: '새로운 목표 설정'
    },
    {
      type: 'info',
      icon: Brain,
      title: 'AI 분석 완료',
      message: '심박 패턴 분석 결과가 준비되었습니다.',
      action: '리포트 보기'
    }
  ];

  const recentSync = [
    { device: 'Apple Health', status: 'success', time: '방금 전', data: '걸음, 심박, 수면' },
    { device: 'Garmin', status: 'success', time: '5분 전', data: '운동, GPS' },
    { device: 'Fitbit', status: 'pending', time: '동기화 중', data: '활동 데이터' },
    { device: '수동 입력', status: 'error', time: '1시간 전', data: '체중 측정' }
  ];

  const quickActions = [
    { icon: Activity, label: '운동 시작', color: 'bg-emerald-500' },
    { icon: Target, label: '체중 기록', color: 'bg-blue-500' },
    { icon: Calendar, label: '식단 스캔', color: 'bg-purple-500' },
    { icon: Zap, label: '목표 설정', color: 'bg-orange-500' }
  ];

  return (
    <div className="space-y-8">
      {/* Today's Insights */}
      <section>
        <h2 className="text-xl font-semibold text-gray-100 mb-6">오늘의 인사이트</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            const colorClass = insight.type === 'warning' ? 'border-yellow-500/30 bg-yellow-500/10' :
                              insight.type === 'success' ? 'border-emerald-500/30 bg-emerald-500/10' :
                              'border-blue-500/30 bg-blue-500/10';
            
            return (
              <div key={index} className={`rounded-2xl border p-6 ${colorClass}`}>
                <div className="flex items-start space-x-4">
                  <div className={`rounded-full p-2 ${
                    insight.type === 'warning' ? 'bg-yellow-500/20' :
                    insight.type === 'success' ? 'bg-emerald-500/20' :
                    'bg-blue-500/20'
                  }`}>
                    <Icon className={`h-5 w-5 ${
                      insight.type === 'warning' ? 'text-yellow-400' :
                      insight.type === 'success' ? 'text-emerald-400' :
                      'text-blue-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-100 mb-1">{insight.title}</h3>
                    <p className="text-sm text-gray-300 mb-3">{insight.message}</p>
                    <button className="text-xs font-medium text-emerald-400 hover:text-emerald-300">
                      {insight.action} →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* KPI Cards Grid */}
      <section>
        <h2 className="text-xl font-semibold text-gray-100 mb-6">핵심 지표</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Steps Card */}
          <div className="rounded-2xl border border-gray-700 bg-slate-800/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-300">걸음 수</h3>
              <Activity className="h-5 w-5 text-emerald-400" />
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-gray-100">
                {MOCK_KPI_DATA.steps.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">목표: 10,000걸음</div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-emerald-500 h-2 rounded-full" 
                  style={{ width: `${Math.min((MOCK_KPI_DATA.steps / 10000) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Calories Card */}
          <div className="rounded-2xl border border-gray-700 bg-slate-800/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-300">칼로리</h3>
              <div className="h-8 w-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                🔥
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-gray-100">
                {MOCK_KPI_DATA.kcal.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">소모 칼로리</div>
              <div className="flex space-x-2">
                <div className="h-2 bg-orange-500 rounded-full flex-1"></div>
                <div className="h-2 bg-gray-700 rounded-full w-8"></div>
              </div>
            </div>
          </div>

          {/* Heart Rate Card */}
          <div className="rounded-2xl border border-gray-700 bg-slate-800/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-300">평균 심박</h3>
              <div className="text-red-400 text-xl">♥️</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-gray-100">
                {MOCK_KPI_DATA.hrAvg}
                <span className="text-sm text-gray-400 ml-1">bpm</span>
              </div>
              <div className="text-sm text-gray-400">정상 범위</div>
              <div className="h-8 flex items-end space-x-1">
                {[...Array(7)].map((_, i) => (
                  <div 
                    key={i} 
                    className="bg-red-500/50 w-3 rounded-t"
                    style={{ height: `${Math.random() * 100}%` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Sleep Card */}
          <div className="rounded-2xl border border-gray-700 bg-slate-800/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-300">수면</h3>
              <div className="text-purple-400 text-xl">🌙</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-gray-100">
                {MOCK_KPI_DATA.sleep}
                <span className="text-sm text-gray-400 ml-1">시간</span>
              </div>
              <div className="text-sm text-yellow-400">목표보다 1.2시간 부족</div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full" 
                  style={{ width: `${(MOCK_KPI_DATA.sleep / 8) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-xl font-semibold text-gray-100 mb-6">빠른 실행</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                className="rounded-2xl border border-gray-700 bg-slate-800/50 p-6 text-center hover:bg-slate-700/50 transition-colors"
              >
                <div className={`w-12 h-12 rounded-2xl ${action.color} mx-auto mb-3 flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-sm font-medium text-gray-300">{action.label}</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Recent Sync */}
      <section>
        <h2 className="text-xl font-semibold text-gray-100 mb-6">최근 동기화</h2>
        <div className="rounded-2xl border border-gray-700 bg-slate-800/50">
          <div className="p-6">
            <div className="space-y-4">
              {recentSync.map((sync, index) => (
                <div key={index} className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-4">
                    <div className={`w-2 h-2 rounded-full ${
                      sync.status === 'success' ? 'bg-emerald-400' :
                      sync.status === 'pending' ? 'bg-yellow-400 animate-pulse' :
                      'bg-red-400'
                    }`}></div>
                    <div>
                      <div className="font-medium text-gray-100">{sync.device}</div>
                      <div className="text-sm text-gray-400">{sync.data}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">{sync.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;