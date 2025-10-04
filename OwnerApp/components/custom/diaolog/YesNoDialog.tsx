import { Heading } from "@/components/ui/heading";
import {Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@/components/ui/modal";
import {Button, ButtonText} from "@/components/ui/button";
import {Text} from "@/components/ui/text";



interface YesNoDialogProps {
  children: React.ReactNode;
  show: boolean;
  title: string;
  onYes: () => void;
  onNo: () => void;
}

function YesNoDialog({children, show, title, onYes, onNo}: YesNoDialogProps) {
  
  return (
    <Modal
      isOpen={show}
      onClose={() => {
        onNo();
      }}
      size="md"
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">{title}</Heading>
        </ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            action="secondary"
            className="mr-3"
            onPress={() => {
              onNo();
            }}
          >
            <ButtonText>Ne</ButtonText>
          </Button>
          <Button
            onPress={() => {
              onYes();
            }}
          >
            <ButtonText>Da</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default YesNoDialog