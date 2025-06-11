import { Languages } from './types/languages';

export const languages: Languages = {
  en: {
    header: {
      home: "Home",
      skills: "Skills",
      projects: "Projects",
      services: "Services",
      contact: "Contact",
      resume: "Resume",
    },
    home: {
      name: "Hi, My Name Is Yutaka",
      typewriter: ["Full-Stack Developer", "ML Developer", "Quantum Mechanics Researcher", "Translator"],
      intro: "Multilingual Software Engineer and Language Specialist provoding tutoring and translation services.",
      staticPhrase: "I am a",
      buttons: {
        linkedin: "LinkedIn",
        github: "GitHub",
        aboutMe: "About Me",
      },
      about: {
        title: "About Me",
        content:
          "I am currently studying Computer Science and Quantum Physics with a concentration in Machine Learning. I'm bicultural, fluent in multiple languages, and passionate about software development and linguistics. Growing up in both Japan and America simultaneously has given me a unique perspective and a love for bridging gaps between people and technology.",
        close: "Close",
      },
    },
    skills: {
      title: "Skills",
      description:
        "I excel in dissecting complex problems into manageable tasks, essential for crafting robust, maintainable code in large-scale projects. In addition to my technical abilities, I possess linguistic expertise in Japanese, English, and Korean, enabling me to navigate diverse cultural and professional landscapes. This unique blend of technical and linguistic skills allows me to communicate and collaborate effectively, bridging gaps between teams and ideas.",
      languages: {
        english: "English",
        japanese: "Japanese",
        korean: "Korean",
      },
      proficiency: {
        native: "Native",
        fluent: "Fluent",
      },
      sections: {
        spokenLanguages: "Spoken Languages",
        programmingStack: "Programming Stack"
      },
      domains: {
        frontend: {
          title: "Frontend Development",
          description: "Building responsive and interactive user interfaces with modern web technologies.",
          achievements: [
            "Developed responsive web applications using React and Next.js",
            "Implemented complex UI components with TypeScript and Tailwind CSS",
            "Created reusable component libraries for consistent design systems"
          ]
        },
        backend: {
          title: "Backend Development",
          description: "Designing and implementing robust server-side applications and APIs.",
          achievements: [
            "Built RESTful APIs using Spring Boot and Node.js",
            "Implemented GraphQL services for efficient data fetching",
            "Developed microservices architecture with FastAPI and Django"
          ]
        },
        devops: {
          title: "DevOps & Cloud",
          description: "Managing infrastructure and deployment pipelines for scalable applications.",
          achievements: [
            "Set up CI/CD pipelines using GitHub Actions",
            "Deployed applications on AWS and Vercel",
            "Containerized applications using Docker"
          ]
        },
        ai: {
          title: "AI & Data Science",
          description: "Developing machine learning models and data analysis solutions.",
          achievements: [
            "Built and deployed machine learning models using TensorFlow and PyTorch",
            "Implemented data processing pipelines with Python",
            "Created predictive models for business analytics"
          ]
        },
        databases: {
          title: "Databases",
          description: "Designing and optimizing database systems for efficient data storage and retrieval.",
          achievements: [
            "Designed and implemented database schemas for various applications",
            "Optimized database queries for better performance",
            "Implemented data migration strategies"
          ]
        },
        other: {
          title: "Other Tools & Technologies",
          description: "",
          achievements: []
        }
      }
    },
    projects: {
      title: "Projects",
      description: "Here are some of the projects I've worked on:",
      technologiesUsed: "Technologies Used:",
      demo: "Live Demo",
      repo: "GitHub Repo",
      demoComingSoon: "Live Demo Coming Soon!",
      repoComingSoon: "Repository Not Available Yet!",
      items: [
        {
          name: "Portfolio Website",
          description: "A personal portfolio built with React and Tailwind CSS. Multilanguage feature available currently for English, Japanese, and Korean.",
          demo: "Live Demo",
          repo: "GitHub Repo",
          tech: ["React", "Tailwind CSS", "JavaScript"],
          demoUrl: "#",
          repoUrl: "https://github.com/yyamaguchi0102/personal-portfolio",
          category: "app"
        },
        {
          name: "Dr. Teragotchi",
          description: "A virtual pet companion app that helps users track emotional wellbeing through conversation, gamifying the process with diaries and by evolving the pet based on interaction.",
          demo: "Live Demo",
          repo: "GitHub Repo",
          tech: ["Python", "FastAPI", "Flutter", "Dart", "PostgreSQL"],
          demoUrl: "", // add later
          repoUrl: "https://github.com/orgs/DrTheragotchi/repositories",
          category: "app"
        },
        {
          name: "To-Do List Application",
          description: "A full-stack to-do list application built with React. Integrated with AI to predict the time required for task completion.",
          demo: "Live Demo",
          repo: "GitHub Repo",
          tech: ["Java", "SpringBoot", "React", "JavaScript", "Tailwind CSS", "TensorFlow"],
          demoUrl: "#",
          repoUrl: "https://github.com/yyamaguchi0102/todolist-springboot",
          category: "app"
        },
        {
          name: "Housing Price Prediction Model",
          description: "A housing price predictor model trained primarily using linear regression, later enhanced with more complex tree algorithms.",
          demo: "Documentation",
          repo: "GitHub Repo",
          tech: ["Python", "Scikit Learn", "NumPy", "Pandas", "Matplotlib"],
          demoUrl: "https://docs.google.com/document/d/1ZUk4w8LS8LoEOf7R64r68EDDkIuuD8RNeJBdxPFnLzQ/edit?tab=t.0#heading=h.8s5u8xwyce8",
          repoUrl: "https://github.com/yyamaguchi0102/housing-price-prediction",
          category: "ml"
        },
      ],
    },
    services: {
      title: "Services",
      description: "I offer a multitude of services to cater to your needs.",
      learnMore: "Learn more",
      whatIncluded: "What's included",
      pricing: "Pricing",
      availability: "Availability",
      getStarted: "Get Started",
      contactButton: "Get in Touch",
      details: {
        tutoring: {
          point1: "Personalized one-on-one sessions tailored to your learning style",
          point2: "Flexible scheduling to accommodate your time zone",
          point3: "Focus on practical skills and real-world application",
          pricing: "Starting at $50 per hour, with package discounts available",
          availability: "Flexible Online Lessons and Weekend In-Person Lessons"
        },
        translation: {
          point1: "Professional translation between English, Japanese, and Korean",
          point2: "Context-sensitive translations that preserve tone and meaning",
          point3: "Technical, business, law, and creative content expertise",
          pricing: "Starting at $0.30 per word, depending on language, complexity, and urgency",
          availability: "Note that this is a side project, so my availability is limited. Contact me to discuss your project and timeline."
        },
        trumpet: {
          point1: "From beginner to advanced techniques and music theory",
          point2: "Performance preparation and audition coaching",
          point3: "Jazz Improvisatino Expertise, Classical Training, and Composition.",
          pricing: "Starting at $30 per half an hour lessons, depending on skill, location, and availability.",
          availability: "Flexible Online Lessons and Weekend In-Person Lessons"
        }
      },
      items: [
        {
          name: "Tutoring",
          description: "One-on-one tutoring sessions tailored to your needs in programming, math, and language learning.",
        },
        {
          name: "Translation",
          description: "Professional translation services for Japanese, English, and Korean, ensuring precision and context.",
        },
        {
          name: "Trumpet Lessons",
          description: "One on one trumpet lessons for students ranging from beginner to the highschool level.",
        },
      ],
    },
    contact: {
      title: "Contact Me",
      description: "Feel free to reach out to me via the form below:",
      namePlaceholder: "Your Name",
      emailPlaceholder: "Your Email",
      messagePlaceholder: "Your Message",
      sendButton: "Send"
    },
    loadingScreen: {
      languagePrompt: "Select A Language",
      moodPrompt: "Select A Theme",
      moodBright: "Bright",
      moodDark: "Dark",
      back: "Back"
    },
    footer: {
      description: "Full-stack software developer and translator experienced in building modern web applications. Passionate about creating elegant solutions to complex problems.",
      quickLinks: "Quick Links",
      contact: "Contact",
      resume: "View Resume",
      rights: "All rights reserved.",
      designed: "Built with",
    },
  },
  jp: {
    header: {
      home: "ホーム",
      skills: "スキル",
      projects: "プロジェクト",
      services: "サービス",
      contact: "お問い合わせ",
      resume: "履歴書",
    },
    home: {
      name: "こんにちは、ゆたかと申します。",
      typewriter: ["フルスタック開発者です。", "ML開発者です。", "量子力学研究者です。", "翻訳者です。"],
      intro: "私は情熱的なソフトウェアエンジニアであり、翻訳や家庭教師などの言語サービス事業も行っております。",
      staticPhrase: "私は",
      buttons: {
        linkedin: "LinkedIn",
        github: "GitHub",
        aboutMe: "自己紹介",
      },
      about: {
        title: "自己紹介",
        content:
          "私は現在、コンピュータサイエンスと量子物理学を専攻し、機械学習を集中して学んでいます。私はバイカルチャルで、多言語に堪能であり、ソフトウェア開発と言語学に情熱を持っています。日本とアメリカの両国で同時に育った経験は、私にユニークな視点を与え、人々と技術の間のギャップを埋めることへの愛着を育みました。",
          close: "閉じる",
      },
    },
    skills: {
      title: "スキル",
      description:
        "大規模プロジェクトにおける堅牢で保守性の高いコードを作成するために、複雑な問題を管理可能なタスクに分解することに長けています。技術的な能力に加えて、日本語、英語、韓国語の言語的専門知識を持ち、多様な文化的・専門的な環境をナビゲートすることができます。この技術的・言語的スキルのユニークな組み合わせにより、チームとアイデアの間のギャップを埋め、効果的なコミュニケーションとコラボレーションを実現します。",
        languages: {
          english: "英語",
          japanese: "日本語",
          korean: "韓国語",
        },
        proficiency: {
        native: "母国語",
        fluent: "流暢",
      },
      sections: {
        spokenLanguages: "話せる言語",
        programmingStack: "プログラミングスタック"
      },
      domains: {
        frontend: {
          title: "フロントエンド開発",
          description: "モダンなWeb技術を使用したレスポンシブでインタラクティブなユーザーインターフェースの構築。",
          achievements: [
            "ReactとNext.jsを使用したレスポンシブWebアプリケーションの開発",
            "TypeScriptとTailwind CSSを使用した複雑なUIコンポーネントの実装",
            "一貫性のあるデザインシステムのための再利用可能なコンポーネントライブラリの作成"
          ]
        },
        backend: {
          title: "バックエンド開発",
          description: "堅牢なサーバーサイドアプリケーションとAPIの設計と実装。",
          achievements: [
            "Spring BootとNode.jsを使用したRESTful APIの構築",
            "効率的なデータ取得のためのGraphQLサービスの実装",
            "FastAPIとDjangoを使用したマイクロサービスアーキテクチャの開発"
          ]
        },
        devops: {
          title: "DevOps & クラウド",
          description: "スケーラブルなアプリケーションのためのインフラストラクチャとデプロイメントパイプラインの管理。",
          achievements: [
            "GitHub Actionsを使用したCI/CDパイプラインの構築",
            "AWSとVercelへのアプリケーションのデプロイ",
            "Dockerを使用したアプリケーションのコンテナ化"
          ]
        },
        ai: {
          title: "AI & データサイエンス",
          description: "機械学習モデルとデータ分析ソリューションの開発。",
          achievements: [
            "TensorFlowとPyTorchを使用した機械学習モデルの構築とデプロイ",
            "Pythonを使用したデータ処理パイプラインの実装",
            "ビジネス分析のための予測モデルの作成"
          ]
        },
        databases: {
          title: "データベース",
          description: "効率的なデータストレージと取得のためのデータベースシステムの設計と最適化。",
          achievements: [
            "様々なアプリケーションのためのデータベーススキーマの設計と実装",
            "パフォーマンス向上のためのデータベースクエリの最適化",
            "データ移行戦略の実装"
          ]
        },
        other: {
          title: "その他のツールと技術",
          description: "",
          achievements: []
        }
      }
    },
    projects: {
      title: "プロジェクト",
      description: "私が取り組んだプロジェクトの一部をご紹介します：",
      technologiesUsed: "使用した技術:",
      demo: "ライブデモ",
      repo: "GitHubリポジトリ",
      demoComingSoon: "デモは近日公開予定です！",
      repoComingSoon: "リポジトリはまだ利用できません！",
      items: [
        {
          name: "ポートフォリオウェブサイト",
          description: "ReactとTailwind CSSで構築された個人ポートフォリオ。只今日本語、英語、韓国語でご提供しております。",
          demo: "ライブデモ",
          repo: "GitHubリポジトリ",
          tech: ["React", "Tailwind CSS", "JavaScript"],
          demoUrl: "", // add later
          repoUrl: "https://github.com/yyamaguchi0102/personal-portfolio",
          category: "app"
        },
        {
          name: "Dr. Teragotchi",
          description: "会話を通じて感情の健康をサポートするバーチャルペットアプリです。日記の作成とペットとの交流による進化で、楽しみながら感情管理ができます。",
          demo: "ドキュメンテーション",
          repo: "GitHubリポジトリ",
          tech: ["Python", "Scikit Learn", "NumPy", "Pandas", "Matplotlib"],
          demoUrl: "", // add later
          repoUrl: "https://github.com/orgs/DrTheragotchi/repositories",
          category: "app"
        },
        {
          name: "ToDoリストアプリ",
          description: "Todoリストのフルスタックアプリケーション。マシーンラーニングを通して作業の予想所要時間を計算。",
          demo: "ライブデモ",
          repo: "GitHubリポジトリ",
          tech: ["Java", "SpringBoot", "React", "JavaScript", "Tailwind CSS", "TensorFlow"],
          demoUrl: "https://docs.google.com/document/d/1ZUk4w8LS8LoEOf7R64r68EDDkIuuD8RNeJBdxPFnLzQ/edit?tab=t.0#heading=h.8s5u8xwyce8", // add later
          repoUrl: "https://github.com/yyamaguchi0102/todolist-springboot",
          category: "app"
        },
        {
          name: "不動産物価予想AI",
          description: "PythonとScikit Learnで開発したマシーンラーニングモデル。",
          demo: "ドキュメンテーション",
          repo: "GitHubリポジトリ",
          tech: ["Python", "Scikit Learn", "NumPy", "Pandas", "Matplotlib"],
          demoUrl: "", // add later
          repoUrl: "https://github.com/yyamaguchi0102/housing-price-prediction",
          category: "ml"
        },
      ],
    },
    services: {
      title: "サービス",
      description: "個別指導や正確な翻訳サービスを提供しております。",
      learnMore: "詳細を見る",
      whatIncluded: "サービス内容",
      pricing: "料金",
      availability: "利用可能時間",
      getStarted: "お申し込み",
      contactButton: "お問い合わせ",
      details: {
        tutoring: {
          point1: "学習スタイルに合わせたパーソナライズされた個別指導",
          point2: "タイムゾーンに合わせた柔軟なスケジュール調整",
          point3: "実践的なスキルと実世界の応用に焦点",
          pricing: "1時間50ドルから、パッケージ割引あり",
          availability: "平日と夕方、予約制"
        },
        translation: {
          point1: "日本語、英語、韓国語間の専門的な翻訳",
          point2: "トーンと意味を保持するコンテキスト重視の翻訳",
          point3: "技術、ビジネス、創造的コンテンツの専門知識",
          pricing: "1語あたり0.15ドルから、複雑さと緊急性によって変動",
          availability: "標準プロジェクトは7日間、緊急サービスも可能"
        },
        trumpet: {
          point1: "初心者から上級者向けのテクニックと音楽理論",
          point2: "演奏準備とオーディションのコーチング",
          point3: "適切な技術と音色の開発",
          pricing: "45分のレッスン45ドルから",
          availability: "午後と週末、オンラインと対面の両方"
        }
      },
      items: [
        {
          name: "個別指導",
          description: "プログラミング、数学、語学学習など、あなたのニーズに合わせた個別指導セッション。",
        },
        {
          name: "翻訳",
          description: "日本語、英語、韓国語のプロ翻訳サービス。正確さと文脈を重視。",
        },
        {
          name: "トランペットレッスン",
          description: "オンライン",
        },
      ],
    },
    contact: {
      title: "お問い合わせ",
      description: "以下のフォームからお気軽にご連絡ください：",
      namePlaceholder: "お名前",
      emailPlaceholder: "メールアドレス",
      messagePlaceholder: "メッセージ",
      sendButton: "送信"
    },
    loadingScreen: {
      languagePrompt: "言語を選択してください",
      moodPrompt: "テーマを選択してください",
      moodBright: "明るい",
      moodDark: "暗い",
      back: "戻る"
    },
    footer: {
      description: "モダンウェブアプリケーションの構築に経験豊富なフルスタックソフトウェア開発者および翻訳者。複雑な問題に対するエレガントなソリューションの創造に情熱を持っています。",
      quickLinks: "クイックリンク",
      contact: "お問い合わせ",
      resume: "履歴書を見る",
      rights: "全著作権所有。",
      designed: "開発：",
    },
  },
  ko: {
    header: {
      home: "홈",
      skills: "기술",
      projects: "프로젝트",
      services: "서비스",
      contact: "연락처",
      resume: "이력서",
    },
    home: {
      name: "반가워요, 유타카입니다",
      typewriter: ["풀스택 개발자입니다", "ML 개발자입니다", "양자물리학 연구자입니다", "번역가입니다"],
      intro: "저는 열정적인 소프트웨어 엔지니어이자 번역, 과외 등 언어서비스 사업을 하고 있습니다.",
      staticPhrase: "저는",
      buttons: {
        linkedin: "LinkedIn",
        github: "GitHub",
        aboutMe: "자기소개",
      },
      about: {
        title: "자기소개",
        content:
          "저는 현재 컴퓨터 과학과 양자 물리학을 전공하며, 기계 학습에 집중하고 있습니다. 저는 두 문화를 가진 사람으로, 여러 언어에 능통하며 소프트웨어 개발과 언어학에 열정을 가지고 있습니다. 일본과 미국에서 동시에 성장한 경험은 저에게 독특한 관점을 제공하며, 사람과 기술 간의 간극을 메우는 데 대한 애정을 키웠습니다.2",
        close: "닫기",
      },
    },
    skills: {
      title: "기술",
      description:
        "대규모 프로젝트에서 견고하고 유지보수가 용이한 코드를 작성하기 위해 복잡한 문제를 관리 가능한 작업으로 분해하는 데 탁월합니다. 기술적 능력 외에도 일본어, 영어, 한국어에 대한 언어적 전문성을 보유하고 있어 다양한 문화적, 전문적 환경을 탐색할 수 있습니다. 이러한 기술적, 언어적 기술의 독특한 조합을 통해 팀과 아이디어 사이의 격차를 해소하고 효과적인 의사소통과 협업을 가능하게 합니다.",
      languages: {
        english: "영어",
        japanese: "일본어",
        korean: "한국어",
      },
      proficiency: {
        native: "원어민",
        fluent: "유창함",
      },
      sections: {
        spokenLanguages: "구사 가능한 언어",
        programmingStack: "프로그래밍 스택"
      },
      domains: {
        frontend: {
          title: "프론트엔드 개발",
          description: "최신 웹 기술을 활용하여 반응형이고 인터랙티브한 사용자 인터페이스를 구축합니다.",
          achievements: [
            "React와 Next.js를 사용한 반응형 웹 애플리케이션 개발",
            "TypeScript와 Tailwind CSS로 복잡한 UI 컴포넌트 구현",
            "일관된 디자인 시스템을 위한 재사용 가능한 컴포넌트 라이브러리 제작"
          ]
        },
        backend: {
          title: "백엔드 개발",
          description: "견고한 서버 사이드 애플리케이션과 API를 설계 및 구현합니다.",
          achievements: [
            "Spring Boot와 Node.js로 RESTful API 구축",
            "효율적인 데이터 처리를 위한 GraphQL 서비스 구현",
            "FastAPI와 Django를 활용한 마이크로서비스 아키텍처 개발"
          ]
        },
        devops: {
          title: "DevOps & 클라우드",
          description: "확장 가능한 애플리케이션을 위한 인프라 및 배포 파이프라인을 관리합니다.",
          achievements: [
            "GitHub Actions로 CI/CD 파이프라인 구축",
            "AWS와 Vercel에 애플리케이션 배포",
            "Docker를 사용한 애플리케이션 컨테이너화"
          ]
        },
        ai: {
          title: "AI & 데이터 사이언스",
          description: "머신러닝 모델과 데이터 분석 솔루션을 개발합니다.",
          achievements: [
            "TensorFlow와 PyTorch로 머신러닝 모델 구축 및 배포",
            "Python을 활용한 데이터 처리 파이프라인 구현",
            "비즈니스 분석을 위한 예측 모델 제작"
          ]
        },
        databases: {
          title: "데이터베이스",
          description: "효율적인 데이터 저장과 검색을 위한 데이터베이스 시스템을 설계하고 최적화합니다.",
          achievements: [
            "다양한 애플리케이션을 위한 데이터베이스 스키마 설계 및 구현",
            "성능 향상을 위한 데이터베이스 쿼리 최적화",
            "데이터 마이그레이션 전략 구현"
          ]
        },
        other: {
          title: "기타 도구 및 기술",
          description: "",
          achievements: []
        }
      }
    },
    projects: {
      title: "프로젝트",
      description: "제가 작업한 프로젝트는 다음과 같습니다:",
      technologiesUsed: "사용한 기술:",
      demo: "라이브 데모",
      repo: "GitHub 저장소",
      demoComingSoon: "라이브 데모 준비 중!",
      repoComingSoon: "리포지토리 준비 중!",
      items: [
        {
          name: "포트폴리오 웹사이트",
          description: "React 및 Tailwind CSS로 구축된 개인 포트폴리오입니다. 한국어, 영어, 일본어로 사용 가능합니다.",
          demo: "라이브 데모",
          repo: "GitHub 저장소",
          tech: ["React", "Tailwind CSS", "JavaScript"],
          demoUrl: "#",
          repoUrl: "https://github.com/yyamaguchi0102/personal-portfolio",
          category: "app"
        },
        {
          name: "Dr. Teragotchi",
          description: "감정 웰빙을 추적하고 대화를 통해 사용자의 정서적 건강을 돕는 가상 반려동물 앱입니다. 일기 작성과 상호작용에 따른 반려동물의 진화를 통해 과정을 게임화했습니다.",
          demo: "도큐멘테이션",
          repo: "GitHub 저장소",
          tech: ["Python", "Scikit Learn", "NumPy", "Pandas", "Matplotlib"],
          demoUrl: "", // add later
          repoUrl: "https://github.com/orgs/DrTheragotchi/repositories",
          category: "app"
        },
        {
          name: "ToDo 리스트 애플리케이션",
          description: "작업 시간 예측을 위한 AI가 통합된 풀스택 To-Do 리스트 앱.",
          demo: "라이브 데모",
          repo: "GitHub 저장소",
          tech: ["Java", "SpringBoot", "React", "JavaScript", "Tailwind CSS", "TensorFlow"],
          demoUrl: "#",
          repoUrl: "https://github.com/yyamaguchi0102/todolist-springboot",
          category: "app"
        },
        {
          name: "부동산 가격 예측 모델",
          description: "주로 선형 회귀를 사용하여 훈련된 부동산 가격 예측 모델.",
          demo: "도큐멘테이션",
          repo: "GitHub 저장소",
          tech: ["Python", "Scikit Learn", "NumPy", "Pandas", "Matplotlib"],
          demoUrl: "https://docs.google.com/document/d/1ZUk4w8LS8LoEOf7R64r68EDDkIuuD8RNeJBdxPFnLzQ/edit?tab=t.0#heading=h.8s5u8xwyce8",
          repoUrl: "https://github.com/yyamaguchi0102/housing-price-prediction",
          category: "ml"
        },
      ],
    },
    services: {
      title: "서비스",
      description: "맞춤형 과외 및 정밀 번역 서비스를 제공합니다.",
      learnMore: "더 알아보기",
      whatIncluded: "서비스 내용",
      pricing: "가격",
      availability: "이용 가능 시간",
      getStarted: "시작하기",
      contactButton: "문의하기",
      details: {
        tutoring: {
          point1: "학습 스타일에 맞는 1:1 맞춤형 과외 세션",
          point2: "시간대에 맞춘 유연한 일정 조정",
          point3: "실용 기술과 실생활 적용에 초점",
          pricing: "시간당 $50부터, 패키지 할인 가능",
          availability: "평일 및 저녁, 예약제"
        },
        translation: {
          point1: "영어, 일본어, 한국어 간의 전문 번역",
          point2: "어조와 의미를 보존하는 맥락 민감 번역",
          point3: "기술, 비즈니스 및 창의적 콘텐츠 전문 지식",
          pricing: "단어당 $0.15부터, 복잡성과 긴급성에 따라 달라짐",
          availability: "표준 프로젝트는 7일 소요, 긴급 서비스 가능"
        },
        trumpet: {
          point1: "초보자부터 고급 기술 및 음악 이론까지",
          point2: "공연 준비 및 오디션 코칭",
          point3: "적절한 기술과 음색 개발",
          pricing: "45분 레슨 $45부터",
          availability: "오후 및 주말, 온라인과 대면 모두 가능"
        }
      },
      items: [
        {
          name: "과외",
          description: "프로그래밍, 수학, 언어 학습에 대한 맞춤형 1:1 과외 세션.",
        },
        {
          name: "번역",
          description: "일본어, 영어, 한국어 전문 번역 서비스. 정확성과 문맥 중시.",
        },
        {
          name: "트럼펫 수업",
          description: "초등학생부터 고등학생까지 범위의 트럼펫 수업을 제공합니다.",
        },
      ],
    },
    contact: {
      title: "문의",
      description: "아래 양식을 통해 저에게 연락하십시오:",
      namePlaceholder: "이름",
      emailPlaceholder: "이메일",
      messagePlaceholder: "메시지",
      sendButton: "보내기"
    },
    loadingScreen: {
      languagePrompt: "언어를 선택하세요",
      moodPrompt: "테마를 선택하세요",
      moodBright: "라이트모드",
      moodDark: "다크모드",
      back: "뒤로"
    },
    footer: {
      description: "현대적인 웹 애플리케이션 구축에 경험이 풍부한 풀스택 소프트웨어 개발자 및 번역가. 복잡한 문제에 우아한 솔루션을 만드는 데 열정이 있습니다.",
      quickLinks: "빠른 링크",
      contact: "연락처",
      resume: "이력서 보기",
      rights: "모든 권리 보유.",
      designed: "개발:",
    },
  },
};