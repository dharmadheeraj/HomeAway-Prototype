import React , { Component } from 'react';
import {Field, reduxForm} from "redux-form";
import '../css/Profile.css';
import axios from "axios";
import cookies from "react-cookies";
import connect from "react-redux/es/connect/connect";
import {getProfile , updateProfile} from "../actions";
import {ROOT_URL} from "../config";


class Profile extends Component{

    constructor(props)
    {
        super(props);

        this.state = {
            user : {},
            userid : this.props.user._id,
            selectedFile : [],
            profilepic : ''
        }

        this.picchange = this.picchange.bind(this);
        this.savepic = this.savepic.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    componentWillMount()
    {
        this.props.getProfile(sessionStorage.getItem('userid'));
       // this.setState ({user : this.props.user});
        axios.post(`${ROOT_URL}/getprofilepic/profile_${sessionStorage.getItem('userid')}.jpg`)
                .then(response => {
                    console.log("Imgae Res : ",response);
                    let imagePreview = 'data:image/jpg;base64, ' + response.data;
                    this.setState({
                        profilepic: imagePreview
                    })
                });

    }

    onSubmit(values)
    {
        const profiledata = {
            userid : this.props.user._id,
            firstname : this.state.firstname,
            lastname : this.state.lastname,
            aboutme: this.state.aboutme,
            address: this.state.address,
            address2: this.state.address2,
            country: this.state.country,
            state: this.state.state,
            zip: this.state.zip,
            company: this.state.company,
            gender: this.state.gender,
            school: this.state.school,
            hometown: this.state.hometown,
            languages: this.state.languages,
        }
        console.log(values);
        this.props.updateProfile(profiledata,(result) => {
            if(result === 200)
            {
                alert('Profile Updated');
            }
            else
            {
                alert('Profile not updated');
            }
        });

    }

    picchange = (e) => {
        if (e.target.name === 'selectedFile') {
            this.setState({
                selectedFile: e.target.files[0]
            })
        }
    }

    savepic = (e) =>
    {
        const desc = this.props.user._id;

        const  data  = Object.assign({},this.state);

        //const { files } = this.state;
        let formData = new FormData();

        console.log(data.selectedFile);

        formData.append('description', desc);
        formData.append('selectedFile', data.selectedFile);

        axios.post(`${ROOT_URL}/uploadpic`, formData)
            .then((result) => {
                this.setState({selectedFile : ''});
                this.componentDidMount();
            });

    }

    render()
    {
        const { handleSubmit } = this.props;

        return(
            <div className="profile col-md-8 order-md-1">
                <img src={this.state.profilepic}
                     className="image--cover" />
                <form>
                    <div className="form-group">
                        <input type="file" className="form-control-file" name="selectedFile" onChange={this.picchange} />
                        <button className="btn btn-primary btn-lg btn-block" type="button" onClick={this.savepic}>Save Profile Picture</button>
                    </div>
                </form>
                    <hr></hr>

                <h1 className="mb-3">Profile</h1>
                <form  onSubmit={handleSubmit(this.onSubmit.bind(this))} className="needs-validation" noValidate="">
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="firstName">First name</label>
                            <input type="text" className="form-control" name="firstname" placeholder="" value={this.props.user.firstname}
                                   onChange={this.handleChange} />
                            <div className="invalid-feedback">
                                Valid first name is required.
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="lastName">Last name</label>
                            <input type="text" className="form-control" name="lastname" placeholder="" value={this.props.user.lastname}
                                   onChange={this.handleChange} />
                            <div className="invalid-feedback">
                                Valid last name is required.
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="address">About Me</label>
                        <input type="text" className="form-control" name="aboutme"
                               placeholder="Tell us something about you" onChange={this.handleChange} value={this.props.user.aboutme} />

                    </div>

                    <div className="mb-3">
                        <label htmlFor="address">Address</label>
                        <input type="text" className="form-control" name="address" placeholder="1234 Main St" required="" onChange={this.handleChange} value={this.props.user.address} />
                        <div className="invalid-feedback">
                            Please enter your shipping address.
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="address2">Address 2 <span className="text-muted">(Optional)</span></label>
                        <input type="text" className="form-control" name="address2" placeholder="Apartment or suite" onChange={this.handleChange} value={this.props.user.address2} />
                    </div>

                    <div className="row">
                        <div className="col-md-5 mb-3">
                            <label htmlFor="country">Country</label>
                            <select className="custom-select d-block w-100" name="country" required="" onChange={this.handleChange} value={this.props.user.country} >
                                <option value="">Choose...</option>
                                <option value="UnitedState">United States</option>
                            </select>
                            <div className="invalid-feedback">
                                Please select a valid country.
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="state">State</label>
                            <select className="custom-select d-block w-100" name="state" required="" onChange={this.handleChange} value={this.props.user.state} >
                                <option value="">Choose...</option>
                                <option value="California">California</option>
                            </select>
                            <div className="invalid-feedback">
                                Please provide a valid state.
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="zip">Zip</label>
                            <input type="text" className="form-control" name="zip" placeholder="" required="" onChange={this.handleChange} value={this.props.user.zip} />
                            <div className="invalid-feedback">
                                Zip code required.
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5 mb-5">
                            <label htmlFor="zip">Company</label>
                            <input type="text" className="form-control" name="company" placeholder="Company" required="" onChange={this.handleChange} value={this.props.user.company} />
                            <div className="invalid-feedback">
                                company required.
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="state">Gender</label>
                            <select className="custom-select d-block w-100" name="gender" required="" onChange={this.handleChange} value={this.props.user.gender} >
                                <option value="">Choose...</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="No">I Don't want to disclose my Identity</option>
                            </select>
                            <div className="invalid-feedback">
                                Please provide a valid state.
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5 mb-5">
                            <label htmlFor="zip">School</label>
                            <input type="text" className="form-control" name="school" placeholder="School" required="" onChange={this.handleChange} value={this.props.user.school}/>
                            <div className="invalid-feedback">
                                School required.
                            </div>
                        </div>

                        <div className="col-md-5 mb-5">
                            <label htmlFor="zip">HomeTown</label>
                            <input type="text" className="form-control" name="hometown" placeholder="Hometown" required="" onChange={this.handleChange} value={this.props.user.hometown} />
                            <div className="invalid-feedback">
                                Hometown required.
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 mb-5">
                        <label htmlFor="zip">Languages</label>
                        <input type="text" className="form-control" name="languages" placeholder="Languages" required="" onChange={this.handleChange} value={this.state.languages} />
                        <div className="invalid-feedback">
                            Languages required.
                        </div>
                    </div>


                    <hr className="mb-4" />
                    <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={this.submit}>Save Profile</button>
                </form>

            </div>
        )
    }
}


function validate(values) {

    const errors = {};

    // Validate the inputs from 'values'
    if (!values.firstname) {
        errors.username = "Enter an Firstname";
    }
    if (!values.lastname) {
        errors.password = "Enter Lastname";
    }

    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux form assumes form is invalid
    return errors;
}

function mapStateToProps(state) {
    return {
        user : state.user
    };

}

// let InitializeFromStateForm = reduxForm({
//     form: 'initializeFromState'  // a unique identifier for this form
// })(InitializeFromStateForm)
//
// // You have to connect() to any reducers that you wish to connect to yourself
// InitializeFromStateForm = connect(
//     state => ({
//         initialValues: state.user // pull initial values from account reducer
//     }),
//     //{  getprofile : getprofile, updateprofile : updateprofile},
//     {getprofile : getprofile }
//     // bind account loading action creator
// )(Profile)

//export default InitializeFromStateForm


export default reduxForm({
    validate,
    form: 'ProfileForm'
})(connect(mapStateToProps,{getProfile,updateProfile})(Profile));
