const settingRoute = () => ({
	path:'setting',
	childRoutes :[
		require('./changepwdRoute.js').default()
	]
})

export default settingRoute