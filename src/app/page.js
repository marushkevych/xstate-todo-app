'use client';
import { useMachine } from "@xstate/react";
import { myMashine } from "./machines/myFirsttMachine";

export default function Home() {
  const [state, send] = useMachine(myMashine)
  return (
    <div>
      {state.value}
      <button onClick={()=> send({type: 'MOUSEOVER'})}>MOUSEOVER</button>
      <button onClick={()=> send({type: 'MOUSEOUT'})}>MOUSEOUT</button>
    </div>
  );
}
