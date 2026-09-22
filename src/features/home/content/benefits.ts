export interface Benefit {
  icon: "shield" | "eye" | "landmark" | "award" | "refresh" | "chart";
  title: string;
  description: string;
}

export const benefits: Benefit[] = [
  {
    icon: "shield",
    title: "Legal Compliance & Licensing",
    description:
      "Operating without registration puts your business at risk of closure and penalties. Registering brings your establishment into full compliance with state hospitality regulations.",
  },
  {
    icon: "eye",
    title: "Visibility to Tourists",
    description:
      "Licensed establishments are listed with the Commission and surfaced to the thousands of tourists and business travelers visiting Akwa Ibom every year.",
  },
  {
    icon: "landmark",
    title: "Access to Government Support",
    description:
      "Registered operators get priority consideration for state tourism grants, training programs, and infrastructure initiatives.",
  },
  {
    icon: "award",
    title: "Credibility & Trust",
    description:
      "A valid registration signals to guests, partners, and investors that your establishment meets the state's standards for safety and service quality.",
  },
  {
    icon: "refresh",
    title: "Simpler Renewals & Inspections",
    description:
      "Keep every branch, document, and licensing status in one dashboard. Renewals and compliance checks become a quick update instead of a scramble.",
  },
  {
    icon: "chart",
    title: "Better Data, Better Tourism Planning",
    description:
      "Accurate, up-to-date establishment data helps the Commission plan infrastructure and marketing that benefits every registered business.",
  },
];
