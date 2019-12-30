import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Search from '../search/Search'

export default function ShowProduct() {

    const uniqId = localStorage.getItem('id')

    // getting all itms from database
    const [items, setItems] = useState({ all: [] })

      // filterd Items
    const [product, setProduct] = useState({ data1: [] })

    useEffect(() => {

        getAllAccounts();


    }, [])

    // Getting all data from server
    let getAllAccounts = async () => {
        const url = `https://react-magicshopping.firebaseio.com/users/${uniqId}.json`

        try {
            const response = await Axios.get(url)
            let data = response.data.product
            if (response.status === 200) {
                setItems({
                    ...items.all,
                    all: data
                })
            }
        }
        catch (err) {
            console.log("Erroo ", err)
        }
    }

    let searchProduct = (event) => {
        let inputs = event
        const data = items.all.filter(val => val.itemName.startsWith(inputs))

        let arr = [];
        for (const key in data) {
            arr.push({
                ...data[key],
             
            })
        }
        if (arr) {
            setProduct({ data1: arr })
        } else {
            setProduct({ data1: [] })
        }
    }

    let handleClick = (val) => {
        //console.log(val)
        let data = product.data1

        wishUpdateAll(val)

        data.map((e) => {
            if (e.id === val.id) {
                //count++
                return e.wish = !val.wish
            }
            return e
        })
        setProduct({ data1: data })
    }

    let wishUpdateAll = async (e) => {
        let data = items.all
        data.map(val => {
            if (val.id === e.id) {
                return val.wish = !e.wish
            }
            return val
        })
        setItems({
            ...items.all,
            all: data
        })
        //const wishItem = val
        const url = `https://react-magicshopping.firebaseio.com/users/${uniqId}/product.json`

        try {
            const response = await Axios.put(url, data)
            if (response.status === 200) {
                console.log('Data updated', response)
            } else {
                console.log("Err")
            }
        }
        catch (err) {
            console.log("Err", err)

        }
    }


    //-------------------------------------------------------------------------------------------
    let addTocart = (val) => {
        //console.log(val)
        let data = product.data1

        cartUpdateAll(val)

        data.map((e) => {
            if (e.id === val.id) {
                //count++
                return e.cart = !val.cart
            }
            return e
        })
        setProduct({ data1: data })
    }

    let cartUpdateAll = async (e) => {
        let data = items.all
        data.map(val => {
            if (val.id === e.id) {
                return val.cart = !e.cart
            }
            return val
        })
        setItems({
            ...items,
            all: data
        })
        //const wishItem = val
        const url = `https://react-magicshopping.firebaseio.com/users/${uniqId}/product.json`

        try {
            const response = await Axios.put(url, data)
            if (response.status === 200) {
                console.log('Data updated', response)
            } else {
                console.log("Err")
            }
        }
        catch (err) {
            console.log("Err", err)

        }
    }

    //-------------------------------------------------------------------------------------------
    //console.log(mobile)
    /* const addTocart = async (val) => {
        const cartItem = val
        const url = `https://react-magicshopping.firebaseio.com/users/${uniqId}/product.json`
        try {

            const response = await Axios.post(url, cartItem)
            if (response.status === 200) {
                console.log('OK')

            }
            else {
                console.log("err")
            }
        }
        catch (err) {
            console.log('Err', err)
        }

    }
 */
    return (
        <>
            <Search inputSearch={searchProduct} />
            {product.data1.map((val) => {
                return (
                    <div className='container-fluid mt-4'>
                        <div className='col-md-3 col-sm-12 col-12 mt-2 card float-left'>
                            <div key={val.id} className='card-body'>

                                {val.wish ? <i style={{ color: 'red' }} onClick={() => { handleClick(val) }} className="fa fa-heart"></i> :
                                    <i onClick={() => { handleClick(val) }} className="fa fa-heart-o"></i>}
                                <img className='card-img-top' width='100%' height='205px' src={val.img} alt='pimg' ></img>
                                <p className='card-text'><h5>{val.itemName}</h5></p>
                                <p className='card-text'><h5>{val.brand}</h5></p>
                                <p className='card-text'><h5>Rs. {val.price}</h5></p>
                                <button className='btn btn-outline-primary '>Buy Now</button>
                                <button className='btn btn-outline-danger ml-2' onClick={() => { addTocart(val) }}>Add to Cart</button>

                            </div>
                        </div>
                    </div>
                )
            })
            }
        </>
    )
}

