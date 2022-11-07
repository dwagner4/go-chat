import { guestfunctions } from './guestmachine.js';
import { userfunctions } from './usermachine.js';

// eslint-disable-next-line no-undef
const { createMachine, interpret } = XState;

const guestmachine = {
  context: {},
  id: 'guestMachine',
  initial: 'home',
  states: {
    home: {
      entry: ['guesthome'],
      on: {
        HOME: { target: 'home' },
        TERM: { target: 'term' },
      },
    },
    term: {
      entry: ['guestterm'],
      on: {
        HOME: { target: 'home' },
        TERM: { target: 'term' },
      },
    },
  },
};

const usermachine = {
  context: {},
  id: 'userMachine',
  initial: 'home',
  states: {
    home: {
      entry: ['userhome'],
      on: {
        HOME: { target: 'home' },
        TERM: { target: 'term' },
      },
    },
    term: {
      entry: ['userterm'],
      on: {
        HOME: { target: 'home' },
        TERM: { target: 'term' },
      },
    },
  },
};

const loginmachine = {
  context: {},
  id: 'mainMachine',
  initial: 'unauthenticated',
  states: {
    unauthenticated: {
      on: {
        LOGIN: {
          target: 'usercheck',
        },
      },
      ...guestmachine,
    },
    usercheck: {
      on: {
        CANCEL: {
          target: 'unauthenticated',
        },
        ERROR: {
          target: 'error',
        },
        SUCCESS: {
          target: 'authenticated',
        },
      },
    },
    error: {
      on: {
        LOGIN: {
          target: 'usercheck',
        },
        CANCEL: {
          target: 'unauthenticated',
        },
      },
    },
    authenticated: {
      on: {
        EDITPROFILE: {
          target: 'editprofile',
        },
        LOGOUT: {
          target: 'unauthenticated',
        },
      },
      ...usermachine,
    },
    editprofile: {
      on: {
        ERROR: {
          target: 'editprofile',
          internal: false,
        },
        SUCCESS: {
          target: 'authenticated',
        },
      },
    },
  },
};

// eslint-disable-next-line prefer-const
let mainfunctions = guestfunctions;
mainfunctions.actions = { ...mainfunctions.actions, ...userfunctions.actions };
console.log(mainfunctions.actions);

const mainMachine = createMachine(loginmachine, mainfunctions);

const mainService = interpret(mainMachine);

mainService.onTransition(state => console.log(state.value));
mainService.start();

export { mainMachine, mainService };
