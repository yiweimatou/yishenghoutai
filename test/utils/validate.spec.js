import test from 'ava'
import {
    isUrl,
    isMobile
} from '../../src/utils/validate'

test('is mobile',t=>{
    t.true(isMobile('13675853598'))
})

test('is not mobile',t=>{
    t.false(isMobile('1365887'))
})