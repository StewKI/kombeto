import {useEffect, useState} from "react";
import {Order} from "@/services/types";
import {FlatList} from "react-native";
import OrderCard from "@/components/models/order/OrderCard";
import OrderBackend from "@/services/models/order/OrderBackend";
import {VStack} from "@/components/ui/vstack";
import {Alert} from "@/components/ui/alert";
import {Pressable} from "@/components/ui/pressable";
import {router} from "expo-router";
import {useOrderStore} from "@/services/state/OrderState";


function OrdersTab() {
  
  const [orders, setOrders] = useState<Order[]>([]);
  const {setOrder} = useOrderStore();
  
  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      let response = await OrderBackend.GetOrders()
      response = response.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
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
          <Pressable onPress={() => {
            setOrder(order.item);
            router.push("/order");
          }}>
            <OrderCard order={order.item} />
          </Pressable>
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