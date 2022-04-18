import gql from "graphql-tag";
import React, { useState, useContext } from "react";
import {Button, Form} from "semantic-ui-react";
import {useMutation} from '@apollo/client';
import {useHistory} from "react-router-dom";
import {AuthContext} from '../context/auth';

function RegisterUser() {

    const context = useContext(AuthContext);
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const onChange = (event) => {
        setValues({...values,[event.target.name]: event.target.value});
    }
    
    const [addUser, {loading}] = useMutation(REGISTER_USER , {
        update(_, result) {
            console.log(result.data);
            context.login(result.data.registerUser);
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
                <h1>Register User</h1>
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

const REGISTER_USER = gql`
  mutation registerUser(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    $name: String!
  ) {
    registerUser(
      registerUserInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
        name: $name
      }
    ) {
      id
      email
      username
      createdAt
      token
      role
    }
  }
`;

export default RegisterUser;