import React from 'react'
import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import { EditorModeEdit } from 'material-ui/svg-icons'

const styles = {
	root : {
		display : 'flex',
		flexFlow : 'row wrap',
		justifyConent : 'space-around'
	},
	gridList : {
		width : 512,
		height : 512,
		overflowY: 'auto'
	}
}
class ListView extends React.Component {
	render() {
		const {
			list,editHandler
		} = this.props
		return (
				<div style = { styles.root }>
					<GridList style = { styles.gridList }>
						{
							list.map( tile  => {
								return <GridTile
									key = { tile.oid }
									title = { tile.oname }
									actionIcon = { 
									<IconButton onTouchTap = { editHandler.bind(null,tile.oid) }>
										<EditorModeEdit color = 'white' />
									</IconButton> }
								>
									<img src = { tile.logo } alt = 'logo' />
								</GridTile>
							})
						}
					</GridList>
				</div>
			)
	}
}

ListView.propTypes = {
	list : React.PropTypes.array.isRequired,
	editHandler : React.PropTypes.func.isRequired
}

export default ListView