import React from 'react'
import { GridList,GridTile } from 'material-ui/GridList'
import Pager from '../../Pager'
import { Link } from 'react-router'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

class ListView extends React.Component {
    render(){
        const {
            list,offset,limit,total,onPageClick,padding,cols,selectIdHandler
        } = this.props
        return (
            <div>
                <GridList
                    padding ={ padding||60 }
                    cols = { cols||4 } 
                >
                {
                    list.map( tile => {
                        return <GridTile 
                                    key = { tile.bid }
                                    title = { tile.title }
                                    actionIcon = {
                                        selectIdHandler? 
                                        <FloatingActionButton 
                                            mini ={ true }
                                            onClick = { 
                                                ()=>selectIdHandler(tile.bid)
                                            } 
                                        >
                                            <ContentAdd />
                                        </FloatingActionButton> 
                                        :null
                                    }
                                >
                                    <Link
                                        to = {`/yunbook/show/${tile.bid}`}
                                        target = '_blank'
                                    >
                                        <img 
                                            width='256'
                                            height='256'
                                            src= { tile.cover }
                                        />
                                    </Link>
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
    selectIdHandler:React.PropTypes.func
}
export default ListView