import React from 'react'

export default function PlaceOrder(props) {

    let total = props.price * props.qut
    return (
        <div className='col-md-6 float-left '>
            {total}
        </div>
    ) 
}
