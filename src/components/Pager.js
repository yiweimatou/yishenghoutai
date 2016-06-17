import React from 'react'
import { IconButton} from 'material-ui'
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right'

const styles = {
  root:{
    paddingBottom:20,
    paddingTop:20
  },
  footerContent: {
    float: 'right'
  },
  footerText: {
    float: 'right',
    paddingTop: 16,
    height: 16
  }
}

class Pager extends React.Component{

  static propTypes = {
    offset: React.PropTypes.number.isRequired, // current offset
    total: React.PropTypes.number.isRequired, // total number of rows
    limit: React.PropTypes.number.isRequired, // num of rows in each page
    onPageClick: React.PropTypes.func // what to do after clicking page number
  }

  render() {
        const {offset, total, limit,onPageClick} = this.props
        return (
            <div style={ styles.root} >
                <div style={styles.footerContent}>
                    <IconButton disabled={offset === 1} 
                      onClick={ onPageClick.bind(null, offset - 1, limit) }
                    >
                      <NavigationChevronLeft />
                    </IconButton>
                    <IconButton 
                      disabled={offset * limit >= total} 
                      onClick={()=>this.props.onPageClick(offset + 1,limit)}>
                      <NavigationChevronRight />
                    </IconButton>
                </div>
                <div style={styles.footerText}>
                    第{offset}页 共{Math.ceil(total/limit)}页
                </div>
            </div>
        )
  }
}

export default Pager