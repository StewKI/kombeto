import {VStack} from "@/components/ui/vstack";
import {HStack} from "@/components/ui/hstack";
import {Text} from "@/components/ui/text";
import InputFieldLabel from "@/components/custom/InputFieldLabel";
import {useState} from "react";
import {QuantityInputSimple} from "@/components/custom/QuantityInput";
import ValidationService from "@/services/models/validation/ValidationService";
import {Alert} from "@/components/ui/alert";
import {Box} from "@/components/ui/box";
import {Button, ButtonText} from "@/components/ui/button";
import {Customer} from "@/services/types";
import CustomerBackend from "@/services/models/customer/CustomerBackend";
import {FullScreenLoader} from "@/components/custom/loader/FullScreenLoader";
import {Card} from "@/components/ui/card";
import LoginInfo from "@/components/models/customer/LoginInfo";


function NewCustomerPage() {
  
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [discount, setDiscount] = useState(0);
  
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
  
  const submit = async () => {

    if (!validate()) return;
    
    setLoading(true);
    setSubmitError(null);
    try {
      const resCode = await CustomerBackend.CreateCustomer(name, address, phone, discount);
      setCode(resCode)
    }
    catch (e) {
      console.error(e)
      setSubmitError("Greška pri dodavanju kupca");
    }
    finally {
      setLoading(false);
    }
    
  }
  
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const [code, setCode] = useState<string | null>(null);
  
  
  return (
    <>
      {loading && <FullScreenLoader/>}
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
        <InputFieldLabel label="Telefon" value={phone} onChange={(val) => setPhone(val)}/>

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
            <ButtonText>Dodaj</ButtonText>
          </Button>
        </Box>

        {submitError && (<Alert action="error" variant="filled"><Text>{submitError}</Text></Alert>)}

        {code && (
          <Card>
            <LoginInfo code={code}/>
          </Card>
        )}
        
        
      </VStack>
    </>
  )
}

export default NewCustomerPage;