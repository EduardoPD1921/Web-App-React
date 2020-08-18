import React from 'react'
import './Nav.css'

export default props =>
    <React.Fragment>
        <aside className="navContent">
            <div className="nav-Header">
                Notes
            </div>
            {props.children}
        </aside>
    </React.Fragment>