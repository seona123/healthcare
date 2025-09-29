import React, { useState } from 'react';
import { Plus, CreditCard as Edit2, Target, TrendingUp, Calendar, Bell } from 'lucide-react';
import { MOCK_GOALS } from '../constants';
import { Goal } from '../types';

const Goals: React.FC = () => {
  const [goals, setGoals] = useState(MOCK_GOALS);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'weight': return '⚖️';
      case 'exercise': return '🏃‍♂️';
      case 'sleep': return '🌙';
      case 'nutrition': return '🥗';
      default: return '🎯';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'weight': return 'bg-blue-500';
      case 'exercise': return 'bg-emerald-500';
      case 'sleep': return 'bg-purple-500';
      case 'nutrition': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getProgressPercentage = (goal: Goal) => {
    return Math.min((goal.current / goal.target) * 100, 100);
  };

  const handleEditGoal = (goal: Goal) => {
    setEditingGoal(goal);
    setIsEditModalOpen(true);
  };

  const handleCreateNewGoal = () => {
    setEditingGoal(null);
    setIsEditModalOpen(true);
  };

  const handleSaveGoal = () => {
    // Goal saving logic would go here
    setIsEditModalOpen(false);
    setEditingGoal(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">목표 관리</h1>
          <p className="text-gray-400 mt-1">건강 목표를 설정하고 진행 상황을 추적하세요</p>
        </div>
        <button
          onClick={handleCreateNewGoal}
          className="flex items-center space-x-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
        >
          <Plus className="h-4 w-4" />
          <span>새 목표</span>
        </button>
      </div>

      {/* AI Suggestions Banner */}
      <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-6">
        <div className="flex items-start space-x-4">
          <div className="rounded-full bg-blue-500/20 p-3">
            <TrendingUp className="h-6 w-6 text-blue-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-100 mb-2">AI 목표 재설정 제안</h3>
            <p className="text-gray-300 mb-4">
              걸음 수 목표를 지속적으로 달성하고 있네요! 더 도전적인 목표로 업그레이드하시겠어요?
            </p>
            <div className="flex space-x-3">
              <button className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600">
                목표 조정하기
              </button>
              <button className="rounded-lg border border-gray-600 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700">
                나중에
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const progressPercentage = getProgressPercentage(goal);
          const isCompleted = progressPercentage >= 100;
          
          return (
            <div key={goal.id} className="rounded-2xl border border-gray-700 bg-slate-800/50 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{getCategoryIcon(goal.category)}</div>
                  <div>
                    <h3 className="font-semibold text-gray-100">{goal.title}</h3>
                    <div className="text-sm text-gray-400">{goal.frequency}</div>
                  </div>
                </div>
                <button
                  onClick={() => handleEditGoal(goal)}
                  className="rounded-full p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
              </div>

              <div className="mb-4">
                <div className="flex items-end space-x-2 mb-2">
                  <span className="text-2xl font-bold text-gray-100">
                    {goal.current.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-400 mb-1">
                    / {goal.target.toLocaleString()} {goal.unit}
                  </span>
                </div>
                
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${
                      isCompleted ? 'bg-emerald-500' : getCategoryColor(goal.category)
                    }`}
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  ></div>
                </div>
                
                <div className="text-sm text-gray-400">
                  {isCompleted ? '목표 달성!' : `${progressPercentage.toFixed(0)}% 완료`}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span>{goal.deadline}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  {goal.reminder && (
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <Bell className="h-4 w-4" />
                      <span className="text-xs">알림</span>
                    </div>
                  )}
                </div>
              </div>

              {isCompleted && (
                <div className="mt-4 rounded-lg bg-emerald-500/20 border border-emerald-500/30 p-3">
                  <div className="flex items-center space-x-2 text-emerald-400">
                    <Target className="h-4 w-4" />
                    <span className="text-sm font-medium">목표 달성 완료!</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Goal Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-gray-900/75" onClick={() => setIsEditModalOpen(false)} />
          
          <div className="relative w-full max-w-md rounded-2xl bg-slate-800 shadow-2xl ring-1 ring-gray-700">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-100 mb-6">
                {editingGoal ? '목표 수정' : '새 목표 만들기'}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">목표 이름</label>
                  <input
                    type="text"
                    defaultValue={editingGoal?.title || ''}
                    className="w-full rounded-xl border border-gray-600 bg-gray-700 px-4 py-3 text-gray-100 focus:border-emerald-500 focus:outline-none"
                    placeholder="예: 일일 걸음 수"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">목표치</label>
                    <input
                      type="number"
                      defaultValue={editingGoal?.target || ''}
                      className="w-full rounded-xl border border-gray-600 bg-gray-700 px-4 py-3 text-gray-100 focus:border-emerald-500 focus:outline-none"
                      placeholder="10000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">단위</label>
                    <input
                      type="text"
                      defaultValue={editingGoal?.unit || ''}
                      className="w-full rounded-xl border border-gray-600 bg-gray-700 px-4 py-3 text-gray-100 focus:border-emerald-500 focus:outline-none"
                      placeholder="걸음"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">빈도</label>
                  <select 
                    defaultValue={editingGoal?.frequency || '매일'}
                    className="w-full rounded-xl border border-gray-600 bg-gray-700 px-4 py-3 text-gray-100 focus:border-emerald-500 focus:outline-none"
                  >
                    <option>매일</option>
                    <option>주간</option>
                    <option>월간</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">마감일</label>
                  <input
                    type="date"
                    defaultValue={editingGoal?.deadline || ''}
                    className="w-full rounded-xl border border-gray-600 bg-gray-700 px-4 py-3 text-gray-100 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="reminder"
                    defaultChecked={editingGoal?.reminder || false}
                    className="rounded border-gray-600 bg-gray-700 text-emerald-500 focus:ring-emerald-500"
                  />
                  <label htmlFor="reminder" className="text-sm text-gray-300">
                    리마인더 알림 설정
                  </label>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 rounded-xl border border-gray-600 py-3 text-sm font-medium text-gray-300 hover:bg-gray-700"
                >
                  취소
                </button>
                <button
                  onClick={handleSaveGoal}
                  className="flex-1 rounded-xl bg-emerald-500 py-3 text-sm font-medium text-white hover:bg-emerald-600"
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Goals;