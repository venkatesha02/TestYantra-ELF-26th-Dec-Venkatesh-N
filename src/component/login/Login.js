import React, { useState, useContext } from 'react'
import UserContext from '../../context/userAuthentication'
import Axios from 'axios'

export default function Login(props) {
    //static contextType = UserContext
    const context = useContext(UserContext)

    const [show, setShow] = useState(false)
    const [display, setdisplay] = useState(false)
    const [data, setData] = useState([])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const [emailErr, setEmailErr] = useState(false)
    const [passwordErr, setPasswordErr] = useState(false)

    const valid = {
        email: email,
        password: password
    }


    const validForm = (event) => {
        const isValid = true

        event.preventDefault()
        if (email.trim().match(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)) {
            setEmailErr(false)

        }
        else {
            setEmailErr(true)
            return isValid

        }
        if (password.match(/^.*(?=.{5,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/) && password !== "") {
            setPasswordErr(false)

        }
        else {
            setPasswordErr(true)
            return isValid
        }
        sendCorrect(isValid)
    }

    const sendCorrect = (isValid) => {
        if (emailErr !== true && passwordErr !== true) {
            authenticate()

        }
    }

    const authenticate = async () => {
        //event.preventDefault()
        const url = 'https://react-magicshopping.firebaseio.com/users.json'
        try {

            const response = await Axios.get(url)

            for (let key in response.data) {
                let account = response.data[key]
                let auth = valid
                if (auth.email === account.userEmail && auth.password === account.userPass) {
                    if (account.role === 'User') {
                        console.log("ok")
                    }
                    props.history.push('/showProduct')
                    context.setLogin(true)
                }
                else {

                }
            }

        } catch (err) {
            console.log("Erroo ", err)
        }
    }
    //let name = { color: 'red', fontSize: '12px' }
    return (
        <div className='col-md-4 col-sm-4 col-4 offset-4 card card-body mt-5'>
            <form onSubmit={validForm}>
                <legend className='text-center'><b>Login Account</b></legend><br></br>
                <div class="form-group row">
                    <label className="col-sm-3 col-form-label">Email Id</label>
                    <div class="col-sm-8">
                        <input type="email" className="form-control"
                            name='email'
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            placeholder="Email Address" />
                        {emailErr ? <p style={{ color: 'red', fontSize: '12px' }}>Invalid!. Email format should be  ex: example@xxx.xxx</p> : null}

                    </div>
                </div>
                <div class="form-group row">
                    <label className="col-sm-3 col-form-label">Password</label>
                    <div class="col-sm-8">
                        <input type="password" className="form-control"
                            name='password'
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            placeholder="Password" />
                        {passwordErr ? <p style={{ color: 'red', fontSize: '12px' }}>Password minimum 5 character and it Contain atleast 1 Uppercase, 1 Lowercase,1 special character, 1 Number</p> : null}

                    </div>
                </div>

                <button type="submit" className="col-sm-5 col-md-5 col-5 offset-4 btn btn-outline-primary" >Login </button>


            </form>
        </div>
    )
}
