export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
}

export const steps: HowItWorksStep[] = [
  {
    step: 1,
    title: "Create your account",
    description:
      "Enter your name, email, and set a password. We recommend using your own email address.",
  },
  {
    step: 2,
    title: "Verify your email",
    description: "Confirm your email address with a one time code sent straight to your inbox.",
  },
  {
    step: 3,
    title: "Add your establishment(s)",
    description:
      "Search for your existing business or register a new one. Add every branch, hotel, restaurant, lounge or bar you operate.",
  },
  {
    step: 4,
    title: "Get reviewed & licensed",
    description:
      "The Commission reviews your submission and issues your official license, you can track the status from your dashboard.",
  },
];
