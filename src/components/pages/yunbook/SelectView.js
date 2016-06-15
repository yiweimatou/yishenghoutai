import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import ListView from './ListView'

const styles ={
    div:{
        marginTop:30
    }
}
class SelectView extends React.Component {
    render(){
        const {
            list,offset,limit,total,onPageClick,
            myList,myOffset,myLimit,myTotal,myOnPageClick,
            selectIdHandler
        } = this.props
        return(
            <Tabs>
                <Tab label="所有云板书">
                    <div style = { styles.div } >
                        <ListView 
                            list = { list }
                            offset = { offset }
                            limit = { limit }
                            total = { total }
                            onPageClick = { onPageClick }
                            padding = { 30 }
                            cols = { 2 }
                            selectIdHandler = { selectIdHandler }
                        />
                    </div>
                </Tab>
                <Tab label="我的云板书">
                    <div style = { styles.div } >
                        <ListView 
                            list = { myList }
                            offset = { myOffset }
                            limit = { myLimit }
                            total = { myTotal }
                            onPageClick = { myOnPageClick }
                            padding = { 30 }
                            cols = { 2 }
                            selectIdHandler = { selectIdHandler }
                        />
                    </div>
                </Tab>
            </Tabs>
        )
    }
}

SelectView.propTypes = {
    list:React.PropTypes.array,
    offset:React.PropTypes.number,
    limit:React.PropTypes.number,
    total:React.PropTypes.number,
    onPageClick:React.PropTypes.func,
    myList:React.PropTypes.array,
    myOffset:React.PropTypes.number,
    myLimit:React.PropTypes.number,
    myTotal:React.PropTypes.number,
    myOnPageClick:React.PropTypes.func,
    selectIdHandler:React.PropTypes.func
}

export default SelectView
