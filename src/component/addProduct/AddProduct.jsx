import React, { useState } from 'react'
import Axios from 'axios';

export default function AddProduct(props) {

    const [itemName, setItemName] = useState('')
    const [brand, setBrand] = useState('')
    const [price, setPrice] = useState('')
    const [noq, setNoq] = useState('')
    const [img, setImg] = useState('')

    const [itemNameErr, setItemNameErr] = useState(false)
    const [brandErr, setBrandErr] = useState(false)
    const [priceErr, setPriceErr] = useState(false)
    const [noqErr, setNoqErr] = useState(false)
    const [imgErr, setImgErr] = useState(false)

    const isTrue = (event) => {
        event.preventDefault()

        if (validForm) {
            handleSubmit()
        }
    }


    const validForm = (event) => {


        //const isValid = true

        if (itemName.trim().match(/^[a-zA-Z ]*$/) && itemName !== '') {
            setItemNameErr(false)
        }
        else {
            setItemNameErr(true)

        }
        if (brand.trim().match(/^[a-zA-Z ]*$/) && brand !== '') {
            setBrandErr(false)

        }
        else {
            setBrandErr(true)

        }
        if (price.trim().match(/^[0-9]*$/) && price !== '') {
            setPriceErr(false)
        }
        else {
            setPriceErr(true)

        }
        if (noq.trim().match(/^[0-9]*$/) && noq !== "") {
            setNoqErr(false)

        }
        else {
            setNoqErr(true)
        }

        if (img !== '') {
            setImgErr(false)
        }
        else {
            setImgErr(true)

        }
        return sedCorr()
    }

    let sedCorr = async () => {
        if (itemNameErr !== true && brandErr !== true && priceErr !== true && noqErr !== true && imgErr !== true) {

            return true

        }
    }
    const data = {
        itemName: itemName,
        brand: brand,
        price: price,
        noq: noq,
        img: img,
        wish: false,
        cart: false,
        myOrder: false
    }

    const handleSubmit = async () => {
        //event.preventDefault()
        const formData = data
        //console.log('sdhgfj', formData)
        const url = 'https://react-magicshopping.firebaseio.com/addproduct.json'
        try {
            let response = await Axios.post(url, formData)//it is a api call it returns a promise

            if (response.status === 200) {
                setItemName('')
                setNoq('')
                setPrice('')
                setImg('')
                setBrand('')
                //console.log("Data added")
                //props.history.push("/Login")// navigate the page   programatically
            }
        }
        catch (err) {
            console.log("Error ", err)
        }
    }

    return (
        <div className="col-md-6 col-sm-6 col-6 offset-3 card card-body mt-5">
            <form onSubmit={isTrue}>
                <legend className='text-center'><b>Add Product</b></legend><br></br>
                <div class="form-group row">
                    <label className="col-sm-3 col-form-label">Product Name</label>
                    <div class="col-sm-8">
                        <input name="itemName"
                            className="form-control" type="text"
                            value={itemName}
                            placeholder="Enter Product"
                            onChange={(e) => { setItemName(e.target.value) }} />
                        {itemNameErr ? <p style={{ color: 'red', fontSize: '12px' }}>Enter only Characters</p> : null}
                    </div>
                </div>

                <div class="form-group row">
                    <label className="col-sm-3 col-form-label">Brand</label>
                    <div class="col-sm-8">
                        <input name="brand"
                            className="form-control" type="text"
                            value={brand}
                            onChange={(e) => { setBrand(e.target.value) }}
                            placeholder="Enter Brand" />
                        {brandErr ? <p style={{ color: 'red', fontSize: '12px' }}>Allowed Only Letters</p> : null}
                    </div>
                </div>

                <div class="form-group row">
                    <label className="col-sm-3 col-form-label">Price</label>
                    <div class="col-sm-8">
                        <input name="price"
                            className="form-control" type="text"
                            placeholder="Enetr Price"
                            maxLength='5'
                            value={price}
                            onChange={(e) => { setPrice(e.target.value) }} />
                        {priceErr ? <p style={{ color: 'red', fontSize: '12px' }}>Only numbers</p> : null}
                    </div>
                </div>

                <div class="form-group row">
                    <label className="col-sm-3 col-form-label">Image Path</label>
                    <div class="col-sm-8" >
                        <input type="text" name="img"
                            className="form-control"
                            placeholder="Give image Path"
                            value={img}
                            onChange={(e) => { setImg(e.target.value) }} />
                        {imgErr ? <p style={{ color: 'red', fontSize: '12px' }}>Enter Image Path</p> : null}
                    </div>
                </div>

                <div class="form-group row">
                    <label className="col-sm-3 col-form-label">No of Quantity</label>
                    <div class="col-sm-8">
                        <input name="noq"
                            className="form-control" type="text"
                            placeholder="Number of quantity"
                            maxLength='5'
                            onChange={(e) => { setNoq(e.target.value) }}
                            value={noq} />
                        {noqErr ? <p style={{ color: 'red', fontSize: '12px' }}>Enter numbers only</p> : null}
                    </div>
                </div>

                <button className="btn btn-outline-info col-sm-6 col-6 col-md-6 offset-3 mt-3" id="login" type="submit">Add Product</button>
            </form>
        </div>
    )
}