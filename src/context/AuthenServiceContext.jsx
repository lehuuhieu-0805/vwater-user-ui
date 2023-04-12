import React, { createContext, useContext, useMemo, useState } from 'react';

const AuthenServiceContext = createContext()

function AuthenService({ children }) {
    const [visible, setVisible] = useState(false);

    const handleSetVisible = (value) => {
        setVisible(value);
    }

    const value = useMemo(
        () => ({
            visible,
            handleSetVisible,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [visible]
    );
    return <AuthenServiceContext.Provider value={value}>{children}</AuthenServiceContext.Provider>;
}

export default AuthenService;

export const useAuthService = () => {
    return useContext(AuthenServiceContext);
}