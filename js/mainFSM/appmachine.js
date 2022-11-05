// eslint-disable-next-line no-undef
const { assign } = XState;

const appmachine = {
  context: {},
  id: 'appMachine',
  initial: 'home',
  states: {
    home: {
      entry: ['selecthome'],
      on: {
        HOME: { target: 'home' },
        TERM: { target: 'term' },
      },
    },
    term: {
      entry: ['selectterm'],
      on: {
        HOME: { target: 'home' },
        TERM: { target: 'term' },
      },
    },
  },
};

const appfunctions = {
  actions: {
    selecthome: assign({
      homebtn: 'none',
      termbtn: 'block',
      caption: 'This is the Home Scene',
    }),
    selectterm: assign({
      homebtn: 'block',
      termbtn: 'none',
      caption: 'Terminal Scene',
    }),
  },
};

export { appmachine, appfunctions };
