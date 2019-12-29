import React, { useEffect } from 'react'
import Axios from 'axios'
import { useState } from 'react'

export default function MyCart() {
    const mobile = localStorage.getItem('mobile')

    //const [quantiy, setQuantiy] = useState('')
    const [items, setItems] = useState({ allData: [] })

    useEffect(() => {

        getAllAccounts()

    }, [])
    // Getting data from server
    let getAllAccounts = async () => {

        const url = `https://react-magicshopping.firebaseio.com/cart${mobile}.json`

        //const url = 'https://react-magicshopping.firebaseio.com/addtoCart.json'

        try {
            const response = await Axios.get(url)

            //console.log("Response ", response)
            let fetchedAccount = [] //creating new array 
            for (let key in response.data) {
                let account = response.data[key]

                fetchedAccount.push({ // adding all the object to array
                    ...account,//adding new id to object
                    id: key,
                    noq: null,
                    total: account.price
                })
                //console.log('sdjhg',fetchedAccount)

                setItems({ allData: fetchedAccount }) // setting updated object to old object
                //console.log('sdhfsjdfgjsdhfgjsgfjsfh',items)
            }
        }
        catch (err) {
            console.log("Erroo ", err)
        }
    }


    let qut = (qunt, val1) => {
        let all = items.allData
        all.map((val) => {
            if (val.id === val1.id) {
                return (val1.noq = qunt,
                    val1.total = qunt * val1.price)
            }
        })
        setItems({ allData: all })
    }
    const removeCart = async (val) => {
        const id = val.id;

        const url = `https://react-magicshopping.firebaseio.com/cart${mobile}/${id}/.json`

        //const url = 'https://react-magicshopping.firebaseio.com/addtoCart/' + id + '/.json'

        try {
            const response = await Axios.delete(url)
            const myAccount = [...items.allData]

            const index = myAccount.indexOf(val)

            myAccount.splice(index, 1)

            setItems({ allData: myAccount })

            console.log("Response ", response)
        }
        catch (error) {
            console.log("Error ", error)

        }
    }
    let rs = 0;
    let tc = 0;
    //let totalPrice;
    //let netAmount = rs + totalPrice
    //let itemTotal = rs;

    return (
        <>
            <div className='container' >
                <h6>My Cart ({items.allData.length})</h6>
                <div className='row'>
                    <div className='col-md-6 col-sm-8 col-12 mt-2 float-left'>
                        {items.allData.map((val) => {
                            return (
                                <>
                                    <div key={val.id} className='card mt-2'>
                                        <div className='card-body'>
                                            <div className='col-md-3 float-right'>
                                                <img className='card-img-top p-1' width='100%' height='120px' src={val.img} alt='pimg' ></img>
                                            </div>
                                            <p className='card-text'><h5>{val.itemName}</h5></p>
                                            <p className='card-text'><h5>{val.brand}</h5></p>
                                            <p className='card-text'><h5>Rs. {val.price}</h5></p>
                                            <p className='card-text'><h5>Total Amount . {val.total}</h5></p>

                                            <p style={{ display: 'none' }}>{rs = rs + Number(val.total), tc = tc + Number(val.price)}</p>

                                            <select className="form-control col-md-4" value={val.noq} onChange={(e) => { qut(e.target.value, val) }} name='quantity' required>
                                                <option selected disabled >Quantity</option>
                                                <option value='1'>1</option>
                                                <option value='2'>2</option>
                                                <option value='3'>3</option>
                                            </select><br />

                                            <button className='btn btn-danger' onClick={() => { removeCart(val) }}>Remove from Cart</button>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                        }
                    </div>
                    <div className='col-md-5 mt-2'>
                        <div className='card-body'>

                            <h2 className='card-text'>PRICE DETAILS</h2>
                            <p className='card-text'><h5>Price ({items.allData.length} itmes)  :  {rs}</h5></p>
                            <p className='card-text'><h5>Delivery Fee :  Free</h5></p>
                            <p className='card-text'><h5>----------------------------</h5></p>
                            <p className='card-text'><h5>Payable Amount : {rs}</h5></p>
                            <button className='btn btn-outline-success ml-2'>Place order</button>

                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
