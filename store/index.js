import { createStore } from 'redux'
import reducer from '../reducers'

function configureStore(initialState) {
    const store = createStore(reducer, initialState);
  
    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('../reducers', () => {
        const nextRootReducer = require('../reducers/index');
        store.replaceReducer(nextRootReducer);
      });
    }
  
    return store;
  }
  
  const store = configureStore({ });

  export default store;