import React from 'react';
import { CalendarDay, CycleInfo } from '../types';
import { X } from 'lucide-react';

interface CycleInfoModalProps {
  day: CalendarDay;
  cycleInfo: CycleInfo;
  onClose: () => void;
}

export function CycleInfoModal({ day, cycleInfo, onClose }: CycleInfoModalProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            {formatDate(day.date)}の周期情報
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">気分・体調の傾向</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
              {cycleInfo.mood.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">女性が取りたい栄養素＆食事</h4>
            <div className="space-y-4">
              {cycleInfo.nutrients.map((nutrient, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2">{nutrient.name}</h5>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">効果：{nutrient.effect}</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    おすすめ食材：{nutrient.foods.join('、')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">デートにおすすめ</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  おすすめの料理タイプ
                </h5>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                  {cycleInfo.dateRecommendations.foodTypes.map((type, index) => (
                    <li key={index}>{type}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  おすすめのレストラン
                </h5>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                  {cycleInfo.dateRecommendations.restaurants.map((restaurant, index) => (
                    <li key={index}>{restaurant}</li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-2">
                <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  おすすめのアクティビティ
                </h5>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                  {cycleInfo.dateRecommendations.activities.map((activity, index) => (
                    <li key={index}>{activity}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">妊娠可能性</h4>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <p className="font-medium text-gray-800 dark:text-gray-200 mb-1">
                確率: {cycleInfo.fertilityInfo.probability}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {cycleInfo.fertilityInfo.description}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">パートナーへのアドバイス</h4>
            <p className="text-gray-600 dark:text-gray-400">
              {cycleInfo.partnerAdvice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}