import axios from "axios";

export const PlacePhoto = async ({ photoReference }) => {
  const YOUR_API_KEY = process.env.EXPO_PUBLIC_API_KEY; // Replace with your actual API key
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoReference}&maxwidth=${150}&maxheight=${100}&key=${YOUR_API_KEY}`
    );
    setPhotoUrl(response.request.responseURL);
  } catch (error) {
    console.error(error);
  }
  return photoUrl; // Return photoUrl directly
};
