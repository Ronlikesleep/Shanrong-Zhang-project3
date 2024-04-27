import { createContext } from "react";
import { useState, useContext } from "react";
export const UserLoginContext = createContext();
export default function UserLoginStatusProvider(props) {

    const [isUserLogin, setUserLogin] = useState(false);

    return (<UserLoginContext.Provider value={{ isUserLogin, setUserLogin }}>
        {props.children}
    </UserLoginContext.Provider>)
}