import {createContext, useState} from 'react';

export const Context = createContext(undefined);
export function ContextProvider ({ children }){

    const [codeUser, setCodeUser] = useState('');
    const [typeUser, setTypeUser] = useState('');

    return(
        <Context.Provider value={
            {
                codeUser,
                setCodeUser,
                typeUser,
                setTypeUser
            }
        }>
            {children}
        </Context.Provider>
    )
}