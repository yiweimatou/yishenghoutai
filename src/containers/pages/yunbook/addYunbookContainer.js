import {
    reduxForm,
    change
} from 'redux-form'
import AddView from 'pages/yunbook/AddView'
import {
    addYunbook
} from 'actions/yunbook'
import {
    connect
} from 'react-redux'
import {
    push
} from 'react-router-redux'
import {
    listAreaIfNeeded
} from 'actions/area'
import {
    uploadYunbook
} from 'actions/upload'
import {
    toastr
} from 'react-redux-toastr'
import {
    isImage
} from 'utils/validation'

const validate = values => {
    const errors = {}
    if (!values.title) {
        errors.title = '请填写云板书名称'
    }
    if (!values.aid) {
        errors.aid = '请选择分类'
    }
    return errors
}

const onSubmit = (values, dispatch) => {
    return new Promise( (resolve) => {
            const ext = values.file.name
            let pptOrImage = 0
            if (ext === 'ppt' || ext === 'pptx') {
                pptOrImage = 1
            } else if (isImage(ext)) {
                pptOrImage = 2
            } else {
                return resolve(toastr.error('请选择ppt或者图片上传'))
            }
            dispatch(uploadYunbook(pptOrImage, values.file)).then(data=>{
                if( data ){
                    delete values.file
                    values.width= data.width,
                    values.height=data.height,
                    values.path=data.path,
                    values.zoom=data.zoom,
                    values.cover=data.cover
                    dispatch( addYunbook(values) ).then((id)=>{
                        if(id){
                            dispatch(push(`/yunbook/show/${id}`))
                        }
                        resolve()                        
                    })
                }else{
                    resolve()
                }
            })
    })
        
}
const mapStateToProps = state => ({
    areas4: state.area[4],
    areas5: state.area[5],
    areas6: state.area[6],
    areas7: state.area[7]
})

const mapDispatchToProps = dispatch => ({
    changeHandler: (pid, zoom) => {
        return Promise.resolve(dispatch(listAreaIfNeeded({
            pid,
            zoom
        })))
    },
    onChange: file => {
        dispatch( change('addYunbook','file',file) )
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'addYunbook',
    validate,
    onSubmit,
    initialValues: {
        'status': 2
    },
    destroyOnUnmount: false
})(AddView))