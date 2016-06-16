import React from 'react'
import { Paper } from 'material-ui'
import ListView from '../organizeLesson/ListView'
import SListView from '../organizeLesson/SListView'

const styles = {
    paper:{
        display:'flex',
        flexFlow:'row nowrap',
        justifyContent :'space-around'
    },
    table:{
        marginTop:50
    },
    div:{ 	
        display:'flex',
        flexFlow:'row nowrap',
        justifyContent :'space-around',
        maxWidth :700
    },
    dl:{
        marginLeft:50
    },
    dt:{
        float: 'left',
        width: 80,
        overflow: 'hidden',
        clear: 'left',
        textAlign: 'right',
        whiteSpace: 'nowrap',
        fontWeight: 'bold',
        lineHeight: 1.42857143
    },
    dd:{
        marginLeft: 100,
        lineHeight: 1.42857143
    }
}
class DetailView extends React.Component {
    render(){
        const {
            organize,list,slist,editHandler
        } = this.props
        if( !organize ){
            return (null)
        }        
        return(
            <div>
                <Paper style = { styles.paper } >
                    <img 
                        src = { organize.logo }
                        width='256' heigt='256'
                    />
                    <dl>
						<dt style = {styles.dt}>机构名</dt>
						<dd style = {styles.dd}>{organize.oname}</dd>
						<dt style = {styles.dt}>机构简介</dt>
						<dd style = {styles.dd}>{organize.descript}</dd>
						<dt style = {styles.dt}>创建时间</dt>
						<dd style = {styles.dd}>{ new Date(organize.add_ms*1000).toString()}</dd>
						<dt style = {styles.dt}>更新时间</dt>
						<dd style = {styles.dd}>{new Date(organize.put_ms*1000).toString()}</dd>
					</dl>
                </Paper>
                <Paper style = {styles.table}>
                    <ListView list ={ list } editHandler ={ editHandler }/>
                </Paper>
                <Paper style = { styles.table } >
                    <SListView list = { slist } />
                </Paper>
            </div>
        )
    }
}

DetailView.propTypes = {
    organize:React.PropTypes.object,
    list:React.PropTypes.array,
    slist:React.PropTypes.array,
    editHandler:React.PropTypes.func.isRequired
}

export default DetailView