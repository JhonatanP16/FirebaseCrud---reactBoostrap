import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore/lite";
import { createContext, useEffect, useState } from "react"
import { db } from "../firebase-config";

export const CrudContext = createContext();

const CrudContextProvider = ({children}) => {
    const [users,setUsers] = useState([]);
    const [onlyUser,setOnlyUser] = useState(null);
    console.log(users);
    const userCollectionRef = collection(db,'users');
    
    const createUser = (inputs) => {
        return addDoc(userCollectionRef,inputs);
    }
    const deleteUser = (id) => {
        const userDoc = doc(db,'users',id);
        return deleteDoc(userDoc);
    }
    const fijarUser = async(id) => {
        const docRef = doc(db,'users',id);
        const data = await getDoc(docRef);
        return setOnlyUser({...data.data(),id});
    }
    const updateUser = (id,inputs) => {
        const userDoc = doc(db,'users',id);
        return updateDoc(userDoc,inputs)
    }
    const getUsers = async() => {
        const data = await getDocs(userCollectionRef);
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        setOnlyUser(null);   
     }
    useEffect(() => {
        getUsers();
    },[]);

    return(
        <CrudContext.Provider value={{
            users,
            createUser,
            deleteUser,
            updateUser,
            fijarUser,
            onlyUser,
            getUsers}}>
            {children}
        </CrudContext.Provider>
    )
}

export default CrudContextProvider;