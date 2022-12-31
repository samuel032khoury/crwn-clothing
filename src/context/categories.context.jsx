import {createContext, useEffect, useState} from "react";
import {getQueryDocuments} from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
  categoriesMap: {},
  setCategoriesMap: () => {},
})

export const CategoriesProvider = ({children}) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  const getCategoriesMap = (categoriesSnapshot) => {
    if (!categoriesSnapshot) return {}
    return categoriesSnapshot.docs.reduce((acc, docSnapshot) => {
      const {title, items} = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc
    }, {});
  };

  useEffect(() => {
    const updateCategoriesMap = async () => {
      const categoriesDocuments = await getQueryDocuments('categories');
      const categoriesMap = getCategoriesMap(categoriesDocuments);
      setCategoriesMap(categoriesMap);
    }
    updateCategoriesMap().then(() => null);

  }, [])
  const value = {categoriesMap, setCategoriesMap}
  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}