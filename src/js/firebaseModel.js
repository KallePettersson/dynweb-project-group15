import { initializeApp } from "firebase/app";
import { firebaseConfig } from './firebaseConfig';
import { getDatabase } from "firebase/database";
import firebase from "firebase/app";
import store from "./store";

console.log(firebaseConfig);
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

// function persistModel(model){
//     const REF = "dinnerModel";
//     let loadingFromFirebase=false; // boolean flag, used in a JS closure
//     model.addObserver(function(){
//         if(loadingFromFirebase){
//             return;
//         }
//         firebase.database().ref(REF).set({ // object literal
//             guests: model.numberOfGuests,
//             dishes: model.dishes,
//             currentDish: model.currentDish,
//         });
//     });
//     firebase.database().ref(REF).on("value", function(data){
//         loadingFromFirebase = true;
//         try {
//             if (data.val().criteria) {
//                 store.dispatch({
//                     type:"SELECT_CRITERIA",
//                     payload:{
//                         criteria: data.val().criteria,
//                     }
//                 })
//             }
//         } catch (e) {
//             console.log(e)
//         } finally {
//             loadingFromFirebase = false;
//         }
//     });
// }