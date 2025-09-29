import React, { useState, useRef } from 'react';
import { Upload, File, Image, FileText, X, AlertCircle } from 'lucide-react';
import { HospitalRecord } from '../types';

interface HospitalRecordUploadProps {
  onUpload: (record: HospitalRecord) => void;
  onClose?: () => void;
}

const HospitalRecordUpload: React.FC<HospitalRecordUploadProps> = ({ onUpload, onClose }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    setUploading(true);

    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const record: HospitalRecord = {
      id: Date.now().toString(),
      fileName: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(1)}MB`,
      uploadedAt: new Date().toLocaleString(),
      status: 'uploaded',
      type: file.type.includes('pdf') ? 'pdf' : file.type.includes('image') ? 'image' : 'json'
    };

    onUpload(record);
    setUploading(false);
  };

  const getSupportedFormats = () => [
    { type: 'pdf', icon: FileText, label: 'PDF 문서', desc: '진단서, 검사 결과' },
    { type: 'image', icon: Image, label: '이미지', desc: 'JPG, PNG' },
    { type: 'json', icon: File, label: 'HL7 FHIR', desc: 'JSON 형식' }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="rounded-2xl border border-gray-700 bg-slate-900/50 p-6">
        {onClose && (
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-100">병원 기록 업로드</h3>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Upload Area */}
        <div
          className={`relative rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${
            isDragging
              ? 'border-emerald-500 bg-emerald-500/10'
              : 'border-gray-600 bg-gray-800/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {uploading ? (
            <div className="space-y-4">
              <div className="animate-spin mx-auto h-8 w-8 rounded-full border-2 border-emerald-500 border-t-transparent"></div>
              <div className="text-sm text-gray-300">업로드 중...</div>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div>
                <div className="text-lg font-medium text-gray-100 mb-2">
                  파일을 드래그하거나 클릭하여 업로드
                </div>
                <button
                  onClick={handleFileSelect}
                  className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
                >
                  파일 선택
                </button>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png,.json"
            onChange={handleFileChange}
          />
        </div>

        {/* Supported Formats */}
        <div className="mt-6">
          <div className="text-sm font-medium text-gray-300 mb-3">지원되는 형식</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {getSupportedFormats().map((format) => {
              const Icon = format.icon;
              return (
                <div key={format.type} className="rounded-lg border border-gray-700 p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-300">{format.label}</span>
                  </div>
                  <div className="text-xs text-gray-500">{format.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="mt-6 rounded-lg border border-yellow-600 bg-yellow-500/10 p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
            <div className="text-sm">
              <div className="font-medium text-yellow-200 mb-1">보안 및 프라이버시</div>
              <div className="text-yellow-300/80">
                병원 기록은 암호화되어 안전하게 저장되며, 사용자가 명시적으로 공유한 경우에만 AI 분석에 활용됩니다.
                언제든지 업로드한 파일을 삭제할 수 있습니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalRecordUpload;