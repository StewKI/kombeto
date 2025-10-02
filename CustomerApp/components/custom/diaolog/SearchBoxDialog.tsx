import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@/components/ui/modal";
import {Heading} from "@/components/ui/heading";
import {Button, ButtonText} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {useSearchStore} from "@/services/state/SearchState";
import {Input, InputField} from "@/components/ui/input";
import { Icon, CloseIcon } from '@/components/ui/icon';
import XButton from "@/components/custom/XButton";
import {Box} from "@/components/ui/box";
import KeyboardAware from "@/components/custom/KeyboardAware";
import {Keyboard, Platform} from "react-native";


function SearchBoxDialog() {

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  
  const {search, setSearchQuery, showSearchBox, setShowSearchBox } = useSearchStore();
  
  const [localSearchQuery, setLocalSearchQuery] = useState<string>(search ?? "");

  useEffect(() => {
    setLocalSearchQuery(search ?? "");
  }, [showSearchBox]);
  
  const onClose = () => {
    setShowSearchBox(false);
  }

  return (
    <Modal
      isOpen={showSearchBox}
      onClose={onClose}
      size="md"
      
      style={[
        keyboardVisible && {
          justifyContent: "flex-start",
          paddingTop: 200
        }
      ]}
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">Pretraži artikle</Heading>
          <ModalCloseButton>
            <Box className="mb-3">
              <XButton onClick={()=> {onClose()}}/>
            </Box>
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Input
            variant="outline"
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
          >
            <InputField
              placeholder="..."
              value={localSearchQuery}
              onChangeText={(text) => setLocalSearchQuery(text)}
            />
          </Input>

        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            action="secondary"
            className="mr-3"
            onPress={() => {
              setSearchQuery(undefined);
              onClose();
            }}
          >
            <ButtonText>Obriši</ButtonText>
          </Button>
          <Button
            onPress={() => {
              setSearchQuery(localSearchQuery);
              onClose();
            }}
          >
            <ButtonText>Pretraži</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>

  )
}

export default SearchBoxDialog