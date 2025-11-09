import React, { useState, useEffect } from 'react';
import {TextInput, View, Pressable, Text} from 'react-native';

type Props = {
  onSearch: (value: string) => void;
};

export const SearchInput: React.FC<Props> = ({ onSearch }) => {
  const [value, setValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState(value);

  // Update debounced value after 300ms of no typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 300);

    return () => clearTimeout(handler); // cleanup if value changes
  }, [value]);

  // Call onSearch whenever debounced value changes
  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue]);

  const clearSearch = () => {
    setValue('');
    setDebouncedValue('');
  };

  return (
    <View style={{position: 'relative'}}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder="Pretrazi..."
        style={{
          width: 200,
          padding: 10,
          paddingRight: 30,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
        }}
      />
      {value.length > 0 && (
        <Pressable
          onPress={clearSearch}
          style={{
            position: 'absolute',
            right: 10,
            top: 0,
            bottom: 0,
            justifyContent: 'center'
          }}>
          <Text style={{fontSize: 16, color: '#666'}}>✕</Text>
        </Pressable>
      )}
    </View>
  );
};
