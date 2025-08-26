import React from "react";
import { HStack } from "@/components/ui/hstack";
import {Button, ButtonIcon, ButtonText} from "@/components/ui/button";
import { Text } from "@/components/ui/text"
import {Center} from "@/components/ui/center";
//import { Minus, Plus } from "lucide-react-native";

type QuantityInputProps = {
  value: number;
  onChange: (val: number) => void;
  size?: "sm" | "md" | "lg";
};

export const QuantityInput = ({value, onChange, size = "md"}: QuantityInputProps) => {
  const decrease = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  const increase = () => {
    onChange(value + 1);
  };

  return (
    <HStack className="align-middle">
      
      <Text size="2xl" className="align-middle px-3">{value}</Text>

      <Button size={size} variant="outline" onPress={decrease} isDisabled={value <= 1}
              className="rounded-l-full border-r-0">
        <ButtonText size="xl">
          -
        </ButtonText>
      </Button>
      <Button size={size} variant="outline" onPress={increase}
              className="rounded-r-full border-l-[0.5px]">
        <ButtonText size="xl">
          +
        </ButtonText>
      </Button>
    </HStack>
  );
}
