const pwloginmachine = {
  context: {},
  id: 'mainMachine',
  initial: 'unauthenticated',
  states: {
    unauthenticated: {
      on: {
        LOGIN: {
          target: 'loginloading',
        },
        REGISTER: {
          target: 'registerloading',
        },
      },
    },
    loginloading: {
      on: {
        CANCEL: {
          target: 'unauthenticated',
        },
        ERROR: {
          target: 'loginerror',
        },
        SUCCESS: {
          target: 'authenticated',
        },
      },
    },
    loginerror: {
      on: {
        LOGIN: {
          target: 'loginloading',
        },
        CANCEL: {
          target: 'unauthenticated',
        },
      },
    },
    registerloading: {
      on: {
        SUCESS: {
          target: 'authenticated',
        },
        ERROR: {
          target: 'registererror',
        },
      },
    },
    registererror: {
      on: {
        REGISTER: {
          target: 'authenticated',
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
        RETURN: {
          target: 'authenticated',
        },
      },
    },
  },
};

export { pwloginmachine };
