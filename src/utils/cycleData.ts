import { CyclePhase, CycleInfo } from '../types';

export const cycleInfo: Record<CyclePhase, CycleInfo> = {
  menstrual: {
    phase: 'menstrual',
    mood: [
      '疲れやすい',
      '眠気を感じやすい',
      'ゆっくり休息を取りたい気分'
    ],
    nutrients: [
      {
        name: '鉄分',
        foods: ['レバー', 'ほうれん草', '牡蠣'],
        effect: '失われた血液を補い、貧血を予防します'
      },
      {
        name: 'ビタミンB群',
        foods: ['豚肉', '玄米', '納豆'],
        effect: '疲労回復と貧血予防に効果的です'
      },
      {
        name: 'ビタミンC',
        foods: ['柑橘類', 'イチゴ', 'パプリカ'],
        effect: '鉄分の吸収を促進し、免疫力を高めます'
      },
      {
        name: '食物繊維',
        foods: ['寒天', 'こんにゃく', '海藻類'],
        effect: 'むくみの解消と便秘予防に役立ちます'
      }
    ],
    partnerAdvice: 'この時期は特に休息を必要としています。温かい飲み物を用意したり、ゆっくり休める環境を整えてあげてください。',
    dateRecommendations: {
      foodTypes: [
        '温かい食事',
        'あっさりした和食',
        '消化の良い食事'
      ],
      restaurants: [
        '和食店',
        'オーガニックカフェ',
        '薬膳料理店'
      ],
      activities: [
        'カフェでゆっくり過ごす',
        '軽いウォーキング',
        '映画鑑賞'
      ]
    },
    fertilityInfo: {
      probability: '極めて低い',
      description: '生理中は妊娠の可能性が最も低い時期です。'
    }
  },
  follicular: {
    phase: 'follicular',
    mood: [
      'エネルギッシュ',
      '前向きな気分',
      'クリエイティブ'
    ],
    nutrients: [
      {
        name: '良質なタンパク質',
        foods: ['鶏むね肉', '豆腐', '卵白'],
        effect: '基礎代謝を上げ、筋力アップをサポートします'
      },
      {
        name: '食物繊維',
        foods: ['オートミール', 'キヌア', 'チアシード'],
        effect: '腸内環境を整え、美肌効果を促進します'
      },
      {
        name: 'ビタミンE',
        foods: ['アーモンド', 'アボカド', 'オリーブオイル'],
        effect: '血行を促進し、肌のターンオーバーを助けます'
      }
    ],
    partnerAdvice: 'この時期は活動的で意欲的です。新しいことにチャレンジする際のサポートや、アクティブな活動を一緒に楽しむのに適しています。',
    dateRecommendations: {
      foodTypes: [
        'ヘルシーな食事',
        'エスニック料理',
        '新鮮な魚介類'
      ],
      restaurants: [
        'オシャレなカフェ',
        'イタリアン',
        'シーフードレストラン'
      ],
      activities: [
        'アウトドア活動',
        'アクティブなデートスポット',
        '新しいレストランの開拓'
      ]
    },
    fertilityInfo: {
      probability: '低い',
      description: '卵胞が発育する時期で、まだ妊娠の可能性は低いです。'
    }
  },
  ovulation: {
    phase: 'ovulation',
    mood: [
      '社交的',
      '自信に満ちている',
      '魅力的に感じる'
    ],
    nutrients: [
      {
        name: '亜鉛',
        foods: ['牡蠣', '牛肉', 'かぼちゃの種'],
        effect: 'ホルモンバランスの調整を助けます'
      },
      {
        name: 'ビタミンD',
        foods: ['鮭', 'サバ', 'きのこ類'],
        effect: 'ホルモン分泌を促し、骨の健康を保ちます'
      },
      {
        name: 'オメガ3脂肪酸',
        foods: ['青魚', 'アマニ油', 'チアシード'],
        effect: '抗炎症作用があり、美肌効果も期待できます'
      }
    ],
    partnerAdvice: 'コミュニケーション能力が高まる時期です。深い会話や一緒に過ごす時間を大切にしてください。',
    dateRecommendations: {
      foodTypes: [
        'おしゃれな創作料理',
        'タパス風の小皿料理',
        'ワインに合う料理'
      ],
      restaurants: [
        'ワインバー',
        'モダンな和食店',
        'テラスのあるレストラン'
      ],
      activities: [
        'お洒落なバーでの食事',
        'アート展や美術館',
        '音楽ライブ'
      ]
    },
    fertilityInfo: {
      probability: '最も高い',
      description: '排卵日を含む前後数日間は、妊娠の可能性が最も高い時期です。'
    }
  },
  luteal: {
    phase: 'luteal',
    mood: [
      '感情の起伏が大きい',
      '集中力が低下',
      'イライラしやすい'
    ],
    nutrients: [
      {
        name: 'マグネシウム',
        foods: ['アーモンド', 'バナナ', '小松菜'],
        effect: 'イライラを軽減し、睡眠の質を改善します'
      },
      {
        name: 'セロトニン前駆物質',
        foods: ['バナナ', 'ダークチョコレート', '乳製品'],
        effect: '気分の安定をサポートします'
      },
      {
        name: 'カリウム',
        foods: ['アボカド', 'さつまいも', 'トマト'],
        effect: 'むくみの解消に効果的です'
      },
      {
        name: 'ビタミンB6',
        foods: ['鶏肉', 'サーモン', 'グリーンピース'],
        effect: 'PMS症状の緩和に役立ちます'
      }
    ],
    partnerAdvice: '感情の変化が大きい時期です。理解を示し、優しく接することを心がけてください。必要に応じて適度な距離を保つことも大切です。',
    dateRecommendations: {
      foodTypes: [
        '甘いデザート',
        '炭水化物が豊富な食事',
        '温かい家庭料理'
      ],
      restaurants: [
        'カフェ',
        'デザート専門店',
        '落ち着いた雰囲気のレストラン'
      ],
      activities: [
        '映画鑑賞',
        'のんびりしたピクニック',
        'カフェ巡り'
      ]
    },
    fertilityInfo: {
      probability: '低い',
      description: '黄体期は妊娠の可能性が低く、次の周期に向けて体が準備を始める時期です。'
    }
  }
};