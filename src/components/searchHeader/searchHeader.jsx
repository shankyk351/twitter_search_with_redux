import React from 'react';

const searchHeader = (props)=>{
    return(
        <React.Fragment>
            <div className="refresh-time">
                <p>Search @ Twitter</p>
                {props.havePosts && <p>Auto refresh in {props.time} seconds</p>}
            </div>
        </React.Fragment>
    )
}

export default searchHeader;