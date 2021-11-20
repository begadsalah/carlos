import React from 'react';
import ReactDOM from 'react-dom';
import ROUTE from "../../config/route";
import domain from '../../config/api/domain';
import { connect } from 'react-redux';

const Login = ()=>{
    return (
        <div className="osahan-signin">
            <div className="p-3">
                <h2 className="my-0">Welcome Back</h2>
                <p className="small">Sign in to Continue.</p>
                <form action="#">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input placeholder="Enter Email" type="email" className="form-control" id="exampleInputEmail1"
                               aria-describedby="emailHelp"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input placeholder="Enter Password" type="password" className="form-control"
                               id="exampleInputPassword1"/>
                    </div>
                    <button type="submit" className="btn btn-success btn-lg rounded btn-block">Sign in</button>
                </form>
                <p className="text-muted text-center small m-0 py-3">or</p>
                <a href="#" className="btn btn-dark btn-block rounded btn-lg btn-apple">
                   Sign up
                </a>

            </div>
        </div>
    )
}
export default Login
