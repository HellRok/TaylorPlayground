import { ExampleData } from "./example_data";
import { playgroundParams } from "./playground_params";

const params = playgroundParams.parse(window.location.hash);

const defaultExample = "welcome.rb";
export const initialState = {
  version: params.version || ExampleData.initialVersion(),
  example: params.code ? "custom.rb" : defaultExample,
  code:
    params.code ||
    ExampleData.codeFor(ExampleData.initialVersion(), defaultExample),
  runningCode:
    params.code ||
    ExampleData.codeFor(ExampleData.initialVersion(), defaultExample),
};

type SetVersionAction = {
  type: "setVersion";
  version: string;
};

type SetExampleAction = {
  type: "setExample";
  example: string;
};

type SetCodeAction = {
  type: "setCode";
  code: string;
};

type RunCodeAction = {
  type: "runCode";
};

export type StateAction =
  | SetVersionAction
  | SetExampleAction
  | SetCodeAction
  | RunCodeAction;

export function stateReducer(state: typeof initialState, action: StateAction) {
  switch (action.type) {
    case "setVersion": {
      return {
        version: action.version,
        example: defaultExample,
        code: ExampleData.codeFor(action.version, defaultExample),
        runningCode: ExampleData.codeFor(action.version, defaultExample),
      };
    }

    case "setExample": {
      return {
        ...state,
        example: action.example,
        code: ExampleData.codeFor(state.version, action.example),
        runningCode: ExampleData.codeFor(state.version, action.example),
      };
    }

    case "setCode": {
      return {
        ...state,
        example: "custom.rb",
        code: action.code,
      };
    }

    case "runCode": {
      return {
        ...state,
        runningCode: state.code,
      };
    }
  }
}
