import React from 'react'
import { Route, HashRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import Cadastrar from './pages/Cadastrar'
import Listar from './pages/Listar'

const Routes = () => {
    return (
        <HashRouter>
            <Navbar>
                <Route component={Cadastrar} path="/" exact />
                <Route component={Listar} path="/listar" />
            </Navbar>
        </HashRouter>
    )
}

export default Routes