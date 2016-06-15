import React from 'react'
import { 
    Paper, 
    Table, 
    TableBody, 
    TableHeader, 
    TableHeaderColumn, 
    TableRow, 
    TableRowColumn, 
    FlatButton
} from 'material-ui'

const styles = {
    paper:{
        display:'flex',
        flexFlow:'row nowrap',
        justifyContent :'space-around'
    },
    table:{
        marginTop:50
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
class DetailView extends React.Component {
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
        const {
            organize,list
        } = this.props
        if( !organize ){
            return (null)
        }        
        return(
            <div>
                <Paper style = { styles.paper } >
                    <img 
                        src = { organize.logo }
                        width='256' heigt='256'
                    />
                    <dl>
						<dt style = {styles.dt}>机构名</dt>
						<dd style = {styles.dd}>{organize.oname}</dd>
						<dt style = {styles.dt}>机构简介</dt>
						<dd style = {styles.dd}>{organize.descript}</dd>
						<dt style = {styles.dt}>创建时间</dt>
						<dd style = {styles.dd}>{ new Date(organize.add_ms*1000).toString()}</dd>
						<dt style = {styles.dt}>更新时间</dt>
						<dd style = {styles.dd}>{new Date(organize.put_ms*1000).toString()}</dd>
					</dl>
                </Paper>
                <Paper style = {styles.table}>
                    <Table
                        fixedHeader={ false }
                        selectable={ true }
                        multiSelectable={ false }
                        onRowSelection = { this.rowSelection }
                    >
                        <TableHeader
                        >   
                            <TableRow style={styles.row}>
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
                                    <TableRow key={row.oid} selected={row.selected}>
                                        <TableRowColumn>{row.id}</TableRowColumn>
                                        <TableRowColumn>{row.lname}</TableRowColumn>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}

DetailView.propTypes = {
    organize:React.PropTypes.object,
    list:React.PropTypes.array,
    editHandler:React.PropTypes.func.isRequired
}

export default DetailView