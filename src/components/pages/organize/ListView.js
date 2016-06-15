import React from 'react'
import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import { EditorModeEdit } from 'material-ui/svg-icons'

const styels = {
	img :{
		cursor: 'pointer'
	}
} 

class ListView extends React.Component {
	render() {
		const {
			list,editHandler,goToDetail
		} = this.props
		return (
				<GridList
					padding = { 60 }
					cols = { 3 }
				>
					{
						list.map( tile  => {
							return <GridTile
										key = { tile.oid }
										title = { tile.oname }
										actionIcon = { 
										<IconButton onTouchTap = {
											() => editHandler(tile.oid) 
										}
										>
											<EditorModeEdit color = 'white' />
										</IconButton> }
									>
										<img 
											src = { tile.logo } 
											alt = 'logo' 
											style = { styels.img }
											onClick = {
												()=>goToDetail(tile.oid)
											}
										/>
									</GridTile>
						})
					}
				</GridList>
			)
	}
}

ListView.propTypes = {
	list : React.PropTypes.array.isRequired,
	editHandler : React.PropTypes.func.isRequired,
	goToDetail:React.PropTypes.func.isRequired
}

export default ListView