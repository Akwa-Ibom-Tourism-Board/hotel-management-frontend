import onePortalImg from "@/assets/hero-one-portal.webp";
import boardLogoImg from "@/assets/akhtdc-new-logo-no-bg.png";
import governorImg from "@/assets/governor.webp";
import stateLogoImg from "@/assets/akwa-ibom-logo-main.png";
import manageBranchesImg from "@/assets/hero-manage-branches.webp";

export interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaTo?: string;
  objectFit?: "contain" | "cover";
  objectPosition?: string;
}

export const heroSlides: HeroSlide[] = [
  {
    image: onePortalImg,
    title: "One Portal for Every Hotel, Restaurant, Lounge & Bar in Akwa Ibom",
    subtitle:
      "Register your hospitality establishment with the Akwa Ibom State Hotels and Tourism Development Commission, get licensed, get recognized, get discovered.",
    ctaLabel: "Register Now",
    ctaTo: "/register",
    objectFit: "cover",
  },
  {
    image: boardLogoImg,
    title:
      "Welcome to the Akwa Ibom State Hotels and Tourism Development Commission",
    subtitle:
      "The Commission is the state's official body for licensing and supporting hotels, restaurants, lounges and bars across all thirty one local government areas.",
    ctaLabel: "See How It Works",
    ctaTo: "/#how-it-works",
  },
  {
    image: governorImg,
    title: "Backed by the Leadership of Akwa Ibom State",
    subtitle:
      "Under the leadership of the Akwa Ibom State Government, the Commission continues to drive reforms that make hospitality registration simple, transparent and accountable.",
    ctaLabel: "Start Registration",
    ctaTo: "/register",
    objectFit: "cover",
    objectPosition: "center top",
  },
  {
    image: stateLogoImg,
    title: "An Initiative of the Akwa Ibom State Government",
    subtitle:
      "Registered establishments gain credibility, priority access to tourism programs, and visibility to the thousands of visitors exploring the Land of Promise.",
    ctaLabel: "See How It Works",
    ctaTo: "/#how-it-works",
  },
  {
    image: manageBranchesImg,
    title: "Manage Every Branch From One Dashboard",
    subtitle:
      "Own multiple locations? Add and manage every branch of your establishment from a single, secure owner dashboard built for hospitality operators.",
    ctaLabel: "Create an Account",
    ctaTo: "/register",
    objectFit: "cover",
  },
];
