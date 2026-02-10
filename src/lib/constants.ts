import {
  Category,
  ContentType,
  Language,
  InquiryCategory,
  ToneType,
  QuickTemplate,
  InquiryTemplate,
} from "@/types";

export const CATEGORIES: Category[] = [
  {
    id: "food",
    label: "食品・飲料",
    icon: "food",
    description: "日本食、お菓子、飲料、調味料など",
  },
  {
    id: "beauty",
    label: "美容・化粧品",
    icon: "beauty",
    description: "スキンケア、メイク、ヘアケアなど",
  },
  {
    id: "crafts",
    label: "伝統工芸",
    icon: "crafts",
    description: "陶磁器、漆器、織物、和紙など",
  },
  {
    id: "fashion",
    label: "ファッション",
    icon: "fashion",
    description: "アパレル、テキスタイル、アクセサリーなど",
  },
  {
    id: "tech",
    label: "テクノロジー",
    icon: "tech",
    description: "精密機器、電子部品、工業製品など",
  },
  {
    id: "lifestyle",
    label: "生活雑貨",
    icon: "lifestyle",
    description: "インテリア、キッチン用品、文具など",
  },
  {
    id: "sake",
    label: "日本酒・酒類",
    icon: "sake",
    description: "日本酒、焼酎、ウイスキー、ワインなど",
  },
  {
    id: "health",
    label: "ヘルスケア",
    icon: "health",
    description: "サプリメント、健康食品、医療機器など",
  },
];

export const CONTENT_TYPES: ContentType[] = [
  {
    id: "product-page",
    label: "商品紹介ページ",
    icon: "product-page",
    description: "ECサイトやWebサイト用の商品説明文",
  },
  {
    id: "sns-post",
    label: "SNS投稿",
    icon: "sns-post",
    description: "Instagram、Facebook、X用の投稿文",
  },
  {
    id: "email",
    label: "メールマガジン",
    icon: "email",
    description: "海外顧客向けのメールマガジン",
  },
  {
    id: "press-release",
    label: "プレスリリース",
    icon: "press-release",
    description: "海外メディア向けプレスリリース",
  },
  {
    id: "exhibition",
    label: "展示会資料",
    icon: "exhibition",
    description: "海外展示会用のブース資料・チラシ",
  },
  {
    id: "pitch",
    label: "バイヤー向け提案書",
    icon: "pitch",
    description: "海外バイヤーへの営業資料",
  },
];

export const LANGUAGES: Language[] = [
  {
    id: "en",
    label: "英語",
    flag: "🇺🇸",
    culturalNote: "直接的なCTA、ベネフィット重視",
  },
  {
    id: "zh-cn",
    label: "中国語（簡体）",
    flag: "🇨🇳",
    culturalNote: "品質認証・信頼性強調、数値データ重視",
  },
  {
    id: "zh-tw",
    label: "中国語（繁体）",
    flag: "🇹🇼",
    culturalNote: "品質とライフスタイル訴求",
  },
  {
    id: "ko",
    label: "韓国語",
    flag: "🇰🇷",
    culturalNote: "トレンド感・話題性重視",
  },
  {
    id: "fr",
    label: "フランス語",
    flag: "🇫🇷",
    culturalNote: "ストーリー・哲学・職人技重視",
  },
  {
    id: "de",
    label: "ドイツ語",
    flag: "🇩🇪",
    culturalNote: "品質・技術仕様・環境配慮重視",
  },
  {
    id: "es",
    label: "スペイン語",
    flag: "🇪🇸",
    culturalNote: "感情的つながり・家族価値重視",
  },
  {
    id: "th",
    label: "タイ語",
    flag: "🇹🇭",
    culturalNote: "礼儀正しさ・日本ブランド信頼重視",
  },
];

export const INQUIRY_CATEGORIES: InquiryCategory[] = [
  {
    id: "product-question",
    label: "商品に関する質問",
    icon: "product-question",
    description: "成分、サイズ、使い方など商品の詳細について",
  },
  {
    id: "shipping",
    label: "配送・関税について",
    icon: "shipping",
    description: "海外配送、関税、届け日数について",
  },
  {
    id: "order",
    label: "注文・決済について",
    icon: "order",
    description: "注文方法、決済手段、キャンセルについて",
  },
  {
    id: "return",
    label: "返品・交換",
    icon: "return",
    description: "返品ポリシー、交換手続きについて",
  },
  {
    id: "custom",
    label: "その他（自由入力）",
    icon: "custom",
    description: "上記に当てはまらないお問い合わせ",
  },
];

export const LANGUAGE_LABEL_MAP: Record<string, string> = Object.fromEntries(
  LANGUAGES.map((l) => [l.id, l.label])
);

export const CATEGORY_LABEL_MAP: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c.label])
);

export const CONTENT_TYPE_LABEL_MAP: Record<string, string> =
  Object.fromEntries(CONTENT_TYPES.map((ct) => [ct.id, ct.label]));

export const TONES: { id: ToneType; label: string; description: string }[] = [
  {
    id: "professional",
    label: "プロフェッショナル",
    description: "正式でビジネス向けのトーン",
  },
  {
    id: "casual",
    label: "カジュアル",
    description: "親しみやすくフレンドリーなトーン",
  },
  {
    id: "luxury",
    label: "ラグジュアリー",
    description: "高級感と洗練を演出するトーン",
  },
  {
    id: "friendly",
    label: "フレンドリー",
    description: "温かみのある親近感のあるトーン",
  },
];

export const QUICK_TEMPLATES: QuickTemplate[] = [
  {
    id: "matcha-sns",
    label: "抹茶ブランドのSNS投稿",
    description: "京都の抹茶ブランドのInstagram投稿を英語・中国語・韓国語で生成",
    category: "food",
    contentType: "sns-post",
    languages: ["en", "zh-cn", "ko"],
    brand: {
      name: "宇治抹茶 一葉",
      description:
        "京都宇治で150年続く茶園。石臼挽きの最高級抹茶を、伝統製法で丁寧に仕上げています。",
      specialty:
        "契約農家の一番茶のみを使用。遮光栽培による深い旨みと鮮やかな緑色が特徴。",
    },
    tone: "casual",
  },
  {
    id: "skincare-product",
    label: "スキンケア商品ページ",
    description: "日本発スキンケアの商品紹介ページを英語・フランス語で生成",
    category: "beauty",
    contentType: "product-page",
    languages: ["en", "fr"],
    brand: {
      name: "HADA Laboratory",
      description:
        "日本の発酵技術を活かしたスキンケアブランド。米ぬか由来の天然成分で肌本来の力を引き出します。",
      specialty:
        "独自の二重発酵製法。パラベンフリー、動物実験なし。敏感肌にも使える処方。",
    },
    tone: "professional",
  },
  {
    id: "sake-press",
    label: "日本酒プレスリリース",
    description: "酒蔵の新商品プレスリリースを英語・ドイツ語・スペイン語で生成",
    category: "sake",
    contentType: "press-release",
    languages: ["en", "de", "es"],
    brand: {
      name: "山城酒造",
      description:
        "創業300年の老舗酒蔵。地元の契約農家が栽培する山田錦を使い、伝統的な生酛造りを守り続けています。",
      specialty:
        "全量純米酒。自社の井戸水を使用し、蔵人の手作業による小仕込みにこだわっています。",
    },
    tone: "luxury",
  },
  {
    id: "craft-exhibition",
    label: "伝統工芸の展示会資料",
    description: "漆器ブランドの海外展示会資料を英語・フランス語で生成",
    category: "crafts",
    contentType: "exhibition",
    languages: ["en", "fr"],
    brand: {
      name: "輪島塗 鶴亀",
      description:
        "石川県輪島市で伝統的な輪島塗を制作。日用品から芸術作品まで幅広く手がけています。",
      specialty:
        "124工程を全て手作業で行い、100年使える堅牢さを実現。現代のインテリアに合うモダンデザインも展開。",
    },
    tone: "professional",
  },
];

export const INQUIRY_TEMPLATES: InquiryTemplate[] = [
  {
    id: "shipping-asia",
    label: "アジア向け配送の問い合わせ",
    description: "中国・韓国・タイへの配送に関する回答テンプレート",
    category: "shipping",
    customMessage:
      "日本からの国際配送について。配送方法、所要日数、送料、追跡番号の有無を教えてください。",
    targetLanguages: ["zh-cn", "ko", "th"],
    tone: "professional",
  },
  {
    id: "product-ingredients",
    label: "化粧品の成分に関する質問",
    description: "スキンケア商品の成分・安全性に関する回答テンプレート",
    category: "product-question",
    customMessage:
      "御社のスキンケア製品の全成分リストと、敏感肌でも使用できるかどうか教えてください。アレルギー対応についても知りたいです。",
    targetLanguages: ["en", "zh-cn", "ko"],
    tone: "professional",
  },
  {
    id: "return-policy",
    label: "返品ポリシーの説明",
    description: "欧米向けの返品・交換ポリシー回答テンプレート",
    category: "return",
    customMessage:
      "商品の返品・交換ポリシーについて。返品期限、条件、手続き方法、返金方法を具体的に教えてください。",
    targetLanguages: ["en", "fr", "de", "es"],
    tone: "friendly",
  },
];
