/**
 * Font utility classes for easy font family switching in components
 * 
 * Usage:
 * import { fonts } from '@/utils/fonts';
 * <h1 className={fonts.montserrat}>Title with Montserrat</h1>
 */

export const fonts = {
  // Default font (Inter) - already applied globally
  inter: 'font-sans',
  
  // Alternative fonts for specific components
  montserrat: 'font-montserrat',
  poppins: 'font-poppins',
  roboto: 'font-roboto',
  segoe: 'font-segoe',
  caslon: 'font-caslon',
  avenir: 'font-avenir',
} as const;

export type FontFamily = keyof typeof fonts;
