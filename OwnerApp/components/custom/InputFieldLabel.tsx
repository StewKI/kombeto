import {Text} from "@/components/ui/text";
import {Input, InputField} from "@/components/ui/input";
import {HStack} from "@/components/ui/hstack";

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