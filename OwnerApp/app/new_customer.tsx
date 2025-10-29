
import {useState} from "react";
import CustomerBackend from "@/services/models/customer/CustomerBackend";
import {FullScreenLoader} from "@/components/custom/loader/FullScreenLoader";
import {Alert} from "@/components/ui/alert";
import {Text} from "@/components/ui/text";
import {Card} from "@/components/ui/card";
import LoginInfo from "@/components/models/customer/LoginInfo";
import CustomerForm from "@/components/models/customer/CustomerForm";
import {useCustomersStore} from "@/services/state/CustomersState";


function NewCustomerPage() {
  
  const {addCustomer} = useCustomersStore();
  
  
  const submit = async (name: string, address: string, phone: string, discount: number) => {

    
    setLoading(true);
    setSubmitError(null);
    try {
      const res = await CustomerBackend.CreateCustomer(name, address, phone, discount);
      setCode(res.code)
      addCustomer({
        id: res.id,
        name,
        address,
        phone,
        discount
      });
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
      
      <CustomerForm onSubmit={(name, address, phone, discount) => {
        submit(name, address, phone, discount);
      }}/>
      
      {submitError && (<Alert action="error" variant="filled"><Text>{submitError}</Text></Alert>)}

      {code && (
        <Card>
          <LoginInfo code={code}/>
        </Card>
      )}
      
    </>
  )
}

export default NewCustomerPage;