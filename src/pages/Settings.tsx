import React, { useState } from 'react';
import { User, Bell, Shield, Database, Download, Trash2, FileText, Calendar } from 'lucide-react';
import HospitalRecordUpload from '../components/HospitalRecordUpload';
import { MOCK_HOSPITAL_RECORDS } from '../constants';
import { HospitalRecord } from '../types';

const Settings: React.FC = () => {
  const [hospitalRecords, setHospitalRecords] = useState(MOCK_HOSPITAL_RECORDS);
  const [showUpload, setShowUpload] = useState(false);

  const handleRecordUpload = (record: HospitalRecord) => {
    setHospitalRecords(prev => [...prev, record]);
    setShowUpload(false);
  };

  const handleDeleteRecord = (id: string) => {
    setHospitalRecords(prev => prev.filter(record => record.id !== id));
  };

  const getRecordIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-400" />;
      case 'image':
        return <div className="text-lg">🖼️</div>;
      default:
        return <div className="text-lg">📄</div>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'analyzed':
        return <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2 py-1 text-xs text-emerald-400">분석 완료</span>;
      case 'uploaded':
        return <span className="inline-flex items-center rounded-full bg-blue-500/20 px-2 py-1 text-xs text-blue-400">업로드 완료</span>;
      case 'error':
        return <span className="inline-flex items-center rounded-full bg-red-500/20 px-2 py-1 text-xs text-red-400">오류</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">설정</h1>
        <p className="text-gray-400 mt-1">계정 및 앱 설정을 관리하세요</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Menu */}
        <div className="lg:col-span-1">
          <nav className="space-y-2">
            <a href="#account" className="flex items-center space-x-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 px-4 py-3 text-emerald-400">
              <User className="h-5 w-5" />
              <span>계정 설정</span>
            </a>
            <a href="#notifications" className="flex items-center space-x-3 rounded-xl px-4 py-3 text-gray-300 hover:bg-gray-700">
              <Bell className="h-5 w-5" />
              <span>알림 설정</span>
            </a>
            <a href="#privacy" className="flex items-center space-x-3 rounded-xl px-4 py-3 text-gray-300 hover:bg-gray-700">
              <Shield className="h-5 w-5" />
              <span>개인정보</span>
            </a>
            <a href="#data" className="flex items-center space-x-3 rounded-xl px-4 py-3 text-gray-300 hover:bg-gray-700">
              <Database className="h-5 w-5" />
              <span>데이터 관리</span>
            </a>
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Account Settings */}
          <section className="rounded-2xl border border-gray-700 bg-slate-800/50 p-6">
            <h2 className="text-lg font-semibold text-gray-100 mb-6">계정 정보</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">이름</label>
                <input
                  type="text"
                  defaultValue="김건강"
                  className="w-full rounded-xl border border-gray-600 bg-gray-700 px-4 py-3 text-gray-100 focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">이메일</label>
                <input
                  type="email"
                  defaultValue="health@example.com"
                  className="w-full rounded-xl border border-gray-600 bg-gray-700 px-4 py-3 text-gray-100 focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">생년월일</label>
                <input
                  type="date"
                  defaultValue="1990-01-01"
                  className="w-full rounded-xl border border-gray-600 bg-gray-700 px-4 py-3 text-gray-100 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </section>

          {/* Hospital Records Management */}
          <section className="rounded-2xl border border-gray-700 bg-slate-800/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-100">병원 기록 관리</h2>
              <button
                onClick={() => setShowUpload(true)}
                className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
              >
                기록 업로드
              </button>
            </div>

            {hospitalRecords.length > 0 ? (
              <div className="space-y-3">
                {hospitalRecords.map((record) => (
                  <div key={record.id} className="flex items-center justify-between rounded-xl border border-gray-700 p-4">
                    <div className="flex items-center space-x-4">
                      {getRecordIcon(record.type)}
                      <div>
                        <div className="font-medium text-gray-100">{record.fileName}</div>
                        <div className="text-sm text-gray-400">
                          {record.size} • {record.uploadedAt}
                        </div>
                      </div>
                      {getStatusBadge(record.status)}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="rounded-lg bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600">
                        AI 분석 요청
                      </button>
                      <button className="rounded-lg border border-gray-600 p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700">
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteRecord(record.id)}
                        className="rounded-lg border border-red-600 p-2 text-red-400 hover:bg-red-600/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                업로드된 병원 기록이 없습니다.
              </div>
            )}

            {showUpload && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="fixed inset-0 bg-gray-900/75" onClick={() => setShowUpload(false)} />
                <div className="relative">
                  <HospitalRecordUpload 
                    onUpload={handleRecordUpload}
                    onClose={() => setShowUpload(false)}
                  />
                </div>
              </div>
            )}
          </section>

          {/* Data Export */}
          <section className="rounded-2xl border border-gray-700 bg-slate-800/50 p-6">
            <h2 className="text-lg font-semibold text-gray-100 mb-4">데이터 내보내기</h2>
            <p className="text-gray-400 mb-6">
              건강 데이터를 다양한 형식으로 내보낼 수 있습니다.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="flex items-center space-x-3 rounded-xl border border-gray-600 p-4 hover:bg-gray-700">
                <div className="rounded-lg bg-green-500/20 p-2">
                  <FileText className="h-5 w-5 text-green-400" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-100">CSV 파일</div>
                  <div className="text-sm text-gray-400">스프레드시트로 분석</div>
                </div>
              </button>
              
              <button className="flex items-center space-x-3 rounded-xl border border-gray-600 p-4 hover:bg-gray-700">
                <div className="rounded-lg bg-red-500/20 p-2">
                  <FileText className="h-5 w-5 text-red-400" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-100">PDF 리포트</div>
                  <div className="text-sm text-gray-400">종합 건강 보고서</div>
                </div>
              </button>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="rounded-2xl border border-red-600 bg-red-500/10 p-6">
            <h2 className="text-lg font-semibold text-red-400 mb-4">위험 영역</h2>
            <p className="text-red-300 mb-6">
              아래 작업들은 되돌릴 수 없습니다. 신중히 진행해주세요.
            </p>
            
            <div className="space-y-3">
              <button className="w-full rounded-xl border border-red-600 py-3 text-red-400 hover:bg-red-600/10">
                모든 데이터 삭제
              </button>
              <button className="w-full rounded-xl border border-red-600 py-3 text-red-400 hover:bg-red-600/10">
                계정 삭제
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;