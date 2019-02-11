import React,{Component} from 'react';
import PropertyListItem from './PropertyListItem.js';

import connect from "react-redux/es/connect/connect";

class SearchResult extends Component
{

    render()
    {
        var arr = [];
        for (var key in this.props.properties) {
            arr.push(this.props.properties[key]);
        }

        const PropertyItems = arr.map((property) => {
            console.log(this.props.searchData);
            return <PropertyListItem key={property.num} property={property} searchdata={this.props.searchData} />
        });


        if(PropertyItems) {
            return (
                <div className='row'>
                    <ul className="col-md-8 list-group">
                        {PropertyItems}
                    </ul>
                </div>
            )
        }
        else
        {
            return(
                <div className='row'>
                <ul className="col-md-8 list-group">
                    You Search will be loading here.
                </ul>
            </div>
            )
        }
    }
}


function mapStateToProps(state)
{
    return {
        properties: state.properties,
        searchData : state.searchData
    }
}


export default connect(mapStateToProps)(SearchResult);