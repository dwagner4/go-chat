/* eslint-disable new-cap */

import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  connectAuthEmulator,
  signOut,
} from 'firebase/auth';
// import { getFirestore, collection } from 'firebase/firestore';
// eslint-disable-next-line import/no-unresolved
// import { gsap } from 'gsap';
// import {html, render} from 'lit-html';

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
console.log(location.hostname);

// eslint-disable-next-line no-restricted-globals
// if (location.hostname === '192.168.86.220') {
//   console.log("Yo Dean")
//   // eslint-disable-next-line no-undef
//   config = {
//     databaseURL: 'http://localhost:9000?ns=go-chat',
//   };
// }

/** initialize firebase services  */
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);
connectAuthEmulator(auth, 'http://localhost:9099');
// const db = getFirestore(firebaseApp)
// const usergames = collection( db, 'games')
// Initialize the FirebaseUI Widget using Firebase.

/** PASSWORD Login
 *
 *
 */

/** detect auth state */
onAuthStateChanged(auth, user => {
  if (user) {
    console.log(user);
  } else {
    console.log('no user');
  }
});

const email = document.querySelector('#email');
// let emailValue = '';
const password = document.querySelector('#password');
// let passwordValue = '';
const userpwbtn = document.querySelector('#userpwbtn');
const newuserbtn = document.querySelector('#newuserbtn');
const signoutbtn = document.querySelector('#signoutbtn');
// const formerror = document.querySelector('#formerror');

// const emailChgHandler = e => {
//   emailValue = e.target.value;
// };
// email.addEventListener('input', emailChgHandler);

// const pwChgHandler = e => {
//   passwordValue = e.target.value;
// };
// password.addEventListener('input', pwChgHandler);

userpwbtn.onclick = () => {
  mainService.send({ type: 'LOGIN' });
  console.log('aaa');
  const emailValue = email.value;
  const passwordValue = password.value;

  signInWithEmailAndPassword(auth, emailValue, passwordValue)
    .then(userCredential => {
      mainService.send({ type: 'SUCCESS', data: userCredential });
      console.log('ccc');
    })
    .catch(error => {
      mainService.send({ type: 'ERROR', data: error });
      console.log('ddd');
    });
};

newuserbtn.onclick = () => {
  mainService.send({ type: 'REGISTER' });
  console.log('bbb');
  const emailValue = email.value;
  const passwordValue = password.value;
  createUserWithEmailAndPassword(auth, emailValue, passwordValue)
    .then(userCredential => {
      mainService.send({ type: 'SUCCESS', data: userCredential });
      console.log('eee');
    })
    .catch(e => {
      mainService.send({ type: 'ERROR', data: e });
      console.log('fff');
    });
};

signoutbtn.onclick = () => {
  mainService.send({ type: 'LOGOUT' });
  console.log('ggg');
  signOut(auth)
    .then(() => {
      mainService.send({ type: 'SUCCESS' });
      console.log('hhh');
    })
    .catch(e => {
      mainService.send({ type: 'ERROR', data: e });
      console.log('iii');
    });
};

/** End of PASSWORD Login */

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

// const clicktest = () => {console.log("fuck you Dean")}

// const pwform = html`<div class="login" id="login">
//   <h1>Login to Web App</h1>
//   <form method="post" action="">
//     <span id="formerror"></span>
//     <p><input type="text" id="name" name="login" value="" placeholder="Username or Email"></p>
//     <p><input type="password" id="password" name="password" value="" placeholder="Password"></p>
//     <p class="submit">ggggg<div class="btn" id="loginbtn" onclick="() => {console.log('fuck you Dean')}" >Sign In</div></p>
//   </form>
//   </div>
// `

// const page = document.getElementById('htmlpage')
// render( pwform, page )

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
