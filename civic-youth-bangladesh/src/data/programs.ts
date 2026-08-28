import { Program } from "@/types";

export const featuredProgram: Program = {
  id: "national-civic-leadership-fellowship",
  title: "National Civic Leadership Fellowship",
  shortDescription:
    "A structured leadership journey combining civic learning, mentorship, community service and practical leadership experience.",
  fullDescription:
    "The National Civic Leadership Fellowship is CYB's flagship program designed to develop a new generation of civic leaders across Bangladesh. Fellows engage in intensive civic education, receive mentorship from experienced leaders, undertake community service projects, and build practical leadership skills through real-world challenges.",
  image: "/images/featured-program-group.jpg.png",
  badge: "FEATURED PROGRAM",
  href: "/programs#national-civic-leadership-fellowship",
  featured: true,
};

export const programs: Program[] = [
  {
    id: "civic-academy-bangladesh",
    title: "Civic Academy Bangladesh",
    shortDescription:
      "Comprehensive civic education workshops and training sessions for young citizens across the country.",
    image: "/images/program-classroom-jpg.png",
    href: "/programs#civic-academy",
  },
  {
    id: "national-civic-leadership-fellowship",
    title: "National Civic Leadership Fellowship",
    shortDescription:
      "A structured leadership journey combining civic learning, mentorship, community service and practical leadership experience.",
    image: "/images/featured-program-group.jpg.png",
    href: "/programs#national-civic-leadership-fellowship",
    featured: true,
  },
  {
    id: "leadership-academy",
    title: "Leadership Academy",
    shortDescription:
      "Intensive leadership development programs building ethical, competent and service-oriented youth leaders.",
    image: "/images/program-speaking.jpg.png",
    href: "/programs#leadership-academy",
  },
  {
    id: "community-leadership-labs",
    title: "Community Leadership Labs",
    shortDescription:
      "Localised leadership incubators empowering youth to address community-specific challenges through collaborative action.",
    image: "/images/program-discussion.jpg.png",
    href: "/programs#community-leadership-labs",
  },
  {
    id: "women-leadership-initiative",
    title: "Women Leadership Initiative",
    shortDescription:
      "Dedicated programs supporting young women in developing leadership capabilities and civic participation.",
    image: "/images/program-speaking.jpg.png",
    href: "/programs#women-leadership",
  },
  {
    id: "civic-action-network",
    title: "Civic Action Network",
    shortDescription:
      "A network connecting young civic actors for coordinated community action and collective impact.",
    image: "/images/community-service.jpg.png",
    href: "/programs#civic-action-network",
  },
  {
    id: "research-fellowship",
    title: "Research Fellowship Program",
    shortDescription:
      "Supporting young researchers in conducting rigorous, policy-relevant research on civic and governance issues.",
    image: "/images/program-discussion.jpg.png",
    href: "/programs#research-fellowship",
  },
  {
    id: "civic-tech-fellowship",
    title: "Civic Technology Fellowship",
    shortDescription:
      "Training youth to leverage technology and digital tools for civic innovation and governance challenges.",
    image: "/images/workshop-event.jpg.png",
    href: "/programs#civic-tech-fellowship",
  },
  {
    id: "constitutional-literacy-campaign",
    title: "Constitutional Literacy Campaign",
    shortDescription:
      "National awareness campaigns promoting understanding of constitutional rights, duties and democratic principles.",
    image: "/images/program-classroom-jpg.png",
    href: "/programs#constitutional-literacy",
  },
  {
    id: "community-service-week",
    title: "Community Service Week",
    shortDescription:
      "Annual nationwide volunteer mobilization engaging thousands of youth in organized community service activities.",
    image: "/images/program-volunteering.jpg.png",
    href: "/programs#community-service-week",
  },
];

export const opportunities = [
  {
    id: "fellowship-2026",
    title: "Civic Leadership Fellowship 2026",
    type: "Fellowship",
    deadline: "Applications open soon",
    description:
      "Join the next cohort of the National Civic Leadership Fellowship. Develop civic knowledge, leadership skills and community impact experience.",
  },
  {
    id: "volunteer-recruitment",
    title: "Volunteer Recruitment Drive",
    type: "Volunteer",
    deadline: "Rolling",
    description:
      "Become a CYB volunteer and contribute to civic education, community engagement and youth development initiatives across Bangladesh.",
  },
  {
    id: "research-grants",
    title: "Youth Research Grants",
    type: "Grant",
    deadline: "TBA",
    description:
      "Apply for research grants to investigate civic participation, governance and youth development topics in your community.",
  },
  {
    id: "campus-chapter",
    title: "Start a Campus Chapter",
    type: "Leadership",
    deadline: "Open",
    description:
      "Establish a CYB chapter at your university or college and lead civic engagement initiatives on your campus.",
  },
  {
    id: "civic-tech-hackathon",
    title: "Civic Tech Hackathon",
    type: "Event",
    deadline: "Coming soon",
    description:
      "Participate in hackathons focused on developing technology solutions for civic and governance challenges.",
  },
];