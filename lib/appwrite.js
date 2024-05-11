import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";
import { Platform } from "react-native";
const client = new Client();

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_DATABASE_ID,
  userCollectionId: process.env.EXPO_PUBLIC_USER_COLLECTION_ID,
  pizzaCollectionId: process.env.EXPO_PUBLIC_PIZZA_COLLECTION_ID,
  menuCollectionId: process.env.EXPO_PUBLIC_MENU_COLLECTION_ID,
  bookmarkCollectionId: process.env.EXPO_PUBLIC_BOOKMARK_COLLECTION_ID,
  photosCollectionId: process.env.EXPO_PUBLIC_PHOTOS_COLLECTION_ID,
  storageId: process.env.EXPO_PUBLIC_STORAGE_ID,
  storageIDfilephoto: process.env.EXPO_PUBLIC_STORAGE_ID_FILE_PHOTO,
  latestVideoCollectionId: process.env.EXPO_PUBLIC_LATEST_COLLECTION_ID,
};

let platformID;
if (Platform.OS === "ios") {
  // Platform is iOS
  platformID = process.env.EXPO_PUBLIC_PLATFORM_IOS;
} else if (Platform.OS === "android") {
  // Platform is Android
  platformID = process.env.EXPO_PUBLIC_PLATFORM_ANDROID;
}

client
  .setEndpoint(appwriteConfig.endpoint) // Appwrite Endpoint
  .setProject(appwriteConfig.projectId) //  Project ID
  .setPlatform(platformID);

const databases = new Databases(client);

// Modify getAllPosts function to retrieve both photos and videos
export async function getAllMenuItems(collectionName) {
  const query = collectionName.title;
  const collectionID = appwriteConfig.pizzaCollectionId;
  try {
    const menu = await databases.listDocuments(
      appwriteConfig.databaseId,
      collectionID,
      [Query.equal("id", query)]
    );

    // Combine photos and videos into a single array
    const allPosts = [...menu.documents];
    return allPosts;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function getAllMenu() {
  try {
    const menu = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId,
      [Query.orderDesc("$createdAt")]
    );

    // Combine photos and videos into a single array
    const allPosts = [...menu.documents];
    return allPosts;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
export async function getMenu(category) {
  try {
    const menu = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId,
      [Query.equal("category", category)]
    );

    // Combine photos and videos into a single array
    const allPosts = [...menu.documents];
    return allPosts;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

// Get video posts that matches search query
export async function searchPosts({ query }) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.pizzaCollectionId,
      [Query.search("id", query)]
    );

    if (!posts) throw new Error("Something went wrong");

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}
