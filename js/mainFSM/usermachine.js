// eslint-disable-next-line no-undef
const { assign } = XState;

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

const userfunctions = {
  actions: {
    userhome: assign({
      homebtn: 'none',
      termbtn: 'block',
      caption: 'This is the Home Scene',
    }),
    userterm: assign({
      homebtn: 'block',
      termbtn: 'none',
      caption: 'Terminal Scene',
    }),
  },
};

export { usermachine, userfunctions };
