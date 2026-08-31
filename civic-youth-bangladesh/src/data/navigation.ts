import { NavigationItem } from "@/types";

export const navigation: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "Who We Are", href: "/about#who-we-are" },
      { label: "Vision & Mission", href: "/about#vision-mission" },
      { label: "Our Values", href: "/about#values" },
      { label: "Governance", href: "/about#governance" },
      { label: "Team", href: "/about#team" },
    ],
  },
  {
    label: "Themes",
    href: "/thematic-areas",
  },
  {
    label: "Our Programs",
    href: "/programs",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Impact",
    href: "/impact",
  },
  {
    label: "Get Involved",
    href: "/get-involved",
    children: [
      { label: "Become a Member", href: "/get-involved#member" },
      { label: "Volunteer", href: "/get-involved#volunteer" },
      { label: "Partner With Us", href: "/get-involved#partner" },
      { label: "Donate", href: "/get-involved#donate" },
      { label: "Check Application Status", href: "/application-status" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const ctaButton = {
  label: "JOIN CYB",
  href: "/get-involved",
};