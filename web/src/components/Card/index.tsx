import React from 'react'
import './styles.css'

const Card: React.FC = (props) => {
    return (
    <>
        <div id="layout" className="container">
            <div id="card">
                {props.children}
            </div>
        </div>
    </>
    )
}

export default Card