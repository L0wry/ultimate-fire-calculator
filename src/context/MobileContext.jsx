import React, { useState } from 'react';

const MobileContext = React.createContext({}); 

export const MobileContextProvider = ({ children }) => {
    const [isMobileNavOpen, setMobileNavOpen] = useState(false);

    const toggleMobileNav = (tog)=> {
        setMobileNavOpen(tog)
    }

	return (
		<MobileContext.Provider value={{ isMobileNavOpen, toggleMobileNav }}>
			{children}
		</MobileContext.Provider>
	)
}

export const useMobileContext = () => {
	const context = React.useContext(MobileContext);
	if (context === undefined) {
		throw new Error('useMobileContext must be used within MobileContextProvider');
	}
	return context;
}

