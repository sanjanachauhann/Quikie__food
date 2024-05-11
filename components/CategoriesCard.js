import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const CategoriesCard = ({ id, imgUrl, title }) => {
  const navigation = useNavigation();
  const navigateToMenus = () => {
    navigation.navigate("Menus", { id, imgUrl, title });
  };
  return (
    <>
      {/* <BasketIcon /> */}
      <TouchableOpacity
        style={{ flex: 0.7, padding: 0.2 }}
        onPress={() => navigateToMenus()}
      >
        <View style={{ marginHorizontal: 1 }}>
          <ImageBackground
            source={imgUrl}
            style={{
              height: 80,
              width: 80,
              borderRadius: 10,
            }}
            resizeMode="cover"
          ></ImageBackground>
          <Text style={{ color: "black", fontWeight: "bold" }}>{title}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default CategoriesCard;
