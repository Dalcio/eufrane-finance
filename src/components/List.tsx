import {Box, Text} from './Themed';

type ListItemProps = {
  left: string;
  right: string | number;
};

export const ListItem = ({left, right}: ListItemProps) => (
  <Box
    width="100%"
    flexDirection="row"
    mt="s"
    borderBottomColor="black"
    borderBottomWidth={1}
    borderStyle="dashed"
  >
    <Box flexGrow={1}>
      <Text textAlign="left" textTransform="capitalize">
        {left}
      </Text>
    </Box>
    <Box flexGrow={1}>
      <Text fontWeight="500" textAlign="right" textTransform="capitalize">
        {right}
      </Text>
    </Box>
  </Box>
);

export const ListItemHeader = ({left, right}: ListItemProps) => (
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
