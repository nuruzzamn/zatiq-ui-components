import type { FC } from 'react';
import { Hero1, Hero2, Hero3, Hero4 } from './Hero';
import { Navbar1, Navbar2, Navbar3, Navbar4 } from './Navbar';
import { Category1, Category2, Category3, Category4 } from './Category';
import { ProductCards1, ProductCards2, ProductCards3, ProductCards4, ProductCards5, ProductCards6, ProductCards7, ProductCards8 } from './ProductCards';
import { Footers1, Footers2 } from './Footers';
import { Reviews1, Reviews2, Reviews3 } from './Reviews';
import { Brands1, Brands2, Brands3 } from './Brands';
import { SpecialOffersSlider1, SpecialOffersSlider2, SpecialOffersSlider3, SpecialOffersSlider4, SpecialOffersSlider5 } from './SpecialOffersSlider';
import { Badges1, Badges2, Badges3 } from './Badges';
import { AnnouncementBar1, AnnouncementBar2, AnnouncementBar3 } from './AnnouncementBar';
import Category5 from './Category/Category5';
import Category6 from './Category/Category6';
import { StaticBanner1, StaticBanner2, StaticBanner3, StaticBanner4 } from './StaticBanner';
import { PaymentStatus1, PaymentStatus2 } from './PaymentStatus';

type ComponentMap = {
  [key: string]: {
    [key: string]: FC;
  };
};

export const componentRegistry: ComponentMap = {
  AnnouncementBars: {
    'AnnouncementBar 1': AnnouncementBar1,
    'AnnouncementBar 2': AnnouncementBar2,
    'AnnouncementBar 3': AnnouncementBar3,
  },
  Hero: {
    'Hero 1': Hero1,
    'Hero 2': Hero2,
    'Hero 3': Hero3,
    'Hero 4': Hero4,
  },
  StaticBanner: {
    'StaticBanner 1': StaticBanner1,
    'StaticBanner 2': StaticBanner2,
    'StaticBanner 3': StaticBanner3,
    'StaticBanner 4': StaticBanner4,
  },
  Navbar: {
    'Navbar 1': Navbar1,
    'Navbar 2': Navbar2,
    'Navbar 3': Navbar3,
    'Navbar 4': Navbar4,
  },
  Category: {
    'Category 1': Category1,
    'Category 2': Category2,
    'Category 3': Category3,
    'Category 4': Category4,
    'Category 5': Category5,
    'Category 6': Category6,
  },
  ProductCards: {
    'ProductCards 1': ProductCards1,
    'ProductCards 2': ProductCards2,
    'ProductCards 3': ProductCards3,
    'ProductCards 4': ProductCards4,
    'ProductCards 5': ProductCards5,
    'ProductCards 6': ProductCards6,
    'ProductCards 7': ProductCards7,
    'ProductCards 8': ProductCards8,
  },
  Footers: {
    'Footers 1': Footers1,
    'Footers 2': Footers2,
  },
  Reviews: {
    'Reviews 1': Reviews1,
    'Reviews 2': Reviews2,
    'Reviews 3': Reviews3,
  },
  Brands: {
    'Brands 1': Brands1,
    'Brands 2': Brands2,
    'Brands 3': Brands3,
  },
  SpecialOffersSlider: {
    'SpecialOffersSlider 1': SpecialOffersSlider1,
    'SpecialOffersSlider 2': SpecialOffersSlider2,
    'SpecialOffersSlider 3': SpecialOffersSlider3,
    'SpecialOffersSlider 4': SpecialOffersSlider4,
    'SpecialOffersSlider 5': SpecialOffersSlider5,
  },
  Badges: {
    'Badges 1': Badges1,
    'Badges 2': Badges2,
    'Badges 3': Badges3,
  },
  PaymentStatus: {
    'PaymentStatus 1': PaymentStatus1,
    'PaymentStatus 2': PaymentStatus2,
  },
};

export const getComponent = (category: string, componentName: string): FC | null => {
  return componentRegistry[category]?.[componentName] || null;
};
