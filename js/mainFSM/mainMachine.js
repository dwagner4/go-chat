import { appmachine, appfunctions } from './appmachine.js';
import { loginmachine } from './loginmachine.js';

// eslint-disable-next-line no-undef
const { createMachine, interpret } = XState;

/** add appmachine child fsm to the authenticated state of login */
const mainfsm = loginmachine;
let authstate = mainfsm.states.authenticated;
authstate = { authstate, ...appmachine };
mainfsm.states.authenticated = authstate;

// eslint-disable-next-line prefer-const
let mainfunctions = appfunctions;

const mainMachine = createMachine(mainfsm, mainfunctions);

const mainService = interpret(mainMachine);
mainService.onTransition(state => console.log(state.value));
mainService.start();

export { mainMachine, mainService };
