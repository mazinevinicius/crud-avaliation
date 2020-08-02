import React from 'react'
import { Link } from 'react-router-dom'

import './styles.css'

const Navbar: React.FC = (props) => {
    return (
        <div>
            <nav>
                <div>
                    <Link to="/">Cadastrar</Link>
                    <Link to="/listar">Listar</Link>
                </div>
            </nav>

            <div>
                {props.children}
            </div>
        </div>
    )
}

export default Navbar