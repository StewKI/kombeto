import {Text} from "@/components/ui/text";
import {VStack} from "@/components/ui/vstack";
import {FlatList, ScrollView} from "react-native";
import {useEffect, useState} from "react";
import {Order} from "@/services/types";
import {useCustomerStore} from "@/services/state/CustomerState";
import OrderBackend from "@/services/models/order/OrderBackend";
import {FullScreenLoader} from "@/components/custom/loader/FullScreenLoader";
import {Heading} from "@/components/ui/heading";
import OrderCard from "@/components/models/order/my_orders/OrderCard";

function MyOrdersPage() {
  
  const [orders, setOrders] = useState<Order[]>([])
  
  const {customer} = useCustomerStore();
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const load = async () => {
    setLoading(true)
    setError(null);
    try {
      const loaded = await OrderBackend.GetOrders(customer.id);
      setOrders(loaded);
    }
    catch (err) {
      console.error(err);
      setError("Greška pri učitavanju, proverite internet");
    }
    finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    load();
  }, [])
  
  return (
    <>
      {error && (
        <>
          <Heading className="text-center mt-5">{error}</Heading>
        </>
      )}
      
      <FlatList 
        className="m-2"
        keyExtractor={o => o.id.toString()}
        data={orders} 
        renderItem={o => (
          <OrderCard order={o.item}/>
        )}
        refreshing={loading}
        onRefresh={load}
      />
    </>
  )
}

export default MyOrdersPage