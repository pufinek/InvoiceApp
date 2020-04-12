import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAXNDUjAeWRBEluTVUztME8vBISAY9DpXg",
    authDomain: "invoiceapp-4d092.firebaseapp.com",
    databaseURL: "https://invoiceapp-4d092.firebaseio.com",
    projectId: "invoiceapp-4d092",
  });

  const base = Rebase.createClass(firebaseApp.database());
  export { firebaseApp };

  // export default base;
  // const base = firebaseApp.firestore();
  //const base = firebaseApp.database();
  export default base;