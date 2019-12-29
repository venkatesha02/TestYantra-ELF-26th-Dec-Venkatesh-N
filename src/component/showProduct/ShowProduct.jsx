import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Search from '../search/Search'

export default function ShowProduct() {

    // getting all itms from database
    const [items, setItems] = useState([])

    // wishlist deleting
    const [delItem, setDelItem] = useState({ del: [] })

    // wishlist clicks
    const [wishh] = useState(true)

    // filterd Items
    const [product, setProduct] = useState({ data1: [] })


    const[count,setCount]=useState(0)
    useEffect(() => {

        getAllAccounts();


    }, [])

    // Getting all data from server
    let getAllAccounts = async () => {
        const url = 'https://react-magicshopping.firebaseio.com/addproduct.json'

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
                setItems(fetchedAccount) // setting updated object to old object
            }
        }
        catch (err) {
            console.log("Erroo ", err)
        }
    }

    let searchProduct = (event) => {
        let inputs = event
        const data = items.filter(val => val.itemName.startsWith(inputs))
        console.log('dfh', data)
        let arr = [];
        for (const key in data) {
            arr.push({
                ...data[key],
                wish: !wishh
            })
        }
        if (arr) {
            setProduct({ data1: arr })
        } else {
            setProduct({ data1: [] })
        }
    }
    
    let handleClick = async (val) => {

        console.log(val.id)
        let a = product.data1
        a.map((e) => {
            if (e.id === val.id) {
                //count++
                return val.wish = !val.wish
            }
            return val
        })
        setProduct({ data1: a })

        //checking wishlist
        if (val.wish) {

            if (count === 0) {
                const wishItem = val
                const url = 'https://react-magicshopping.firebaseio.com/wishList.json'
                try {
                    const response = await Axios.post(url, wishItem)
                    
                    
                    //setCount(count++)
                    //let fetchedAccount = [] //creating new array 
                    console.log("Response ", response)

                    /* for (let key in response.data) {
                        let account = response.data[key]

                        fetchedAccount.push({ // adding all the object to array
                            ...account,//adding new id to object
                            //id1: key
                        })
                        setDelItem({ del: fetchedAccount })
                    } */
                }
                catch (err) {
                    console.log("Err", err)
                }

            }
        }
        else {
           
            const id = val.id1;
            //console.log('delete ', id)
            const url = 'https://react-magicshopping.firebaseio.com/wishList/' + id + '/.json'

            try {
                const response = await Axios.delete(url)
                //console.log("Deleted Item ", response)
                const myAccount = [...delItem.del]
                const index = myAccount.indexOf(val)

                console.log(response.data)
                myAccount.splice(index, 1)
                //console.log('myAccount ', myAccount)

                setDelItem({ del: myAccount })

                console.log("Response ", response)
            }
            catch (error) {
                console.log("Error ", error)

            }
        }
    }

    const addTocart = async (val) => {
        const cartItem = val
        const url = 'https://react-magicshopping.firebaseio.com/addtoCart.json'
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

    return (
        <>
            <Search inputSearch={searchProduct} />
            {product.data1.map((val) => {
                return (
                    <div className='container-fluid mt-4'>
                        <div className='col-md-3 col-sm-6 col-12 mt-2 card float-left'>
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

