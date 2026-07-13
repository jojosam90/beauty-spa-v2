import { Treatment, Reason, SanctuaryCommitment, Testimonial } from "./types";

export const translations = {
  en: {
    navServices: "Services",
    navAbout: "About",
    navWellness: "Wellness",
    navBookNow: "Book Now",
    heroPreTitle: "Premium Clinical Experience",
    heroTitle_1: "Head Spa Singapore",
    heroTitle_italic: "Discover the Ultimate Scalp Wellness",
    heroSubtitle: "Korean Head Spa Singapore — Professional, scientifically-backed care for your scalp health and deep relaxation.",
    heroBtnBook: "Book Now",
    heroBtnRituals: "View Treatments",
    reasonsTitle: "The 5 Reasons for Scalp Wellness",
    reasonsSubtitle: "Our methodology merges clinical precision with therapeutic touch to optimize your scalp ecosystem.",
    ritualsTitle: "Wellness Treatments",
    ritualsSubtitle: "Traditional Korean hair care meets modern skin science for a private, precise head care experience.",
    ritualsDiscover: "Discover",
    aboutTreatmentTitle: "What You Can Expect",
    aboutTreatmentSubtitle: "A full-body reset that starts from the head — release tension, restore clarity, and reignite energy.",
    testimonialsWriteReview: "Write a Review",
    reviewModalTitle: "Share Your Experience",
    reviewNameLabel: "Your Name",
    reviewNamePlaceholder: "e.g. Sarah T.",
    reviewTextLabel: "Your Review",
    reviewTextPlaceholder: "Tell us about your experience...",
    reviewSubmitBtn: "Post Review",
    reviewThanks: "Thank You!",
    reviewThanksMsg: "Your review has been submitted.",
    contactTitle: "Book a Consultation",
    contactSubtitle: "Just a 5-minute walk from Rochor MRT Station.",
    contactAddressLabel: "Address",
    contactAddressLine1: "Blk 8, Selegie Road, #01-06",
    contactAddressLine2: "Singapore 180008",
    contactAddressLine3: "(Rochor MRT Exit A)",
    contactCallLabel: "Call Us",
    contactHoursLabel: "Business Hours",
    contactHoursValue: "Daily: 10:00 AM – 10:30 PM (By Appointment)",
    contactOpenInMaps: "Open in Maps",
    footerIntro: "Singapore's premier destination for clinical Korean head spa rituals. Scientifically proven, luxuriously delivered.",
    footerCategoryTitle: "Treatments",
    footerContactTitle: "Contact Us",
    footerCopyright: "© 2026 EB Centre. All rights reserved.",
    footerBackToTop: "Back to Top",
    bookingTitle: "Book Your Scalp Ritual",
    bookingSubtitle: "Embark on your journey to ultimate scalp rejuvenation",
    bookingStep1: "Select Treatment",
    bookingStep2: "Date & Time",
    bookingStep3: "Therapist & Details",
    bookingStep4: "Confirmation",
    bookingAnyTherapist: "Any Available Specialist (Recommended)",
    bookingFullName: "Full Name",
    bookingPhone: "Phone Number",
    bookingEmail: "Email Address",
    bookingNotes: "Special Requests / Hair Concerns",
    bookingNext: "Continue",
    bookingBack: "Back",
    bookingConfirm: "Confirm Booking",
    bookingSuccess: "Appointment Request Received!",
    bookingSuccessMsg: "Thank you for choosing EB Centre. Our team is verifying availability and will contact you via SMS / WhatsApp within 2 hours to finalize your reservation.",
    bookingSuccessCall: "We look forward to welcoming you to our luxury sanctuary on Orchard Road.",
    bookingBtnClose: "Close Window",
    detailModalTitle: "Treatment Protocol",
    detailModalPrice: "Investment",
    detailModalDuration: "Duration",
    detailModalClose: "Close",
  },
  zh: {
    navServices: "精品疗程",
    navAbout: "关于我们",
    navWellness: "头皮健康",
    navBookNow: "立即预约",
    heroPreTitle: "新加坡第一家功效性养生",
    heroTitle_1: "新加坡头疗",
    heroTitle_italic: "发现极致头皮健康",
    heroSubtitle: "新加坡韩式头疗 — 专业呵护您的头皮健康，融合尖端临床技术与全方位身心放松体验。",
    heroBtnBook: "立即预约体验",
    heroBtnRituals: "查看疗程",
    reasonsTitle: "头皮保养的5大理由",
    reasonsSubtitle: "我们结合临床精确度与理疗触感，全面优化您的头皮微生态系统。",
    ritualsTitle: "精品舒压疗程",
    ritualsSubtitle: "我们结合韩国传统养发技艺与现代皮肤科学，为您提供私密且精准的头部护理体验。",
    ritualsDiscover: "了解更多",
    aboutTreatmentTitle: "您可以期待的效果",
    aboutTreatmentSubtitle: "从头部开始的全身重置——释放紧张，恢复清醒，重焕精力。",
    testimonialsWriteReview: "撰写评价",
    reviewModalTitle: "分享您的体验",
    reviewNameLabel: "您的姓名",
    reviewNamePlaceholder: "例如：陈小姐",
    reviewTextLabel: "您的评价",
    reviewTextPlaceholder: "请分享您的体验……",
    reviewSubmitBtn: "发布评价",
    reviewThanks: "感谢您！",
    reviewThanksMsg: "您的评价已成功提交。",
    contactTitle: "预约咨询",
    contactSubtitle: "步行5分钟即可抵达 Rochor地铁站。",
    contactAddressLabel: "地址",
    contactAddressLine1: "Blk 8, Selegie Road, #01-06",
    contactAddressLine2: "Singapore 180008",
    contactAddressLine3: "(Rochor MRT Exit A)",
    contactCallLabel: "致电我们",
    contactHoursLabel: "营业时间",
    contactHoursValue: "每日：上午10点 – 晚上10点30分（须预约）",
    contactOpenInMaps: "在地图中打开",
    footerIntro: "新加坡高端头疗标杆。结合临床科学与韩国匠心，为您打造极致的头皮健康生态系统。",
    footerCategoryTitle: "疗程项目",
    footerContactTitle: "联系我们",
    footerCopyright: "© 2026 EB Centre. 版权所有。",
    footerBackToTop: "返回顶部",
    bookingTitle: "预约您的头皮理疗",
    bookingSubtitle: "开启极致头皮净化与身心放松之旅",
    bookingStep1: "选择理疗项目",
    bookingStep2: "预约日期与时间",
    bookingStep3: "填写个人信息",
    bookingStep4: "预约确认",
    bookingAnyTherapist: "任何可用理疗师（推荐，缩短等待）",
    bookingFullName: "姓名",
    bookingPhone: "联系电话",
    bookingEmail: "电子邮箱",
    bookingNotes: "备注 / 特殊发质及头皮状况",
    bookingNext: "下一步",
    bookingBack: "上一步",
    bookingConfirm: "确认预约",
    bookingSuccess: "已收到您的预约请求！",
    bookingSuccessMsg: "感谢您选择EB Centre。",
    bookingSuccessCall: "期待为您提供顶级服务。",
    bookingBtnClose: "关闭窗口",
    detailModalTitle: "理疗专属方案与步骤",
    detailModalPrice: "理疗体验价",
    detailModalDuration: "疗程时间",
    detailModalClose: "关闭",
  }
};

export const reasonsData = {
  en: [
    {
      id: 1,
      title: "1. Purification",
      description: "Deep cleansing to remove micro-impurities and follicle-clogging debris.",
      iconName: "sanitizer"
    },
    {
      id: 2,
      title: "2. Anti-Aging",
      description: "Scalp lifting techniques that counteract gravitational aging effects.",
      iconName: "auto_fix_high"
    },
    {
      id: 3,
      title: "3. Renewal",
      description: "Cellular stimulation designed for forehead and scalp fine line prevention.",
      iconName: "refresh"
    },
    {
      id: 4,
      title: "4. Deep Infusion",
      description: "Advanced technology for maximum nutrient absorption at the root level.",
      iconName: "opacity"
    },
    {
      id: 5,
      title: "5. Bio-Availability",
      description: "Strategic scalp preparation to enhance the efficacy of therapeutic serums.",
      iconName: "biotech"
    }
  ],
  zh: [
    {
      id: 1,
      title: "1. 净澈毛囊",
      description: "深层清洁长期堆积的化学残留与油脂，让毛囊重获呼吸。通过高压微分子渗透技术，从根源解决头屑与异味。",
      iconName: "sanitizer"
    },
    {
      id: 2,
      title: "2. 疏通抗衰",
      description: "针对头部经络进行深度疏通，缓解长期伏案带来的脑部压力。提升循环，有效延缓头皮衰老过程。",
      iconName: "spa"
    },
    {
      id: 3,
      title: "3. 抚平细纹",
      description: "头皮与脸部同根共生。头皮紧致度决定了面部轮廓，从根源防止皱纹产生。",
      iconName: "face_6"
    },
    {
      id: 4,
      title: "4. 深度渗透",
      description: "采用医用级超导技术，打破传统表面洗护的无效局面，将活性营养导入真皮层。",
      iconName: "biotech"
    },
    {
      id: 5,
      title: "5. 唤醒吸收",
      description: "100%营养渗透率，激活沉睡毛母细胞，重塑头发生长生态环境，让发丝更显丰盈。",
      iconName: "energy_savings_leaf"
    }
  ]
};

export const treatmentsData = {
  en: [
    {
      id: "signature",
      title: "Korean Signature Head Spa",
      subtitle: "Ultimate Balancing Meridian Care",
      tag: "SIGNATURE",
      duration: "60 mins",
      price: "$168 SGD",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkAb9jD2uLfUT1cHmjWK43Ub1tRQmi1mDMfyM_8VvQn6kpCwBLaxT5-co3OLnZUI_uq1uCkEubKh1fSuqRauuUQlGJGGp9RbtkLHKthpJ83uuTsc-54pQdTLMuVD9tWS_JQWbXTuvWFk78HPQZWMSSx2QjidpQ-i_Z1fnNTpNFkyWUSIkUoItu3JcZYy-EEzGGQkc4-xYApG-ehdI9TeoVbaoWtLFnW3mtj7DUgE1uVAG6JQYFASd8Q_cGDe_ZRX3BMjKuQ98r9pY",
      description: "A multi-sensory journey integrating precise meridian massage techniques to stimulate blood flow and deep relaxation.",
      benefits: [
        "Rebalances scalp micro-ecology and regulates sebum production",
        "Reduces mental stress, promotes deep REM sleep, and relieves headaches",
        "Stimulates blood circulation to deliver key oxygen and nutrients to roots",
        "Nourishes hair fibers with premium botanical extract infusions"
      ],
      steps: [
        { title: "Scalp Diagnosis", description: "High-magnification camera analysis to determine scalp type and specific conditions." },
        { title: "Aromatherapy Inhalation", description: "Inducing a relaxed parasympathetic state with premium lavender and bergamot oils." },
        { title: "Deep Clarifying Double Cleansing", description: "Sulfate-free formulation combined with gentle mechanical scalp exfoliation." },
        { title: "Meridian Scalp Massage", description: "Traditional Korean acupressure focusing on the 12 meridian points of the scalp and neck." },
        { title: "Nutrient Mist Therapy", description: "Nano-vapor misting to open follicle cuticles and deep infuse custom botanical serums." },
        { title: "Blow-dry & Protect", description: "Cold-shot styling with application of heat-protective scalp barrier ampoules." }
      ]
    },
    {
      id: "ear-picking",
      title: "Scalp Care & Ear Picking",
      subtitle: "Bespoke Decompression Duo",
      duration: "75 mins",
      price: "$198 SGD",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjymrjkKReYXd5ml5VkqFbz8FxHlh9QJk595Oh0VzwCHXqmcMQvpe3ECY1hRaa8hKg96m3FW1GUxeUA1aK2H0983n-WJVrKpt-P1DPxOtR4ZZ4CebetQe9-0yuKYm7IWCjXT9aIltoZCI-A_Qd5pJ5Q-4ntWoNXxUS3-cH9LMfQ7Dpwo86jsR7F3XVr9-b9ZAJlzWrTyI1z3_mRGSpCOkxSHBWxBQCRweOF6iItMlTTvWqrtgmh48gcP63cAMm1Dk9zxaopkJbctA",
      description: "The ultimate relaxation duo. Combines meticulous scalp hydration with the ancient art of therapeutic ear cleaning.",
      benefits: [
        "Unclogs and deeply purifies auditory canals using specialized feather-soft tools",
        "Triggers pleasant autonomous sensory meridian response (ASMR)",
        "Deeply hydrates dry or flaky scalp with clinical-grade natural moisturizers",
        "Alleviates facial tension and tight jaw lines through targeted temporal massage"
      ],
      steps: [
        { title: "Visual Ear Inspection", description: "Safe camera assessment of the outer ear structure and canal health." },
        { title: "Traditional Ear Picking", description: "Use of specialized goose feathers, silver needles, and vibration forks to stimulate micro-nerves." },
        { title: "Ear Bathing & Soothing", description: "Nourishing herbaceous wash to cleanse and calm the auditory canal." },
        { title: "Hydrating Scalp Cleansing", description: "Warm stream water therapy to flush sebum and intensely hydrate follicles." },
        { title: "Neck & Trapezius Relief", description: "Deep tension relief massage utilizing therapeutic hot stones and essential oils." }
      ]
    },
    {
      id: "detox",
      title: "Scalp Detox & Rejuvenation",
      subtitle: "Advanced Follicle Growth Therapy",
      duration: "90 mins",
      price: "$248 SGD",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZj9WfmguH4xFO53Pnj0evnE6-V4EXLij-FVrQw5fqugq_L_YOiLclL0xwhhrlsqTDt3ZUZxoMe_K-Hyb--V-N7fgwByNUmJ6dSOzr5MgVYl3Tnzkn6Q9iIaKo8aRqz2RPqb4SxrxJFBTYaW4h_y1Kuvrdb_VEsi8qVKmqTapBgNVvMGlVilH829TTVwXCrtj7f8u4SC_3z4bV6WZJ17JX5u8v4NGL4tSGsSkVOuosdxVQ-nHQe_zwfeSbMFadbCa_mn1aI8a7Bn8",
      description: "Targeted treatment focusing on follicle detoxification to ensure long-term health and support natural hair growth.",
      benefits: [
        "Removes calcified sebum deposits and environmental toxin residues",
        "Strengthens hair follicle anchors, reducing seasonal and stress-induced shedding",
        "Infuses high-potency bio-available copper peptides and biotin complexes",
        "Combats premature graying and cellular aging with antioxidants"
      ],
      steps: [
        { title: "Aha Scalp Scaling", description: "Chemical peeling using mild fruit acids to dissolve stubborn oil crusts." },
        { title: "Hydro-Jet High Pressure Wash", description: "Micro-droplets of purified water delivered at high velocities to blast away follicle debris." },
        { title: "Ozone Steam Sterilization", description: "Steam treatment to eliminate microbial pathogens, yeast, and scalp odors." },
        { title: "Bio-Peptide Mesotherapy Infusion", description: "Oxygen gun micro-spraying to inject clinical hair density serums directly into the scalp dermis." },
        { title: "Low-Level Laser Therapy (LLLT)", description: "Red light phototherapy to accelerate ATP production and cellular repair." }
      ]
    }
  ],
  zh: [
    {
      id: "signature",
      title: "韩式招牌头疗",
      subtitle: "经络平衡理疗",
      tag: "招牌推荐",
      duration: "60 分钟",
      price: "$168 SGD",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkAb9jD2uLfUT1cHmjWK43Ub1tRQmi1mDMfyM_8VvQn6kpCwBLaxT5-co3OLnZUI_uq1uCkEubKh1fSuqRauuUQlGJGGp9RbtkLHKthpJ83uuTsc-54pQdTLMuVD9tWS_JQWbXTuvWFk78HPQZWMSSx2QjidpQ-i_Z1fnNTpNFkyWUSIkUoItu3JcZYy-EEzGGQkc4-xYApG-ehdI9TeoVbaoWtLFnW3mtj7DUgE1uVAG6JQYFASd8Q_cGDe_ZRX3BMjKuQ98r9pY",
      description: "结合深度经络按摩与定制化药水，提供多感官全方位的头部解压与修复体验。",
      benefits: [
        "重塑头皮微生态，深度调理油脂分泌，摆脱油腻和异味",
        "舒缓深层脑部压力，改善失眠、多梦状态，促进进入深度睡眠",
        "促进头部毛细血管循环，将充足的氧气和营养输送至毛囊",
        "使用韩国原装草本提取液，由内而外滋养发丝，使头发更显柔顺"
      ],
      steps: [
        { title: "专业头皮诊断", description: "通过高清头皮检测仪，分析头皮敏感度、皮脂堆积及毛囊状态。" },
        { title: "芳香舒缓吸入", description: "配合薰衣草与佛手柑天然精油吸入，迅速平复紧张情绪，激活副交感神经。" },
        { title: "双重氨基酸深层清洁", description: "温和无硅油配方，轻柔洗去头皮表层化学残留和环境污染物。" },
        { title: "韩式头部经络按摩", description: "沿百会、太阳等头部核心穴位及后颈肩胛进行经络推拿，舒缓紧绷肌肉。" },
        { title: "纳米气雾养护", description: "利用纳米级温热气雾打开毛囊角质，使营养液深入吸收。" },
        { title: "冷风吹拂与头皮屏障修护", description: "吹干头发的同时，在发根处均匀涂抹舒缓平衡安瓶，稳固头皮健康屏障。" }
      ]
    },
    {
      id: "ear-picking",
      title: "采耳头疗组合",
      subtitle: "城市压力舒缓套餐",
      duration: "75 分钟",
      price: "$198 SGD",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjymrjkKReYXd5ml5VkqFbz8FxHlh9QJk595Oh0VzwCHXqmcMQvpe3ECY1hRaa8hKg96m3FW1GUxeUA1aK2H0983n-WJVrKpt-P1DPxOtR4ZZ4CebetQe9-0yuKYm7IWCjXT9aIltoZCI-A_Qd5pJ5Q-4ntWoNXxUS3-cH9LMfQ7Dpwo86jsR7F3XVr9-b9ZAJlzWrTyI1z3_mRGSpCOkxSHBWxBQCRweOF6iItMlTTvWqrtgmh48gcP63cAMm1Dk9zxaopkJbctA",
      description: "现代城市人的解压刚需。通过极致舒缓的采耳技术与头部放松，重拾内心的宁静。",
      benefits: [
        "使用柔软细密的孔雀毛、银针及音叉进行专业采耳，体验极致ASMR酥痒感",
        "深度清理耳道污垢，保持干爽洁净",
        "针对干燥和多屑头皮，使用临床级别透明质酸配方，进行深度补水和调理",
        "按摩放松颞肌与咬肌，舒缓由于压力引起的磨牙和面部酸痛"
      ],
      steps: [
        { title: "内窥镜耳道检测", description: "使用高精度耳内摄像镜评估耳道内部干洁度，确保采耳安全。" },
        { title: "专业舒缓采耳", description: "手持精细洁耳工具，轻扫并振动外耳神经，舒缓脑部皮层紧张。" },
        { title: "草本洗耳与舒缓", description: "采用温和草本洁耳液温洗，配合精油耳廓按摩，促进淋巴循环。" },
        { title: "温水循环头皮SPA", description: "舒适水流持续温热冲洗头皮，促进全身心释压。" },
        { title: "热石肩颈深度解压", description: "借助温热火山石和复方精油，针对肩颈僵硬区域进行深层经络按压。" }
      ]
    },
    {
      id: "detox",
      title: "头皮排毒再生",
      subtitle: "高级毛囊健发防脱理疗",
      duration: "90 分钟",
      price: "$248 SGD",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZj9WfmguH4xFO53Pnj0evnE6-V4EXLij-FVrQw5fqugq_L_YOiLclL0xwhhrlsqTDt3ZUZxoMe_K-Hyb--V-N7fgwByNUmJ6dSOzr5MgVYl3Tnzkn6Q9iIaKo8aRqz2RPqb4SxrxJFBTYaW4h_y1Kuvrdb_VEsi8qVKmqTapBgNVvMGlVilH829TTVwXCrtj7f8u4SC_3z4bV6WZJ17JX5u8v4NGL4tSGsSkVOuosdxVQ-nHQe_zwfeSbMFadbCa_mn1aI8a7Bn8",
      description: "针对长期头皮健康受损人群。深层排毒，唤醒毛囊活力，促进自然健康的发生长生态。",
      benefits: [
        "剥脱毛囊口顽固皮脂栓和环境重金属毒素，彻底洁净头皮",
        "强韧毛囊，补充发根生长因子，显著减少生理和压力型脱发",
        "深度注入高浓度铜肽、红参提取物和生物素，促使细软发丝增粗",
        "通过高效抗氧化复合物，对抗头皮黑色素细胞老化，预防早白发"
      ],
      steps: [
        { title: "果酸毛囊角质剥脱", description: "涂抹温和低浓度AHA，溶解常年包裹在毛囊口周围的钙化油脂与皮屑。" },
        { title: "高压水动力净澈", description: "使用微米级水氧射流，以温和高速度深层冲刷并排毒毛囊微孔。" },
        { title: "活氧蒸气杀菌", description: "导入活氧蒸汽，杀灭真菌（如马拉色菌）、消除头皮瘙痒和异味。" },
        { title: "气动力无创深导营养", description: "无创水光枪运用高压氧气流，将细胞生长安瓶雾化喷洒至真皮层。" },
        { title: "LLLT低频红光照射", description: "照射650nm医用级别低能量红光，激活毛囊ATP能量，促进新发生长。" }
      ]
    }
  ]
};

export const commitmentsData = {
  en: [
    {
      title: "Korean-Trained Specialists",
      description: "Our therapists undergo rigorous training in authentic Korean head spa protocols and scalp anatomy.",
      iconName: "verified_user"
    },
    {
      title: "100% Organic Products",
      description: "We exclusively use premium, certified organic products that deliver clinical results without irritation.",
      iconName: "eco"
    },
    {
      title: "Private Treatment Suites",
      description: "Experience your transformation in absolute privacy with our thoughtfully designed individual suites.",
      iconName: "lock"
    }
  ],
  zh: [
    {
      title: "全韩培训技师",
      description: "所有理疗师均接受过韩国正统手法培训，确保护理的每一个细节都符合国际标准。",
      iconName: "verified_user"
    },
    {
      title: "100% 有机产品",
      description: "精选全球顶级有机植物萃取精华，无硅油、无化学添加，给头皮最纯粹的呵护。",
      iconName: "eco"
    },
    {
      title: "独立疗程室",
      description: "完全私密的单人护理空间，专业隔音设计，让您在绝对静谧中享受私人放松时光。",
      iconName: "lock"
    }
  ]
};

export const testimonialsData = {
  en: [
    {
      name: "Victoria Chen",
      role: "Investment Banker",
      quote: "The Korean Signature Head Spa completely cured my chronic stress headaches and dry scalp. The level of meticulous care is absolutely world-class.",
      rating: 5,
      date: "Jun 27, 2026"
    },
    {
      name: "Marcus Tan",
      role: "Creative Director",
      quote: "An unparalleled sensory experience right on Orchard Road. The private room and custom soundscapes made me feel like I was in a 5-star Seoul resort.",
      rating: 5,
      date: "Jun 20, 2026"
    },
    {
      name: "Sophia Lim",
      role: "Lifestyle Influencer",
      quote: "My hair has never looked so voluminous and healthy! The clinical analysis and high-pressure water wash is fascinating to witness.",
      rating: 5,
      date: "Jun 12, 2026"
    },
    {
      name: "Sarah T.",
      role: "Verified Client",
      quote: "The head & face relaxation ritual was incredible — my first-time tension headache disappeared completely. The therapist's technique was so skilled and attentive, truly a hidden gem!",
      rating: 5,
      date: "Jun 20, 2026"
    },
    {
      name: "Michelle L.",
      role: "Verified Client",
      quote: "Best facial treatment in Singapore! My skin looks radiant and dewy, with results lasting for weeks. The team really took time to understand my skin concerns and tailored the perfect routine.",
      rating: 5,
      date: "Jun 18, 2026"
    },
    {
      name: "Jennifer K.",
      role: "Verified Client",
      quote: "The body mud therapy was amazing! So warm and soothing, my muscles were completely relaxed and I felt totally renewed. Definitely coming back!",
      rating: 5,
      date: "Jun 15, 2026"
    },
    {
      name: "Rachel W.",
      role: "Verified Client",
      quote: "After 3 facial sessions my complexion has visibly improved — the results really show. The team is so professional and always warm and welcoming.",
      rating: 5,
      date: "Jun 12, 2026"
    }
  ],
  zh: [
    {
      name: "陈女士 (Victoria)",
      role: "投资银行家",
      quote: "韩式招牌头疗彻底治好了我的慢性偏头痛和头皮干燥。理疗师专业细致的手法简直是世界一流，每次都能睡得极其香甜。",
      rating: 5,
      date: "6/27/2026"
    },
    {
      name: "谭先生 (Marcus)",
      role: "创意总监",
      quote: "无与伦比的感官体验。独立静音疗程室以及定制自然白噪音，仿佛让我瞬间置身于首尔顶级的奢华度假村。",
      rating: 5,
      date: "6/20/2026"
    },
    {
      name: "林小姐 (Sophia)",
      role: "知名生活博主",
      quote: "做完头疗后我的头发看起来比以前更显丰盈、更有光泽！高清头皮检测让我看清楚了毛囊的大变身，真的很神奇！",
      rating: 5,
      date: "6/12/2026"
    },
    {
      name: "Sarah T.",
      role: "认证客户",
      quote: "头脸舒缓疗程非常放松，做完第一次紧张性头痛就消失了。治疗师技术高超、贴心周到——真的是个隐藏宝地！",
      rating: 5,
      date: "6/20/2026"
    },
    {
      name: "Michelle L.",
      role: "认证客户",
      quote: "新加坡最好的面部疗程！肌肤水润光泽，效果持续数周。团队认真了解肌肤问题，定制了完美护理方案。",
      rating: 5,
      date: "6/18/2026"
    },
    {
      name: "Jennifer K.",
      role: "认证客户",
      quote: "身体泥浆疗法真的太好了！温暖舒缓，全身肌肉完全放松，感觉焕然一新。一定会再来！",
      rating: 5,
      date: "6/15/2026"
    },
    {
      name: "Rachel W.",
      role: "认证客户",
      quote: "做了3次面部护理后肤色明显改善，效果真的可见。团队非常专业，每次到访都热情友好。",
      rating: 5,
      date: "6/12/2026"
    }
  ]
};

export const specialistsData = [
  { id: "eunji", name: "Eunji Kim", role: "Master Scalp Therapist (Seoul-certified)", origin: "Seoul, South Korea", experience: "9+ Years Experience", spec: "Acupressure & Meridian Healing" },
  { id: "jiwon", name: "Jiwon Park", role: "Senior Clinical Tricologist", origin: "Busan, South Korea", experience: "7 Years Experience", spec: "Scalp Detox & Hair Density Therapy" },
  { id: "sarah", name: "Sarah Lim", role: "Bespoke Wellness & Ear Care Expert", origin: "Singapore", experience: "6 Years Experience", spec: "Ear Picking Art & Multi-sensory Decompression" }
];
