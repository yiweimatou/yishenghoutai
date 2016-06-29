import React from 'react'
import IconButton from 'material-ui/IconButton' 
import { GridList,GridTile } from 'material-ui/GridList'
import Pager from '../../Pager'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { EditorModeEdit } from 'material-ui/svg-icons'    

class ListView extends React.Component {
    render(){
        const {
            onClick,list,offset,limit,total,onPageClick,padding,cols,selectIdHandler,onEditClick
        } = this.props
        return (
            <div>
                <GridList
                    padding ={ padding||60 }
                    cols = { cols||4 } 
                >
                {
                    list.filter((item,index)=>index<limit*offset&&index>=(offset-1)*limit).map( tile => {
                        return <GridTile 
                                    key = { tile.bid }
                                    title = { tile.title }
                                    actionIcon = {
                                        selectIdHandler? 
                                        <FloatingActionButton 
                                            mini ={ true }
                                            onClick = { 
                                                ()=>selectIdHandler(tile.bid,tile.title,tile.lbl)
                                            } 
                                        >
                                            <ContentAdd />
                                        </FloatingActionButton> 
                                        :
                                        <IconButton onClick = { ()=>onEditClick(tile.bid) }>
                                            <EditorModeEdit />
                                        </IconButton>
                                    }
                                >
                                    <img
                                        onClick = { ()=> onClick(tile.bid)}
                                        src= { tile.cover }
                                    />
                                </GridTile>
                    })
                }
                </GridList>
                <Pager 
                    offset = { offset }
                    limit = { limit }
                    onPageClick = { onPageClick }
                    total = { total }
                />
            </div>
        )
    }
}

ListView.propTypes = {
    list:React.PropTypes.array.isRequired,
    offset: React.PropTypes.number.isRequired,
    total: React.PropTypes.number.isRequired, 
    limit: React.PropTypes.number.isRequired, 
    onPageClick: React.PropTypes.func.isRequired,
    padding:React.PropTypes.number,
    cols:React.PropTypes.number,
    selectIdHandler:React.PropTypes.func,
    onClick:React.PropTypes.func.isRequired,
    onEditClick:React.PropTypes.func
}
export default ListView
