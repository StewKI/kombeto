import DiscountForm from "@/components/models/discount/DiscountForm";
import {DiscountService} from "@/services/models/discount/DiscountService";
import {useState} from "react";
import {FullScreenLoader} from "@/components/custom/loader/FullScreenLoader";
import {Alert} from "react-native";
import {Text} from "@/components/ui/text";
import {useDiscountsStore} from "@/services/state/DiscountsState";
import {router} from "expo-router";


function NewDiscountPage() {
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const {addDiscount} = useDiscountsStore();
  
  const handleSubmit = async (name: string, discount: number, endDate: string | undefined, color: string) => {
    setLoading(true);
    setError(null);
    try {
      const nDisc = await DiscountService.createDiscount(name, discount, endDate, color);
      
      addDiscount(nDisc);
      
      router.back();
      
    }
    catch (e) {
      console.error(e);
      setError("Greska pri dodavanju popusta");
    }
    finally {
      setLoading(false);
    }
  }
  
  return (
    <>
      {loading && <FullScreenLoader/>}
      {error && (<Text>{error}</Text>)}
      <DiscountForm onSubmit={(name, discount, endDate, color) => {
        handleSubmit(name, discount, endDate, color);
      }}/>
    </>
  )
}

export default NewDiscountPage;