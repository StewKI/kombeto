import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type VariationsInputProps = {
  value: string; // "var1~var2~var3"
  onChange: (newValue: string) => void;
};

const VariationsInput: React.FC<VariationsInputProps> = ({ value, onChange }) => {
  const [variations, setVariations] = useState<string[]>(
    value ? value.split("~") : []
  );

  const updateParent = (newList: string[]) => {
    setVariations(newList);
    onChange(newList.join("~"));
  };

  const addVariation = () => {
    updateParent([...variations, ""]);
  };

  const removeVariation = (index: number) => {
    const updated = variations.filter((_, i) => i !== index);
    updateParent(updated);
  };

  const editVariation = (index: number, text: string) => {
    const updated = [...variations];
    updated[index] = text;
    updateParent(updated);
  };

  return (
    <View style={{ gap: 8 }}>
      <Text style={{ fontWeight: "600", fontSize: 18, color: "#555" }}>Varijacije:</Text>

      <FlatList
        data={variations}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              marginBottom: 6,
            }}
          >
            <TextInput
              value={item}
              onChangeText={(text) => editVariation(index, text)}
              placeholder={`Varijacija ${index + 1}`}
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                paddingHorizontal: 10,
                paddingVertical: 6,
              }}
            />
            <TouchableOpacity
              onPress={() => removeVariation(index)}
              style={{
                backgroundColor: "#eee",
                borderRadius: 8,
                padding: 6,
              }}
            >
              <Ionicons name="trash-outline" size={18} color="#d33" />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        onPress={addVariation}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 8,
          backgroundColor: "#007AFF",
          borderRadius: 8,
        }}
      >
        <Ionicons name="add-circle-outline" size={20} color="white" />
        <Text style={{ color: "white", marginLeft: 6 }}>Dodaj varijaciju</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VariationsInput;
