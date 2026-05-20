export enum ProductKey {
  SoulBody = 'soul_body',
  Research = 'research',
  Scouting = 'scouting',
  BookPreorder = 'book_preorder',
}

export enum ProductCategory {
  ProfessionalServices = 'Professional Services',
}

export enum StripePriceEnvKey {
  SoulBody = 'STRIPE_PRICE_SOUL_BODY',
  Research = 'STRIPE_PRICE_RESEARCH',
  Scouting = 'STRIPE_PRICE_SCOUTING',
  BookPreorder = 'STRIPE_PRICE_BOOK_PREORDER',
}

export interface Product {
  key: ProductKey;
  title: string;
  description: string;
  priceCents: number;
  currency: 'USD' | 'KES' | string;
  icon: string;
  feature: string;
  highlight?: string;
  category: ProductCategory;
  releaseDate: string;
  updatedDate: string;
  stripePriceEnvKey: StripePriceEnvKey;
}

export interface CheckoutPayload {
  items: ProductKey[];
  email?: string;
}

export interface ApiResponse<T> {
  data?: T;
  url?: string;
  error?: string;
  code?: number;
}

export const DEFAULT_SELECTED_ITEMS: ProductKey[] = [ProductKey.SoulBody];

export const PAGE_COPY = {
  limitedCohorts: 'LIMITED COHORTS',
  heading: 'Begin Your Transformation',
  subheading:
    'Choose the programs that resonate with your journey. Every offering is designed to create lasting impact.',
  successMessage: '✅ Thank you! Your payment was successful.',
  cancelMessage: 'Payment was canceled. You can try again below.',
  selectYourPath: 'Select Your Path',
  investmentTitle: 'Total Investment',
  noProgramsSelectedYet: 'No programs selected yet',
  checkoutButton: 'Complete Enrollment – Pay Now',
  loadingText: 'Creating Secure Checkout...',
  noSelectionError: 'Please select at least one offering.',
  paymentNote: 'One-time payment • Secure checkout',
};

export const PRODUCTS: Record<ProductKey, Product> = {
  [ProductKey.SoulBody]: {
    key: ProductKey.SoulBody,
    title: 'Soul & Body Wellness',
    description:
      'A transformative 8-week holistic program integrating clinical wellness practices with deep spiritual restoration.',
    priceCents: 29900,
    currency: 'USD',
    icon: '🌿',
    feature: 'Immersive Program',
    highlight: 'Most Popular',
    category: ProductCategory.ProfessionalServices,
    releaseDate: 'May 17',
    updatedDate: 'May 17',
    stripePriceEnvKey: StripePriceEnvKey.SoulBody,
  },
  [ProductKey.Research]: {
    key: ProductKey.Research,
    title: 'Global Islamic Research Ethical',
    description:
      'A rigorous research program designed to cultivate ethical leadership and meaningful community impact through faith-informed inquiry.',
    priceCents: 500000,
    currency: 'USD',
    icon: '📖',
    feature: 'Advanced Program',
    category: ProductCategory.ProfessionalServices,
    releaseDate: 'May 17',
    updatedDate: 'May 17',
    stripePriceEnvKey: StripePriceEnvKey.Research,
  },
  [ProductKey.Scouting]: {
    key: ProductKey.Scouting,
    title: 'Scouting Movement – Islamic Perspective',
    description:
      'Develop principled leadership, character, and service through a faith-centered scouting experience.',
    priceCents: 19000,
    currency: 'USD',
    icon: '🪵',
    feature: 'Leadership Program',
    category: ProductCategory.ProfessionalServices,
    releaseDate: 'May 17',
    updatedDate: 'May 17',
    stripePriceEnvKey: StripePriceEnvKey.Scouting,
  },
  [ProductKey.BookPreorder]: {
    key: ProductKey.BookPreorder,
    title: 'Book Preorder',
    description:
      'Get the limited launch edition of "My Life with the Deep State" — signed copy with early access.',
    priceCents: 2000,
    currency: 'USD',
    icon: '📘',
    feature: 'Book',
    category: ProductCategory.ProfessionalServices,
    releaseDate: 'May 17',
    updatedDate: 'May 17',
    stripePriceEnvKey: StripePriceEnvKey.BookPreorder,
  },
};

export const PRODUCT_LIST: Product[] = [
  PRODUCTS[ProductKey.SoulBody],
  PRODUCTS[ProductKey.Research],
  PRODUCTS[ProductKey.Scouting],
  PRODUCTS[ProductKey.BookPreorder],
];
