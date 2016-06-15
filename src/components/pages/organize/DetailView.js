import React from 'react'
import { Paper,RaisedButton,Dialog } from 'material-ui'
import Pager from '../../Pager'

const styles = {
    paper:{
        display:'flex',
        flexFlow:'row nowrap',
        justifyContent :'space-around'
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
class DetailView extends React.Comopnent {
    render(){
        return(
            <div>
            </div>
        )
    }
}

export default DetailView