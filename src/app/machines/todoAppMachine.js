import { createMachine, assign } from 'xstate'

export const todosMachine = createMachine({
/** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogDMAFgDsFewA5bANlsBGbwE5HVydbWwAaEABPRABaR28XVz8tewBWWwAmRy1vW1dHAF988KEcAhJOCXpSRiE2MAAnetR6iiMAGxUAM2aAWwoSkXLxWiqamTkFJXNNXX1LE1gzNVJLGwR0+3sKX28gzJTvNJyPcKiEaNsUjwpkj28PDz979L8PAqKQAbKxfvHMSsgrHw9TAKjAADkwAB3OZIEALJYWOFrOJbZLpTweFKOHFPVynRC+CjYh65FIpdJaEKbeyFYoyUqiTi1f4jQEQMBtMDKMCw4ymaarRCPLQURwZPzuVyuLGvdIE87pdLXVIpV72DzJDWuLSuOmfBmDH4AYRBKik5ChmGUMgoAGVCKgoVJuvUepgyEYAK7KViunoASVI3uUxsIuGqkD58IFyyFCFc6RSFFsjgeWhSbmyGzCkUQG3S21TgV2OSy2VpHy+TMoptBqmqmEt1ttDqdLt6HuDPtYsC9ACMemZowjBcjEJnrjL3H4HFj7H5Fwr-KK-GkZWmDgd7N5K-SMIyhhQ6+bG82bRh7bhuFIhOx1JQFAJfgejZwTw3GOfW9fbzJ5KQvBTMs+gjrGSKgGsBYUDqaQ7pciazsuMrbB46T+CkQTeGmPj6tWR4fha0Itpedq-o2d4NE0LTtF0vQvsI3zvman5NsRF6oFeN4Uf+kzmuooG6PM4ErOOCAPFsTibIurjeC8GKOAqISuBQHjathu7imhth4YaTGUAAIpy3J-hg96cE+gh6TWFBGVyrFCABQH8TMehCXCo5xmJTjJqmjw5BiWhJo49gKhcmpitkrgUukQRpO8+6MTZdkmTxZlUc0rQdMo-oMYePwpQ5vGAYoLmCQYHkifGMpbI8IQhOhXhhRKFABNpGbYj4aq6a++m2cZRUHgAoo0zTssQsBDrAsAjdRYGLGOkGIEk8RxVogRYlKil5ucjwJMk2K7JssU5D1SVHoVplYLNY0QKwViwMoYIULgnQ8vUAAUthaD9ACUrD4QVA1XZgN0ghA82IqJS0IDhLhJgFjgUkjmFhWWqlvCkP2bI4Ly2AEZ35RUIxXWwHCPiVz6A8TkhpbITmldMoHeBV-ILV5MMOMmarfSEVKbAcaZKWiGxap4SM5EEhQfKQ6BwJY1NgMJ7MQdYhJ+FssEODkmF42FmbxIcaSBUFMUeITb7DLTYwsMrUPxrkKmLmkmH2D4aH3GFlIqWLbhJNFbxUhbfUsgCEB24tauw8kFBJnz7jodh6FhXcYppkjO6NeS0p7gavU2ZUpOg6N4MRxzUexdcXiUlSWMG9FoU7dEqS2Kp5IZB4M4hWuwc2YRZ7sTIZeq2s9jKrHOo-fjWT+EkJw7d4VIuOuqLSiFvi9wRLFEVaHH2o6zqNv6XYhsP0NR28hYhamyS7iKvjLkkrXrm8WKHLuu6bya28D7vP7cTbVAZ94xSQnj9KkARsiLi0PPM4GRVpqjXGPPwGxsRf04JdOmwCxJYkLLFNwOIlRYlyI3M4FwQqtXwZqN2aEgoJTzudIG9kQZg0gNgmGiZnDahinJIKs5vBe2yK1a+akSQ6lOtLIAA */
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

        onDone: [{
          target: 'Todos Loaded',
          actions: 'assignTodosToContext',
          cond: "hasTodos"
        }, "Creating new todo"],

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
          target: "Deleting Todo Errored",
          actions: 'assingErrorToContext',
        }
      }
    },

    "Deleting Todo Errored": {
      after: {
        "3000": "Todos Loaded"
      },

      on: {
        dismissError: "Todos Loaded"
      }
    }
  },
},{
  guards: {
    hasTodos(context, event) {
      return event.data.length > 0
    }
  },
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