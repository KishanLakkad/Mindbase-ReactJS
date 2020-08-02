import React from "react";
import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDLw9JtQHX-DogmImH-H3qCOPE5Kz775Fc",
  authDomain: "pulse-5b790.firebaseapp.com",
  databaseURL: "https://pulse-5b790.firebaseio.com",
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
