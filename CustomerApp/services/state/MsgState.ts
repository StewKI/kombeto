import {create} from "zustand";


type MsgStore = {
  content?: React.ReactNode;
  title: string;
  displayMsg: (title: string, content: React.ReactNode) => void;
  clearMsg: () => void;
}

export const useMsgStore = create<MsgStore>((set) => ({
  content: undefined,
  title: "",
  displayMsg: (title, content) => {
    set({title, content})
  },
  clearMsg: () => {
    set({title: "", content: undefined})
  }
}))