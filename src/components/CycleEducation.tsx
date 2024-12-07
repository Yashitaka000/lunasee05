import React, { useState } from 'react';
import { Book, X } from 'lucide-react';

interface CyclePhaseInfo {
  phase: string;
  physical: string[];
  mental: string[];
  skin: string[];
  tips: string[];
}

const cyclePhaseInfo: CyclePhaseInfo[] = [
  {
    phase: "生理期",
    physical: [
      "体調が優れへんのが普通やで。疲れやすいし、腹痛や頭痛もあるかもしれん",
      "体温が低めになって、冷えが気になる時期や"
    ],
    mental: [
      "ホルモンバランスの変化で気分の浮き沈みが激しいんや",
      "イライラしやすい時期やけど、これは自然な反応やで"
    ],
    skin: [
      "肌が敏感になってて、普段より刺激に弱いんや",
      "乾燥しやすい時期でもあるさかい、肌荒れしやすいねん"
    ],
    tips: [
      "この時期は特にデリケートやから、優しく接することが大事やで",
      "温かい飲み物を用意したり、ゆっくり休める環境を作ってあげるのがええ",
      "腹痛がある時は、そっと湯たんぽや温かいタオルを渡してあげるのもありやで",
      "イライラしてても、それは一時的なもんやから、理解を示してあげてな"
    ]
  },
  {
    phase: "卵胞期",
    physical: [
      "徐々に体調が良くなってきて、エネルギーが戻ってくる時期や",
      "体も軽くなって、活動的になってくるんや"
    ],
    mental: [
      "気分も前向きになって、新しいことにチャレンジしたがる時期やで",
      "コミュニケーション能力も高まってくるさかい、会話も弾みやすいんや"
    ],
    skin: [
      "肌の調子も良くなってきて、トラブルも落ち着いてくる",
      "顔色も良くなってきて、全体的に調子が上向きになってくるで"
    ],
    tips: [
      "この時期は一緒に外に出かけるのがおすすめやで",
      "新しい場所に行ったり、アクティブな活動を楽しむのにピッタリや",
      "前向きな気分を活かして、一緒に新しいことにチャレンジするのもええな",
      "でも、まだ完全回復してへんかもしれんから、様子見ながらやで"
    ]
  },
  {
    phase: "排卵期",
    physical: [
      "体調は最高潮！エネルギーに満ち溢れてる時期やで",
      "ホルモンバランスが整って、体の調子がええんや"
    ],
    mental: [
      "自信に満ちあふれて、気分も最高な時期や",
      "コミュニケーション意欲も高まって、特に異性への関心も強くなるんや"
    ],
    skin: [
      "肌のコンディションも最高やで！艶やかさが出てくる",
      "女性ホルモンの影響で、特に魅力的に見える時期なんや"
    ],
    tips: [
      "デートするなら、この時期がベストやで！",
      "おしゃれなディナーに誘うのもええし、特別な予定を立てるのにぴったりや",
      "でも、この時期は妊娠しやすい時期でもあるさかい、その辺の配慮も忘れんようにな",
      "褒め言葉や感謝の言葉を伝えるのも、より効果的な時期やで"
    ]
  },
  {
    phase: "黄体期",
    physical: [
      "むくみやすくなって、体が重く感じる時期や",
      "疲れやすくなって、体調の変化を感じやすいんや"
    ],
    mental: [
      "感情の起伏が激しくなりやすい時期やで",
      "ちょっとしたことで落ち込んだり、不安になったりしやすいんや"
    ],
    skin: [
      "ホルモンバランスの変化で、肌トラブルが出やすい時期や",
      "ニキビとか吹き出物ができやすいんや"
    ],
    tips: [
      "この時期は特に精神面でのサポートが大切やで",
      "否定的な言葉は控えめにして、できるだけ肯定的な声かけをしてあげてな",
      "甘いものが欲しくなるのは自然なことやから、たまには一緒に楽しむのもええで",
      "ゆっくり休める時間を作ってあげるのが一番や。一人の時間も大切にしてあげてな"
    ]
  }
];

export function CycleEducation() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState<CyclePhaseInfo | null>(null);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full max-w-4xl mx-auto mt-8 p-6 rounded-2xl bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 shadow-lg transform hover:scale-105 transition-all group"
      >
        <div className="flex items-center justify-center gap-3">
          <Book className="w-8 h-8 text-yellow-500 group-hover:text-yellow-600 transition-colors" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-600">
            生理周期について学ぼう！
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {selectedPhase ? selectedPhase.phase : "生理周期の豆知識"}
              </h2>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setSelectedPhase(null);
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {!selectedPhase ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cyclePhaseInfo.map((phase) => (
                  <button
                    key={phase.phase}
                    onClick={() => setSelectedPhase(phase)}
                    className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 transition-all"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      {phase.phase}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      クリックして詳しく見る
                    </p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                <button
                  onClick={() => setSelectedPhase(null)}
                  className="text-sm text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  ← 戻る
                </button>

                <div className="space-y-4">
                  <section>
                    <h3 className="text-lg font-semibold text-blue-500 dark:text-blue-400 mb-2">
                      体の変化
                    </h3>
                    <ul className="space-y-2">
                      {selectedPhase.physical.map((item, index) => (
                        <li key={index} className="text-gray-700 dark:text-gray-300">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-indigo-500 dark:text-indigo-400 mb-2">
                      心の変化
                    </h3>
                    <ul className="space-y-2">
                      {selectedPhase.mental.map((item, index) => (
                        <li key={index} className="text-gray-700 dark:text-gray-300">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-violet-500 dark:text-violet-400 mb-2">
                      お肌の変化
                    </h3>
                    <ul className="space-y-2">
                      {selectedPhase.skin.map((item, index) => (
                        <li key={index} className="text-gray-700 dark:text-gray-300">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-yellow-500 dark:text-yellow-400 mb-2">
                      男としてできること
                    </h3>
                    <ul className="space-y-2">
                      {selectedPhase.tips.map((item, index) => (
                        <li key={index} className="text-gray-700 dark:text-gray-300">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}