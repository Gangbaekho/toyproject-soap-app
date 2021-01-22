import React, { useState } from "react";
// redux thunk를 사용하려면은 applyMiddleware를 사용해야 한다.
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ShopNavigator from "./navigation/ShopNaviagator";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
// 이거까지 import를 해준다음에.
import ReduxThunk from "redux-thunk";

import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import orderReducer from "./store/reducers/order";

const rootReducer = combineReducers({
  products: productsReducer,
  carts: cartReducer,
  orders: orderReducer,
});

// 이렇게 store를 만들 때 , 이걸 적용해 주면 된다는 것임.
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={() => console.log(`Font can not be fetched`)}
      />
    );
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
