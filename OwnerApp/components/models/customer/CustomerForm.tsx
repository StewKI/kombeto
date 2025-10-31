
import {VStack} from "@/components/ui/vstack";
import {HStack} from "@/components/ui/hstack";
import {Text} from "@/components/ui/text";
import InputFieldLabel, {InputPhoneFieldLabel} from "@/components/custom/InputFieldLabel";
import {QuantityInputSimple} from "@/components/custom/QuantityInput";
import ValidationService from "@/services/models/validation/ValidationService";
import {Alert} from "@/components/ui/alert";
import {Box} from "@/components/ui/box";
import {Button, ButtonText} from "@/components/ui/button";
import {Customer} from "@/services/types";
import {Card} from "@/components/ui/card";
import LoginInfo from "@/components/models/customer/LoginInfo";
import {useState} from "react";

interface CustomerFormProps {
  customer?: Customer;
  onSubmit: (name: string, address: string, phone: string, discount: number) => void;
  btnText?: string;
}

function CustomerForm({onSubmit, btnText = undefined, customer = undefined}: CustomerFormProps) {

  const [name, setName] = useState(customer?.name ?? "");
  const [address, setAddress] = useState(customer?.address ?? "");
  const [phone, setPhone] = useState(customer?.phone ?? "");
  const [discount, setDiscount] = useState(customer?.discount ?? 0);

  const [errors, setErrors] = useState<string[]>([]);

  const validate = () => {
    const newErrors: string[] = [];

    if (name.length == 0) newErrors.push("Ime je obavezno polje");
    if (address.length == 0) newErrors.push("Adresa je obavezno polje");
    if (phone.length == 0) newErrors.push("Telefon je obavezno polje");

    if (!ValidationService.isValidSerbianPhoneNumber(phone)) {
      newErrors.push("Neispravan broj telefona");
    }

    if (discount < 0 || discount > 100) newErrors.push("Popust mora biti između 0 i 100")

    setErrors(newErrors)

    return newErrors.length === 0;
  }
  
  const submit = () => {
    if (!validate()) return;
    
    onSubmit(name, address, phone, discount);
  }
  
  return (
    <>
      <VStack className="p-8 gap-5">

        {errors.length > 0 && (
          <VStack className="gap-1">
            {errors.map((e) => (
              <Alert key={e} action="error" variant="filled">
                <Text>{e}</Text>
              </Alert>
            ))}
          </VStack>
        )}



        <InputFieldLabel label="Ime" value={name} onChange={(val) => setName(val)}/>
        <InputFieldLabel label="Adresa" value={address} onChange={(val) => setAddress(val)}/>
        <InputPhoneFieldLabel label="Telefon" value={phone} onChange={(val) => setPhone(val)}/>

        <HStack>
          <Text size="xl" bold className="align-middle">Popust:</Text>
          <QuantityInputSimple
            value={discount}
            onPlus={() => setDiscount(discount + 1)}
            onMinus={() => setDiscount(discount - 1)}
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

export default CustomerForm;