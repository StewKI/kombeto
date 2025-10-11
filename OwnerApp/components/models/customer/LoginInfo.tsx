import {VStack} from "@/components/ui/vstack";
import {Text} from "@/components/ui/text";
import {Input, InputField} from "@/components/ui/input";
import {Button, ButtonText} from "@/components/ui/button";
import ShareService from "@/services/models/validation/ShareService";

interface LoginInfoProps {
  code: string
}

function LoginInfo(props: LoginInfoProps) {
  return (
    <>
      <VStack className="gap-4">
        <Text>Kod za prijavu:</Text>
        <Input size="xl">
          <InputField className="text-xl" value={props.code}/>
        </Input>
        <Button className="h-12" onPress={() => ShareService.shareMessage(props.code)}>
          <ButtonText>Podeli kod</ButtonText>
        </Button>
      </VStack>
    </>
  )
}

export default LoginInfo