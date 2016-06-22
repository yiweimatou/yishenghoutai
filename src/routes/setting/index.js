const settingRoute = () => ({
	path:'setting',
	childRoutes :[
		require('./changePwdRoute').default()
	]
})

export default settingRoute