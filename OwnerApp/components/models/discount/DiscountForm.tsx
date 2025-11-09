
import {VStack} from "@/components/ui/vstack";
import {HStack} from "@/components/ui/hstack";
import {Text} from "@/components/ui/text";
import InputFieldLabel, {InputPhoneFieldLabel} from "@/components/custom/InputFieldLabel";
import {QuantityInputSimple} from "@/components/custom/QuantityInput";
import ValidationService from "@/services/models/validation/ValidationService";
import {Alert} from "@/components/ui/alert";
import {Box} from "@/components/ui/box";
import {Button, ButtonText} from "@/components/ui/button";
import {Customer, Discount} from "@/services/types";
import {Card} from "@/components/ui/card";
import LoginInfo from "@/components/models/customer/LoginInfo";
import {useState} from "react";
import {InputDateTimeFieldLabel} from "@/components/custom/InputDateTimeFieldLabel";
import {InputColorFieldLabel} from "@/components/custom/InputColorFieldLabel";

interface DiscountFormProps {
  discount?: Discount;
  onSubmit: (name: string, discount: number, endDate: string | undefined, color: string) => void;
  btnText?: string;
}

function DiscountForm({onSubmit, btnText = undefined, discount = undefined}: DiscountFormProps) {

  const [name, setName] = useState(discount?.name ?? "");
  const [discountPercent, setDiscountPercent] = useState(discount?.discount ?? 0);
  const [endDate, setEndDate] = useState<string | undefined>(discount?.endDate ?? undefined);
  const [color, setColor] = useState(discount?.color ?? "#000000");
  
  const [errors, setErrors] = useState<string[]>([]);

  const validate = () => {
    const newErrors: string[] = [];

    if (name.length == 0) newErrors.push("Ime je obavezno polje");
    if (color.length == 0) newErrors.push("Boja je obavezna");
    

    if (discountPercent < 0 || discountPercent > 100) newErrors.push("Popust mora biti između 0 i 100")

    setErrors(newErrors)

    return newErrors.length === 0;
  }
  
  const submit = () => {
    if (!validate()) return;
    
    onSubmit(name, discountPercent, endDate, color);
  }
  
  return (
    <>
      <VStack className="p-8 gap-5">

        {errors.length > 0 && (
          <VStack className="gap-1">
            {errors.map((e) => (
              <Alert key={e} action="error" variant="solid">
                <Text>{e}</Text>
              </Alert>
            ))}
          </VStack>
        )}



        <InputFieldLabel label="Naziv" value={name} onChange={(val) => setName(val)}/>
        <InputDateTimeFieldLabel label={"Važi do"} value={endDate} onChange={(val) => setEndDate(val)}/>
        <InputColorFieldLabel label={"Boja"} value={color} onChange={(val) => setColor(val)}/>
        
        <HStack>
          <Text size="xl" bold className="align-middle">Popust:</Text>
          <QuantityInputSimple
            value={discountPercent}
            onPlus={() => setDiscountPercent(discountPercent + 1)}
            onMinus={() => setDiscountPercent(discountPercent - 1)}
          />
        </HStack>

        <Box>
          <Button className="h-16" onPress={submit}>
            <ButtonText>{btnText ?? "Dodaj"}</ButtonText>
          </Button>
        </Box>



      </VStack>
    </>
  )
}

export default DiscountForm;