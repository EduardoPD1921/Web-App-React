import React from 'react'
import './Nav.css'

export default props =>
    <React.Fragment>
        <aside className="navContent">
            {props.children}
        </aside>
    </React.Fragment>