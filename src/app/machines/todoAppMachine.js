import { createMachine, assign } from 'xstate'

export const todosMachine = createMachine({
/** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogBsAFgBMFAOyOHWgKxPbtgIxajgA0IACeiAC0jgDMthTRWtGeno5+ngAcLraBAL45IUI4BCScEvSkjEJsYABONag1FEYANioAZg0AthSFIiXitOWVMnIKSuaauvqWJrBmaqSWNgjRftEU9gCc6Vp+MX72abYh4QgRLi4UqdH29skZ0dvR6XkFMkWinFWYZZCs+DUwCowAA5MAAd2mSBAs3mFmhy1sFwotk2njS3nc-kCJ0i9nS8S0Wk2tnSmQeDmirxAvWKYgoAGFASopORwZhlDIKABlQiocFSDo1TqYMhGACuylYQs6AElSBLlAzCLgKpAocZTBMlnZkvFNk5Ni4-Aa-OkHLiEI5rRR0b5svZUY6SVT8jT3n16UygaoKpg2Ryubz+YKuqKFZLWLBxQAjTpmDUwrULHUrPxxdMGzxE9GbPNpS17OL2Z7m7OOQ6eVF+am0z6Ub0sv0BzkYHm4bhSITsdSUBQCHoeumcRu+xgtoMdrsyeSkXjjBb6ROw7UIxAmy4xbJ+NLWjIuJKWlybDYm01V9Jo9KOF5uuv9RnMsf+iGBtvcqd+7u1eqNFrtLpBwwD4H1HVlX1bVB207L8ZzGFl1CXXQZmTeFQGWQ44l8HdomPW4kQuY4wkQRwDQoTYvANFx0lWO5sk8PI3VIdA4Ese8xBQuZV3Q9dnhRJwnACbMDQNS0ImiRxPAoa9UU2AJjQNLdayHetqEGacWE4uFFjXBAzUufFrwNQ4dwyJwxJiAkJNRS9bH3bJHGU4DPS+EYfkGSAtO46w7CRcitGyTZSKxAJgmIs5TIoDdcISVJqOvBi7xUh8yg02RMAAUTqBpPOhFcU10ks-AoRIcOCklPFE8KIgOdYzXNBwDlJbMMic4RhwbJ9wPZSCvIKni9PNfiK1SLxiS2exLRiVx0k8G4AqJbY0WotqQK9LrmwgoM+QFP0ZXDRU+rQnyEGSZwUl8CsLv2PxCx3K5ZpuRxdkOY1SVWlzOp9bq3ygj8YOGDAjp0gaYnsYbBLGkTJvCk0tCuWiKwovw3HRRzGKAA */
  id: "Todo Machine",
  initial: "Loading Todos",
  context: {
    todos: [],
    errorMessage: null,
    createNewTodoFormInput: null
  },
  states: {
    "Loading Todos": {
      invoke: {
        src: 'loadTodos',

        onDone: [
          {
            target: 'Todos Loaded',
            actions: 'assignTodosToContext'
          }
        ],

        onError: {
          target: "Loading Todos Errored",
          actions: 'assingErrorToContext'
        }
      }
    },

    "Todos Loaded": {
      on: {
        createNew: "Creating new todo"
      }
    },
    "Loading Todos Errored": {},
    "Creating new todo": {
      states: {
        "Showing form input": {
          on: {
            formInputChanged: {
              actions: 'assingFormInputToContext'
            },

            submit: "Saving Todo"
          }
        },

        "Saving Todo": {
          invoke: {
            src: 'saveTodo',

            onDone: [
              {
                target: '#Todo Machine.Loading Todos'
              }
            ],

            onError: [
              {
                target: 'Showing form input',
                actions: 'assingErrorToContext'
              }
            ]
          }
        },

      },

      initial: "Showing form input"
    }
  },
},{
  actions: {
    assignTodosToContext: assign((context, event) => {
      return {
        todos: event.data
      }
    }),
    assingErrorToContext: assign((conext, event) => {
      return {
        errorMessage: event.data.message
      }
    }),
    assingFormInputToContext: assign((conext, event) => {
      return {
        createNewTodoFormInput: event.value
      }
    })
  }
}) 