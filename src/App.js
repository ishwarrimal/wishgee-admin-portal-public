import React from "react";
// import logo from './logo.svg';
import "./App.css";
import { Admin, Resource, fetchUtils } from "react-admin";
import firebase from "firebase";
import { FirebaseAuthProvider } from "react-admin-firebase";
// import { CreateWish, WishEdit, WishList } from "./wishes";
// import { WishDetails } from "./wishes/wish-details";
import CustomLoginPage from "./Components/login";
import customDataProvider from "./Util/dataProvider";
import AgentDetails from "./Page/agents";
import Categories from "./Page/productTypes";
import OpenWish from "./Page/openWish";
import ClosedWish from "./Page/closedWish";
import WishRecommendation from "./Page/wishRecommendation";
import RecentResults from "./Page/recentResults";
import WishTrend from "./Page/wishTrend";
import productTypes from "./Page/productTypes";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

console.log("node environment ", process.env.NODE_ENV);

const globalConfig = {
  // apiBaseUrl: ''
  //  apiBaseUrl: 'http://localhost:8080'
  apiBaseUrl:
    process.env.NODE_ENV === "production"
      ? "https://pikachu.herokuapp.com/v1/agent"
      : process.env.NODE_ENV === "staging"
      ? "https://pikachu-qa.herokuapp.com/v1/agent"
      : "http://localhost:8080/v1/agent",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const fbOptions = {
  // app: firebaseApp,
  // persistence: "local",
  // dontAddIdFieldToDoc: true,
  // lazyLoading: {
  //   enabled: true
  // },
};

const authProvider = FirebaseAuthProvider(firebaseConfig, fbOptions);

const httpClient = async (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  var idToken = await firebaseApp.auth().currentUser?.getIdToken(true);
  if (idToken) {
    options.headers.set("Authorization", `Bearer ${idToken}`);
    return fetchUtils.fetchJson(url, options);
  }
};

const dataProvider = customDataProvider(globalConfig.apiBaseUrl, httpClient);

function App() {
  return (
    <Admin
      title="Wishgee Genie !!!"
      loginPage={CustomLoginPage}
      dataProvider={dataProvider}
      authProvider={authProvider}
    >
      {/* Open Wish  */}
      <Resource
        name="wish/open"
        options={{ label: "New Wishes" }}
        {...OpenWish}
      />

      <Resource
        name="wish/reviewed"
        options={{ label: "In Review" }}
        {...OpenWish}
      />

      <Resource
        name="wish/waiting_for_approval"
        options={{ label: "Waiting for approval" }}
        {...OpenWish}
      />

      {/* <Resource
        name="wish/closed"
        options={{ label: "Closed Wish" }}
        {...ClosedWish}
      /> */}

      <Resource
        name="user"
        options={{ label: "Support Agents" }}
        {...AgentDetails}
      />

      <Resource
        name="product-type"
        options={{ label: "Product Type" }}
        {...productTypes}
      />

      <Resource
        name="wish/recommendation"
        options={{ label: "Wish Recommendations" }}
        {...WishRecommendation}
      />

      <Resource
        name="result"
        options={{ label: "Recent results" }}
        {...RecentResults}
      />

      <Resource
        name="wish-trend"
        options={{ label: "Wish Trend" }}
        {...WishTrend}
      />
    </Admin>
  );
}

export default App;
