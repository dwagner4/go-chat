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
