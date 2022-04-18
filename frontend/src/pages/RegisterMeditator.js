import gql from "graphql-tag";
import React, { useState, useContext } from "react";
import {Button, Form} from "semantic-ui-react";
import {useMutation} from '@apollo/client';
import {useHistory} from "react-router-dom";
import {AuthContext} from '../context/auth';

function RegisterMeditator() {

    const context = useContext(AuthContext);
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        aboutMe: '',
        lastInstitution: '',
        teachPlacePreference: '',
        experienceYears: 0
    });

    const onChange = (event) => {
        if(event.target.name === "experienceYears") {
            setValues({...values,[event.target.name]: parseInt(event.target.value)});
        }
        else {
            setValues({...values,[event.target.name]: event.target.value});
        }
    }
    
    const [addUser, {loading}] = useMutation(REGISTER_MEDITATOR , {
        update(_, result) {
            context.login(result.data.registerMeditator);
            history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables: values
    });

    const onSubmit = (event) => {
        event.preventDefault();
        addUser();
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ''}>
                <h1>Register Meditator</h1>
                <Form.Input 
                    label="Username"
                    placeholder="Username.."
                    name="username"
                    type="text"
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                />
                <Form.Input 
                    label="Name"
                    placeholder="Name.."
                    name="name"
                    type="text"
                    value={values.name}
                    error={errors.name ? true : false}
                    onChange={onChange}
                />
                 <Form.Input 
                    label="Email"
                    placeholder="Email.."
                    name="email"
                    type="email"
                    value={values.email}
                    error={errors.email ? true : false}
                    onChange={onChange}
                />
                <Form.Input 
                    label="Phone Number"
                    placeholder="Phone Number.."
                    name="phoneNumber"
                    type="text"
                    value={values.phoneNumber}
                    error={errors.phoneNumber ? true : false}
                    onChange={onChange}
                />
                <Form.Input 
                    label="About me"
                    placeholder="Few words about me.."
                    name="aboutMe"
                    type="text"
                    value={values.aboutMe}
                    error={errors.aboutMe ? true : false}
                    onChange={onChange}
                />
                <Form.Input 
                    label="Last Institution"
                    placeholder="Last Institution.."
                    name="lastInstitution"
                    type="text"
                    value={values.lastInstitution}
                    error={errors.lastInstitution ? true : false}
                    onChange={onChange}
                />
                <Form.Input 
                    label="Teach Place Preference"
                    placeholder="Teach Place Preference.."
                    name="teachPlacePreference"
                    type="text"
                    value={values.teachPlacePreference}
                    error={errors.teachPlacePreference ? true : false}
                    onChange={onChange}
                />
                <Form.Input 
                    label="Experience Years"
                    placeholder="Experience Years.."
                    name="experienceYears"
                    type="number"
                    value={values.experienceYears}
                    error={errors.experienceYears ? true : false}
                    onChange={onChange}
                />
                 <Form.Input 
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                />
                 <Form.Input 
                    label="Confirm Password"
                    placeholder="Confirm Password.."
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    onChange={onChange}
                />
                <Button type="submit" primary>
                    Register
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                <ul className="list">
                    {Object.values(errors).map((value) => (
                    <li key={value}>{value}</li>
                    ))}
                </ul>
                </div>
            )}
        </div>
    );
}

const REGISTER_MEDITATOR = gql`
mutation registerMeditator(
    $username: String!
    $password: String!
    $confirmPassword: String!
    $email: String!
    $name: String!
    $phoneNumber: String!
    $aboutMe: String!
    $experienceYears: Int!
    $lastInstitution: String!
    $teachPlacePreference: String!
) {
  registerMeditator(registerMeditatorInput: {
    username: $username
    password: $password
    confirmPassword: $confirmPassword
    email: $email
    name: $name
    phoneNumber: $phoneNumber
    aboutMe: $aboutMe
    educationHistory: {
      lastInstitution: $lastInstitution
      teachPlacePreference: $teachPlacePreference
    }
    experienceYears: $experienceYears
  }) {
    id
    email
    token
    username
    createdAt
    role
  }
}
`;

export default RegisterMeditator;