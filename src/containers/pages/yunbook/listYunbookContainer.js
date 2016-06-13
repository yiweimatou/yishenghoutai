import {
    connect
} from 'react-redux'
import ListView from 'pages/yunbook/ListView'
import {
    getYunbookListIfNeeded
} from 'actions/yunbook'
import { push } from 'react-router-redux'

const mapStateToProps = state => ({
    offset: state.yunbook.offset,
    total: state.yunbook.total,
    limit: state.yunbook.limit,
    list : state.yunbook.list.filter((item,index) => {
        return index >= (state.yunbook.offset-1)*state.yunbook.limit
            && index <= state.yunbook.offset*state.yunbook.limit - 1
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
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ListView)