import React, { useContext } from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './component/home/Home';
import UserContext, { UserConsumer } from './context/userAuthentication';
import CreateAccount from './component/createAccount/CreateAccount'
import Login from './component/login/Login'
import View from './component/view/View';
import AddProduct from './component/addProduct/AddProduct';
import ShowProduct from './component/showProduct/ShowProduct';
import MyCart from './component/myCart/MyCart';

export default function Header() {
    const context = useContext(UserContext)

    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                    <Link className="navbar-brand" to='/'>Invalid Shoping</Link>

                    <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="collapsibleNavId">
                        <ul className='navbar-nav mr-auto mt-2 mt-lg-0'>

                        </ul>
                        <UserConsumer>
                            {
                                (context) => {
                                    if (context.login) {
                                        return (
                                            <>
                                                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                                    <li className="nav-item active "></li>

                                                    <Link className="nav-link active" to='/' onClick={() => context.setLogin(false)}>Logout</Link>
                                                </ul>
                                            </>)
                                    }
                                    else {
                                        return (<>
                                            <ul className="navbar-nav ">
                                                <li className="nav-item active ">
                                                    <Link className="nav-link" to='/addProduct'>App Product</Link>
                                                </li>
                                                <li className="nav-item active ">
                                                    <Link className="nav-link" to='/showProduct'>Product</Link>
                                                </li>
                                            </ul>
                                            <ul className="navbar-nav">
                                                <li className="nav-item active ">
                                                    <Link className="nav-link" to='/myWishlist'>MyWishlist</Link>
                                                </li>
                                                <li className="nav-item active ">
                                                    <Link className="nav-link" to='/myCart'>My Cart</Link>
                                                </li>
                                                <li className="nav-item active ">
                                                    <Link className="nav-link" to='/createaccount'>Register</Link>
                                                </li>
                                                <li className="nav-item active ">
                                                    <Link className="nav-link " to='/login'>Login</Link>
                                                </li>
                                            </ul>
                                        </>
                                        )
                                    }
                                }
                            }
                        </UserConsumer>
                    </div>
                </nav>
            </div>
            <Route path='/view' component={View} />
            <Route path='/addProduct' component={AddProduct} />
            <Route path='/showProduct' component={ShowProduct} />
            <Route path='/myWishlist' />
            <Route path='/myCart' component={MyCart} />
            <Route exact path='/' component={Home} />
            <Route path='/createAccount' component={CreateAccount} />
            {context.login ? null : <Route path='/login' component={Login} />}

        </Router >
    )
}
