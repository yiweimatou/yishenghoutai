const changePwdRoute = () => ({
	path:'changepwd',
	getComponent(nextState,cb){
		require.ensure([],require=>{
			cb(null,require('containers/pages/setting/changePwdContainer').default)
		},'changepwd')
	}
})

export default changePwdRoute