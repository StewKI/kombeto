import {Share} from "react-native";


export default class ShareService {
  public static async shareMessage(text: string) {
    try {
      await Share.share({
        message: text,
      });
    } catch (error) {
      console.error(error);
    }
  }
}