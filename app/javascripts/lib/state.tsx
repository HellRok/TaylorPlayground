import { createContext, useContext, useReducer, ActionDispatch, PropsWithChildren } from 'react';

import { initialState, StateAction, stateReducer, } from "./state_reducer";

const StateContext = createContext<[
  (typeof initialState),
  ActionDispatch<[action: StateAction]>
]>([
  initialState,
  (action: StateAction) => { action },
]);

export function StateProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(
    stateReducer,
    initialState
  );

  return (
    <StateContext value={[state, dispatch]}>
      {children}
    </StateContext>
  );
}

export function useStateContext() {
  return useContext(StateContext);
}
