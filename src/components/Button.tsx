import {
  ColorProps,
  createBox,
  useResponsiveProp,
  useTheme,
} from '@shopify/restyle';
import React from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {Theme, palette} from 'theme';
import {Text, TextProps} from './Themed';

const BaseButton = createBox<Theme, TouchableOpacityProps>(TouchableOpacity);

type SizeProps = 's' | 'm' | 'l';

type Props = React.ComponentProps<typeof BaseButton> &
  ColorProps<Theme> & {
    label: string;
    isLoading?: boolean;
    size?: SizeProps;
  };

const SIZES: {[key in SizeProps]: string} = {
  s: '50%',
  m: '80%',
  l: '100%',
};

export const Button = ({
  label,
  isLoading,
  color = 'secondaryText',
  size,
  ...props
}: Props) => {
  const theme = useTheme<Theme>();

  // Will be 'purple' on phone and 'blue' on tablet
  const textColorProp = useResponsiveProp(color);

  // Can safely perform logic with the extracted value
  const bgColor =
    textColorProp === 'primaryText' ? 'secondaryText' : 'primaryText';

  return (
    <BaseButton
      flexDirection="row"
      borderRadius="m"
      backgroundColor={isLoading || props.disabled ? 'lightGray' : bgColor}
      minWidth={100}
      width={(size && SIZES[size]) || undefined}
      height={56}
      alignItems="center"
      justifyContent="center"
      disabled={isLoading}
      {...props}
    >
      <Text
        variant="buttonLabel"
        textAlign="center"
        color={color}
        marginRight={isLoading ? 's' : undefined}
      >
        {label}
      </Text>
      {isLoading ? (
        <ActivityIndicator
          color={
            theme.colors[
              isLoading && props.disabled
                ? 'white'
                : textColorProp ?? 'secondaryText'
            ]
          }
        />
      ) : null}
    </BaseButton>
  );
};

type ButtonLinkProps = {
  cation: string;
  textProps?: TextProps;
} & TouchableOpacityProps;

export const ButtonLink = ({cation, textProps, ...props}: ButtonLinkProps) => (
  <TouchableOpacity {...props}>
    <Text content={cation} mt="m" color="blue" {...textProps} />
  </TouchableOpacity>
);
