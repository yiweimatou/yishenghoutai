import test from 'ava'
import {
    UPLOAD_COVER,
    UPLOAD_PPT,
    UPLOAD_YUNBOOK,
    UPLOAD_SUCCESS,
    UPLOAD_FAIL
} from '../../src/constants/actiontypes/upload.js'

test('should return upload cover actiontype',t => {
    const EXPECT = 'UPLOAD_COVER'
    t.is(UPLOAD_COVER,EXPECT)
})

test('should return upload ppt actiontype',t => {
    const EXPECT= 'UPLOAD_PPT'
    t.is(UPLOAD_PPT,EXPECT)
})

test('should return upload success actiontype',t => {
    const EXPECT = 'UPLOAD_SUCCESS'
    t.is(UPLOAD_SUCCESS,EXPECT)
})

test('should return upload fail actiontype',t => {
    const EXPECT = 'UPLOAD_FAIL'
    t.is(UPLOAD_FAIL,EXPECT)
})

