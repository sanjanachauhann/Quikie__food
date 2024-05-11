import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-elements";

const generateRandomHexColor = () => {
  const red = Math.floor(Math.random() * 256); // Random value between 0 and 255
  const green = Math.floor(Math.random() * 256); // Random value between 0 and 255
  const blue = Math.floor(Math.random() * 256); // Random value between 0 and 255

  // Construct the hexadecimal color string
  const color = `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;

  return color;
};

const RestaurantCard = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  latitude,
  longitude,
  refrenceID,
}) => {
  let photoUrl;
  if (!!imgUrl) {
    const photoReference = imgUrl[0].photo_reference;
    const apiKey = process.env.EXPO_PUBLIC_API_KEY;
    // Constructing the URL to retrieve the photo
    photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${300}&photoreference=${photoReference}&key=${apiKey}`;
  }

  const navigation = useNavigation();
  const generateInitials = (title) => {
    // Split the title into words
    const words = title.split(" ");

    // Take the first character from each word and join them
    const initials = words.map((word) => word.charAt(0).toUpperCase()).join("");
    // Return the first two characters (or one if there's only one word)
    return initials.substring(0, 2);
  };
  // const image = faker.image.avatar();
  const randomColor = generateRandomHexColor();
  return (
    <>
      <TouchableOpacity
        style={{ marginHorizontal: 4 }}
        onPress={() =>
          navigation.navigate("Restaurant", {
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            latitude,
            longitude,
            refrenceID,
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
          }}
        >
          {!photoUrl ? (
            <View
              style={{
                backgroundColor: `${randomColor}`,
                width: 190,
                height: 150,
                borderRadius: 20,
                marginTop: 10,
                paddingTop: 10,
              }}
            >
              <Avatar
                size="large"
                title={generateInitials(title)}
                activeOpacity={0.7}
              />
              {rating ? (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backgroundColor: "#e2e8f0",
                    borderRadius: 20,
                    padding: 5,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Entypo name="star" size={16} color="#f59e0b" />
                  <Text style={{ fontWeight: "500", marginLeft: 3 }}>
                    {rating}
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backgroundColor: "white",
                    borderTopLeftRadius: 20,
                    padding: 5,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Entypo name="star" size={15} color="#a3a3a3" />
                  <Text style={{ fontSize: 9, marginLeft: 3 }}>
                    Not available
                  </Text>
                </View>
              )}
            </View>
          ) : (
            <ImageBackground
              source={{ uri: photoUrl }}
              style={{
                width: "100%",
                height: 150,
                justifyContent: "flex-end",
              }}
              resizeMode="cover"
            >
              {rating ? (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backgroundColor: "#e2e8f0",
                    borderRadius: 20,
                    padding: 5,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Entypo name="star" size={16} color="#f59e0b" />
                  <Text style={{ fontWeight: "500", marginLeft: 3 }}>
                    {rating}
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backgroundColor: "white",
                    borderTopLeftRadius: 20,
                    padding: 5,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Entypo name="star" size={15} color="#a3a3a3" />
                  <Text style={{ fontSize: 9, marginLeft: 3 }}>
                    Not available
                  </Text>
                </View>
              )}
            </ImageBackground>
          )}
          <View style={{ marginVertical: 5, padding: 5 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {title.charAt(0).toUpperCase() + title.slice(1, 20)}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
              }}
            >
              <EvilIcons name="location" size={24} color="black" />
              <Text style={{ color: "gray", marginTop: 5 }}>
                {address.charAt(0).toUpperCase() + address.slice(1, 20)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default RestaurantCard;
