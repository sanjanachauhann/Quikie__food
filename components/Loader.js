import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const Loader = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#fb923c" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loader;