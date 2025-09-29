import {HStack} from "@/components/ui/hstack";
import {Text} from "@/components/ui/text";
import {Textarea, TextareaInput} from "@/components/ui/textarea";
import {Card} from "@/components/ui/card";

interface OrderDetailsFormProps {
  onNoteChange: (text: string) => void; 
}

function OrderDetailsForm({onNoteChange}: OrderDetailsFormProps) {
  return (
    <Card className="border-2 w-full">
      <HStack className="gap-2">
        <Text>Način plaćanja: </Text>
        <Text bold>Pri preuzimanju</Text>
      </HStack>
      <Text className="mt-3">Napomena:</Text>
      <Textarea
        isInvalid={false}
        isDisabled={false}
      >
        <TextareaInput onChangeText={onNoteChange} placeholder="Unesite napomenu..."/>
      </Textarea>
    </Card>
  )
}

export default OrderDetailsForm;