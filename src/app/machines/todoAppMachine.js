import { createMachine, assign } from 'xstate'

export const todosMachine = createMachine({
/** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogAsAZgBsFAEyOtATgCMXxwFY-Fw9HAHY-ABoQAE9EAFoXWwAOCkSPP3stRPcvF09HFwBfAsihHAISTgl6UkYhNjAAJwbUBoojABsVADMWgFsKUpEK8Vpq2pk5BSVzTV19SxNYMzVSSxsEe0StV1s0vw8PLXtbfcTbSJiEWNCKexc-LT9E+x8s73sikpky0U46zCqkFY+AaYBUYAAcmAAO7zJAgRbLCzw9aHWwUXYOLwBLIhF5eC5xQIUHxeEJeDy2LRBZ4uNyfECDcpiAYTAGjIEQMDtMDKMBw4ymGZrRCOWzONEhQ6BWziu6Eq5eWUpWxBTYhJJeD7FRnfIYsgDCoJUUnI0MwyhkFAAyoRUNCpD0Gr1MGQjABXZSsJ29ACSpA9ygNhFwNUgAoRQpWIoQGpct0SviOdK0ng1CqCIQooUp+TpoRCdIZTN+lCNYNUNUwZotVtt9sdfVdAc9rFg7oARr0zBHEcKUXYpSl7E4QokXBSvIkwhn7H4KE8XGPC45E1tV8W9czOOWTVWa5aMDbcNwpEJ2OpKAoBKyMD9hhRd5XGAe6yezzJ5KReNMVvpe1GyKgOsU4eBQWi2CEjxaHmBxPCEGZLhiqYQeSxzjo4+Sbne+o7saz7VjCtZHta75VuejTNK0HTdH0t7CNuZb4aaRGHqgx6nuRn5TCa6j-roCyAasA4IPsWYOB4Y4nJhjg+PYCqbPYrhhHioRitSiSJNhDGlhQAAi3K8h+GAXpw16CFuukGTyBFCF+P68bMegCfCfbRiJbjoppUF3DkdyUgS0SIMcC4wTBti+Em3jitp94stZRlcSZlEtG0nTKD69FxZwCW2dx36KI5-EGK5QkxlBzj+GEfhakujyOAqsReNS2Yjt4Piphksm2EUOqkOgcCWCWwyCUs-bAYgSpeOBkHQbBaTTo1I7JBF07ioc0Xjj1OrDSyVTGbIo1IsJE0IC49hZhddznYmjgeC4ZyNfc2zeGtslaDkeSFDtlkPv8gIQEd43WKKmEkkmFInFS3hPUhq0an4+SPFdsW4SMkhJbImAAKJNC0kBA+5p32B4Snko4c5+A4FMPZJjVaui3gPOdmSUicYSo4xj7MfurEyITQEgxs+w7IE3k3VkFMKkqySZA9S7YkckFapzulPix5psTadoOlWPrNoGAsnUL7jzlBqSaYcjzebO86LsubhrjBWk-ThXPq7zmtvpx4wYEbMZUlmCRi9OEuYfJQUbGDSTeSTnh+X4qsPrlB3+yJmFeUEYlKkED0IZHbjDhBsrHEkLwTttRRAA */
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
        createNew: "Creating new todo",
        delete: "Deleting Todo"
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
        }
      },

      initial: "Showing form input"
    },

    "Deleting Todo": {
      invoke: {
        src: 'deleteTodo',

        onDone: {
          target: "Loading Todos",
        },

        onError: {
          target: "Todos Loaded",
          actions: 'assingErrorToContext'
        }
      }
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