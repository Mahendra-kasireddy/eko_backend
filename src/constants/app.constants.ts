export const APP = {
  NAME: 'EKO Rider',
  TAGLINE: 'Deliver Green. Earn More.',
  VERSION: '1.0.0',
  SPLASH_DELAY: 2500,
  OTP_RESEND_SECONDS: 30,
  RIDE_REQUEST_TIMEOUT: 15,
};

export const TIER_THRESHOLDS = {
  BRONZE_MAX: 10,
  SILVER_MAX: 25,
};

export const TIER_LABELS = {
  bronze: 'Bronze Rider',
  silver: 'Silver Rider',
  gold: 'Gold Rider',
};

export const PLASTIC_POINTS_PER_KG = 50;

export const INCENTIVE_RATES = {
  bronze: 10,
  silver: 20,
  gold: 35,
};

export const ONBOARDING_SLIDES = [
  {
    id: '1',
    title: 'Deliver with Purpose',
    subtitle: 'Pick up eco-friendly groceries from partner stores and deliver across Hyderabad.',
    emoji: '🛵',
  },
  {
    id: '2',
    title: 'Collect Plastic. Save the Planet.',
    subtitle: 'At every delivery, collect plastic waste from customers and earn incentive bonuses.',
    emoji: '♻️',
  },
  {
    id: '3',
    title: 'Earn More. Rise Higher.',
    subtitle: 'Your monthly base salary + plastic bonus + ride earnings. Reach Gold tier for maximum rewards.',
    emoji: '💰',
  },
];
