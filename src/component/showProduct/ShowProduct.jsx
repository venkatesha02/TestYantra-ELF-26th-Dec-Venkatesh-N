import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Search from '../search/Search'

export default function ShowProduct() {

    const [items, setItems] = useState([])
    const [wishh, setWishh] = useState(true)
    const [product, setProduct] = useState({ data1: [] })

    useEffect(() => {

        getAllAccounts()

    }, [])
    // Getting data from server
    let getAllAccounts = async () => {
        const url = 'https://react-magicshopping.firebaseio.com/addproduct.json'
        await Axios.get(url)
            .then((response) => {
                //console.log("Response ", response)
                let fetchedAccount = [] //creating new array 
                for (let key in response.data) {
                    let account = response.data[key]

                    fetchedAccount.push({ // adding all the object to array
                        ...account,//adding new id to object
                        id: key
                    })
                    setItems(fetchedAccount) // setting updated object to old object
                }

            })
            .catch((err) => {
                console.log("Erroo ", err)
            })
    }

    let searchProduct = (event) => {
        let inputs = event
        const data = items.filter(val => val.itemName.startsWith(inputs))
        let arr = [];
        for (const key in data) {
            arr.push({
                ...data[key],
                wish: !wishh
            })
        }
        if (arr) {

        }
        setProduct({ data1: arr })
    }

    let handleClick = (val) => {

        let a = product.data1

        a.map((e) => {
            if (e.id === val.id) {

                return val.wish = !val.wishh
            }
            return val
        })
        setProduct({ data1: a })
    }

    const addTocart = async (val) => {
        const cartItem = val
        const url = 'https://react-magicshopping.firebaseio.com/addtoCart.json'
        const response = await Axios.post(url, cartItem)

    }

    return (

        <>
            <Search inputSearch={searchProduct} />
            {product.data1.map((val) => {
                return (
                    <div className='container-fluid mt-4'>
                        <div className='col-md-3 col-sm-3 col-3 mt-2 card float-left'>
                            <div className='card-body'>

                                <div key={val.id}>
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
                    </div>
                )
            })
            }
        </>
    )
}

