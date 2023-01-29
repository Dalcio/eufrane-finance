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
  contents: Content[][];
  toggleCurrentTab: (idx: number) => void;
};

const TabHeader = ({
  currentTab,
  contents,
  toggleCurrentTab,
  headers,
}: TabHeaderProps) => (
  <Box
    width="100%"
    flexDirection="row"
    borderBottomColor="black"
    borderBottomWidth={1}
    bg="lightGray"
    borderTopLeftRadius="m"
    borderTopRightRadius="m"
  >
    {(contents[0].length && (
      <Pressable onPress={() => toggleCurrentTab(0)} key={uuid()}>
        <Box width="100%" p="s">
          <Text
            variant="subheader3"
            fontWeight={currentTab === 0 ? '600' : '100'}
            textAlign="left"
            textTransform="uppercase"
          >
            {headers[0]}
          </Text>
        </Box>
      </Pressable>
    )) || <Box />}

    {(contents[1].length && (
      <Pressable onPress={() => toggleCurrentTab(1)} key={uuid()}>
        <Box width="100%" p="s">
          <Text
            variant="subheader2"
            fontWeight={currentTab === 1 ? '600' : '100'}
            textAlign="left"
            textTransform="uppercase"
          >
            {headers[1]}
          </Text>
        </Box>
      </Pressable>
    )) || <Box />}
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
  const [currentTab, setCurrentTab] = useState(contents[0].length ? 0 : 1);

  const toggleCurrentTab = (idx: number) => setCurrentTab(idx);

  return (
    <Box width="100%" mb="l">
      <TabHeader
        headers={headers}
        currentTab={currentTab}
        contents={contents}
        toggleCurrentTab={toggleCurrentTab}
      />
      <Box
        width="100%"
        flexGrow={1}
        borderColor="black"
        borderWidth={1}
        borderTopWidth={0}
        borderBottomLeftRadius="m"
        borderBottomRightRadius="m"
        p="s"
      >
        <ScrollView style={{maxHeight: 200}}>
          {contents[currentTab].map((content) => (
            <TabContent {...content} key={uuid()} />
          ))}
        </ScrollView>
      </Box>
    </Box>
  );
};
