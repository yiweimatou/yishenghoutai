import React from 'react'
import { GridList, GridTile } from 'material-ui/GridList'

const styles = {
	root : {
		display : 'flex',
		flexFlow : 'row wrap',
		justifyConent : 'space-between'
	},
	gridList : {
		width : '100%',
		height : '100%',
		overflowY: 'auto',
		overflowX: 'auto'
	},
	img :{
		cursor: 'pointer'
	}
}

const ListView = ( props ) => {
	const { list,onClick } = props
	return (
		<div style = { styles.root }>
			<GridList style = { styles.gridList } 
				padding = { 60 }
				cols = { 4 }
			>
				{
					list.map( tile  => {
						return <GridTile
							key = { tile.lid }
							title = { tile.lname }
						>
							<img 
								src = { tile.cover } 
								alt = 'cover' 
								onClick = { ()=>onClick(tile.lid) } 
								style = { styles.img }
							/>
						</GridTile>
					})
				}
			</GridList>
		</div>
	)
}

ListView.propTypes = {
	list : React.PropTypes.array.isRequired,
	onClick : React.PropTypes.func.isRequired
}

export default ListView

