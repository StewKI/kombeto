import {Text} from "@/components/ui/text";
import {useCustomerStore} from "@/services/state/CustomerState";
import {useEffect, useState} from "react";
import CustomerBackend from "@/services/models/customer/CustomerBackend";
import {FullScreenLoader} from "@/components/custom/FullScreenLoader";
import CustomerCard from "@/components/models/customer/CustomerCard";


function ProfileTab() {
  
  const { customer, setCustomer } = useCustomerStore();

  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  
  const load = async () => {
    setLoading(true)
    setError(null);
    try {
      const loaded = await CustomerBackend.GetProfile();
      setCustomer(loaded);
    }
    catch (err) {
      console.error(err);
      setError("Greska pri ucitavanju");
    }
    finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    load()
  }, []);
  
  return (
    <>
      {loading && <FullScreenLoader/>}
      {error && <Text>{error}</Text>}

      {customer && (
        <CustomerCard customer={customer}/>
      )}
    </>
  );
}

export default ProfileTab;
