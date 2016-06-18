import React from 'react'
import {TableRow, TableRowColumn, IconButton} from 'material-ui'
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right'

const styles = {
  footerContent: {
    float: 'right'
  },
  footerText: {
    float: 'right',
    paddingTop: 16,
    height: 16
  }
}

class PagingTableFooter extends React.Component{

  static propTypes = {
    offset: React.PropTypes.number.isRequired, // current offset
    total: React.PropTypes.number.isRequired, // total number of rows
    limit: React.PropTypes.number.isRequired, // num of rows in each page
    onPageClick: React.PropTypes.func.isRequired // what to do after clicking page number
  }

  render() {
        let {offset, total, limit,onPageClick} = this.props
        return (
            <tfoot>
              <TableRow>
                <TableRowColumn style={styles.footerContent}>
                    <IconButton disabled={offset === 1} 
                      onClick={ onPageClick.bind(null, offset - 1, limit) }
                    >
                      <NavigationChevronLeft />
                    </IconButton>
                    <IconButton disabled={offset * limit >= total} onClick={this.props.onPageClick.bind(null, offset + 1,limit)}>
                      <NavigationChevronRight />
                    </IconButton>
                </TableRowColumn>
                <TableRowColumn style={styles.footerText}>
                    第{offset}页 共{Math.ceil(total/limit)}页
                </TableRowColumn>
              </TableRow>
           </tfoot>
        )
  }
}

PagingTableFooter.muiName = 'TableFooter'

export default PagingTableFooter