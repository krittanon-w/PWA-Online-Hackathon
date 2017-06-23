function test_login() {
    auth.login()
        .then(() => {
            console.log('test login success')
        })
        .catch(() => {
            console.log('test login error')
        })
}