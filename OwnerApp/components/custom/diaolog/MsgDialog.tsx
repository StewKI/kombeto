import {Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@/components/ui/modal";
import {Heading} from "@/components/ui/heading";
import {Button, ButtonText} from "@/components/ui/button";


interface MsgDialogProps {
  show: boolean;
  title: string;
  children: React.ReactNode;
  onOk: () => void;
}

function MsgDialog({show, title, children, onOk}: MsgDialogProps) {
  return (
    <Modal
      isOpen={show}
      onClose={() => {
        onOk();
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
            onPress={() => {
              onOk();
            }}
          >
            <ButtonText>Ok</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default MsgDialog