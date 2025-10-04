import {useEffect, useState} from "react";
import {Order} from "@/services/types";
import {FlatList} from "react-native";
import OrderCard from "@/components/models/order/OrderCard";
import OrderBackend from "@/services/models/order/OrderBackend";
import {VStack} from "@/components/ui/vstack";
import {Alert} from "@/components/ui/alert";


function OrdersTab() {
  
  const [orders, setOrders] = useState<Order[]>([]);
  
  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await OrderBackend.GetOrders()
      setOrders(response);
    } catch (error) {
      setError("Greška pri učitavanju porudžbina");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  return (
    <VStack className="p-4">
      {error && (
        <Alert action="error">{error}</Alert>
      )}
      <FlatList
        data={orders} 
        renderItem={order => (
          <OrderCard order={order.item} />
        )}
        keyExtractor={item => item.id.toString()}
        refreshing={loading}
        onRefresh={() => {
          load();
        }}
        />
    </VStack>
  )
}

export default OrdersTab;