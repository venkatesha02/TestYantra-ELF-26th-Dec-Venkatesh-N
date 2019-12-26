import React from 'react'

export default function Search(props) {
    return (
        <div className='container-fluid mt-3 col-md-4 col-sm-4 col-4'>
            <input className='form-control' type="text" placeholder='Search...' onChange={(e)=>{props.inputSearch(e.target.value)}}/>
        </div>
    )
}
