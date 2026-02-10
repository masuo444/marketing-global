import Link from "next/link";
import {
  IconGlobe,
  IconMessageCircle,
  IconArrowRight,
  IconTarget,
  IconLayers,
  IconUsers,
  IconTrendingUp,
  IconSparkles,
  IconZap,
  IconDocument,
  IconSocial,
} from "@/components/icons";

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-red/5 via-transparent to-transparent" />
      <div className="max-w-5xl mx-auto px-4 pt-20 pb-16 text-center relative">
        <div className="w-16 h-16 bg-red rounded-2xl flex items-center justify-center text-white font-bold text-3xl font-serif mx-auto mb-6">
          F
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text tracking-tight mb-4 leading-tight">
          海外展開のコンテンツ、
          <br />
          <span className="text-red">AIで一括生成。</span>
        </h1>
        <p className="text-gold text-lg font-serif tracking-widest mb-4">
          つくる人を、世界につなぐ。
        </p>
        <p className="text-text-sub text-base max-w-xl mx-auto mb-8 leading-relaxed">
          8言語対応の文化適応型AIが、商品ページ・SNS・プレスリリースなどの
          多言語コンテンツを一括生成。翻訳コストを最大80%削減。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/generate"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-red text-white rounded-xl font-medium hover:bg-red-hover transition-colors shadow-lg shadow-red/20"
          >
            <IconSparkles size={18} />
            無料でコンテンツを生成
            <IconArrowRight size={16} />
          </Link>
          <Link
            href="/inquiry"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-border text-text rounded-xl font-medium hover:border-border-active hover:bg-card-bg transition-colors"
          >
            <IconMessageCircle size={18} />
            問い合わせ対応を試す
          </Link>
        </div>
      </div>
    </section>
  );
}

function PainPointsSection() {
  const pains = [
    {
      icon: IconGlobe,
      title: "翻訳コストが高すぎる",
      description:
        "1言語あたり数万円。8言語で展開すると数十万円の費用が必要。",
    },
    {
      icon: IconTarget,
      title: "文化的なニュアンスが伝わらない",
      description:
        "直訳では現地の消費者に響かない。文化に合わせたローカライズが必要。",
    },
    {
      icon: IconDocument,
      title: "コンテンツ種別ごとに手間がかかる",
      description:
        "商品ページ、SNS、プレスリリース…種別ごとに異なるフォーマットが必要。",
    },
    {
      icon: IconUsers,
      title: "海外顧客対応に時間がかかる",
      description:
        "問い合わせへの多言語回答を毎回手作業で作成。対応が遅れがち。",
    },
  ];

  return (
    <section className="py-16 border-t border-border">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-text text-center mb-3">
          こんなお悩みありませんか？
        </h2>
        <p className="text-text-sub text-center mb-10">
          海外展開を目指す日本企業が直面する課題
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pains.map((pain, i) => (
            <div
              key={i}
              className="p-5 rounded-xl border border-border bg-card-bg flex items-start gap-4"
            >
              <div className="text-red mt-1">
                <pain.icon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-text mb-1">{pain.title}</h3>
                <p className="text-text-sub text-sm leading-relaxed">
                  {pain.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionFlowSection() {
  const steps = [
    {
      num: "1",
      title: "選ぶ",
      description: "業種・コンテンツ種別・言語を選択",
      icon: IconTarget,
    },
    {
      num: "2",
      title: "入力",
      description: "ブランド情報とこだわりを入力",
      icon: IconSocial,
    },
    {
      num: "3",
      title: "生成",
      description: "AIが文化に合わせたコンテンツを生成",
      icon: IconSparkles,
    },
  ];

  return (
    <section className="py-16 border-t border-border">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-text text-center mb-3">
          たった3ステップで完了
        </h2>
        <p className="text-text-sub text-center mb-10">
          複雑な翻訳プロセスをシンプルに
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="text-center relative">
              <div className="w-14 h-14 bg-red/10 border border-red/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <step.icon size={28} className="text-red" />
              </div>
              <div className="text-gold text-xs font-bold mb-1">
                STEP {step.num}
              </div>
              <h3 className="text-lg font-bold text-text mb-2">
                {step.title}
              </h3>
              <p className="text-text-sub text-sm">{step.description}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-7 -right-3 text-border">
                  <IconArrowRight size={20} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureHighlightsSection() {
  const features = [
    {
      icon: IconGlobe,
      title: "文化適応AI",
      description:
        "各国の文化・商習慣に合わせた表現を自動生成。直訳ではない、現地に響くコンテンツ。",
    },
    {
      icon: IconLayers,
      title: "8業種テンプレート",
      description:
        "食品、美容、伝統工芸、ファッションなど、業種別に最適化されたプロンプト。",
    },
    {
      icon: IconDocument,
      title: "6種コンテンツ対応",
      description:
        "商品ページ、SNS投稿、メルマガ、プレスリリース、展示会資料、提案書。",
    },
    {
      icon: IconMessageCircle,
      title: "問い合わせ対応",
      description:
        "海外顧客からの質問、配送、返品などの問い合わせに多言語で即座に回答。",
    },
  ];

  return (
    <section className="py-16 border-t border-border">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-text text-center mb-3">
          FOMs の特徴
        </h2>
        <p className="text-text-sub text-center mb-10">
          海外展開に必要なすべてをカバー
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, i) => (
            <div
              key={i}
              className="p-5 rounded-xl border border-border bg-card-bg hover:border-border-active transition-colors"
            >
              <div className="text-gold mb-3">
                <feature.icon size={24} />
              </div>
              <h3 className="font-bold text-text mb-2">{feature.title}</h3>
              <p className="text-text-sub text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { value: "8", unit: "言語", label: "対応言語数" },
    { value: "8", unit: "業種", label: "テンプレート" },
    { value: "6", unit: "種別", label: "コンテンツタイプ" },
    { value: "~30", unit: "秒", label: "平均生成時間" },
  ];

  return (
    <section className="py-16 border-t border-border">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-red mb-1">
                {stat.value}
                <span className="text-lg text-gold ml-1">{stat.unit}</span>
              </div>
              <div className="text-text-sub text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-16 border-t border-border">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <div className="mb-6">
          <IconTrendingUp size={40} className="text-gold mx-auto mb-4" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-text mb-3">
          無料で試してみませんか？
        </h2>
        <p className="text-text-sub mb-8 leading-relaxed">
          アカウント登録不要。今すぐ多言語コンテンツを生成できます。
          <br />
          あなたのブランドを世界に届けましょう。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/generate"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-red text-white rounded-xl font-medium hover:bg-red-hover transition-colors shadow-lg shadow-red/20"
          >
            <IconZap size={18} />
            コンテンツ生成をはじめる
            <IconArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-7 h-7 bg-red rounded-lg flex items-center justify-center text-white font-bold text-sm font-serif">
            F
          </div>
          <span className="font-bold text-text">FOMs</span>
        </div>
        <p className="text-text-sub text-xs mb-2">
          Powered by Claude AI — Made for Japanese SMEs going global
        </p>
        <p className="text-text-sub/50 text-xs">
          &copy; 2025 FOMs. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <PainPointsSection />
      <SolutionFlowSection />
      <FeatureHighlightsSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
