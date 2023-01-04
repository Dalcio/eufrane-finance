import {
  BoxProps as DefaultBoxProps,
  TextProps as DefaultTextProps,
  VariantProps,
  createBox,
  createRestyleComponent,
  createText,
  createVariant,
} from '@shopify/restyle';
import {layout} from 'constants/Layout';
import {ReactElement, FC} from 'react';
import {ScrollView, StatusBar} from 'react-native';
import {Theme} from 'theme';

export const Box = createBox<Theme>();
export type BoxProps = DefaultBoxProps<Theme>;

export const ScreenContainer = ({
  children,
  ...props
}: BoxProps & {children: ReactElement[] | ReactElement | null}) => (
  <ScrollView>
    <Box
      p="m"
      bg="white"
      style={{paddingTop: StatusBar.currentHeight}}
      {...props}
      minHeight={layout.window.height}
    >
      {children}
    </Box>
  </ScrollView>
);

const DefaultText = createText<Theme>();
export type TextProps = DefaultTextProps<Theme>;

export const Text: FC<TextProps & {content?: string}> = ({
  content,
  children,
  ...props
}) => <DefaultText {...props}>{content ?? children}</DefaultText>;

export const Card = createRestyleComponent<
  VariantProps<Theme, 'cardVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([createVariant({themeKey: 'cardVariants'})], Box);
