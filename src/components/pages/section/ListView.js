import React from 'react'
import {  
    Table, 
    TableBody, 
    TableHeader, 
    TableHeaderColumn, 
    TableRow, 
    TableRowColumn, 
    FlatButton,
    Dialog
} from 'material-ui'
import PagingTableFooter from '../../PagingTableFooter'
import EditView from './EditView'

class ListView extends React.Component {
    state = {
        id:-1,
        open:false
    }
    rowSelection = (index) => {
        if(index.length === 0 && this.state.id > -1){
            this.state = {
                ...this.state,
                id:-1
            }
        }
        else{
            this.state = {
                ...this.state,
                id:this.props.list[index[0]].sid
            }
        }
    }
    handleEdit = () => {
        this.handleOpen()
        this.props.initialEditView(this.state.id)
    }
    handleOpen = () => {
        this.setState({
            open:!this.state.open
        })
    }
    handleDelete = () => {
        this.props.deleteHandler(this.state.id)
    }
    render(){
        const { 
            list,offset,limit,total,onPageClick,editHandler,
            areas4,
            areas5,
            areas6,
            areas7,
            select 
        } = this.props
        return(
            <div>
                <Dialog 
                    title = '编辑'
                    open={ this.state.open }
                    onRequestClose = { this.handleOpen }
                >
                    <EditView
                        areas4 = { areas4 }
                        areas5 = { areas5 }
                        areas6 = { areas6 }
                        areas7 = { areas7 }
                        select = { select }
                        onSubmit = { (values)=>editHandler(this.handleOpen,values) }
                    />
                </Dialog>
                <Table
                    selectable={ true }
                    multiSelectable={ false }
                    onRowSelection = { this.rowSelection }
                >
                    <TableHeader
                    >   
                        <TableRow>
                            <TableHeaderColumn colSpan="2">
                                <div style={{float:'right'}}>
                                    <FlatButton onTouchTap = { this.handleEdit }
                                        label = '编辑'
                                        primary = { true }
                                    /> 
                                    <FlatButton onClick = { this.handleDelete }
                                        label = '删除'
                                        secondary = { true }
                                    />                                                                  
                                </div>
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn tooltip="文章标题">文章标题</TableHeaderColumn>
                            <TableHeaderColumn tooltip="发表日期">发表日期</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        deselectOnClickaway={false}
                        showRowHover={false}
                        stripedRows={false}
                    >
                        {
                            list.map( row => (
                                <TableRow key={row.sid} selected={row.selected}>
                                    <TableRowColumn>{row.sname}</TableRowColumn>
                                    <TableRowColumn>{new Date(row.add_ms*1000).toDateString()}</TableRowColumn>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                    <PagingTableFooter
                        offset = { offset }
                        total = { total }
                        limit = { limit }
                        onPageClick = { onPageClick }
                    />
                </Table>
            </div>
        )
    }
}

ListView.propTypes = {
    list:React.PropTypes.array,
    editHandler:React.PropTypes.func.isRequired,
    deleteHandler:React.PropTypes.func.isRequired,
    offset: React.PropTypes.number.isRequired, 
    total: React.PropTypes.number.isRequired, 
    limit: React.PropTypes.number.isRequired, 
    onPageClick: React.PropTypes.func.isRequired,
    initialEditView:React.PropTypes.func.isRequired,
    areas4:React.PropTypes.array.isRequired,
    areas5:React.PropTypes.array.isRequired,
    areas6:React.PropTypes.array.isRequired,
    areas7:React.PropTypes.array.isRequired,
    select:React.PropTypes.array
}

export default ListView