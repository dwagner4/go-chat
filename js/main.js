/* eslint-disable new-cap */

import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { getFirestore, collection } from 'firebase/firestore';
// eslint-disable-next-line import/no-unresolved
// import { gsap } from 'gsap';

/**
 * import the Finite State Machine
 */
import { mainService } from './mainFSM/mainMachine.js';

/**
 * connect to backend
 */

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCSs9KYOLZgvFMunJZ7d821KFmzrW7rK-U',
  authDomain: 'go-chat-c0097.firebaseapp.com',
  projectId: 'go-chat-c0097',
  storageBucket: 'go-chat-c0097.appspot.com',
  messagingSenderId: '668110828333',
  appId: '1:668110828333:web:cbcd00526e565e656d19a4',
  measurementId: 'G-LHZ89WFFGR',
};

// eslint-disable-next-line no-restricted-globals
if (location.hostname === 'localhost') {
  // eslint-disable-next-line no-undef
  config = {
    databaseURL: 'http://localhost:9000?ns=go-chat',
  };
}

/** initialize firebase services  */
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);
// const db = getFirestore(firebaseApp)
// const usergames = collection( db, 'games')
// Initialize the FirebaseUI Widget using Firebase.

/** detect auth state */
onAuthStateChanged(auth, user => {
  if (user !== null) {
    console.log('Logged in');
  } else {
    console.log('no user');
  }
});

/**
 * identify html elements and attach listeners
 *
 * const homebtn = document.querySelector('#homebtn')
 * homebtn.onclick = () => {mainService.send({type: 'HOME'})}
 * ...
 * homebtn.onmouseover = homeover
 * homebtn.onmouseout = msgout
 */
const homebtn = document.querySelector('#homebtn');
homebtn.onclick = () => {
  mainService.send({ type: 'HOME' });
};
const termbtn = document.querySelector('#termbtn');
termbtn.onclick = () => {
  mainService.send({ type: 'TERM' });
};
const loginbtn = document.querySelector('#loginbtn');
loginbtn.onclick = () => {
  mainService.send({ type: 'LOGIN' });
};
const cancelbtn = document.querySelector('#cancelbtn');
cancelbtn.onclick = () => {
  mainService.send({ type: 'CANCEL' });
};
const successbtn = document.querySelector('#successbtn');
successbtn.onclick = () => {
  mainService.send({ type: 'SUCCESS' });
};
const profilebtn = document.querySelector('#profilebtn');
profilebtn.onclick = () => {
  mainService.send({ type: 'EDITPROFILE' });
};
const errorbtn = document.querySelector('#errorbtn');
errorbtn.onclick = () => {
  mainService.send({ type: 'ERROR' });
};
const logoutbtn = document.querySelector('#logoutbtn');
logoutbtn.onclick = () => {
  mainService.send({ type: 'LOGOUT' });
};

const caption = document.querySelector('#caption');

// const fadeDuration = 1;

/**
 * create Global stage
 */
// const container = document.querySelector('#scene-container');
// const stage = new Act1(container, {
//   controller: { type: 'orbit' },
//   debug: false,
// });
// stage.init();

// gsap.to(stage.overlayMaterial.uniforms.uAlpha, {
//   duration: fadeDuration,
//   value: 1,
//   onComplete: () => mainService.send({ type: 'HOME' }),
// });
// };

/**
 * concatenates state.value keys with final text value, assumes xState state.value
 * like,
 * home: { secondstage: 'bigpicture'} => homesecondstagebigpicture
 * any state with a unique world must be listed in FSM subscription
 */
// eslint-disable-next-line no-unused-vars
const parseState = stateValue => {
  const header = [];
  let childState = stateValue;
  let loop = true;
  while (loop) {
    if (typeof childState === 'string' || childState instanceof String) {
      header.push(childState);
      loop = false;
    } else {
      const keys = Object.keys(childState);
      const localKey = keys[0];
      header.push(localKey);
      childState = childState[localKey];
    }
  }

  let startStr = '';
  for (let i = 0; i < header.length; i += 1) {
    const element = header[i];
    startStr += element;
  }
  return startStr;
};

/**
 * subscribe to ui state
 * lazy load world objects and initialize
 * change html element state
 *
 */
let currentStateStr = null;

mainService.subscribe(state => {
  homebtn.style.display = state.context.homebtn;
  termbtn.style.display = state.context.termbtn;
  caption.innerHTML = parseState(state.value);

  // changing world, don't want to restart world if not changed
  const stateStr = parseState(state.value);

  if (stateStr !== currentStateStr) {
    if (stateStr === 'home') {
      import('./scenes/HomeScene.js').then(module => {
        const stage = new module.default('scene-container');
        stage.init();
        stage.start();
        console.log(stage);
      });
    }
    if (stateStr === 'term') {
      console.log('AAA');
      import('./scenes/TermScene2.js').then(module => {
        const stage = new module.default('scene-container');
        stage.init();
        stage.start();
        console.log(stage);
      });
    }
    currentStateStr = stateStr;
  }
});
