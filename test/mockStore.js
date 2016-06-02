import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

export default function mockStore(initialState) {
    return configureMockStore([thunk])(initialState)
}