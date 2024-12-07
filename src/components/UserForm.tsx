import React, { useState } from 'react';
import { User, PeriodInputType } from '../types';
import { Moon } from 'lucide-react';

interface UserFormProps {
  onSave: (user: Omit<User, 'id'>) => void;
  onCancel: () => void;
}

export function UserForm({ onSave, onCancel }: UserFormProps) {
  const [name, setName] = useState('');
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);
  const [periodDate, setPeriodDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [periodInputType, setPeriodInputType] = useState<PeriodInputType>('start');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lastPeriodStart = new Date(periodDate);
    
    // 終了日が選択された場合、開始日を計算
    if (periodInputType === 'end') {
      lastPeriodStart.setDate(lastPeriodStart.getDate() - (periodLength - 1));
    }

    onSave({
      name,
      cycleLength,
      periodLength,
      lastPeriodStart,
      periodInputType,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 max-w-md w-full">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Moon className="w-6 h-6 text-indigo-500" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">新規追加</h2>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            周期の長さ、生理期間がわからない場合、そのまま保存してください。
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">名前</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              周期の長さ（日数）
            </label>
            <input
              type="number"
              value={cycleLength}
              onChange={(e) => setCycleLength(Number(e.target.value))}
              min="20"
              max="40"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              生理期間（日数）
            </label>
            <input
              type="number"
              value={periodLength}
              onChange={(e) => setPeriodLength(Number(e.target.value))}
              min="3"
              max="10"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              生理日の入力方法
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="start"
                  checked={periodInputType === 'start'}
                  onChange={(e) => setPeriodInputType(e.target.value as PeriodInputType)}
                  className="mr-2"
                />
                <span className="text-gray-700 dark:text-gray-300">開始日</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="end"
                  checked={periodInputType === 'end'}
                  onChange={(e) => setPeriodInputType(e.target.value as PeriodInputType)}
                  className="mr-2"
                />
                <span className="text-gray-700 dark:text-gray-300">終了日</span>
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              ※どちらか覚えている方を選択してください
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {periodInputType === 'start' ? '生理開始日' : '生理終了日'}
            </label>
            <input
              type="date"
              value={periodDate}
              onChange={(e) => setPeriodDate(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-all"
            >
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}