
/** 
 * Characteristics of the pure functions:
 * 1. They always returns the same result if the same arguments are passed in.
 * 2. They only on theirs on scope.
 * 3. Never produce any side effects.
 */
function todos(state = [], action) {
  if (action.type === 'ADD_TODO') {
    return state.concat([action.todo]);
  } else if (action.type === 'REMOVE_TODO') {
    return state.filter((item) => item.id !== action.id)
  } else if (action.type === 'TOGGLE_TODO') {
    return state.map((item) =>
      item.id !== action.id ? item : Object.assign({}, item, { complete: !item.complete })
    )
  }

  return state;
}

// The store should have :
// 1. The state
// 2. Get the state
// 3. Listen to changes in the state
// 4. Update the state
function createStore(reducer) {
  let state;
  let listeners = [];

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    }
  };

  const dispatch = (action) => {
    // call reducer
    state = reducer(state, action);

    // invoke listeners
    listeners.forEach(listener => listener());
  }

  return {
    getState,
    subscribe,
    dispatch
  }
}

const store = createStore(todos);
console.log('store is ', store);

const unsubscribe = store.subscribe(() => console.log('new state is ', store.getState()));
console.log('unsubsribe is ', unsubscribe);

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 0,
    title: 'Hello, World!',
    complete: false,
  }
})

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 1,
    title: 'Hello, Home!',
    complete: false,
  }
})

store.dispatch({
  type: 'TOGGLE_TODO',
  id: 0,
})
