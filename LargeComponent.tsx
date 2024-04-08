import React from 'react';
import { View } from "react-native";
import { PaperProvider, Text } from "react-native-paper";

const LargeComponent = () => {
  return (
    <View>
      <PaperProvider>
        <Text> Text from react-native-paper! </Text>
      </PaperProvider>
    </View>
  );
};

export default LargeComponent;
