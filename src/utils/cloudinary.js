const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "mjk3zr3x"); // Replace with your upload preset
  formData.append("cloud_name", "djtjlvuvb");
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/djtjlvuvb/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};

export default uploadToCloudinary;
