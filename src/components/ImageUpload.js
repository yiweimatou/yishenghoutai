import React from 'react'

const styles = {
    div: {
        textAlign: 'center',
        margin: '5px 15px',
        height: 200,
        width: 500,
        borderLeft: '1px solid gray',
        borderRight: '1px solid gray',
        borderTop: '5px solid gray',
        borderBottom: '5px solid gray'
    },
    img: {
        height: 200,
        width: 500
    },
    text: {
        width: '100%',
        marginTop: 20
    },
    input:{
        width :0.1,
        height :0.1,
        opacity :0,
        overflow :'hidden',
        position :'absolute',
        zIndex :-1
    }
}

class ImageUpload extends React.Component {
	state = {
		imagePreviewUrl:this.props.url,
		file:null
	}
    handlerImgChange(e) {
        e.preventDefault()
        let reader = new FileReader()
        let file = e.target.files[0]

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            })
        }
        reader.readAsDataURL(file)
        this.props.onChange(file)
    }
	handleClick(){
		document.querySelector('#_file').click()
	}
	render() {
		let preview = null
		if(this.state.imagePreviewUrl){
			preview = <img src = {this.state.imagePreviewUrl} width='100%' height='100%' />
		}else{
			preview = <div style = { styles.text }>点击选择上传图片</div>
		}
		return (
			<div onClick= { this.handleClick } style = { styles.div }>
				<input 
					id = '_file'
					type = 'file' 
                    readOnly
					onChange = { (e) => this.handlerImgChange(e) }
					style = { styles.input }
				/>
				<div style = { styles.img } >
					{ preview }
				</div>
			</div>
		)
	}
}

ImageUpload.propTypes = {
	onChange:React.PropTypes.func.isRequired,
    url : React.PropTypes.string
}

export default ImageUpload