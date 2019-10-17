import React from 'react';

const Listing = (props)=>{
    return(
        <React.Fragment>
        <div className="row">
            <div className="col-lg-12 col-md-6">
                <div className="media p-3 card-item">
                    <img src={props.data.user.profile_image_url} alt="" className="mr-3 rounded-circle" style={{"width":"60px"}} />
                    <div className="media-body">
                        <h4 className="post-title">
                        {props.data.user.name}
                        <span className="user-id">@{props.data.user.screen_name} </span>
                        <small><i>{props.data.created_at}</i></small>
                        </h4>
                        <p>{props.data.text}</p>
                    </div>
                </div>
            </div>
        </div>
        </React.Fragment>
    )
}

export default Listing;