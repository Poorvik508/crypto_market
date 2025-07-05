import { createContext } from "react";

export const Coincontext = createContext()

const CoincontextProvider = (props) => {
    const contextValue = {
        
    }

    return (
        <Coincontext.Provider value={}>
            {props.children}
        </Coincontext.Provider>
    )
}