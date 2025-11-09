import {useCustomersStore} from "@/services/state/CustomersState";
import CustomerForm from "@/components/models/customer/CustomerForm";
import CustomerBackend from "@/services/models/customer/CustomerBackend";
import {useState} from "react";
import {FullScreenLoader} from "@/components/custom/loader/FullScreenLoader";
import {VStack} from "@/components/ui/vstack";
import {Alert} from "@/components/ui/alert";
import {Text} from "@/components/ui/text";
import {router} from "expo-router";


function EditCustomerPage() {
  
  const {editCustomer, updateCustomer} = useCustomersStore();
  
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const submit = async (name: string, address: string, phone: string, discount: number) => {
    if (editCustomer === undefined) return;
    
    setLoading(true);
    setSubmitError(null);
    try {
      await CustomerBackend.UpdateCustomer(editCustomer.id, name, address, phone, discount);
      updateCustomer({
        id: editCustomer.id,
        name,
        address,
        phone,
        discount
      });
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
      <CustomerForm 
        btnText={"Sačuvaj"}
        customer={editCustomer}
        onSubmit={(name, address, phone, discount) => {
          submit(name, address, phone, discount);
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

export default EditCustomerPage;