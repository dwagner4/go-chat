const loginmachine = {
  context: {},
  id: 'mainMachine',
  initial: 'unauthenticated',
  states: {
    unauthenticated: {
      entry: [() => console.log('fuck you too')],
      on: {
        LOGIN: {
          target: 'usercheck',
          actions: [() => console.log('fuck you')],
        },
      },
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

export { loginmachine };
