import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface IntegerInputProps {
  value: number | string | null;
  onChange: (value: number) => void;
  placeholder?: string;
  style?: object;
}

export default function IntegerInput({
                                       value,
                                       onChange,
                                       placeholder = '',
                                       style = {},
                                     }: IntegerInputProps) {
  const handleChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, ''); // keep only numbers
    if (cleaned === '') {
      onChange(0);
    } else {
      onChange(parseInt(cleaned, 10));
    }
  };

  return (
    <TextInput
      style={[styles.input, style]}
      value={value !== null ? String(value) : ''}
      onChangeText={handleChange}
      keyboardType="number-pad"
      placeholder={placeholder}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    width: 70,
  },
});
