import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <React.Fragment> 
                {/* search */}
                <div className="row justify-content-center">
                    <div className="col-md-9">
                        <form onSubmit={(e)=>this.props.searchHandler(e)}>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" onChange={(e)=>this.props.handleInputValue(e)} placeholder="Search" />
                                <div className="input-group-append">
                                    <button type="submit" className="input-group-text search-btn">Search</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {/* /search */}
            </React.Fragment>
         );
    }
}
 
export default Search;