const changepwdRoute = () => ({
	path:'changepwd',
	getComponent(nextState,cb){
		require.ensure([],require=>{
			cb(null,require('containers/pages/setting/changepwdContainer').default)
		},'changepwd')
	}
})

export default changepwdRoute