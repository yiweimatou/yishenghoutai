import React from 'react'
import { GridList, GridTile } from 'material-ui/GridList'

const styles = {
	img :{
		cursor: 'pointer'
	}
}

const ListView = ( props ) => {
	const { list,onClick } = props
	return (
			<GridList
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
	)
}

ListView.propTypes = {
	list : React.PropTypes.array.isRequired,
	onClick : React.PropTypes.func.isRequired
}

export default ListView

