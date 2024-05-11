import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FeaturedDishes = ({ title, rating, description, image }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Dish", {
          image: image,
          title: title,
          description: description,
        })
      }
    >
      <View
        style={{
          marginVertical: 10,
          backgroundColor: "white",
          width: 200,
          borderRadius: 20,
          overflow: "hidden", // Ensure border radius is applied to the image
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          paddingHorizontal: 5,
        }}
      >
        <ImageBackground
          source={{ uri: image }}
          style={{
            width: "100%",
            height: 150,
            justifyContent: "flex-end",
          }}
          resizeMode="cover"
        >
          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              paddingHorizontal: 10,
              paddingVertical: 5,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Entypo name="star" size={16} color="#f59e0b" />
            <Text style={{ color: "white", marginLeft: 5 }}>
              {rating || "N/A"}
            </Text>
          </View>
        </ImageBackground>
        <View style={{ padding: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {title.substring(0, 15)}
          </Text>
          <Text style={{ color: "gray", marginTop: 5 }}>
            {description.substring(0, 10)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FeaturedDishes;
