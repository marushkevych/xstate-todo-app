'use client';
import { useMachine } from "@xstate/react";
import { todosMachine } from "./machines/todoAppMachine";

export default function Home() {
  const [state, send] = useMachine(todosMachine, {
    services: {
      loadTodos: async () => {
        // throw new Error('Oh no!')
        return ['Take bins out', 'Do loundry']
      }
    }
  })
  return (
    <div>
      <pre>{JSON.stringify(state.value)}</pre>
      <pre>{JSON.stringify(state.context)}</pre>
    </div>
  );
}
