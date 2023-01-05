import {useState} from 'react';
import {Pressable, ScrollView} from 'react-native';
import {v4 as uuid} from 'uuid';
import {Box, Text} from './Themed';

type Content = {
  source: string;
  value: string | number;
};

type TabContainerProps = {
  contents: Content[][];
  headers: string[];
};

type TabHeaderProps = {
  currentTab: number;
  headers: string[];
  toggleCurrentTab: (idx: number) => void;
};

const TabHeader = ({currentTab, toggleCurrentTab, headers}: TabHeaderProps) => (
  <Box
    width="100%"
    flexDirection="row"
    mb="s"
    borderBottomColor="black"
    borderBottomWidth={1}
    bg="lightGray"
    borderTopLeftRadius="m"
    borderTopRightRadius="m"
  >
    {headers.map((header, idx) => (
      <Pressable onPress={() => toggleCurrentTab(idx)} key={uuid()}>
        <Box width="100%" p="s">
          <Text
            variant="subheader2"
            fontWeight={currentTab === idx ? '600' : '100'}
            textAlign="left"
            textTransform="uppercase"
          >
            {header}
          </Text>
        </Box>
      </Pressable>
    ))}
  </Box>
);

const TabContent = ({source, value}: Content) => (
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
        {source}
      </Text>
    </Box>
    <Box flexGrow={1}>
      <Text fontWeight="500" textAlign="right" textTransform="capitalize">
        {value}
      </Text>
    </Box>
  </Box>
);

export const TabContainer = ({contents, headers}: TabContainerProps) => {
  const [currentTab, setCurrentTab] = useState(0);

  const toggleCurrentTab = (idx: number) => setCurrentTab(idx);

  return (
    <ScrollView style={{maxHeight: 200}}>
      <Box width="100%">
        <TabHeader
          headers={headers}
          currentTab={currentTab}
          toggleCurrentTab={toggleCurrentTab}
        />
        <Box width="100%" flexGrow={1}>
          {contents[currentTab].map((content) => (
            <TabContent {...content} key={uuid()} />
          ))}
        </Box>
      </Box>
    </ScrollView>
  );
};
