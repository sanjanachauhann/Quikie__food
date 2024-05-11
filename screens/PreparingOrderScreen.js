import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

const PreparingOrderScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("EndScreen");
    }, 3000);
  }, []);
  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animatable.Image
        source={require("../assets/gify.webp")}
        animation="slideInUp"
        iterationCount={1}
        style={{ width: 200, height: 200, borderRadius: 10 }}
        resizeMode="contain"
      />
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        style={{ fontSize: 25, fontWeight: "bold", color: "#f97316" }}
        resizeMode="contain"
      >
        Your order is on its way!!
      </Animatable.Text>
      <Progress.Circle size={60} indeterminate={true} color="#f97316" />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
