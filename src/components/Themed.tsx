import {
  VariantProps,
  createBox,
  createRestyleComponent,
  createText,
  createVariant,
} from '@shopify/restyle';
import {Theme} from 'theme';

export const Box = createBox<Theme>();

export const Text = createText<Theme>();

export const Card = createRestyleComponent<
  VariantProps<Theme, 'cardVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([createVariant({themeKey: 'cardVariants'})], Box);
