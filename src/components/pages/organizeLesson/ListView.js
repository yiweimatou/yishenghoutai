import React from 'react'
import {  
    Table, 
    TableBody, 
    TableHeader, 
    TableHeaderColumn, 
    TableRow, 
    TableRowColumn, 
    FlatButton
} from 'material-ui'

class ListView extends React.Component {
    state = {
        id:-1
    }
    rowSelection = (index) => {
        if(index.length === 0 && this.state.id > -1){
            this.state = {
                id:-1
            }
        }
        else{
            this.state = {
                id:this.props.list[index[0]].id
            }
        }
    }
    handleAgree = () =>{
        this.props.editHandler(this.state.id,4)
    }
    handleRefuse = () => {
        this.props.editHandler(this.state.id,3)
    }
    render(){
        const { list } = this.props
        return(
            <Table
                selectable={ true }
                multiSelectable={ false }
                onRowSelection = { this.rowSelection }
            >
                <TableHeader
                >   
                    <TableRow>
                        <TableHeaderColumn colSpan="5">
                            <div style={{textAlign:'center'}}>
                                <span>课程认证申请</span>
                            </div>
                            <div style={{float:'right'}}>
                                <FlatButton onTouchTap = { this.handleAgree }
                                    label = '认证通过'
                                    primary = { true }
                                /> 
                                <FlatButton onClick = { this.handleRefuse }
                                    label = '认证拒绝'
                                    secondary = { true }
                                />                                                                  
                            </div>
                        </TableHeaderColumn>
                    </TableRow>
                    <TableRow>
                        <TableHeaderColumn tooltip="课程ID">ID</TableHeaderColumn>
                        <TableHeaderColumn tooltip="课程名称">课程名称</TableHeaderColumn>
                        <TableHeaderColumn tooltip="主讲人">主讲人</TableHeaderColumn>
                        <TableHeaderColumn tooltip="主讲人手机">主讲人手机</TableHeaderColumn>
                        <TableHeaderColumn tooltip="申请时间">申请时间</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody
                    deselectOnClickaway={false}
                    stripedRows={false}
                >
                    {
                        list.map( row => (
                            <TableRow key={row.id} selected={row.selected}>
                                <TableRowColumn>{row.id}</TableRowColumn>
                                <TableRowColumn>{row.lname}</TableRowColumn>
                                <TableRowColumn>{row.admin_cname||row.admin_nickname }</TableRowColumn>
                                <TableRowColumn>{row.admin_mobile}</TableRowColumn>
                                <TableRowColumn>{(new Date(row.add_ms*1000)).toLocaleString()}</TableRowColumn>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        )
    }
}

ListView.propTypes = {
    list:React.PropTypes.array,
    editHandler:React.PropTypes.func.isRequired
}

export default ListView