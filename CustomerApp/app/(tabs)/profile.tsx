import {Text} from "@/components/ui/text";
import {useCustomerStore} from "@/services/state/CustomerState";
import {useEffect, useState} from "react";
import CustomerBackend from "@/services/models/customer/CustomerBackend";
import {FullScreenLoader} from "@/components/custom/loader/FullScreenLoader";
import CustomerCard from "@/components/models/customer/CustomerCard";
import {Button, ButtonText} from "@/components/ui/button";
import {VStack} from "@/components/ui/vstack";
import {router} from "expo-router";
import LoginService from "@/services/security/LoginService";


function ProfileTab() {
  
  const { customer, setCustomer } = useCustomerStore();

  
  return (
    <>

      <VStack className="">

        {customer && (
          <CustomerCard customer={customer}/>
        )}

        <Button className="h-16 my-5 mx-4" onPress={() => {router.push("/my_orders")}}>
          <ButtonText>Moje porudžbine</ButtonText>
        </Button>
        <Button className="h-16 my-5 mx-4" onPress={async () => {
          await LoginService.Logout();
          setCustomer(null!);
          router.replace("/login");
        }}>
          <ButtonText>Odjava</ButtonText>
        </Button>
        
      </VStack>
      
      
    </>
  );
}

export default ProfileTab;
