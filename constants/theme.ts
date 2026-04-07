// theme.ts
import { Platform } from 'react-native';
import {useThemeContext} from "@/context/ThemeContext";

/** -----------------------------
 * COLORS
 * ----------------------------- */
export const Colors = {
  light: {
    background: '#141414',
    surface: '#181818',
    backgroundSecondary: '#282828',
    backgroundBorder: '#202020',
    backgroundTertiary: '#1D1D1D',
    backgroundDark: '#121212',
    backgroundDarker: '#101010',
    text: '#f5f5f5',
    textGray: '#7F7F7F',
    textDark: '#070707',
    textSecondary: '#B3B3B3',
    textSecondaryDark: '#373737',
    textRed: '#FF3C3C',
    textYellow: '#ffc83c',
    textGreen: '#07DF7C',
    white: '#f5f5f5',
    selectHoverBlue: '#3A94C7',
    redDark: 'rgba(43, 18, 18, 0.4)',
    redBorder: 'rgba(255, 60, 60, 0.3)',
    redDarkHover: 'rgba(43, 18, 18, 1)',
    redBorderHover: 'rgba(255, 60, 60, 0.5)',
    yellowDark: 'rgba(43, 40, 18, 0.4)',
    yellowBorder: 'rgba(255, 200, 60, 0.3)',
    yellowDarkHover: 'rgba(43, 40, 18, 1)',
    yellowBorderHover: 'rgba(255, 200, 60, 0.5)',
    glassBackground: 'rgba(255, 255, 255, 0.05)',
    glassBackgroundHover: 'rgba(255, 255, 255, 0.1)',
    glassBorder: 'rgba(255, 255, 255, 0.2)',
    glassBorderHover: 'rgba(255, 255, 255, 0.3)',
  },
  dark: {
    background: '#141414',
    surface: '#181818',
    backgroundSecondary: '#282828',
    backgroundBorder: '#202020',
    backgroundDark: '#121212',
    backgroundDarker: '#101010',
    text: '#f5f5f5',
    textSecondary: '#B3B3B3',
    textGray: '#666666',
    glassBackground: 'rgba(16, 16, 16, 0.5)',
    glassBackgroundHover: 'rgba(255, 255, 255, 0.1)',
    glassBorder: '#282828',
  },
};

/** -----------------------------
 * SPACING
 * ----------------------------- */
export const Spacing = {
  4: 4,
  8: 8,
  12: 12,
  14: 14,
  16: 16,
  20: 20,
  24: 24,
  28: 28,
  32: 32,
  36: 36,
  40: 40,
  42: 42,
  48: 48,
  64: 64,
  96: 96,
  128: 128,
};

/** -----------------------------
 * TEXT SIZES
 * ----------------------------- */
export const TextSizes = {
  10: 10,
  12: 12,
  14: 14,
  16: 16,
  18: 18,
  20: 20,
  24: 24,
  28: 28,
  30: 30,
  32: 32,
  36: 36,
  42: 42,
  48: 48,
  64: 64,
  80: 80,
  96: 96,
  112: 112,
  128: 128,
};

/** -----------------------------
 * RADIUS
 * ----------------------------- */
export const Radius = {
  4: 4,
  8: 8,
  10: 10,
  12: 12,
  16: 16,
  20: 20,
  24: 24,
  30: 30,
  40: 40,
  128: 128,
  full: 9999,
};

/** -----------------------------
 * FONTS
 * ----------------------------- */
export const Fonts = Platform.select({
  ios: {
    poppins: 'Poppins',
    quinn: 'QuinnFont',
  },
  android: {
    poppins: 'Poppins',
    quinn: 'QuinnFont',
  },
  web: {
    poppins: "Poppins, system-ui, -apple-system",
    quinn: "QuinnFont, system-ui",
  },
  default: {
    poppins: 'Poppins',
    quinn: 'QuinnFont',
  },
});

/** -----------------------------
 * GLASS HELPER
 * ----------------------------- */
export const getGlassStyle = (colorScheme: 'light' | 'dark') => ({
  backgroundColor:
      colorScheme === 'light'
          ? Colors.light.glassBackground
          : Colors.dark.glassBackground,
  borderColor:
      colorScheme === 'light'
          ? Colors.light.glassBorder
          : Colors.dark.glassBorder,
  borderWidth: 1,
  borderRadius: Radius[40],
});

/** -----------------------------
 * HOOK POUR COLOR SCHEME
 * ----------------------------- */
export const useTheme = () => {
  const { theme } = useThemeContext();

  return {
    colors: theme === 'dark' ? Colors.dark : Colors.light,
    spacing: Spacing,
    textSizes: TextSizes,
    radius: Radius,
    fonts: Fonts,
    glass: getGlassStyle(theme === 'dark' ? 'dark' : 'light'),
  };
};