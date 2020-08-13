import React from 'react';

function Welcome(props) {
    return (
        <div className='welcome'>
            <h2>
                Hello {props.name} {props.secondName}!
            </h2>

        </div>
    )
}

export default Welcome;