import {
  CATEGORY_LABEL_MAP,
  CONTENT_TYPE_LABEL_MAP,
  LANGUAGE_LABEL_MAP,
} from "./constants";
import { BrandInfo, ToneType } from "@/types";

const TONE_INSTRUCTIONS: Record<ToneType, string> = {
  professional:
    "ビジネスにふさわしい正式で信頼感のある表現。データや実績を重視。",
  casual:
    "親しみやすくカジュアルな表現。SNSやブログ向けの軽やかなトーン。",
  luxury:
    "高級感と洗練を演出する表現。上質な素材や職人技を強調。",
  friendly:
    "温かみのある親近感のある表現。共感を大切にするトーン。",
};

const CULTURAL_RULES: Record<string, string> = {
  en: `【英語（アメリカ英語）の文化適応ルール】
- 直接的で分かりやすいCTA（Call To Action）を使用
- ベネフィットを先に、特徴を後に記述
- 読者に直接語りかける二人称（"you"）を積極活用
- 短い段落、箇条書きを好む
- 社会的証明（レビュー、実績数値）を重視
- "Japanese craftsmanship" "artisan" "authentic" などの訴求キーワードが有効`,

  "zh-cn": `【中国語（簡体字）の文化適応ルール】
- 品質認証、受賞歴、数値データを必ず含める
- 「日本製」「正規品」などの信頼性キーワードを強調
- WeChat/Weibo風のカジュアルなトーンも選択肢に
- 価格対効果のアピールが重要
- KOL（インフルエンサー）推薦風の表現が響く
- 「匠の技」「百年の歴史」など権威性の訴求が有効`,

  "zh-tw": `【中国語（繁体字）の文化適応ルール】
- 品質とライフスタイルの融合を訴求
- 日本文化への憧れを活用した情緒的表現
- 「精緻」「質感」「生活美學」などの表現が効果的
- 台湾特有の親しみやすい敬語表現を使用`,

  ko: `【韓国語の文化適応ルール】
- トレンド感と話題性を重視
- 「SNSで話題」「人気No.1」などの訴求
- 美容・健康カテゴリでは成分の詳細説明が必須
- 丁寧語（합니다体）を基本に、親しみやすさも演出
- 日本の最新トレンドとしてのポジショニング`,

  fr: `【フランス語の文化適応ルール】
- ストーリーテリングと哲学的アプローチを重視
- 職人技・伝統・芸術性への敬意を表現
- 「savoir-faire」「artisanat」「tradition」などのキーワード
- エレガントで洗練された文体
- 環境・倫理的配慮への言及が好まれる`,

  de: `【ドイツ語の文化適応ルール】
- 品質・技術仕様・精度の詳細な説明
- 環境配慮・サステナビリティへの取り組みを強調
- 論理的で構造化された文章構成
- 「Qualität」「Präzision」「Handwerk」が響く
- TÜVなどの認証があれば必ず記載`,

  es: `【スペイン語の文化適応ルール】
- 感情的なつながりと家族の価値観を重視
- 温かみのある表現と情熱的なトーン
- 「experiencia」「tradición」「pasión」が効果的
- ラテンアメリカ向けとスペイン向けの違いに配慮
- コミュニティとの共有・つながりを強調`,

  th: `【タイ語の文化適応ルール】
- 礼儀正しく丁寧な表現（ครับ/ค่ะの使い分け）
- 日本ブランドへの高い信頼を活用
- 「ของแท้จากญี่ปุ่น」（日本の本物）のような訴求
- 王室・仏教文化への配慮
- SNS映えとビジュアル重視の表現`,
};

export function buildSystemPrompt(
  categoryId: string,
  contentTypeId: string,
  tone: ToneType = "professional"
): string {
  const categoryLabel = CATEGORY_LABEL_MAP[categoryId] || categoryId;
  const contentTypeLabel =
    CONTENT_TYPE_LABEL_MAP[contentTypeId] || contentTypeId;
  const toneInstruction = TONE_INSTRUCTIONS[tone] || TONE_INSTRUCTIONS.professional;

  return `あなたは${categoryLabel}業界に精通した、海外マーケティングの専門コピーライターです。

あなたの役割:
- 日本の${categoryLabel}ブランドの魅力を海外市場に伝えるコンテンツを作成する
- 各言語の文化・商習慣に合わせた適切なローカライゼーションを行う
- 単なる翻訳ではなく、現地の消費者に刺さるコンテンツを生成する

作成するコンテンツ種別: ${contentTypeLabel}

トーン指示: ${toneInstruction}

出力ルール:
- 各言語のセクションは「## 🇺🇸 English」のように国旗絵文字と言語名で見出しをつける
- コンテンツは実用的で、そのまま使えるクオリティにする
- ブランドの「こだわり」を各文化に合わせた形で表現する
- 指定されたトーンを全言語で一貫して維持する
- Markdown形式で構造化して出力する`;
}

export function buildCulturalContext(languageIds: string[]): string {
  const rules = languageIds
    .map((id) => CULTURAL_RULES[id])
    .filter(Boolean)
    .join("\n\n");

  return `以下の文化適応ルールに従って、各言語のコンテンツを作成してください：

${rules}

重要: 各言語版は独立した高品質なコンテンツとして作成してください。日本語からの直訳ではなく、各市場の消費者に自然に響く表現を使ってください。`;
}

export function buildUserMessage(
  brand: BrandInfo,
  contentTypeId: string,
  languageIds: string[],
  tone: ToneType = "professional"
): string {
  const contentTypeLabel =
    CONTENT_TYPE_LABEL_MAP[contentTypeId] || contentTypeId;
  const languageLabels = languageIds
    .map((id) => LANGUAGE_LABEL_MAP[id] || id)
    .join("、");
  const toneInstruction = TONE_INSTRUCTIONS[tone] || TONE_INSTRUCTIONS.professional;

  return `以下のブランド情報をもとに、${contentTypeLabel}を作成してください。

【ブランド情報】
ブランド名: ${brand.name}
概要: ${brand.description}
こだわりポイント: ${brand.specialty}

【生成指示】
コンテンツ種別: ${contentTypeLabel}
対象言語: ${languageLabels}
トーン: ${toneInstruction}

各言語ごとにセクションを分けて、すぐに使える完成度の高いコンテンツを出力してください。`;
}

export function buildInquirySystemPrompt(
  tone: ToneType = "professional"
): string {
  const toneInstruction = TONE_INSTRUCTIONS[tone] || TONE_INSTRUCTIONS.professional;

  return `あなたは海外顧客対応の専門家です。日本企業が海外顧客から受ける問い合わせに対して、適切な回答テンプレートを作成します。

あなたの役割:
- 問い合わせ内容を正確に理解し、適切な回答を作成する
- 各言語の文化・商習慣に合わせた丁寧で適切な表現を使用する
- 実用的で、そのまま送信できるクオリティの回答を生成する

トーン指示: ${toneInstruction}

出力ルール:
- 各言語のセクションは「## 🇺🇸 English」のように国旗絵文字と言語名で見出しをつける
- 指定されたトーンを全言語で一貫して維持する
- Markdown形式で構造化して出力する`;
}

export function buildInquiryUserMessage(
  category: string,
  customMessage: string,
  languageIds: string[],
  tone: ToneType = "professional"
): string {
  const languageLabels = languageIds
    .map((id) => LANGUAGE_LABEL_MAP[id] || id)
    .join("、");
  const toneInstruction = TONE_INSTRUCTIONS[tone] || TONE_INSTRUCTIONS.professional;

  const inquiryContent = customMessage || `カテゴリ: ${category}`;

  return `以下の問い合わせに対する回答テンプレートを作成してください。

【問い合わせ内容】
${inquiryContent}

【対象言語】
${languageLabels}

【トーン】
${toneInstruction}

各言語ごとにセクションを分けて、すぐに送信できる完成度の高い回答テンプレートを出力してください。
件名（Subject）も各言語で含めてください。`;
}
