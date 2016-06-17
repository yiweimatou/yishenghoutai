import React from 'react'
import {  
    Table, 
    TableBody, 
    TableHeader, 
    TableHeaderColumn, 
    TableRow, 
    TableRowColumn
} from 'material-ui'

class ListView extends React.Component {
    render(){
        const { list } = this.props
        return(
            <Table
                fixedHeader={ true }
                selectable={ false }
            >
                <TableHeader
                >   
                    <TableRow>
                        <TableHeaderColumn colSpan="2">
                            <div style={{textAlign:'center'}}>
                                <span>课程列表</span>
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
                            <TableRow key={row.id} selectable = {false}>
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
    list:React.PropTypes.array
}

export default ListView