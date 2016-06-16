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
                id:index[0]
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
                        <TableHeaderColumn colSpan="2">
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
                    </TableRow>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={true}
                    deselectOnClickaway={false}
                    showRowHover={true}
                    stripedRows={false}
                >
                    {
                        list.map( row => (
                            <TableRow key={row.oid} selected={row.id}>
                                <TableRowColumn>{row.id}</TableRowColumn>
                                <TableRowColumn>{row.lname}</TableRowColumn>
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