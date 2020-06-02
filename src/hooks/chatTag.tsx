import React from 'react';

interface TagState {
  //@ts-ignore
  tag: Pick<UserData, 'userId', 'username'>;
  wasSet: boolean;
  tagOptions: Array<UserData>;
}

type ConsumeTag = () => void;
type SetTag = (arg0: UserData) => void;

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
      return { ...state, tag: {userId: '', name: '', username: ''}, wasSet: false };
    case TagActionTypes.Set:
      return { ...state, tag: action?.payload.tag ?? {userId: '', name: '', username: ''}, wasSet: true };
  }
}

export default ({
  options,
  children,
}: {
  children: React.ReactNode;
  options: Array<UserData>;
}) => {
  const [state, dispatch] = React.useReducer(reducer, {
    tag: {userId: '', name: '', username: ''},
    wasSet: false,
    tagOptions: options,
  });

  return <TagProvider value={[state, dispatch]}>{children}</TagProvider>;
};
