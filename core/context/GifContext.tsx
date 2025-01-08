import React, { useContext } from "react";  

// Define types for the state and actions  
interface GifProps {  
  gifMode: string;  
}  

interface Action {  
  type: string;  
  payload: any;  
}  

let initialState: GifProps = {  
  gifMode: "gif", // Default value  
};  

// Check for SSR or client-side and fetch from localStorage  
if (typeof window !== "undefined") {  
  const storedGifMode = localStorage.getItem("gifMode");  
  if (storedGifMode) {  
    initialState.gifMode = JSON.parse(storedGifMode);  
  }  
}  

// Action creators  
export const toggleGif = (dispatch: React.Dispatch<Action>) => {  
  localStorage.setItem("gifMode", JSON.stringify("gif"));  
  return dispatch({  
    type: "TOGGLE_GIFMODE",  
    payload: "gif",  
  });  
};  

export const toggleImage = (dispatch: React.Dispatch<Action>) => {  
  localStorage.setItem("gifMode", JSON.stringify("image"));  
  return dispatch({  
    type: "TOGGLE_IMAGEMODE",  
    payload: "image",  
  });  
};  

// Reducer function  
const reducer = (state: GifProps, action: Action) => {  
  switch (action.type) {  
    case "TOGGLE_GIFMODE":  
      return { ...state, gifMode: action.payload };  
    case "TOGGLE_IMAGEMODE":  
      return { ...state, gifMode: action.payload };  
    default:  
      return state;  
  }  
};  

// Create context  
export const GifContext = React.createContext<{ state: GifProps; dispatch: React.Dispatch<Action> } | undefined>(undefined);  

export const useGif = () => {  
  const context = useContext(GifContext);  
  if (!context) {  
    throw new Error("useGif must be used within GifProvider");  
  }  
  return context;  
};  

// Provider component  
export function GifProvider({ children }: { children: React.ReactNode }) {  
  // Correct typing for useReducer  
  const [state, dispatch] = React.useReducer(reducer, initialState);  

  return (  
    <GifContext.Provider value={{ state, dispatch }}>  
      {children}  
    </GifContext.Provider>  
  );  
}  