import AddToCart from "@/components/models/cart/AddToCart";
import {useMsgStore} from "@/services/state/MsgState";
import MsgDialog from "@/components/custom/diaolog/MsgDialog";
import SearchBoxDialog from "@/components/custom/diaolog/SearchBoxDialog";

function Modals() {
  
  const {content, title, clearMsg} = useMsgStore();
  
  return (
    <>
      <AddToCart/>
      <MsgDialog show={content !== undefined} title={title} onOk={() => clearMsg()}>
        {content}
      </MsgDialog>
      <SearchBoxDialog/>
    </>
  )
}

export default Modals