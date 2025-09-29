import React, { useState } from 'react';
import { Send, Sparkles, TrendingUp, Target, FileText, Brain } from 'lucide-react';
import { ChatMessage } from '../types';

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: '안녕하세요! 건강 관리 AI 도우미입니다. 오늘 컨디션은 어떠신가요? 수면이 부족해 보이는데, 어떤 도움이 필요하신지 알려주세요.',
      timestamp: '2025-01-27 09:30',
      suggestions: ['오늘 컨디션 분석', '수면 개선 팁', '운동 추천']
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const sessions = [
    { id: '1', title: '이번 주 건강 체크', date: '2025-01-27', active: true },
    { id: '2', title: '수면 패턴 분석', date: '2025-01-25' },
    { id: '3', title: '운동 계획 수립', date: '2025-01-23' },
    { id: '4', title: '식단 피드백', date: '2025-01-22' }
  ];

  const promptChips = [
    { icon: TrendingUp, label: '오늘 컨디션 분석', description: '현재 건강 상태를 종합 분석해드려요' },
    { icon: Brain, label: '주간 요약', description: '지난 주 건강 데이터를 요약해드려요' },
    { icon: Target, label: '목표 점검', description: '설정한 목표 달성도를 확인해드려요' },
    { icon: FileText, label: '식단 피드백', description: '최근 식단에 대한 조언을 드려요' }
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleString()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: '네, 말씀해주신 내용을 분석해보니 수면 패턴 개선이 필요해 보입니다. 규칙적인 수면 시간과 함께 취침 전 스마트폰 사용을 줄이시는 것을 추천드려요.',
        timestamp: new Date().toLocaleString(),
        suggestions: ['수면 개선 계획', '스트레스 관리', '운동 추천']
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInputValue('');
  };

  const handlePromptClick = (prompt: string) => {
    setInputValue(prompt);
  };

  return (
    <div className="flex h-[calc(100vh-200px)] gap-6">
      {/* Session Sidebar */}
      <div className="w-80 rounded-2xl border border-gray-700 bg-slate-800/50 p-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-100 mb-4">대화 세션</h2>
          <button className="w-full rounded-xl bg-emerald-500 py-3 text-sm font-medium text-white hover:bg-emerald-600">
            새로운 대화 시작
          </button>
        </div>

        <div className="space-y-2">
          {sessions.map((session) => (
            <button
              key={session.id}
              className={`w-full rounded-xl p-3 text-left transition-colors ${
                session.active 
                  ? 'bg-emerald-500/20 border border-emerald-500/30' 
                  : 'hover:bg-gray-700'
              }`}
            >
              <div className="font-medium text-gray-100 text-sm">{session.title}</div>
              <div className="text-xs text-gray-400 mt-1">{session.date}</div>
            </button>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-300 mb-4">AI 기능</h3>
          <div className="space-y-3">
            <div className="rounded-lg border border-gray-700 p-3">
              <div className="text-sm font-medium text-gray-100">개인화 계획</div>
              <div className="text-xs text-gray-400 mt-1">운동, 수면, 식단 맞춤 계획</div>
            </div>
            <div className="rounded-lg border border-gray-700 p-3">
              <div className="text-sm font-medium text-gray-100">이상치 탐지</div>
              <div className="text-xs text-gray-400 mt-1">건강 데이터 이상 감지 알림</div>
            </div>
            <div className="rounded-lg border border-gray-700 p-3">
              <div className="text-sm font-medium text-gray-100">루틴 빌더</div>
              <div className="text-xs text-gray-400 mt-1">7일 맞춤 루틴 생성</div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col rounded-2xl border border-gray-700 bg-slate-800/50">
        {/* Chat Header */}
        <div className="border-b border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-100">건강 AI 도우미</h3>
              <div className="text-sm text-gray-400">맞춤형 건강 코칭과 조언을 제공합니다</div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-2xl rounded-2xl px-4 py-3 ${
                  message.type === 'user'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-700 text-gray-100'
                }`}
              >
                <div className="text-sm">{message.content}</div>
                <div className="text-xs mt-2 opacity-70">{message.timestamp}</div>
                
                {message.suggestions && (
                  <div className="mt-3 space-y-2">
                    {message.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handlePromptClick(suggestion)}
                        className="block w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-left text-xs text-gray-300 hover:bg-gray-600"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Prompt Chips */}
        {messages.length === 1 && (
          <div className="border-t border-gray-700 p-6">
            <div className="mb-4 text-sm font-medium text-gray-300">무엇을 도와드릴까요?</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {promptChips.map((chip, index) => {
                const Icon = chip.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handlePromptClick(chip.label)}
                    className="rounded-xl border border-gray-600 p-4 text-left hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <Icon className="h-5 w-5 text-emerald-400" />
                      <span className="font-medium text-gray-100">{chip.label}</span>
                    </div>
                    <div className="text-xs text-gray-400">{chip.description}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-gray-700 p-6">
          <div className="flex space-x-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="건강에 대해 무엇이든 물어보세요..."
              className="flex-1 rounded-xl border border-gray-600 bg-gray-700 px-4 py-3 text-gray-100 placeholder-gray-400 focus:border-emerald-500 focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="rounded-xl bg-emerald-500 p-3 text-white hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;