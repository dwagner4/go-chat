// eslint-disable-next-line no-undef
const { assign } = XState;

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

const guestfunctions = {
  actions: {
    guesthome: assign({
      homebtn: 'none',
      termbtn: 'block',
      caption: 'This is the Home Scene',
    }),
    guestterm: assign({
      homebtn: 'block',
      termbtn: 'none',
      caption: 'Terminal Scene',
    }),
  },
};

export { guestmachine, guestfunctions };
