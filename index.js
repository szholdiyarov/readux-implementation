// The store should have :
// 1. The state
// 2. Get the state
// 3. Listen to changes in the state
// 4. Update the state

function createStore() {
  let state;
  let listeners = [];

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    }
  };

  return {
    getState,
    subscribe
  }
}

const store = createStore();
const unsubscribe = store.subscribe(() => console.log('subscribed'));