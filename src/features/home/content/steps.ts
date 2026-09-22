export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
}

export const steps: HowItWorksStep[] = [
  {
    step: 1,
    title: "Verify with your NIN",
    description:
      "Enter your National Identification Number. We securely fetch and confirm your details in seconds.",
  },
  {
    step: 2,
    title: "Create your account",
    description:
      "Confirm your details, set an email and password, and verify your email with a one time code.",
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
