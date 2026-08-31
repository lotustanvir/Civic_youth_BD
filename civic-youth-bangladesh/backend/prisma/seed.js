import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...\n");

  // ─── Categories ────────────────────────────────────
  const categories = [
    { slug: "civic-education", nameEn: "Civic Education", nameBn: "নাগরিক শিক্ষা" },
    { slug: "youth-leadership", nameEn: "Youth Leadership", nameBn: "যুব নেতৃত্ব" },
    { slug: "climate-action", nameEn: "Climate Action", nameBn: "জলবায়ু কার্যক্রম" },
    { slug: "media-literacy", nameEn: "Media Literacy", nameBn: "মিডিয়া সাক্ষরতা" },
    { slug: "policy", nameEn: "Policy", nameBn: "নীতি" },
    { slug: "community", nameEn: "Community", nameBn: "কমিউনিটি" },
    { slug: "research", nameEn: "Research", nameBn: "গবেষণা" },
  ];

  const categoryMap = {};
  for (const cat of categories) {
    const result = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { nameEn: cat.nameEn, nameBn: cat.nameBn },
      create: cat,
    });
    categoryMap[cat.slug] = result.id;
  }
  console.log(`  Upserted ${categories.length} categories`);

  // ─── Programs ──────────────────────────────────────
  const programs = [
    {
      slug: "national-civic-leadership-fellowship",
      titleEn: "National Civic Leadership Fellowship",
      titleBn: "জাতীয় নাগরিক নেতৃত্ব ফেলোশিপ",
      shortDescEn: "A structured leadership journey combining civic learning, mentorship, community service and practical leadership experience.",
      shortDescBn: "নাগরিক শিক্ষা, পরামর্শ, কমিউনিটি সেবা ও ব্যবহারিক নেতৃত্বের অভিজ্ঞতাকে একত্রিত করা একটি সংগঠিত নেতৃত্ব যাত্রা।",
      fullDescEn: "The National Civic Leadership Fellowship is CYB's flagship program designed to develop a new generation of civic leaders across Bangladesh. Fellows engage in intensive civic education, receive mentorship from experienced leaders, undertake community service projects, and build practical leadership skills through real-world challenges.",
      fullDescBn: "জাতীয় নাগরিক নেতৃত্ব ফেলোশিপ CYB-এর প্রধান কার্যক্রম যা বাংলাদেশ জুড়ে একটি নতুন প্রজন্মের নাগরিক নেতা তৈরি করতে ডিজাইন করা হয়েছে।",
      image: "/images/featured-program-group.jpg.png",
      featured: true,
      sortOrder: 1,
      published: true,
    },
    {
      slug: "civic-academy-bangladesh",
      titleEn: "Civic Academy Bangladesh",
      titleBn: "সিভিক একাডেমি বাংলাদেশ",
      shortDescEn: "Comprehensive civic education workshops and training sessions for young citizens across the country.",
      shortDescBn: "দেশজুড়ে তরুণ নাগরিকদের জন্য বিস্তৃত নাগরিক শিক্ষা কর্মশালা ও প্রশিক্ষণ সেশন।",
      image: "/images/program-classroom-jpg.png",
      sortOrder: 2,
      published: true,
    },
    {
      slug: "leadership-academy",
      titleEn: "Leadership Academy",
      titleBn: "নেতৃত্ব একাডেমি",
      shortDescEn: "Intensive leadership development programs building ethical, competent and service-oriented youth leaders.",
      shortDescBn: "নৈতিক, দক্ষ ও সেবামুখী যুব নেতা তৈরির তীব্র নেতৃত্ব উন্নয়ন কার্যক্রম।",
      image: "/images/program-speaking.jpg.png",
      sortOrder: 3,
      published: true,
    },
    {
      slug: "community-leadership-labs",
      titleEn: "Community Leadership Labs",
      titleBn: "কমিউনিটি নেতৃত্ব ল্যাব",
      shortDescEn: "Localised leadership incubators empowering youth to address community-specific challenges through collaborative action.",
      shortDescBn: "সহযোগিতামূলক কার্যক্রমের মাধ্যমে কমিউনিটি-নির্দিষ্ট চ্যালেঞ্জ মোকাবেলায় যুবকদের ক্ষমতায়িত করা।",
      image: "/images/program-discussion.jpg.png",
      sortOrder: 4,
      published: true,
    },
    {
      slug: "women-leadership-initiative",
      titleEn: "Women Leadership Initiative",
      titleBn: "মহিলা নেতৃত্ব উদ্যোগ",
      shortDescEn: "Dedicated programs supporting young women in developing leadership capabilities and civic participation.",
      shortDescBn: "নেতৃত্বের ক্ষমতা ও নাগরিক অংশগ্রহণ বিকাশে তরুণীদের সমর্থনকারী নিবেদিত কার্যক্রম।",
      image: "/images/program-speaking.jpg.png",
      sortOrder: 5,
      published: true,
    },
    {
      slug: "civic-action-network",
      titleEn: "Civic Action Network",
      titleBn: "নাগরিক কার্যক্রম নেটওয়ার্ক",
      shortDescEn: "A network connecting young civic actors for coordinated community action and collective impact.",
      shortDescBn: "সমন্বিত কমিউনিটি কার্যক্রম ও সম্মিলিত প্রভাবের জন্য তরুণ নাগরিক কর্মীদের সংযুক্তকারী একটি নেটওয়ার্ক।",
      image: "/images/community-service.jpg.png",
      sortOrder: 6,
      published: true,
    },
    {
      slug: "research-fellowship",
      titleEn: "Research Fellowship Program",
      titleBn: "গবেষণা ফেলোশিপ কার্যক্রম",
      shortDescEn: "Supporting young researchers in conducting rigorous, policy-relevant research on civic and governance issues.",
      shortDescBn: "নাগরিক ও শাসনব্যবস্থার বিষয়ে কঠোর, নীতি-সংশ্লিষ্ট গবেষণা পরিচালনায় তরুণ গবেষকদের সমর্থন।",
      image: "/images/program-discussion.jpg.png",
      sortOrder: 7,
      published: true,
    },
    {
      slug: "civic-tech-fellowship",
      titleEn: "Civic Technology Fellowship",
      titleBn: "নাগরিক প্রযুক্তি ফেলোশিপ",
      shortDescEn: "Training youth to leverage technology and digital tools for civic innovation and governance challenges.",
      shortDescBn: "নাগরিক উদ্ভাবন ও শাসনব্যবস্থার চ্যালেঞ্জের জন্য প্রযুক্তি ও ডিজিটাল সরঞ্জাম ব্যবহারে যুবকদের প্রশিক্ষণ।",
      image: "/images/workshop-event.jpg.png",
      sortOrder: 8,
      published: true,
    },
    {
      slug: "constitutional-literacy-campaign",
      titleEn: "Constitutional Literacy Campaign",
      titleBn: "সাংবিধানিক সাক্ষরতা প্রচারণা",
      shortDescEn: "National awareness campaigns promoting understanding of constitutional rights, duties and democratic principles.",
      shortDescBn: "সাংবিধানিক অধিকার, কর্তব্য ও গণতান্ত্রিক নীতি বোঝার প্রচারে জাতীয় সচেতনতা প্রচারণা।",
      image: "/images/program-classroom-jpg.png",
      sortOrder: 9,
      published: true,
    },
    {
      slug: "community-service-week",
      titleEn: "Community Service Week",
      titleBn: "কমিউনিটি সেবা সপ্তাহ",
      shortDescEn: "Annual nationwide volunteer mobilization engaging thousands of youth in organized community service activities.",
      shortDescBn: "সংগঠিত কমিউনিটি সেবা কার্যক্রমে হাজার হাজার তরুণকে অংশগ্রহণ করানো বার্ষিক জাতীয় স্বেচ্ছাসেবী মোবিলাইজেশন।",
      image: "/images/program-volunteering.jpg.png",
      sortOrder: 10,
      published: true,
    },
  ];

  for (const program of programs) {
    await prisma.program.upsert({
      where: { slug: program.slug },
      update: program,
      create: program,
    });
  }
  console.log(`  Upserted ${programs.length} programs`);

  // ─── Articles ──────────────────────────────────────
  const articles = [
    {
      slug: "why-civic-education-matters",
      titleEn: "Why Civic Education Matters for Young Citizens",
      titleBn: "তরুণ নাগরিকদের জন্য নাগরিক শিক্ষা কেন গুরুত্বপূর্ণ",
      excerptEn: "Civic education equips young people with the knowledge and skills needed to participate meaningfully in democratic processes and community life.",
      excerptBn: "নাগরিক শিক্ষা তরুণদের গণতান্ত্রিক প্রক্রিয়া ও কমিউনিটি জীবনে অর্থবহভাবে অংশগ্রহণের জন্য প্রয়োজনীয় জ্ঞান ও দক্ষতায় সজ্জিত করে।",
      categorySlug: "civic-education",
      image: "/images/program-classroom-jpg.png",
      readTime: "5 min read",
      published: true,
      publishedAt: new Date("2026-08-15"),
    },
    {
      slug: "building-ethical-leadership",
      titleEn: "Building Ethical Leadership Through Community Service",
      titleBn: "কমিউনিটি সেবার মাধ্যমে নৈতিক নেতৃত্ব গড়ে তোলা",
      excerptEn: "How hands-on community service experiences shape ethical, accountable and service-oriented young leaders in Bangladesh.",
      excerptBn: "ব্যবহারিক কমিউনিটি সেবার অভিজ্ঞতা কীভাবে বাংলাদেশে নৈতিক, জবাবদিহিতা-সম্পন্ন ও সেবামুখী তরুণ নেতা তৈরি করে।",
      categorySlug: "youth-leadership",
      image: "/images/blog-leadership.jpg.png",
      readTime: "4 min read",
      published: true,
      publishedAt: new Date("2026-08-08"),
    },
    {
      slug: "youth-climate-resilience",
      titleEn: "Youth and Climate Resilience in Bangladesh",
      titleBn: "বাংলাদেশে তরুণ ও জলবায়ু সহনশীলতা",
      excerptEn: "Exploring the role of young citizens in building community resilience against climate change through civic action and local leadership.",
      excerptBn: "নাগরিক কার্যক্রম ও স্থানীয় নেতৃত্বের মাধ্যমে জলবায়ু পরিবর্তনের বিরুদ্ধে কমিউনিটি সহনশীলতা গড়ে তোলায় তরুণ নাগরিকদের ভূমিকা অনুসন্ধান।",
      categorySlug: "climate-action",
      image: "/images/blog-climate-action.jpg.png",
      readTime: "6 min read",
      published: true,
      publishedAt: new Date("2026-07-28"),
    },
    {
      slug: "media-literacy-digital-age",
      titleEn: "Media Literacy in the Digital Age",
      titleBn: "ডিজিটাল যুগে মিডিয়া সাক্ষরতা",
      excerptEn: "Why media literacy is essential for young citizens navigating the complex information landscape of modern Bangladesh.",
      excerptBn: "আধুনিক বাংলাদেশের জটিল তথ্য ল্যান্ডস্কেপ নেভিগেট করতে তরুণ নাগরিকদের জন্য মিডিয়া সাক্ষরতা কেন অপরিহার্য।",
      categorySlug: "media-literacy",
      image: "/images/blog-media-literacy.jpg.png",
      readTime: "5 min read",
      published: true,
      publishedAt: new Date("2026-07-20"),
    },
    {
      slug: "youth-participation-governance",
      titleEn: "Youth Participation in Local Governance",
      titleBn: "স্থানীয় শাসনব্যবস্থায় যুব অংশগ্রহণ",
      excerptEn: "Examining pathways for meaningful youth involvement in local government decision-making and community planning processes.",
      excerptBn: "স্থানীয় সরকারি সিদ্ধান্ত গ্রহণ ও কমিউনিটি পরিকল্পনা প্রক্রিয়ায় তরুণদের অর্থবহ অংশগ্রহণের পথ পরীক্ষা।",
      categorySlug: "policy",
      image: "/images/community-service.jpg.png",
      readTime: "7 min read",
      published: true,
      publishedAt: new Date("2026-07-12"),
    },
    {
      slug: "volunteerism-community-development",
      titleEn: "Volunteerism as a Catalyst for Community Development",
      titleBn: "কমিউনিটি উন্নয়নের উদ্দীপক হিসেবে স্বেচ্ছাসেবা",
      excerptEn: "How organized volunteerism creates lasting impact in communities across Bangladesh through youth-led initiatives.",
      excerptBn: "যুব-নেতৃত্বাধীন উদ্যোগের মাধ্যমে সংগঠিত স্বেচ্ছাসেবা কীভাবে বাংলাদেশ জুড়ে কমিউনিটিতে স্থায়ী প্রভাব তৈরি করে।",
      categorySlug: "community",
      image: "/images/workshop-event.jpg.png",
      readTime: "4 min read",
      published: true,
      publishedAt: new Date("2026-07-05"),
    },
  ];

  for (const article of articles) {
    const { categorySlug, ...articleData } = article;
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: { ...articleData, categoryId: categoryMap[categorySlug] },
      create: { ...articleData, categoryId: categoryMap[categorySlug] },
    });
  }
  console.log(`  Upserted ${articles.length} articles`);

  // ─── Thematic Areas ────────────────────────────────
  const thematicAreas = [
    {
      slug: "civic-education",
      titleEn: "Civic Education & Citizenship",
      titleBn: "নাগরিক শিক্ষা ও নাগরিকত্ব",
      descEn: "Building civic literacy, constitutional awareness, democratic values and responsible citizenship.",
      descBn: "নাগরিক সাক্ষরতা, সাংবিধানিক সচেতনতা, গণতান্ত্রিক মূল্যবোধ ও দায়িত্বশীল নাগরিকত্ব গড়ে তোলা।",
      fullDescEn: "CYB's Civic Education & Citizenship program builds civic literacy, constitutional awareness, democratic values and responsible citizenship among young Bangladeshis. Through workshops, campaigns and digital resources, we help young people understand their rights, duties and role in democratic society.",
      fullDescBn: "CYB-এর নাগরিক শিক্ষা ও নাগরিকত্ব কার্যক্রম তরুণ বাংলাদেশিদের মধ্যে নাগরিক সাক্ষরতা, সাংবিধানিক সচেতনতা, গণতান্ত্রিক মূল্যবোধ ও দায়িত্বশীল নাগরিকত্ব গড়ে তোলে।",
      icon: "BookOpen",
      accentColor: "green",
      href: "/thematic-areas#civic-education",
      secondaryImage: "/images/training-group-discussion.png.png",
      sortOrder: 1,
    },
    {
      slug: "youth-leadership",
      titleEn: "Youth Leadership Development",
      titleBn: "যুব নেতৃত্ব উন্নয়ন",
      descEn: "Developing informed, skilled, ethical, and responsible young leaders through training, mentorship, experiential learning, and opportunities for civic participation.",
      descBn: "প্রশিক্ষণ, পরামর্শ, অভিজ্ঞতামূলক শিক্ষা ও নাগরিক অংশগ্রহণের সুযোগের মাধ্যমে সচেতন, দক্ষ, নৈতিক ও দায়িত্বশীল তরুণ নেতা তৈরি করা।",
      fullDescEn: "Our Youth Leadership Development programs develop informed, skilled, ethical, and responsible young leaders through training, mentorship, experiential learning, and opportunities for civic participation.",
      fullDescBn: "আমাদের যুব নেতৃত্ব উন্নয়ন কার্যক্রম প্রশিক্ষণ, পরামর্শ, অভিজ্ঞতামূলক শিক্ষা ও নাগরিক অংশগ্রহণের সুযোগের মাধ্যমে সচেতন, দক্ষ, নৈতিক ও দায়িত্বশীল তরুণ নেতা তৈরি করে।",
      icon: "Users",
      accentColor: "red",
      href: "/thematic-areas#youth-leadership",
      secondaryImage: "/images/leadership-workshop-2.png.png",
      sortOrder: 2,
    },
    {
      slug: "community-engagement",
      titleEn: "Community Engagement & Volunteerism",
      titleBn: "কমিউনিটি সম্পৃক্ততা ও স্বেচ্ছাসেবা",
      descEn: "Transforming civic values into community action through organized volunteering and local initiatives.",
      descBn: "সংগঠিত স্বেচ্ছাসেবা ও স্থানীয় উদ্যোগের মাধ্যমে নাগরিক মূল্যবোধকে কমিউনিটি কার্যক্রমে রূপান্তরিত করা।",
      fullDescEn: "Community Engagement & Volunteerism transforms civic values into community action through organized volunteering and local initiatives.",
      fullDescBn: "কমিউনিটি সম্পৃক্ততা ও স্বেচ্ছাসেবা সংগঠিত স্বেচ্ছাসেবা ও স্থানীয় উদ্যোগের মাধ্যমে নাগরিক মূল্যবোধকে কমিউনিটি কার্যক্রমে রূপান্তরিত করে।",
      icon: "HeartHandshake",
      accentColor: "green",
      href: "/thematic-areas#community-engagement",
      secondaryImage: "/images/community-tree-planting.png.png",
      sortOrder: 3,
    },
    {
      slug: "civil-political-rights",
      titleEn: "Civil and Political Rights",
      titleBn: "নাগরিক ও রাজনৈতিক অধিকার",
      descEn: "Raising awareness of civil and political rights and empowering young people to participate meaningfully, peacefully, and responsibly in democratic life.",
      descBn: "নাগরিক ও রাজনৈতিক অধিকার সম্পর্কে সচেতনতা বৃদ্ধি এবং তরুণদের গণতান্ত্রিক জীবনে অর্থবহ, শান্তিপূর্ণ ও দায়িত্বশীলভাবে অংশগ্রহণে ক্ষমতায়িত করা।",
      fullDescEn: "Civil and Political Rights focuses on raising awareness of civil and political rights and empowering young people to participate meaningfully, peacefully, and responsibly in democratic life.",
      fullDescBn: "নাগরিক ও রাজনৈতিক অধিকার কার্যক্রম নাগরিক ও রাজনৈতিক অধিকার সম্পর্কে সচেতনতা বৃদ্ধি এবং তরুণদের গণতান্ত্রিক জীবনে অর্থবহ, শান্তিপূর্ণ ও দায়িত্বশীলভাবে অংশগ্রহণে ক্ষমতায়িত করতে ফোকাস করে।",
      icon: "Scale",
      accentColor: "red",
      href: "/thematic-areas#civil-political-rights",
      secondaryImage: "/images/leadership-circle.png.png",
      sortOrder: 4,
    },
    {
      slug: "media-literacy",
      titleEn: "Media and Information Literacy",
      titleBn: "মিডিয়া ও তথ্য সাক্ষরতা",
      descEn: "Equipping young people to critically evaluate information, navigate digital media responsibly, recognize misinformation, and participate safely in public discourse.",
      descBn: "তরুণদের তথ্য সমালোচনামূলকভাবে মূল্যায়ন, ডিজিটাল মিডিয়া দায়িত্বশীলভাবে ব্যবহার, ভুল তথ্য সনাক্তকরণ এবং নিরাপদে জনসমক্ষে অংশগ্রহণে সক্ষম করা।",
      fullDescEn: "Media and Information Literacy equips young people to critically evaluate information, navigate digital media responsibly, recognize misinformation, and participate safely in public discourse.",
      fullDescBn: "মিডিয়া ও তথ্য সাক্ষরতা কার্যক্রম তরুণদের তথ্য সমালোচনামূলকভাবে মূল্যায়ন, ডিজিটাল মিডিয়া দায়িত্বশীলভাবে ব্যবহার, ভুল তথ্য সনাক্তকরণ এবং নিরাপদে জনসমক্ষে অংশগ্রহণে সক্ষম করে।",
      icon: "Newspaper",
      accentColor: "green",
      href: "/thematic-areas#media-literacy",
      secondaryImage: "/images/blog-leadership.jpg.png",
      sortOrder: 5,
    },
    {
      slug: "youth-skills",
      titleEn: "Youth Skills and Employability",
      titleBn: "যুব দক্ষতা ও কর্মসংস্থান সক্ষমতা",
      descEn: "Strengthening practical, professional, communication, leadership, and transferable skills that help young people prepare for education, employment, entrepreneurship, and civic life.",
      descBn: "ব্যবহারিক, পেশাদার, যোগাযোগ, নেতৃত্ব ও স্থানান্তরযোগ্য দক্ষতা শক্তিশালী করা যা তরুণদের শিক্ষা, কর্মসংস্থান, উদ্যোক্তা ও নাগরিক জীবনের জন্য প্রস্তুত করে।",
      fullDescEn: "Youth Skills and Employability strengthens practical, professional, communication, leadership, and transferable skills that help young people prepare for education, employment, entrepreneurship, and civic life.",
      fullDescBn: "যুব দক্ষতা ও কর্মসংস্থান সক্ষমতা ব্যবহারিক, পেশাদার, যোগাযোগ, নেতৃত্ব ও স্থানান্তরযোগ্য দক্ষতা শক্তিশালী করে যা তরুণদের শিক্ষা, কর্মসংস্থান, উদ্যোক্তা ও নাগরিক জীবনের জন্য প্রস্তুত করে।",
      icon: "BriefcaseBusiness",
      accentColor: "red",
      href: "/thematic-areas#youth-skills",
      secondaryImage: "/images/program-classroom-jpg.png",
      sortOrder: 6,
    },
    {
      slug: "climate-resilience",
      titleEn: "Climate Change & Resilience",
      titleBn: "জলবায়ু পরিবর্তন ও সহনশীলতা",
      descEn: "Engaging young people in climate awareness, environmental stewardship and community resilience building.",
      descBn: "জলবায়ু সচেতনতা, পরিবেশ রক্ষা ও কমিউনিটি সহনশীলতা বৃদ্ধিতে তরুণদের সম্পৃক্ত করা।",
      fullDescEn: "Climate Change & Resilience engages young people in climate awareness, environmental stewardship and community resilience building.",
      fullDescBn: "জলবায়ু পরিবর্তন ও সহনশীলতা কার্যক্রম জলবায়ু সচেতনতা, পরিবেশ রক্ষা ও কমিউনিটি সহনশীলতা বৃদ্ধিতে তরুণদের সম্পৃক্ত করে।",
      icon: "Globe",
      accentColor: "green",
      href: "/thematic-areas#climate-resilience",
      secondaryImage: "/images/blog-climate-action.jpg.png",
      sortOrder: 7,
    },
    {
      slug: "research-policy",
      titleEn: "Research & Public Policy",
      titleBn: "গবেষণা ও জননীতি",
      descEn: "Strengthening youth participation in research, policy analysis and evidence-informed public dialogue.",
      descBn: "গবেষণা, নীতি বিশ্লেষণ ও তথ্যভিত্তিক জনসমক্ষে সংলাপে তরুণদের অংশগ্রহণ শক্তিশালী করা।",
      fullDescEn: "Research & Public Policy strengthens youth participation in research, policy analysis and evidence-informed public dialogue.",
      fullDescBn: "গবেষণা ও জননীতি কার্যক্রম গবেষণা, নীতি বিশ্লেষণ ও তথ্যভিত্তিক জনসমক্ষে সংলাপে তরুণদের অংশগ্রহণ শক্তিশালী করে।",
      icon: "FileText",
      accentColor: "red",
      href: "/thematic-areas#research-policy",
      secondaryImage: "/images/research-policy-meeting.png.png",
      sortOrder: 8,
    },
    {
      slug: "civic-innovation",
      titleEn: "Civic Innovation & Technology",
      titleBn: "নাগরিক উদ্ভাবন ও প্রযুক্তি",
      descEn: "Using innovation, digital tools and civic technology to address community and governance challenges.",
      descBn: "কমিউনিটি ও শাসনব্যবস্থার চ্যালেঞ্জ মোকাবেলায় উদ্ভাবন, ডিজিটাল সরঞ্জাম ও নাগরিক প্রযুক্তি ব্যবহার করা।",
      fullDescEn: "Civic Innovation & Technology leverages innovation, digital tools and civic technology to address community and governance challenges.",
      fullDescBn: "নাগরিক উদ্ভাবন ও প্রযুক্তি কমিউনিটি ও শাসনব্যবস্থার চ্যালেঞ্জ মোকাবেলায় উদ্ভাবন, ডিজিটাল সরঞ্জাম ও নাগরিক প্রযুক্তির সুযোগ ব্যবহার করে।",
      icon: "Lightbulb",
      accentColor: "green",
      href: "/thematic-areas#civic-innovation",
      secondaryImage: "/images/civic-technology-team.png.png",
      sortOrder: 9,
    },
  ];

  for (const area of thematicAreas) {
    await prisma.thematicArea.upsert({
      where: { slug: area.slug },
      update: area,
      create: area,
    });
  }
  console.log(`  Upserted ${thematicAreas.length} thematic areas`);

  // ─── Opportunities ─────────────────────────────────
  const opportunities = [
    {
      slug: "fellowship-2026",
      titleEn: "Civic Leadership Fellowship 2026",
      titleBn: "নাগরিক নেতৃত্ব ফেলোশিপ ২০২৬",
      typeEn: "Fellowship",
      typeBn: "ফেলোশিপ",
      deadline: null,
      descEn: "Join the next cohort of the National Civic Leadership Fellowship. Develop civic knowledge, leadership skills and community impact experience.",
      descBn: "জাতীয় নাগরিক নেতৃত্ব ফেলোশিপের পরবর্তী ব্যাচে যোগ দিন। নাগরিক জ্ঞান, নেতৃত্বের দক্ষতা ও কমিউনিটি প্রভাবের অভিজ্ঞতা অর্জন করুন।",
      published: true,
    },
    {
      slug: "volunteer-recruitment",
      titleEn: "Volunteer Recruitment Drive",
      titleBn: "স্বেচ্ছাসেবী নিয়োগ প্রচারণা",
      typeEn: "Volunteer",
      typeBn: "স্বেচ্ছাসেবী",
      deadline: null,
      descEn: "Become a CYB volunteer and contribute to civic education, community engagement and youth development initiatives across Bangladesh.",
      descBn: "CYB স্বেচ্ছাসেবী হোন এবং বাংলাদেশ জুড়ে নাগরিক শিক্ষা, কমিউনিটি সম্পৃক্ততা ও যুব উন্নয়ন উদ্যোগে অবদান রাখুন।",
      published: true,
    },
    {
      slug: "research-grants",
      titleEn: "Youth Research Grants",
      titleBn: "যুব গবেষণা অনুদান",
      typeEn: "Grant",
      typeBn: "অনুদান",
      deadline: null,
      descEn: "Apply for research grants to investigate civic participation, governance and youth development topics in your community.",
      descBn: "আপনার কমিউনিটিতে নাগরিক অংশগ্রহণ, শাসনব্যবস্থা ও যুব উন্নয়ন বিষয়ে গবেষণা করতে গবেষণা অনুদানের জন্য আবেদন করুন।",
      published: true,
    },
    {
      slug: "campus-chapter",
      titleEn: "Start a Campus Chapter",
      titleBn: "ক্যাম্পাস চ্যাপ্টার শুরু করুন",
      typeEn: "Leadership",
      typeBn: "নেতৃত্ব",
      deadline: null,
      descEn: "Establish a CYB chapter at your university or college and lead civic engagement initiatives on your campus.",
      descBn: "আপনার বিশ্ববিদ্যালয় বা কলেজে একটি CYB চ্যাপ্টার প্রতিষ্ঠা করুন এবং ক্যাম্পাসে নাগরিক সম্পৃক্ততার উদ্যোগের নেতৃত্ব দিন।",
      published: true,
    },
    {
      slug: "civic-tech-hackathon",
      titleEn: "Civic Tech Hackathon",
      titleBn: "নাগরিক প্রযুক্তি হ্যাকাথন",
      typeEn: "Event",
      typeBn: "অনুষ্ঠান",
      deadline: null,
      descEn: "Participate in hackathons focused on developing technology solutions for civic and governance challenges.",
      descBn: "নাগরিক ও শাসনব্যবস্থার চ্যালেঞ্জের জন্য প্রযুক্তি সমাধান তৈরির দিকে মনোনিবেশ করা হ্যাকাথনে অংশ নিন।",
      published: true,
    },
  ];

  for (const opp of opportunities) {
    await prisma.opportunity.upsert({
      where: { slug: opp.slug },
      update: opp,
      create: opp,
    });
  }
  console.log(`  Upserted ${opportunities.length} opportunities`);

  // ─── Partners ──────────────────────────────────────
  const partners = [
    { name: "Partner Placeholder 01", sortOrder: 1 },
    { name: "Partner Placeholder 02", sortOrder: 2 },
    { name: "Partner Placeholder 03", sortOrder: 3 },
    { name: "Partner Placeholder 04", sortOrder: 4 },
    { name: "Partner Placeholder 05", sortOrder: 5 },
  ];

  const existingPartners = await prisma.partner.findMany();
  if (existingPartners.length === 0) {
    await prisma.partner.createMany({ data: partners });
    console.log(`  Created ${partners.length} partners`);
  } else {
    console.log(`  Skipped partners (${existingPartners.length} already exist)`);
  }

  // ─── Team Members ──────────────────────────────────
  const teamMembers = [
    { name: "Advisor Placeholder", roleEn: "Senior Advisor", roleBn: "উচ্চপর্যায়ের পরামর্শদাতা", bioEn: "Profile information will be added upon approval.", bioBn: "অনুমোদনের পর প্রোফাইল বিবরণ যোগ করা হবে।", sortOrder: 1 },
    { name: "Advisor Placeholder", roleEn: "Advisory Board Member", roleBn: "পরামর্শদাতা পরিষদের সদস্য", bioEn: "Profile information will be added upon approval.", bioBn: "অনুমোদনের পর প্রোফাইল বিবরণ যোগ করা হবে।", sortOrder: 2 },
    { name: "Leadership Placeholder", roleEn: "Program Lead", roleBn: "কার্যক্রম প্রধান", bioEn: "Profile information will be added upon approval.", bioBn: "অনুমোদনের পর প্রোফাইল বিবরণ যোগ করা হবে।", sortOrder: 3 },
    { name: "Leadership Placeholder", roleEn: "Research Lead", roleBn: "গবেষণা প্রধান", bioEn: "Profile information will be added upon approval.", bioBn: "অনুমোদনের পর প্রোফাইল বিবরণ যোগ করা হবে।", sortOrder: 4 },
  ];

  const existingTeam = await prisma.teamMember.findMany();
  if (existingTeam.length === 0) {
    await prisma.teamMember.createMany({ data: teamMembers });
    console.log(`  Created ${teamMembers.length} team members`);
  } else {
    console.log(`  Skipped team members (${existingTeam.length} already exist)`);
  }

  // ─── Impact Metrics ────────────────────────────────
  const impactMetrics = [
    { type: "CURRENT", labelEn: "Youth Reached", labelBn: "তরুণ পৌঁছেছে", value: 0, published: true },
    { type: "CURRENT", labelEn: "Active Volunteers", labelBn: "সক্রিয় স্বেচ্ছাসেবী", value: 0, published: true },
    { type: "CURRENT", labelEn: "District Presence", labelBn: "জেলা উপস্থিতি", value: 0, published: true },
    { type: "CURRENT", labelEn: "Community Projects", labelBn: "কমিউনিটি প্রকল্প", value: 0, published: true },
    { type: "CURRENT", labelEn: "Policy Dialogues", labelBn: "নীতি সংলাপ", value: 0, published: true },
    { type: "CURRENT", labelEn: "Leadership Programs", labelBn: "নেতৃত্ব কার্যক্রম", value: 0, published: true },
    { type: "TARGET", labelEn: "Youth Reached", labelBn: "তরুণ পৌঁছেছে", value: 50000, suffix: "+", published: true },
    { type: "TARGET", labelEn: "Active Volunteers", labelBn: "সক্রিয় স্বেচ্ছাসেবী", value: 5000, suffix: "+", published: true },
    { type: "TARGET", labelEn: "District Presence", labelBn: "জেলা উপস্থিতি", value: 64, published: true },
    { type: "TARGET", labelEn: "Community Projects", labelBn: "কমিউনিটি প্রকল্প", value: 200, suffix: "+", published: true },
    { type: "TARGET", labelEn: "Policy Dialogues", labelBn: "নীতি সংলাপ", value: 100, suffix: "+", published: true },
    { type: "TARGET", labelEn: "Leadership Programs", labelBn: "নেতৃত্ব কার্যক্রম", value: 25, suffix: "+", published: true },
  ];

  const existingMetrics = await prisma.impactMetric.findMany();
  if (existingMetrics.length === 0) {
    await prisma.impactMetric.createMany({ data: impactMetrics });
    console.log(`  Created ${impactMetrics.length} impact metrics`);
  } else {
    console.log(`  Skipped impact metrics (${existingMetrics.length} already exist)`);
  }

  console.log("\nSeeding complete!");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
