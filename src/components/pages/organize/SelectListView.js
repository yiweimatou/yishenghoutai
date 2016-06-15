import React from 'react'
import { GridList, GridTile } from 'material-ui/GridList'
import {
    FloatingActionButton,
    TextField,
    RaisedButton
} from 'material-ui'
import Pager from '../../Pager'

const styles = {
    div : {
        whiteSpace:'nowrap',
        width:'88%',
        paddingBottom:20
    },
    span :{
        color:'white'
    }
}
class SelectListView extends React.Component {
    searchHandler = () => {
        const title = document.querySelector('#_title').value
        this.props.onSearch(title)
    }
    render() {
        const { 
            list,applyHandler,
            offset,limit,onPageClick,total 
        } = this.props
        return(
            <div>
                <div style ={ styles.div } >
                    <TextField
                        fullWidth = { true }
                        id = '_title'
                        hintText = '请输入机构名称'
                        floatingLabelText = '机构名称' 
                    />
                    <RaisedButton
                        primary ={ true }
                        label = '搜索'
                        onClick = { this.searchHandler }
                    />
                </div>
                <GridList
                    padding = { 60 } 
                >
                    {
                        list.map( tile =>{
                            return (
                                <GridTile
                                    key = { tile.oid}
                                    title = { tile.oname }
                                    actionIcon = {
                                        <FloatingActionButton
                                            mini ={ true }
                                            onClick = { ()=>applyHandler(tile.oid) }
                                        >
                                            <span style = {styles.span}>
                                                申请
                                            </span>
                                        </FloatingActionButton>
                                    }
                                >
                                    <img
                                        src = { tile.logo }
                                        alt = 'logo'
                                    />
                                </GridTile>
                            )
                        })
                    }
                </GridList>
                <Pager 
                    offset = { offset }
                    limit = { limit }
                    onPageClick = { 
                        (offset,limit) => 
                        onPageClick(document.querySelector('#_title').value,offset,limit) 
                    }
                    total = { total }
                />
            </div>
        )
    }
}

SelectListView.propTypes = {
    list:React.PropTypes.array,
    onSearch:React.PropTypes.func.isRequired,
    applyHandler:React.PropTypes.func.isRequired,
	offset: React.PropTypes.number.isRequired,
    total: React.PropTypes.number.isRequired, 
    limit: React.PropTypes.number.isRequired, 
    onPageClick: React.PropTypes.func.isRequired
}
export default SelectListView