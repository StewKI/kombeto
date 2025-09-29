import AddToCart from "@/components/models/cart/AddToCart";
import {useMsgStore} from "@/services/state/MsgState";
import MsgDialog from "@/components/custom/diaolog/MsgDialog";

function Modals() {
  
  const {content, title, clearMsg} = useMsgStore();
  
  return (
    <>
      <AddToCart/>
      <MsgDialog show={content !== undefined} title={title} onOk={() => clearMsg()}>
        {content}
      </MsgDialog>
    </>
  )
}

export default Modals