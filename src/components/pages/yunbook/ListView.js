import React from 'react'
import { GridList,GridTile } from 'material-ui/GridList'
import Pager from '../../Pager'

class ListView extends React.Component {
    render(){
        const {
            list,onClick,offset,limit,total,onPageClick
        } = this.props
        return (
            <div>
                <GridList
                    padding ={ 60 }
                    cols = { 4 } 
                >
                {
                    list.map( tile => {
                        return <GridTile 
                                    key = { tile.bid }
                                    title = { tile.title }
                                >
                                    <img 
                                        src= { tile.cover }
                                        onClick = { ()=>onClick(tile.bid) }
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
    onClick : React.PropTypes.func.isRequired,
    offset: React.PropTypes.number.isRequired,
    total: React.PropTypes.number.isRequired, 
    limit: React.PropTypes.number.isRequired, 
    onPageClick: React.PropTypes.func.isRequired
}
export default ListView