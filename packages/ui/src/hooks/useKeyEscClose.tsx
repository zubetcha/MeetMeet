import React, {useEffect} from 'react'

export const useKeyEscClose = (closeThing:any) => {
    useEffect(() => {
        const escKeyModalClose = (e:any) => {
            if (e.keyCode === 27) {
                if(closeThing){
                    closeThing(false);
                }
            }
        };
        window.addEventListener("keydown", escKeyModalClose);
        return () => window.removeEventListener("keydown", escKeyModalClose);
    }, []);
};
