import { View, Text, ImageBackground } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

const TitleCard = () => {
  const route = useRoute();
  const { imgUrl, title } = route.params;
  return (
    <View style={{ marginHorizontal: 5, marginTop: 5 }}>
      {/* title
       */}
      <View
        style={{
          height: 50,
          marginHorizontal: 5,
          backgroundColor: "white",
          borderRadius: 10,
          marginBottom: 5,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View style={{ paddingTop: 10, flexDirection: "row" }}>
          <ImageBackground
            source={imgUrl}
            style={{
              height: 40,
              width: 40,
              borderRadius: 5,
            }}
            resizeMode="cover"
          />

          <Text
            style={{
              fontSize: 23,
              fontWeight: 600,
              marginHorizontal: 10,
            }}
          >
            {title} Menu
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TitleCard;
