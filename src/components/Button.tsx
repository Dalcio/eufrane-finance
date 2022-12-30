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
import {Text} from './Themed';

const BaseButton = createBox<Theme, TouchableOpacityProps>(TouchableOpacity);

type Props = React.ComponentProps<typeof BaseButton> &
  ColorProps<Theme> & {
    label: string;
    isLoading?: boolean;
  };

export const Button = ({
  label,
  isLoading,
  color = 'secondaryText',
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
      borderRadius="s"
      backgroundColor={bgColor}
      minWidth={100}
      height={48}
      alignItems="center"
      justifyContent="center"
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
          color={theme.colors[textColorProp ?? 'secondaryText']}
        />
      ) : null}
    </BaseButton>
  );
};
