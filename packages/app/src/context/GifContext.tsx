import React, {useContext} from "react";

interface GifProps {
  gifMode: string;
}

let initialState: any = {};

if (typeof window === "undefined") {
  initialState = {};
  
} else {
  initialState = {
    gifMode: localStorage?.getItem("gifMode")
      ? JSON.parse(localStorage.getItem("gifMode"))
      : "gif",
  };
}

// Action
export const toggleGif = (dispatch) => {
  localStorage.setItem("gifMode", JSON.stringify("gif"));

  return dispatch({
    type: "TOGGLE_GIFMODE",
    payload: "gif",
  });
};

export const toggleImage = (dispatch) => {
  localStorage.setItem("gifMode", JSON.stringify("image"));

  return dispatch({
    type: "TOGGLE_IMAGEMODE",
    payload: "image",
  });
};

// Reducer
const reducer = (state: GifProps, action) => {
  switch (action.type) {
    case "TOGGLE_GIFMODE":
      return { ...state, gifMode: action.payload };
    case "TOGGLE_IMAGEMODE":
      return { ...state, gifMode: action.payload };
    default:
      return state;
  }
};

// Create Store
export const GifContext = React.createContext<any>(initialState);

export const useGif = () => {
  const context = useContext(GifContext);
  if (context === undefined) {
    throw new Error('useGif must be used within GifProvider');
  }
  return context;
};


export function GifProvider(props) {
  const [state, dispatch] = React.useReducer<any>(reducer, initialState);

  return (
    <GifContext.Provider value={{ state, dispatch }}>
      {props.children}
    </GifContext.Provider>
  );
}
