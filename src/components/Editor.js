import React from 'react'
require('bootstrap/js/modal.js')
require('bootstrap/js/dropdown.js')
require('bootstrap/js/tooltip.js')
require('bootstrap/dist/css/bootstrap.css')
require('summernote-webpack-fix/dist/summernote.css')
require('summernote-webpack-fix/dist/summernote.js')
require('summernote-webpack-fix/lang/summernote-zh-CN')

class Editor extends React.Component{
    constructor(props){
        super(props)
        this.create = ()=>{
            $('#summernote').summernote({
                toolbar:[
                    ['视频', ['video']],
                    ['链接', ['link']],
                    ['源码',['codeview']]
                ],
                focus: true, height: 300, lang: 'zh-CN'
            })
        }
    }
    componentDidMount(){
        this.create()
    }
    render(){
        return(
            <div id='summernote'>
            </div>
        )
    }
}

export default Editor