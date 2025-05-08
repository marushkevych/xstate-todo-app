import { createMachine, assign } from 'xstate'

export const todosMachine = createMachine({
/** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogBMW2xS0B2AGwBGV88-OALB4BWVwAaEABPRABaXwoATgDfAGYA+Pd3AA5kgOdEgF9c0KEcAhJOCXpSRiE2MAAnWtRaiiMAGxUAM0aAWwoikVLxWgqqmTkFJXNNXX1LE1gzNVJLGwRIxMcArVdXRIytX3SE9K3QiIQ09Ip-dP8t9y1E2OP3fIKQUnQ4Sz6SsVnTSbLKKxLRORJaLYg9K2WJPdy2U7A5xXdz+ZzOGFaWLOFKufKFGTFURlIZSar-eaApDWKK+dwUeHpVwBTK+CEBWyJRGrWJxVFeHYY9yxWyeWz4kA-YmCUaYcqQCkLCzUlbgxIUVy2Vz+Xyxe6CkLhRCeemJdGxVyw+IuG7it5SgbUUmVaQsTAAUXqjQV1LmSqWKtpjgeEMtWmhsPS8IC3Ps9ItiWZ2OFqN8CVeuSAA */
  id: "Todo Machine",
  initial: "Loading Todos",
  context: {
    todos: [],
    errorMessage: null
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

    "Todos Loaded": {},
    "Loading Todos Errored": {}
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
    })
  }
}) 