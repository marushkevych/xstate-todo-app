import { createMachine, assign } from 'xstate'

export const todosMachine = createMachine({
/** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogAsAZgDsFe-YBMWxwA4AbLce2XrZuAKwANCAAnogAtG5eXhRaIQCMXgCcwZkhPukAvnkRQjgEJJwS9KSMQmxgAE51qHUURgA2KgBmTQC2FMUiZeK0ldUycgpK5pq6+pYmsGZqpJY2CPZeKS4ejm4+GTn+9rYR0QgxKVo+FIEpfrZayW7xIQVFMiWinDWYFZCs+HUwCowAA5MAAd1mSBA80WFmhq3SIRCFACu0uPi0bnsORSJ1iXhRDxCWg2lxCmXWjleIH6pTEfTGP2GfwgYFaYGUYChxlMUxWiD8znSjgpIVFtx8JMc+LOaXsFHSSpCblsapSgXSThpdM+lAAwoCVFJyODMMoZBQAMqEVDgqRdOrdTBkIwAV2UrEd3QAkqR3cp9YRcFVIDyYXylgKEKL0tcUvZkjtQkrMrLVc4fBcUilxU4HjsvDr3gMGYagaoqphTebLTa7Q6ei7-R7WLA3QAjbpmcOw-kIuxeLSKrSBWwqnNOcJRRApdJXYI+Dy5gJeNwJ4sYD6DCjl41VmsWjDW3DcKRCdjqSgKASMrelzh7yuMQ910-nmTyUi8SZLfS9yN4VAVYUkcBctUcZJgmxexQOOGcEDSZwQlgxN3ATHJSU3YR6UfI1n2rCFa2PK13yrC96kaZo2k6Ho7xwvVd3wk0iKPVATzPcjPwmY11H-XQ5kA5YBwQClElSLQkVzEIvEcdIEllI5bAoHN0lzC5IJ8XIHGw7cGQAEXZTkPwwS9OBvQQS1wyhDI5AihC-H9eOmPQBOhPsoxE3YUSRDYlRzEIbh8WUYmUqVHlzWDRSxNx8kKWkrMY2zjK40zKKaFp2mUb16L0zhkvs7jv0UZz+IMdyhOjMCrlcW5sQpXYNhClEEkcbw9g1JFYoyXSHxsozCq3ABRBomlZYhYG7WBYBGqiAIWftgMQQlNlAjUKVsW5Nq0PEEPOTJUT2O4fCcewpTO3rrIoAqTKwWaxogVgrFgZRgQoXAOi5OoAApEweABKVhdR3G7Uru0bAQgea4WEpaYzVCgfDk7r5MuWDgr2tI3GuZVVXVLMlVsAp4tIdA4EsYGxEEhbPLhlJ4hx-NAqeWqAhCpxkNFdwqSzDFLsYipbvgCqaaA6xEHXRJ0kuDUNVQhMnhC2Lh08FCouyPYRX5ndvl+CBqZhqqwJHSDdmxLSzplPbdiucU1bVXxsXHbWGUFsHYEwe7IYNxbxbWA7vFFJ5ghWoUQrgpJHFuUlvHiZIN3iym8IrFizTYn3ab9s7h3R8dxWjgIE1lC4pbNzbIvWUkfBd5P9xfVi61te0q29ZsAwzsXVkxK5vB25EMjcNql2L+drjNvvV3Xewa4NZiDwbkiyNGDAO9hv37kSXPkSjzFC-sRTB5cdx4jXFc-FzGfroG27V+jQLEnuewIPndxNrcELhRzYOcRO+4tJSS+oNl7gyopAW+IkwI538KEUcltbDznDjiRUKEhyyRXLmdIbhiZ5CAA */
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