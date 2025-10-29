import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";

export type Category = {
  id: number;
  name: string;
  color: string;
};

interface Props {
  categories: Category[];
  selectedIds?: number[];
  onChange: (selectedIds: number[]) => void;
}

export default function CategoryMultiSelect({ categories, selectedIds = [], onChange }: Props) {
  const [selected, setSelected] = useState<number[]>(selectedIds);

  useEffect(() => {
    setSelected(selectedIds);
  }, [selectedIds]);

  const toggle = (id: number) => {
    const updated = selected.includes(id)
      ? selected.filter((s) => s !== id)
      : [...selected, id];
    setSelected(updated);
    onChange(updated);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Kategorije:</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {categories.map((cat) => {
          const isSelected = selected.includes(cat.id);
          const backgroundColor = isSelected
            ? darkenColor(cat.color, 0.2) // darker for selected
            : "transparent";
          const textColor = isSelected
            ? getContrastColor(cat.color)
            : cat.color;

          return (
            <Pressable
              key={cat.id}
              onPress={() => toggle(cat.id)}
              style={[
                styles.chip,
                {
                  borderColor: cat.color,
                  backgroundColor,
                },
              ]}
            >
              <Text style={[styles.chipText, { color: textColor }]}>
                {cat.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

// Darken a hex color by a fraction (0-1)
function darkenColor(hex: string, amount: number) {
  const clamp = (v: number) => Math.max(0, Math.min(255, v));
  const num = parseInt(hex.replace("#", ""), 16);
  const r = clamp(Math.floor(((num >> 16) & 0xff) * (1 - amount)));
  const g = clamp(Math.floor(((num >> 8) & 0xff) * (1 - amount)));
  const b = clamp(Math.floor((num & 0xff) * (1 - amount)));
  return `rgb(${r}, ${g}, ${b})`;
}

// Pick black or white text depending on background brightness
function getContrastColor(hex: string) {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = (num >> 16) & 0xff;
  const g = (num >> 8) & 0xff;
  const b = num & 0xff;
  // formula for luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#000" : "#fff"; // black text for light colors, white for dark
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 6,
  },
  scroll: {
    flexDirection: "row",
    gap: 8,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1.5,
  },
  chipText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
