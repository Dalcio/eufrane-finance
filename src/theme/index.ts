import {createTheme} from '@shopify/restyle';

export const palette = {
  purple: '#5A31F4',
  blue: '#2200cc',
  blue100: '#432FBF',
  blue200: '#5E4ECB',
  white: '#FFF',
  black: '#111',
  darkGray: '#333',
  lightGray: '#888',
  red: '#dd0020',
};

const theme = createTheme({
  spacing: {
    xs: 8,
    s: 10,
    m: 16,
    l: 24,
  },
  colors: {
    white: palette.white,
    white10: '#F3F2FB',
    white200: '#E7EAFF',
    black: palette.black,
    blue: palette.blue,
    blue100: palette.blue100,
    blue200: palette.blue200,

    error: palette.red,
    lightGray: palette.lightGray,
    background: palette.purple,
    onBackground: palette.white,
    primaryText: palette.black,
    secondaryText: palette.white,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    header: {
      fontWeight: 'bold',
      fontSize: 34,
      lineHeight: 42.5,
      color: 'primaryText',
    },
    subheader: {
      fontWeight: '600',
      fontSize: 28,
      lineHeight: 36,
      color: 'primaryText',
    },
    subheader2: {
      fontWeight: '600',
      fontSize: 20,
      lineHeight: 30,
      color: 'primaryText',
    },
    defaults: {
      fontSize: 16,
      lineHeight: 24,
      color: 'primaryText',
    },
    buttonLabel: {
      fontSize: 14,
      lineHeight: 20,
      color: 'secondaryText',
    },
  },
  borderRadii: {
    0: 0,
    s: 5,
    m: 10,
    l: 16,
  },
  cardVariants: {
    defaults: {
      // We can define defaults for the variant here.
      // This will be applied after the defaults passed to createVariant and before the variant defined below.
    },
    regular: {
      // We can refer to other values in the theme here, and use responsive props
      padding: {
        phone: 's',
        tablet: 'm',
      },
    },
    elevated: {
      padding: {
        phone: 's',
        tablet: 'm',
      },
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: {width: 0, height: 5},
      shadowRadius: 15,
      elevation: 5,
    },
  },
});

export type Theme = typeof theme;

export default theme;
