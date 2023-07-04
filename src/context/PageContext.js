import { createContext, useState } from 'react';

export const PageContext = createContext();

export const PageNumberProvider = (props) => {
    const [pageNumber, setPageNumber] = useState(1);
    const pageContextValue = {
        pageNumber, setPageNumber,
    };
    return (
        <PageContext.Provider value={pageContextValue}>
            {props.children}
        </PageContext.Provider>
    );
};
