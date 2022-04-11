//display state value before and after an action is performed on the page

export const logger = store => next => action => {
    if (typeof action === 'function') {
        //handle the specific exception of a Thunk because it returns a function
        action(store.dispatch, store.getState)
    } else { 
        console.log('dispatch', store.getState())
        next(action)
        console.log('after dispatch', store.getState())
    }
}