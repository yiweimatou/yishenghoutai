const yunbookRoute = store => ({
	path:'yunbook',
	childRoutes:[
		require('./addRoute').default(store)
	]
})

export default yunbookRoute