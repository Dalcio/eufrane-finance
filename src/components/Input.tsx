import {Pressable, TextInput, TextInputProps, StyleSheet} from 'react-native';
import {useReducer} from 'react';
import {FontAwesome} from '@expo/vector-icons';
import theme, {palette} from 'theme';

import {Box, BoxProps, Text} from './Themed';

type InputProps = {
  label?: string;
  boxProps?: BoxProps;
  inputContainer?: BoxProps;
  error?: string;
} & TextInputProps;

export const Input = ({
  label,
  boxProps,
  error,
  inputContainer,
  ...props
}: InputProps) => {
  return (
    <Box minWidth="100%" mt="m" {...boxProps}>
      {(label && <Text mb="m" textTransform="uppercase" content={label} />) ||
        null}
      <Box
        alignItems="center"
        borderStyle="solid"
        borderRadius="m"
        borderWidth={1}
        borderColor={(error && 'error') || 'black'}
        minWidth="100%"
        minHeight={56}
        flexDirection="row"
        pr="s"
        {...inputContainer}
      >
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          {...props}
        />
      </Box>
      {(error && (
        <Text variant="buttonLabel" mt="s" color="error" content={error} />
      )) ||
        null}
    </Box>
  );
};

export const PasswordInput = ({
  label,
  boxProps,
  error,
  inputContainer,
  ...props
}: InputProps) => {
  const [show, toggleShow] = useReducer((isShawn) => !isShawn, true);

  return (
    <Box alignItems="flex-start" mt="m" {...boxProps} width="100%">
      {(label && <Text mb="m" textTransform="uppercase" content={label} />) ||
        null}
      <Box
        alignItems="center"
        borderStyle="solid"
        borderRadius="m"
        borderWidth={1}
        borderColor={(error && 'error') || 'black'}
        minWidth="100%"
        minHeight={56}
        flexDirection="row"
        pr="s"
        position="relative"
        {...inputContainer}
      >
        <TextInput
          style={[
            styles.input,
            {
              paddingRight: theme.spacing.s + 24,
            },
          ]}
          underlineColorAndroid="transparent"
          secureTextEntry={show}
          {...props}
        />
        <Pressable
          onPress={toggleShow}
          style={{position: 'absolute', right: theme.spacing.s}}
        >
          <FontAwesome
            name={(!show && 'eye-slash') || 'eye'}
            size={24}
            style={{opacity: 0.7}}
          />
        </Pressable>
      </Box>
      {(error && (
        <Text variant="buttonLabel" mt="s" color="error" content={error} />
      )) ||
        null}
    </Box>
  );
};

const styles = StyleSheet.create({
  input: {
    flexGrow: 1,
    height: 56,
    borderColor: palette.white,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: theme.borderRadii.s,
    paddingLeft: theme.spacing.s,
    paddingRight: theme.spacing.s,
    fontSize: 15,
  },
});
