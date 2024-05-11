import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { EvilIcons } from "@expo/vector-icons";

const SearchBarComponent = () => {
  const [query, setQuery] = useState("");
  const navigation = useNavigation();

  const handleSearch = () => {
    if (query.trim() !== "") {
      navigation.navigate("SearchResults", { query });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 15,
        height: 50,
        backgroundColor: "#ececec",
        borderRadius: 10,
        justifyContent: "center",
      }}
    >
      <TextInput
        style={{
          flex: 0.93,
          height: 40,
          paddingHorizontal: 10,
        }}
        placeholder="Search..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        onKeyPress={handleKeyPress}
      />
      <TouchableOpacity onPress={handleSearch}>
        <EvilIcons name="search" size={30} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBarComponent;
