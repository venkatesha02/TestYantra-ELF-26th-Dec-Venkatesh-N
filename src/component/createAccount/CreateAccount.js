import React, { useState, useEffect } from 'react'
import Axios from 'axios';
//import { Link } from 'react-router-dom';

export default function CreateAccount(props) {

    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userMobile, setUserMobile] = useState('')
    const [userPass, setUserPass] = useState('')
    const [conPass, setConPass] = useState('')
    const [gender, setGender] = useState('')
    const [role, setRole] = useState('')

    const [userNameErr, setUserNameErr] = useState(false)
    const [userEmailErr, setUserEmailErr] = useState(false)
    const [userMobileErr, setUserMobileErr] = useState(false)
    const [userPassErr, setUserPassErr] = useState(false)
    const [conPassErr, setConPassErr] = useState(false)

    const [genderErr, setGenderErr] = useState(false)
    const [roleErr, setRoleErr] = useState(false)


    const [items, setItems] = useState({ allData: [] })
    let istrue = (event) => {
        event.preventDefault()
        if (validForm()) {
            handleSubmit()
        }
    }

    const validForm = (event) => {
        const isValid = true

        if (userName.trim().match(/^[a-zA-Z ]*$/) && userName !== '') {
            setUserNameErr(false)
        }
        else {
            setUserNameErr(true)
            // return isValid
        }

        if (userEmail.trim().match(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)) {
            setUserEmailErr(false)

        }
        else {
            setUserEmailErr(true)
            // return isValid

        }

        if (userMobile.trim().match(/^[0-9]{10}$/)) {
            setUserMobileErr(false)
        }
        else {
            setUserMobileErr(true)
            // return isValid

        }

        if (userPass.match(/^.*(?=.{5,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/) && userPass !== "") {
            setUserPassErr(false)

        }
        else {
            setUserPassErr(true)
            // return isValid

        }

        if (userPass === conPass && conPass !== '') {
            setConPassErr(false)
        }
        else {
            setConPassErr(true)
            //return isValid
        }


        if (role !== '') {
            setRoleErr(false)
        }
        else {
            setRoleErr(true)
            // return isValid

        }

        if (gender !== '') {
            //await setGenderErr(false)
        }
        else {
            setGenderErr(true)
            //return isValid

        }
        return sedCorr()

    }


    let sedCorr = async () => {
        if (userNameErr !== true && userEmailErr !== true && userMobileErr !== true && userPassErr !== true && genderErr !== true && roleErr !== true && conPassErr !== true) {
            return true
        }
    }

    useEffect(() => {
        getAllProduct()
    }, [])

    let getAllProduct = async () => {
        const url = `https://react-magicshopping.firebaseio.com/addproduct.json`

        //const url = 'https://react-magicshopping.firebaseio.com/addtoCart.json'

        try {
            const response = await Axios.get(url)

            let fetchedAccount = [] //creating new array 
            for (let key in response.data) {
                let account = response.data[key]

                fetchedAccount.push({ // adding all the object to array
                    ...account,//adding new id to object
                    id: key,
                    noq: null,
                    total: account.price
                })

                setItems({ allData: fetchedAccount }) // setting updated object to old object
            }
        }
        catch (err) {
            console.log("Erroo ", err)
        }

    }

    const data = {
        userName: userName,
        userEmail: userEmail,
        userMobile: userMobile,
        userPass: userPass,
        gender: gender,
        role: role,
        product:items.allData
    }
    const handleSubmit = async () => {

        //const formData = data
        const url = 'https://react-magicshopping.firebaseio.com/users.json'
        try {
            const response = await Axios.post(url, data)//it is a api call it returns a promise

            if (response.status === 200) {

                props.history.push("/Login")// navigate the page   programatically

            }
        }

        catch (err) {
            console.log("Error ", err)
        }
    }

    return (
        <div className="col-md-6 col-sm-6 col-6 offset-3 card card-body mt-5">
            <form onSubmit={istrue}>
                <legend className='text-center'><b>Register Account</b></legend><br></br>
                <div class="form-group row">
                    <label className="col-sm-3 col-form-label">Name</label>
                    <div class="col-sm-8">
                        <input name="userName"
                            className="form-control" type="text"
                            value={userName}
                            placeholder="Enter name"
                            onChange={(e) => { setUserName(e.target.value) }} />
                        {userNameErr ? <p style={{ color: 'red', fontSize: '12px' }}>Username Should be Characters only [A-Z and a-z]</p> : null}
                    </div>
                </div>

                <div class="form-group row">
                    <label className="col-sm-3 col-form-label">Email</label>
                    <div class="col-sm-8">
                        <input name="userEmail"
                            className="form-control" type="text"
                            value={userEmail}
                            onChange={(e) => { setUserEmail(e.target.value) }}
                            placeholder="Enter Email" />
                        {userEmailErr ? <p style={{ color: 'red', fontSize: '12px' }}>Invalid!. Email format should be  ex: example@xxx.xxx</p> : null}
                    </div>
                </div>

                <div class="form-group row">
                    <label className="col-sm-3 col-form-label">Mobile</label>
                    <div class="col-sm-8">
                        <input name="userMobile"
                            className="form-control" type="text"
                            placeholder="Enter Mobile"
                            maxLength='10'
                            value={userMobile}
                            onChange={(e) => { setUserMobile(e.target.value) }} />
                        {userMobileErr ? <p style={{ color: 'red', fontSize: '12px' }}>Enter valid Mobile Number</p> : null}
                    </div>
                </div>

                <div class="form-group row">
                    <label className="col-sm-3 col-form-label">Gender</label>
                    <div class="col-sm-8" >
                        <input type="radio" name="gender" value='Male' onChange={(e) => { setGender(e.target.value) }} /> Male
                        <input type="radio" name="gender" value='Female' onChange={(e) => { setGender(e.target.value) }} /> Female
                        <input type="radio" name="gender" value='Other' onChange={(e) => { setGender(e.target.value) }} /> Other
                {genderErr ? <p style={{ color: 'red', fontSize: '12px' }}>Select Gender</p> : null}
                    </div>

                </div>

                {<div class="form-group row">
                    <label className="col-sm-3 col-form-label">Role</label>
                    <div class="col-sm-8">
                        <select className="form-control" onChange={(e) => { setRole(e.target.value) }} name='role' required>
                            <option selected disabled >Select Role</option>
                            <option value='admin'>Admin</option>
                            <option value='user'>User</option>
                        </select>
                        {roleErr ? <p style={{ color: 'red', fontSize: '12px' }}>Select any one Role</p> : null}

                    </div>
                </div>
                }
                <div class="form-group row">
                    <label className="col-sm-3 col-form-label">Password</label>
                    <div class="col-sm-8">
                        <input name="userPass"
                            className="form-control" type="password"
                            placeholder="Enter Password"
                            onChange={(e) => { setUserPass(e.target.value) }}
                            value={userPass} />
                        {userPassErr ? <p style={{ color: 'red', fontSize: '12px' }}>Password minimum 5 character and it Contain atleast 1 Uppercase, 1 Lowercase,1 special character, 1 Number</p> : null}
                    </div>
                </div>

                <div class="form-group row">
                    <label className="col-sm-3 col-form-label"> Confirm Password</label>
                    <div class="col-sm-8">
                        <input name="conPass"
                            className="form-control" type="password"
                            placeholder="Enter Confirm Password"
                            onChange={(e) => { setConPass(e.target.value) }}
                            value={conPass} />
                        {conPassErr ? <p style={{ color: 'red', fontSize: '12px' }}>Password Should be Match</p> : null}
                    </div>
                </div>
                <button className="btn btn-outline-info col-md-6 col-sm-6 col-6 offset-3 mt-3" id="login" type="submit">Create Account</button>
            </form>
        </div>
    )
}