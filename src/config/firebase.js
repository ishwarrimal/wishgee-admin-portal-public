export default {
    apiKey: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_KEY : process.env.REACT_APP_API_KEY_STAGING,
    authDomain: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_AUTH_DOMAIN : process.env.REACT_APP_AUTH_DOMAIN_STAGING,
    databaseURL: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_DATABASE_URL : process.env.REACT_APP_DATABASE_URL_STAGING_STAGING,
    projectId: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROJECT_ID : process.env.REACT_APP_PROJECT_ID_STAGING,
    storageBucket: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_STORAGE_BUCKET : process.env.REACT_APP_STORAGE_BUCKET_STAGING,
    messagingSenderId: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_MESSAGING_SENDER_ID : process.env.REACT_APP_MESSAGING_SENDER_ID_STAGING,
    appId: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_ID : process.env.REACT_APP_ID_STAGING,
    measurementId: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_MEASUREMENT_ID : process.env.REACT_APP_MEASUREMENT_ID_STAGING
  };