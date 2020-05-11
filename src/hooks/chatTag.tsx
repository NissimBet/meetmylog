import React from 'react';

interface TagState {
  tag: string;
  wasSet: boolean;
  tagOptions: Array<string>;
}

type ConsumeTag = () => void;
type SetTag = (arg0: string) => void;

enum TagActionTypes {
  Consume,
  Set,
}

interface TagAction {
  type: TagActionTypes;
  payload?: TagState;
}

const TagContext = React.createContext<
  [TagState, React.Dispatch<TagAction>] | undefined
>(undefined);

const { Provider: TagProvider } = TagContext;

export function useTagContext() {
  const [tag, tagDispatch] = React.useContext(TagContext);

  const consume: ConsumeTag = () => {
    tagDispatch({ type: TagActionTypes.Consume });
  };

  const set: SetTag = newTag => {
    tagDispatch({
      payload: { tag: newTag, wasSet: true, tagOptions: [] },
      type: TagActionTypes.Set,
    });
  };

  return {
    ...tag,
    consume,
    set,
  };
}

function reducer(state: TagState, action: TagAction) {
  switch (action.type) {
    case TagActionTypes.Consume:
      return { ...state, tag: '', wasSet: false };
    case TagActionTypes.Set:
      return { ...state, tag: action?.payload.tag ?? '', wasSet: true };
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
    tag: '',
    wasSet: false,
    tagOptions: options,
  });

  return <TagProvider value={[state, dispatch]}>{children}</TagProvider>;
};
