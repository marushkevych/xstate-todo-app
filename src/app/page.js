'use client';
import { useMachine } from "@xstate/react";
import { todosMachine } from "./machines/todoAppMachine";
import styles from "./page.module.css";

const todos = new Set(['Take bins out', 'Do loundry']);

export default function Home() {
  const [state, send] = useMachine(todosMachine, {
    services: {
      loadTodos: async () => {
        // throw new Error('Oh no!')
        return new Promise((resolve) =>{
          setTimeout(() => {
            resolve(Array.from(todos));
          }, 1000)
        })
      },
      saveTodo: async (context) => {
        // throw new Error('FAILED TO SAVE!')
        return new Promise((resolve) =>{
          setTimeout(() => {
            todos.add(context.createNewTodoFormInput)
            resolve();
          }, 1000)
        })
      },
      deleteTodo: async (context, event) => {
        console.log(event)
        // throw new Error('FAILED TO DELETE!')
        return new Promise((resolve) =>{
          setTimeout(() => {
            todos.delete(event.todo);
            resolve();
          }, 1000)
        })
      }
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    send({type: 'submit'})
  }

  const renderTodos = () => {
    return (
      <>
        <ul>
          {state.context.todos.map((todo, index) => {
            return (
              <li key={index}>
                {todo}
                <button className={styles.deleteButton} onClick={()=> send({type: 'delete', todo})}>X</button>
              </li>
            )
          })}
        </ul>
        <button onClick={()=> send({type: 'createNew'})}>Create New</button>
      </>
    );
  }
  return (
    <div>
      <pre>{JSON.stringify(state.value)}</pre>
      <pre>{JSON.stringify(state.context)}</pre>

      <div>
        {state.matches('Loading Todos') && <span>Loading...</span>}
        {state.matches('Todos Loaded') && renderTodos()}
        {state.matches('Creating new todo.Showing form input')
          && 
          <form onSubmit={handleSubmit}>
            <input onChange={(e)=> send({
              type: 'formInputChanged',
              value: e.target.value
            })}></input>
            <button type="submit">Save</button>
          </form>
        }
        {state.matches('Creating new todo.Saving Todo')
          && <span>Saving...</span>
        }
      </div>
    </div>
  );
}
