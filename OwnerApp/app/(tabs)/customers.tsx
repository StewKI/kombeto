import {use, useEffect, useState} from "react";
import {Customer} from "@/services/types";
import CustomerBackend from "@/services/models/customer/CustomerBackend";
import {VStack} from "@/components/ui/vstack";
import {FlatList} from "react-native";
import {Alert} from "@/components/ui/alert";
import CustomerCard from "@/components/models/customer/CustomerCard";
import {FullScreenLoader} from "@/components/custom/loader/FullScreenLoader";
import {Card} from "@/components/ui/card";
import {Button, ButtonText} from "@/components/ui/button";


function CustomersTab() {
  
  const [customers, setCustomers] = useState<Customer[]>([]);
  
  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await CustomerBackend.GetCustomers();
      setCustomers(result);
    }
    catch (e) {
      setError("Greška pri učitavanju kupaca");
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load()
  }, []);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  return (
    <>
      {loading && <FullScreenLoader/>}
      <VStack className="p-4">
        {error && (
          <Card className="mb-4">
            <Alert action="error">{error}</Alert>
            <Button onPress={() => load()}>
              <ButtonText>Pokušaj ponovo</ButtonText>
            </Button>
          </Card>
        )}
        <FlatList
          data={customers}
          renderItem={customer => (
            <CustomerCard customer={customer.item} />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </VStack>
    </>
  )
}

export default CustomersTab;