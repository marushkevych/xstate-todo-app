import { createMachine, assign } from 'xstate'

export const todosMachine = createMachine({
/** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogBMW2xS0B2AGwBGV88-OALB4BWVwAaEABPRABaXwoATgDfAGYA+Pd3AA5kgOdEgF9c0KEcAhJOCXpSRiE2MAAnWtRaiiMAGxUAM0aAWwoikVLxWgqqmTkFJXNNXX1LE1gzNVJLGwRIxMcArVdXRIytX3SE9K3QiIQ09Ip-dP8t9y1E2OP3fMKZYtFOasxyyFZ8WpgFRgAByYAA7jMkCA5gsLNCVsl3BR3L4AhlEv5EodXLYQuFEO5HnE0Q5Eq4tLF4g9nK8QH0SmIKABhQEqKTkcGYZQyCgAZUIqHBUk6tS6mDIRgArspWKKugBJUjS5TMwi4SqQKHGUyTZaIXyUpzOdJE9wpWIPbGnRDJLQUHaxXy+PEBXaW5y0umkdBwSwMz5gWa6xb61aWpyJLRbS3pWxU022G3h5xXVFeZzxynOFKuOkBgbUIZSarB+Z6hFRXzI9y2dKuAKZQ1aAK2RLJyKxOLptyJTPuWK2Ty2fPvfpM76-CBluFLSsIdaXBzOKkJPGotsBZM3CiHJ1E1ueqNE0cYD6F8ol0aYACi9UakBnFdAK2ijge0dcsfjT1rW4JCD2MisQ7A2sTeLEqJor4p7CIynCskCqiVJgnLcjIT6hvO6zIn2mz7AEKQODczjJkBDqPM6Wj1kOSTpLEsHnkyiHsihaE8hg-KCsKKHyhKyoyph8IvraX4UHh0ZokRda+KRAF1pcRJOtWOZuF4eT5LkQA */
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
            }
          }
        }
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