import React from 'react';
import { View } from "react-native";
import { PaperProvider, Text } from "react-native-paper";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import {Text as GText} from "@gluestack-ui/themed";

const LargeComponent = () => {
  return (
    <View>
      <PaperProvider>
        <Text> Text from react-native-paper! </Text>
      </PaperProvider>
      <GluestackUIProvider config={config}>
        <GText>Hello World!</GText>
      </GluestackUIProvider>
    </View>
  );
};

export default LargeComponent;
