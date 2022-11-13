import { pwloginmachine } from './pwloginmachine.js';
import { guestfunctions, guestmachine } from './guestmachine.js';
import { userfunctions, usermachine } from './usermachine.js';

// eslint-disable-next-line no-undef
const { createMachine, interpret } = XState;

// eslint-disable-next-line prefer-const
let mainfunctions = guestfunctions;
mainfunctions.actions = { ...mainfunctions.actions, ...userfunctions.actions };

const mainfsm = pwloginmachine;
mainfsm.states.authenticated = {
  ...mainfsm.states.authenticated,
  ...usermachine,
};
mainfsm.states.unauthenticated = {
  ...mainfsm.states.unauthenticated,
  ...guestmachine,
};

const mainMachine = createMachine(mainfsm, mainfunctions);

const mainService = interpret(mainMachine);

// eslint-disable-next-line no-console
mainService.onTransition(state => console.log(state.value));
mainService.start();

export { mainMachine, mainService };
