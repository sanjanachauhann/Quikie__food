import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import useAppwrite from "../lib/useAppwrite";
import { searchPosts } from "../lib/appwrite";

const SearchResults = () => {
  const route = useRoute();
  const { query } = route.params;
  const { data: results } = useAppwrite(searchPosts, { query });

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: item.Image }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.details}>
        Quantity: {item.quantity}, Price: {item.price}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.resultContainer}>
        {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
            justifyContent: "space-around",
          }}
        > */}
        {/* <Text style={styles.title}>Search Results for: </Text>
          <Text style={{ fontSize: 18 }}>{query}</Text> */}
        {/* </View> */}
        {results.length === 0 ? (
          <View>
            <Text style={styles.noResults}>No results found for: {query}</Text>
            <Text style={{ alignSelf: "center", fontSize: 16 }}>
              {" "}
              Please try again later!!
            </Text>
          </View>
        ) : (
          <>
            <Text style={styles.title}>Search Results for: </Text>
            <Text style={{ fontSize: 18 }}>{query}</Text>
            <FlatList
              data={results}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ paddingBottom: 10 }}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 10,
  },
  resultContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 1,
  },
  query: {
    fontSize: 18,
    marginBottom: 10,
  },
  itemContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  details: {
    fontSize: 14,
  },
  noResults: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default SearchResults;
