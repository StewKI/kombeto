import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text, ActivityIndicator, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import UploadService from "@/services/models/product/UploadService"; // adjust import path if needed

type ImagePickerFieldProps = {
  value?: string;
  onChange: (newUrl: string) => void;
  label?: string;
};

const ImagePickerField: React.FC<ImagePickerFieldProps> = ({ value, onChange, label }) => {
  const [imageUri, setImageUri] = useState<string | undefined>(value);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Please allow photo access to upload an image.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (result.canceled) return;

    const localUri = result.assets[0].uri;
    setUploading(true);

    try {
      // In React Native, construct a file-like object for Cloudinary
      const file = {
        uri: localUri,
        type: "image/jpeg", // or derive dynamically from result.assets[0].mimeType if needed
        name: "upload.jpg",
      } as any;

      const uploadedUrl = await UploadService.UploadImage(file);
      setImageUri(uploadedUrl);
      onChange(uploadedUrl);
    } catch (error) {
      console.error(error);
      Alert.alert("Upload failed", "There was an error uploading the image.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setImageUri(undefined);
    onChange("");
  };

  return (
    <View style={{ gap: 8 }}>
      {label && <Text style={{ fontWeight: "600", fontSize: 16 }}>{label}</Text>}

      {imageUri ? (
        <View style={{ alignItems: "center", gap: 8 }}>
          <Image
            source={{ uri: imageUri }}
            style={{ width: 160, height: 160, borderRadius: 12 }}
          />
          {uploading ? (
            <ActivityIndicator size="small" color="#007AFF" />
          ) : (
            <View style={{ flexDirection: "row", gap: 12 }}>
              <TouchableOpacity
                onPress={pickImage}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#007AFF",
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: 8,
                }}
              >
                <Ionicons name="reload" color="white" size={18} />
                <Text style={{ color: "white", marginLeft: 6 }}>Zameni</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={removeImage}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#eee",
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: 8,
                }}
              >
                <Ionicons name="trash-outline" color="#d33" size={18} />
                <Text style={{ color: "#d33", marginLeft: 6 }}>Ukloni</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : (
        <TouchableOpacity
          onPress={pickImage}
          disabled={uploading}
          style={{
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 2,
            borderColor: "#ccc",
            borderStyle: "dashed",
            borderRadius: 12,
            height: 160,
            backgroundColor: "#fafafa",
          }}
        >
          {uploading ? (
            <ActivityIndicator size="small" color="#007AFF" />
          ) : (
            <>
              <Ionicons name="cloud-upload-outline" size={40} color="#aaa" />
              <Text style={{ color: "#777", marginTop: 6 }}>Postavi sliku</Text>
            </>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ImagePickerField;
