import {
  BoxProps,
  VariantProps,
  createBox,
  createRestyleComponent,
  createText,
  createVariant,
} from '@shopify/restyle';
import {ReactElement} from 'react';
import {StatusBar} from 'react-native';
import {Theme} from 'theme';

export const Box = createBox<Theme>();

export const ScreenContainer = ({
  children,
  ...props
}: BoxProps<Theme> & {children: ReactElement[] | ReactElement}) => (
  <Box
    p="m"
    style={{paddingTop: StatusBar.currentHeight, height: '100%'}}
    {...props}
  >
    {children}
  </Box>
);

export const Text = createText<Theme>();

export const Card = createRestyleComponent<
  VariantProps<Theme, 'cardVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([createVariant({themeKey: 'cardVariants'})], Box);
