import React, { Component } from 'react';
import {
    Link,
    NavLink
  } from "react-router-dom";
class Register extends Component {
    render() {
        return (
            <div>
                Hello đây là Register
                <NavLink to="/login">Login nè</NavLink>
            </div>
        );
    }
}

export default Register;