import React,{ Component} from "react";
import '../css/Searchbar.css';
import axios from "axios";
import {ROOT_URL} from "../config";

class Searchbar extends Component {

    constructor(props)
    {
        super(props);

        this.state ={
            place : '',
            from : '',
            to : '',
            count : ''
        }

        this.search = this.search.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    search = (e) =>
    {
        e.preventDefault();
        var data = {
            place : this.state.place,
            from : this.state.from,
            to : this.state.to,
            count : this.state.count
        }

        this.props.searchdata(data);

        axios.post(`${ROOT_URL}/searchproperty`,data)
            .then(response => {
                let status = response.data;
                console.log(status);
                if(response.status === 200)
                {
                    this.props.properties(response.data);
                    this.props.success();
                 }
                else
                {
                   this.props.properties('No Data Found');
                }
            })

    }

    handleChange = (e) =>
    {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (

                <div className="jumbotron">
                    <h1 className="HeadLine">
                        <span className="HeadLine__text">Book beach houses, cabins,</span>

                        <span className="HeadLine__text">condos and more, worldwide</span>
                    </h1>
                    <form>
                        <div className="form-row">
                            <div className="col-4">
                                <input type="text" name='place' className="form-control form-control-lg" placeholder="City" onChange={this.handleChange}/>
                            </div>
                            <div className="col-2">
                                <input type="date" name='from' className="form-control form-control-lg" placeholder="From Date" onChange={this.handleChange}/>
                            </div>
                            <div className="col-2">
                                <input type="date" name='to' className="form-control form-control-lg" placeholder="Return Date" onChange={this.handleChange}/>
                            </div>
                            <div className="col-2">
                                <select className="custom-select my-1 mr-sm-2 form-control-lg" name='count' id="inlineFormCustomSelectPref" onChange={this.handleChange} placeholder="No of Guests">
                                    <option selected >Adults</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                            <div className="col-2">
                                <button type="submit" className="btn btn-primary form-control-lg" onClick={this.search}>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>

        );
    }
}

export default Searchbar;