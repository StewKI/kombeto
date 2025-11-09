import { useState } from "react";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { Pressable, View, Modal } from "react-native";
import ColorPicker from "react-native-wheel-color-picker";

interface InputColorFieldLabelProps {
  label: string;
  value?: string; // e.g. "#RRGGBB"
  onChange?: (val: string) => void;
}

export function InputColorFieldLabel({
                                       label,
                                       value,
                                       onChange,
                                     }: InputColorFieldLabelProps) {
  const [color, setColor] = useState(value || "#000000");
  const [showPicker, setShowPicker] = useState(false);

  const handleColorChange = (newColor: string) => {
    const formatted = newColor.startsWith("#")
      ? newColor.substring(0, 7)
      : `#${newColor.substring(0, 6)}`;
    setColor(formatted);
    onChange?.(formatted);
  };

  return (
    <>
      <HStack className="justify-between align-middle gap-5">
        <Text size="xl" bold className="align-middle">
          {label}:
        </Text>

        <Pressable
          onPress={() => setShowPicker(true)}
          style={{
            flexGrow: 1,
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            borderRadius: 4,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text>{color}</Text>
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 4,
              backgroundColor: color,
              borderWidth: 1,
              borderColor: "#aaa",
            }}
          />
        </Pressable>
      </HStack>

      <Modal visible={showPicker} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.6)",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 12,
              padding: 20,
              width: "90%",
              alignItems: "center",
            }}
          >
            <Text size="xl" bold>
              Izaberi boju
            </Text>

            <View style={{ width: "100%", height: 320, marginVertical: 20 }}>
              <ColorPicker
                color={color}
                onColorChangeComplete={handleColorChange}
                thumbSize={30}
                sliderSize={30}
                noSnap={true}
                row={false}
              />
            </View>

            <Pressable
              onPress={() => setShowPicker(false)}
              style={{
                marginTop: 10,
                backgroundColor: "#007AFF",
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 6,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Gotovo</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}
