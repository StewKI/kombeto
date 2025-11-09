import {useDiscountsStore} from "@/services/state/DiscountsState";
import DiscountForm from "@/components/models/discount/DiscountForm";
import {DiscountService} from "@/services/models/discount/DiscountService";
import {Discount} from "@/services/types";
import {useState} from "react";
import {FullScreenLoader} from "@/components/custom/loader/FullScreenLoader";
import {VStack} from "@/components/ui/vstack";
import {Alert} from "@/components/ui/alert";
import {Text} from "@/components/ui/text";
import {router} from "expo-router";


function EditDiscountPage() {
  
  const {editDiscount, updateDiscount} = useDiscountsStore();
  
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const submit = async (name: string, discount: number, endDate: string | undefined, color: string) => {
    if (editDiscount === undefined) return;
    
    setLoading(true);
    setSubmitError(null);
    try {
      const updatedDiscount: Discount = {
        id: editDiscount.id,
        name,
        discount,
        endDate,
        color,
      };
      
      await DiscountService.updateDiscount(updatedDiscount);
      updateDiscount(updatedDiscount);
      router.back();
    }
    catch (e) {
      console.error(e);
      setSubmitError("Greska pri cuvanju promena");
    }
    finally {
      setLoading(false);
    }
  }
  
  if (loading) {
    return <FullScreenLoader/>
  }
  
  return (
    <VStack className={"gap-4"}>
      <DiscountForm 
        btnText={"Sačuvaj"}
        discount={editDiscount}
        onSubmit={(name, discount, endDate, color) => {
          submit(name, discount, endDate, color);
        }}
      />
      {submitError && (
        <Alert action="error" variant="filled">
          <Text>
            {submitError}
          </Text>
        </Alert>
      )}
    </VStack>
  )
}

export default EditDiscountPage;

