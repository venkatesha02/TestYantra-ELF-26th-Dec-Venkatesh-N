import React, { useEffect } from 'react'
import Axios from 'axios'
import { useState } from 'react'

export default function WishList() {

    const mobile = localStorage.getItem('mobile')

    const [items, setItems] = useState({ allData: [] })

    useEffect(() => {

        getAllAccounts()

    }, [])


    // Getting data from server
    let getAllAccounts = async () => {
        const url = `https://react-magicshopping.firebaseio.com/wishlist${mobile}.json`
        try {
            const response = await Axios.get(url)
            //console.log("Response ", response)
            let fetchedAccount = [] //creating new array 
            for (let key in response.data) {
                let account = response.data[key]

                fetchedAccount.push({ // adding all the object to array
                    ...account,//adding new id to object
                    id: key
                })
                setItems({ allData: fetchedAccount }) // setting updated object to old object
            }
        }
        catch (err) {
            console.log("Erroo ", err)
        }
    }


    const removeWishList = async (val) => {
        const id = val.id;
       
        const url = `https://react-magicshopping.firebaseio.com/wishlist${mobile}/${id}/.json`

        //const url = 'https://react-magicshopping.firebaseio.com/wishList/' + id + '/.json'
        try {
            const response = await Axios.delete(url)
            const myAccount = [...items.allData]

            const index = myAccount.indexOf(val)

            myAccount.splice(index, 1)

            setItems({ allData: myAccount })

            //console.log("Response ", response)
        }
        catch (error) {
            console.log("Error ", error)

        }
    }

    return (
        <>
            <div className='container' >
                <div>
                    <h3 className='text-center'>Your Wish List</h3>
                    {items.allData.map((val) => {
                        return (
                            <>
                                <div key={val.id} className='card col-md-4 mt-2 ml-2 float-left'>
                                    <div className='card-body'>
                                        <div className='col-md-4 float-right'>
                                            <img className='card-img-top p-1' width='100%' height='120px' src={val.img} alt='pimg' ></img>
                                        </div>
                                        <p className='card-text'><h5>{val.itemName}</h5></p>
                                        <p className='card-text'><h5>{val.brand}</h5></p>
                                        <p className='card-text'><h5>Rs. {val.price}</h5></p>

                                        <button className='btn btn-danger' onClick={() => { removeWishList(val) }}><i className="fa fa-trash"></i>  REMOVE </button>
                                    </div>
                                </div>
                            </>
                        )
                    })
                    }
                </div>
            </div >
        </>
    )
}
