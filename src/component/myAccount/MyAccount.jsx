import React from 'react'


export default function MyAccount(props) {
    
    let email = localStorage.getItem('email')
    let name = localStorage.getItem('name')
    let mobile = localStorage.getItem('mobile')
    let gen = localStorage.getItem('gen')

    return (
        <>
            <div className="col-md-4 col-sm-6 col-6 offset-4 card mt-5">
                
                <div className='card-body mt-3'>
                <p className='card-text'><b>User Name:  </b>{name}</p>
                <p className='card-text'><b>Email Id: </b>{email}</p>
                <p className='card-text'><b>Mobile Number: </b>{mobile}</p>
                <p className='card-text'><b>Gender : </b>{gen}</p>
                </div>

            </div>

        </>
    )
}
