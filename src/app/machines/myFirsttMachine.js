import { createMachine } from 'xstate'

export const myMashine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOnwHsAXACXIDcwAnSAYgFkB5AVQGUBRDgDU+AJQDaABgC6iUAAdysXJVzl8skAA9EEgDQgAnjoC+x-Wix5CpbPSatOvAVwAqkmUhAKlKtRu0IALQAjMEAbCQArAAswQCccQBMwQAcAOyR+kYIkQDMJHFh6ZGmZiAUEHAaFjgExBreyqrqngEhYdFRsQnJxVmIIbkpJPHRkXF5uWFxwdESYabmGLXWZFS0DMwQDYpNfq0DKYkkEikScbmJYcFpqRn9QZESJNNjE7lTM3MLZTVWxCRbJtIDsfM1-IgYgVEpE0ilgjCHrMJKVjEA */
  initial: 'notHovered',
  states: {
    notHovered: {
      on: {
        MOUSEOVER: {
          target: 'hovered'
        }
      }
    },
    hovered: {
      on: {
        MOUSEOUT: {
          target: 'notHovered'
        }
      }
    }
  }
})