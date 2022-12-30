import {TextInputProps} from 'react-native';
import {Box, Text} from './Themed';
import {TextInput} from 'react-native';
import {useReducer} from 'react';
import {FontAwesome} from '@expo/vector-icons';
import {Pressable} from 'react-native';
import theme, {palette} from 'theme';

type InputProps = {
  label?: string;
} & TextInputProps;

export const Input = ({label, ...props}: InputProps) => {
  return (
    <Box minWidth="100%">
      {label && <Text mb="m">{label}</Text>}
      <TextInput
        style={{
          height: 56,
          borderColor: palette.black,
          borderWidth: 1,
          borderStyle: 'solid',
          borderRadius: theme.borderRadii.s,
          paddingLeft: theme.spacing.s,
          paddingRight: theme.spacing.s,
          fontSize: 15,
        }}
        underlineColorAndroid="white"
        {...props}
      />
    </Box>
  );
};

export const PasswordInput = ({label, ...props}: InputProps) => {
  const [show, toggleShow] = useReducer((isShawn) => !isShawn, false);

  return (
    <Box alignItems="flex-start">
      {label && <Text mb="m">{label}</Text>}
      <Box
        alignItems="center"
        borderStyle="solid"
        borderRadius="s"
        borderWidth={1}
        borderColor="black"
        minWidth="100%"
        minHeight={56}
        flexDirection="row"
        pr="s"
      >
        <TextInput
          underlineColorAndroid="white"
          secureTextEntry={show}
          style={{
            flexGrow: 1,
            height: '100%',
            fontSize: 15,
            paddingHorizontal: theme.spacing.s,
          }}
          {...props}
        />
        <Pressable onPress={toggleShow}>
          <FontAwesome
            name={(!show && 'eye-slash') || 'eye'}
            size={24}
            style={{opacity: 0.7}}
          />
        </Pressable>
      </Box>
    </Box>
  );
};
