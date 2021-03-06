import { connect } from 'react-redux'
import { reduxForm,change } from 'redux-form'
import AddView from 'pages/section/AddView'
import { addSection } from 'actions/section'
import {
    getYunbookListIfNeeded
} from 'actions/yunbook'
import { push } from 'react-router-redux'

const mapStateToProps = state => ({
    areas4 : state.area[4],
    areas5 : state.area[5],
    areas6 : state.area[6],
    areas7 : state.area[7],
    select : state.area.select,
    listProps:{
        list:state.yunbook.list,
        total:state.yunbook.total,
        limit:4,
        offset:state.yunbook.offset,
        myList:state.yunbook.myList,
        myTotal:state.yunbook.myTotal,
        myLimit:4,
        myOffset:state.yunbook.myOffset
    }
})

const mapDispatchToProps = dispatch => ({
    onPageClick : (offset,limit) => {
        dispatch(getYunbookListIfNeeded({
            uid:0,
            offset,limit
        }))
    },
    myOnPageClick : (offset,limit) => {
        dispatch( getYunbookListIfNeeded({
            offset,limit
        }))
    },
    selectIdHandler: (bid,lbl,close) => {
        if(!bid){
            return
        }
        dispatch(change('addSection','lbl',lbl))
        Promise.resolve(dispatch(change('addSection','bid',bid)))
        .then(()=>{
            close()
        })
    },
    onClick : bid => {
        dispatch( push(`/yunbook/show/${bid}`) )
    }
})

const onSubmit = (values,dispatch) => {
    return new Promise((resolve,rejcet) => {
        dispatch( addSection(values) ).then(()=>{
            resolve()
        }).catch(()=>rejcet())
    })
}

const validate = values => {
    const errors = {}
    if( !values.sname ){
        errors.sname = '请填写文章标题'
    }
    if( !values.bid ){
        errors.bid = '请选择云板书'
    }
    if( !values.aid ){
        errors.aid = '请选择分类'
    }
    return errors
}

export default connect( mapStateToProps,mapDispatchToProps )(
    reduxForm({
        form: 'addSection',
        onSubmit,
        validate
    })( AddView )
)