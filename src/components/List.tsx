import {MaterialIcons} from '@expo/vector-icons';
import {TouchableOpacity} from 'react-native';
import {Box, Text} from './Themed';

type ListItemProps = {
  left: string;
  right: string | number;
  onRemove: () => void;
};

export const ListItem = ({left, right, onRemove}: ListItemProps) => (
  <Box
    width="100%"
    flexDirection="row"
    mt="s"
    borderBottomColor="black"
    borderBottomWidth={1}
    borderStyle="dashed"
    alignItems="center"
  >
    <Box flexGrow={1}>
      <Text textAlign="left" textTransform="capitalize">
        {left}
      </Text>
    </Box>
    <Box flexGrow={1} mr="m">
      <Text fontWeight="500" textAlign="right" textTransform="capitalize">
        {right}
      </Text>
    </Box>
    <TouchableOpacity onPress={onRemove}>
      <MaterialIcons name="delete" color="red" size={18} />
    </TouchableOpacity>
  </Box>
);

export const ListItemHeader = ({
  left,
  right,
}: Omit<ListItemProps, 'onRemove'>) => (
  <Box width="100%" flexDirection="row" mb="s">
    <Box flexGrow={1}>
      <Text variant="subheader2" textAlign="left" textTransform="uppercase">
        {left}
      </Text>
    </Box>
    <Box flexGrow={1}>
      <Text variant="subheader2" textAlign="right" textTransform="uppercase">
        {right}
      </Text>
    </Box>
  </Box>
);
