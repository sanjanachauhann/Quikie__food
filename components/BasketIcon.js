import { View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { selectBasketTotal } from "../features/basketSlice";
import { selectBasketItems } from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);
  if (items.length === 0) return null;

  return (
    <View
      style={{ position: "absolute", bottom: 5, width: "100%", zIndex: 999 }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: "orange",
          height: 60,
          marginHorizontal: 10,
          borderRadius: 5,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("BasketScreen")}
      >
        <View
          style={{
            backgroundColor: "darkorange",
            height: 35,
            width: 35,
            alignItems: "center",
            borderRadius: 5,
          }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>{items.length}</Text>
        </View>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          View Basket <AntDesign name="arrowright" size={24} color="black" />
        </Text>
        <Text style={{ fontSize: 20, color: "white" }}>
          <FontAwesome name="rupee" size={19} color="white" /> {basketTotal}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
