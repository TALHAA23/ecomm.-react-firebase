import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "@firebase/storage";

export default async function uploadProductImage(fileInput) {
  // Check if a file is selected
  console.log(fileInput);
  const file = fileInput;
  const storage = getStorage();
  const storageRef = ref(storage, `products/${file.name}`);

  try {
    // Upload the file to Cloud Storage
    const uploadResult = await uploadBytes(storageRef, file);

    // Get the download URL for the uploaded image
    const downloadURL = await getDownloadURL(uploadResult.ref);
    return downloadURL; // Return the download URL
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Re-throw the error for handling in the calling component
  }
}
