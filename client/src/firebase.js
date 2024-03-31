// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import { GoogleAuthProvider, getAuth } from 'firebase/auth';

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//     authDomain: 'mern-blog-827e4.firebaseapp.com',
//     projectId: 'mern-blog-827e4',
//     storageBucket: 'mern-blog-827e4.appspot.com',
//     messagingSenderId: '1045256459831',
//     appId: '1:1045256459831:web:9dfc027b0e41e7edecd1b2'
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

// export { auth, provider };
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-blog-b327f.firebaseapp.com',
  projectId: 'mern-blog-b327f',
  storageBucket: 'mern-blog-b327f.appspot.com',
  messagingSenderId: '699397991367',
  appId: '1:699397991367:web:88ff565ef72a182d6b87e2',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
