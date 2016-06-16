const route = store => ({
    path:'teaminvited',
    childRoutes:[
        require('./listRoute').default(store)
    ]
})

export default route