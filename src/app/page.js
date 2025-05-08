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

      <div>
        {state.matches('Loading Todos') && <span>Loading...</span>}
        {state.matches('Todos Loaded') 
          && <button onClick={()=> send({type: 'createNew'})}>Create New</button>}
        {state.matches('Creating new todo.Showing form input')
          && <input onChange={(e)=> send({
            type: 'formInputChanged',
            value: e.target.value
          })}></input>
        }
      </div>
    </div>
  );
}
