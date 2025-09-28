import {useSearchStore} from "@/services/state/SearchState";
import {useSearchTabStore} from "@/services/state/SearchTabState";
import {useEffect, useState} from "react";
import {FullScreenLoader} from "@/components/custom/FullScreenLoader";
import ProductBackend from "@/services/models/product/ProductBackend";


function QueryBox() {
  
  const {setPageData} = useSearchStore();
  const {selectedCategory} = useSearchTabStore();
  
  const [loading, setLoading] = useState(false);
  
  const load = async () => {
    setLoading(true);
    try {
      
      let category: number | undefined = undefined;
      if (selectedCategory && selectedCategory !== "all") {
        category = selectedCategory.id;
      }
      
      const res = await ProductBackend.Get(undefined, undefined, undefined, category);
      
      setPageData(res);
    }
    catch (error) {
      alert("Greska");
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load()
  }, []);
  
  return (
    <>
      {loading && <FullScreenLoader/>}
    </>
  )
}

export default QueryBox;