import { useState } from "react";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { Pressable, Platform, View, Button } from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";

interface InputDateTimeFieldLabelProps {
  label: string;
  value?: string; // ISO string | undefined
  onChange?: (val: string | undefined) => void;
}

export function InputDateTimeFieldLabel({
                                          label,
                                          value,
                                          onChange,
                                        }: InputDateTimeFieldLabelProps) {
  const [date, setDate] = useState<Date | undefined>(
    value ? new Date(value) : undefined
  );
  const [show, setShow] = useState(false);

  const handleDateChange = (_: any, selectedDate?: Date) => {
    if (Platform.OS === "ios") setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
      onChange?.(selectedDate.toISOString());
    }
  };

  const openPicker = () => {
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: date ?? new Date(),
        onChange: handleDateChange,
        is24Hour: true,
      });
    } else {
      setShow(true);
    }
  };

  const clearDate = () => {
    setDate(undefined);
    onChange?.(undefined);
  };

  return (
    <>
      <HStack className="justify-between align-middle gap-5">
        <Text size="xl" bold className="align-middle">
          {label}:
        </Text>

        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Pressable
            onPress={openPicker}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 10,
              borderRadius: 4,
              justifyContent: "center",
            }}
          >
            <Text>
              {date ? date.toLocaleString() : "Izaberi datum (opciono)"}
            </Text>
          </Pressable>

          {date && (
            <View style={{ marginLeft: 8 }}>
              <Button title="✕" onPress={clearDate} color="#cc0000" />
            </View>
          )}
        </View>
      </HStack>

      {Platform.OS === "ios" && show && (
        <DateTimePicker
          value={date ?? new Date()}
          mode="datetime"
          display="inline"
          onChange={handleDateChange}
        />
      )}
    </>
  );
}
