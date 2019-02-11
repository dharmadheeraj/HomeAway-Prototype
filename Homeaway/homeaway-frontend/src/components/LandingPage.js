import Navbar from "./Navbar";
import Searchbar from "../containers/container_searchbar";
//import Searchbar from "./Searchbar";
import React,{ Component} from 'react';
import '../css/landing.css';
import SearchResult from "./SearchResult";
import connect from "react-redux/es/connect/connect";


class LandingPage extends Component{

    constructor(props)
    {
        super(props);

        this.state = {
            success : false
        }

    }

    render()
    {

        return(
            <div>
            <div className="jumbotron jumbotron-fluid">
                 <Navbar />
                <Searchbar />

            </div>
                <SearchResult
                    properties={this.props.properties}
                    searchdata = {this.props.searchData} />
            </div>
        )
    }
}

function mapStateToProps(state)
{
    return {
        properties: state.properties,
        searchData : state.searchData
    }
}

export default connect(mapStateToProps)(LandingPage);
