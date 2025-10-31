import {Text} from "@/components/ui/text";
import {Input, InputField} from "@/components/ui/input";
import {HStack} from "@/components/ui/hstack";
import {TextInput} from "react-native";

interface InputFieldLabelProps {
  label: string;
  value?: string;
  onChange?: (val: string) => void;
}

function InputFieldLabel(props: InputFieldLabelProps) {
  return (
    <>
      <HStack className="justify-between align-middle gap-5">
        <Text size="xl" bold className="align-middle">{props.label}:</Text>
        <Input size="md" className="flex-1">
          <InputField value={props.value} onChangeText={props.onChange}/>
        </Input> 
      </HStack>
    </>
  )
}

export default InputFieldLabel

function InputPhoneFieldLabel(props: InputFieldLabelProps) {
  return (
    <>
      <HStack className="justify-between align-middle gap-5">
        <Text size="xl" bold className="align-middle">{props.label}:</Text>
        <TextInput
          keyboardType="phone-pad"
          maxLength={15}
          value={props.value}
          onChangeText={props.onChange}
          placeholder="06XXXXXXXX"
          returnKeyType="done"
          style={{
            flexGrow: 1,
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            borderRadius: 4,
          }}
        />
      </HStack>
    </>
  )
}

export { InputPhoneFieldLabel }