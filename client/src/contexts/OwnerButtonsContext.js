import { createContext, useState, useContext } from 'react';

const OwnerButtonsContext = createContext();

export const OnwerButtonsProvider = ({
    children
}) => {
    const [ showOwnerButtons, setShowOwnerButtons ] = useState(true);
    
    const toggleOwnerButtons = () =>  {
        return setShowOwnerButtons(() => showOwnerButtons ? false : true);
    }

    return (
        <OwnerButtonsContext.Provider value={{showOwnerButtons, toggleOwnerButtons}}>
            {children}
        </OwnerButtonsContext.Provider>
    )
}

export const useOwnerButtonsContext = () => {
    const ownerButtonsState = useContext(OwnerButtonsContext);

    return ownerButtonsState;
};