import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";

type PriceInputProps = {
  value: number;
  onChange: (newPrice: number) => void;
  label?: string;
};

const PriceInput: React.FC<PriceInputProps> = ({ value, onChange, label }) => {
  const [text, setText] = useState(value > 0 ? value.toFixed(2) : "");

  const handleChange = (input: string) => {
    // Replace comma with dot for consistency
    let sanitized = input.replace(",", ".");

    // Allow only digits and one dot
    sanitized = sanitized.replace(/[^0-9.]/g, "");

    // Prevent multiple dots
    const parts = sanitized.split(".");
    if (parts.length > 2) {
      sanitized = parts[0] + "." + parts[1];
    }

    // Limit to two decimals
    if (parts[1]?.length > 2) {
      sanitized = parts[0] + "." + parts[1].slice(0, 2);
    }

    setText(sanitized);

    // Parse to number or 0 if invalid
    const parsed = parseFloat(sanitized);
    onChange(isNaN(parsed) ? 0 : parsed);
  };

  const handleBlur = () => {
    // Normalize format to 2 decimals when leaving input
    const parsed = parseFloat(text);
    if (!isNaN(parsed)) {
      const formatted = parsed.toFixed(2);
      setText(formatted);
      onChange(parsed);
    }
  };

  return (
    <View style={{ gap: 6 }}>
      {label && <Text style={{ fontWeight: "600", fontSize: 16 }}>{label}</Text>}

      <TextInput
        value={text}
        onChangeText={handleChange}
        onBlur={handleBlur}
        keyboardType="decimal-pad"
        placeholder="0,00"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          paddingHorizontal: 10,
          paddingVertical: 8,
          fontSize: 16,
        }}
      />
    </View>
  );
};

export default PriceInput;
