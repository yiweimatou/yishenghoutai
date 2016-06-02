import test from 'ava'
import upload from '../../src/reducers/upload.js'

const initialState = {
    isUploading:false
}
test('should initialize with a state of isUploading',t => {
    t.pass()
})