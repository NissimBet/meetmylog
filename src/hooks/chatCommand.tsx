import React from 'react';

interface CommandState {
  command: string;
  wasSetC: boolean;
  commandOptions: Array<string>;
}

type ConsumeCommand = () => void;
type SetCommand = (arg0: string) => void;

enum CommandActionTypes {
  Consume,
  Set,
}

interface CommandAction {
  type: CommandActionTypes;
  payload?: CommandState;
}

const CommandContext = React.createContext<
  [CommandState, React.Dispatch<CommandAction>] | undefined
>(undefined);

const { Provider: CommandProvider } = CommandContext;

export function useCommandContext() {
  const [command, commandDispach] = React.useContext(CommandContext);

  const consumeC: ConsumeCommand = () => {
    commandDispach({ type: CommandActionTypes.Consume });
  };

  const setC: SetCommand = newCommand => {
    commandDispach({
      payload: { command: newCommand, wasSetC: true, commandOptions: [] },
      type: CommandActionTypes.Set,
    });
  };
  return {
    ...command,
    consumeC,
    setC,
  };
}

function reducer(state: CommandState, action: CommandAction) {
  switch (action.type) {
    case CommandActionTypes.Consume:
      return { ...state, command: '', wasSetC: false };
    case CommandActionTypes.Set:
      return {
        ...state,
        command: action?.payload.command ?? '',
        wasSetC: true,
      };
  }
}

export default ({
  options,
  children,
}: {
  children: React.ReactNode;
  options: Array<string>;
}) => {
  const [state, dispatch] = React.useReducer(reducer, {
    command: '',
    wasSetC: false,
    commandOptions: options,
  });

  return (
    <CommandProvider value={[state, dispatch]}>{children}</CommandProvider>
  );
};
