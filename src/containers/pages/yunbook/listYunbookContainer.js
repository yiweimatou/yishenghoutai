import {
    connect
} from 'react-redux'
import ListView from 'pages/yunbook/ListView'
import {
    getYunbookListIfNeeded
} from 'actions/yunbook'
import { push } from 'react-router-redux'

const mapStateToProps = state => ({
    offset: state.yunbook.myOffset,
    total: state.yunbook.myTotal,
    limit: state.yunbook.myLimit,
    list : state.yunbook.myList.filter((item,index) => {
        return index >= (state.yunbook.myOffset-1)*state.yunbook.myLimit
            && index <= state.yunbook.myOffset*state.yunbook.myLimit - 1
    })
})

const mapDispatchToProps = dispatch => ({
    onPageClick: (offset, limit) => {
        dispatch(getYunbookListIfNeeded({
            offset,
            limit
        }))
    },
    onClick : bid => {
        dispatch( push(`/yunbook/show/${bid}`) )
    },
    onEditClick:id => {
        if( !id ){
            return
        }
        dispatch( push(`/yunbook/edit/${id}`))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ListView)