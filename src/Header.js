import React, { useContext } from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './component/home/Home';
import UserContext, { UserConsumer } from './context/userAuthentication';
import CreateAccount from './component/createAccount/CreateAccount'
import Login from './component/login/Login'
import AddProduct from './component/addProduct/AddProduct';
import ShowProduct from './component/showProduct/ShowProduct';
import MyCart from './component/myCart/MyCart';
import WishList from './component/wishList/WishList';
import MyAccount from './component/myAccount/MyAccount';
import PlaceOrder from './component/orderPlace/PlaceOrder';

export default function Header(props) {
    const context = useContext(UserContext)
    // console.log('data',context)

    let status = localStorage.getItem('status')
    let name = localStorage.getItem('name')

    let logout = (context) => {
        context.setLogin(false)
        //props.history.push('/')
        localStorage.clear()

    }
    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                    <Link className="navbar-brand" to='/'>Magicco Shoping</Link>

                    <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="collapsibleNavId">

                        <UserConsumer>
                            {
                                (context) => {

                                    if (status === 'true') {

                                        if (context.user && status === 'true') {
                                            return (
                                                <>
                                                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                                        <li className="nav-item active ">
                                                            <Link className="nav-link" to='/showProduct'><i className="fa fa-binoculars">Product</i></Link>

                                                        </li>
                                                        <li className="nav-item active ">
                                                            <Link className="nav-link" to='/myWishlist'><i className="fa fa-heart">My Wishlist</i></Link>
                                                        </li>
                                                        <li className="nav-item active ">
                                                            <Link className="nav-link" to='/myCart'><i className="fa fa-cart-plus">My cart</i></Link>
                                                        </li>
                                                        <li className="nav-item active ">
                                                            <Link className="nav-link" to='/myAccount'><i className="fa fa-user-circle">My Account</i></Link>
                                                        </li>
                                                    </ul>
                                                    <ul className='navbar-nav'>
                                                        {/* <Link className="nav-link active" to='/' onClick={() => context.setLogin(false)}><i className="fa fa-sign-out"> Logout</i></Link> */}
                                                        <li className="nav-item active ">
                                                            <Link className="nav-link" ><i className='fa'>Welcome {name}</i></Link>
                                                        </li>
                                                        <li>
                                                            <Link className="nav-link active" to='/' onClick={() => logout(context)}><i className="fa fa-sign-out">Logout</i></Link>
                                                        </li>

                                                    </ul>
                                                </>)
                                        }
                                        else {
                                            return (
                                                <>
                                                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">

                                                        <li className="nav-item active ">
                                                            <Link className="nav-link" to='/addProduct'><i className="fa fa-plus-circle">Add Product</i></Link>
                                                        </li>
                                                        <li className="nav-item active ">
                                                            <Link className="nav-link" to='/showProduct'><i className="fa fa-binoculars">Product</i></Link>
                                                        </li>
                                                        <li className="nav-item active ">
                                                            <Link className="nav-link" to='/myWishlist'><i className="fa fa-heart">My Wishlist</i></Link>
                                                        </li>
                                                        <li className="nav-item active ">
                                                            <Link className="nav-link" to='/myCart'><i className="fa fa-cart-plus">My cart</i></Link>
                                                        </li>
                                                        <li className="nav-item active ">
                                                            <Link className="nav-link" to='/myAccount'><i className="fa fa-user-circle">My Account</i></Link>
                                                        </li>
                                                    </ul>
                                                    <ul className='navbar-nav'>
                                                        {/* <Link className="nav-link active" to='/' onClick={() => context.setLogin(false)}><i className="fa fa-sign-out">Logout</i></Link> */}
                                                        <li className="nav-item active ">
                                                            <Link className="nav-link" ><i className='fa'>Welcome {name}</i></Link>
                                                        </li>
                                                        <li>
                                                            <Link className="nav-link active" to='/' onClick={() => logout(context)}><i className="fa fa-sign-out">Logout</i></Link>
                                                        </li>
                                                        {/* <Link className="nav-link active" to='/' onClick={() => logout(context)}><i className="fa fa-sign-out">Logout</i></Link> */}
                                                    </ul>
                                                </>
                                            )
                                        }

                                    }
                                    else {
                                        return (
                                            <>
                                                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                                </ul>
                                                <ul className="navbar-nav">
                                                    <li className="nav-item active ">
                                                        <Link className="nav-link" to='/createaccount'><i className="fa fa-user-plus"> Register</i></Link>
                                                    </li>
                                                    <li className="nav-item active ">
                                                        <Link className="nav-link " to='/login'><i className="fa fa-sign-in"> Login</i></Link>
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

            <Route exact path='/' component={Home} />
            <Route path='/createAccount' component={CreateAccount} />
            <Route path='/login' component={Login} />

            {status ? <>
                <Route path='/addProduct' component={AddProduct} />
                <Route path='/showProduct' component={ShowProduct} />
                <Route path='/myWishlist' component={WishList} />
                <Route path='/myCart' component={MyCart} />
                <Route path='/myAccount' component={MyAccount} />
                <Route path='/placeOrder' component={PlaceOrder} />
            </> : <p style={{ display: 'none' }} className='col-md-4 col-sm-6 mt-5 offset-2'><img src='oops.png' alt='err' /></p>}
        </Router >
    )
}
