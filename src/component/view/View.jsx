import React, { Component } from 'react'
import Axios from 'axios'
import { Modal, Button } from 'react-bootstrap'

export default class View extends Component {

    state = {
        account: [],
        userName: '',
        userEmail: '',
        userMobile: '',
        userPass: ''
    }

    componentDidMount() {
        this.getAllAccounts()
    }


    handleClose = () => {
        this.setState({
            show: !this.state.show,
        })
    }

    handleShow = (accToEdit) => {
        console.log('Account to be Edited ', accToEdit)
        this.setState({
            show: !this.state.show,
            ...accToEdit
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    };





    // Getting data from back-end using Axios api
    getAllAccounts = () => {
        const url = 'https://react-employee-7f915.firebaseio.com/employeeAccount.json'
        Axios.get(url)
            .then((response) => {
                //console.log("Response ", response)
                let fetchedAccount = []
                for (let key in response.data) {
                    let account = response.data[key]
                    //console.log('Direct data ', account)

                    fetchedAccount.push({
                        ...account,
                        id: key
                    })

                    //console.log('ALl details', fetchedAccount)
                    this.setState({
                        account: fetchedAccount
                    })
                }

            })
            .catch((err) => {
                console.log("Erroo ", err)
            })
    }

    async deleteAccount(accToDelete) {

        const id = accToDelete.id;
        const url = 'https://react-employee-7f915.firebaseio.com/employeeAccount/' + id + '/.json'

        try {
            const response = await Axios.delete(url)
            const myAccount = [...this.state.account]

            const index = myAccount.indexOf(accToDelete)

            myAccount.splice(index, 1)

            this.setState({
                account: myAccount
            })

            //Unless, untill it is required dont make unnecessary calls to server
            //worst programming practicce

            //this.getAllAccounts()

            console.log("Response ", response)
        }
        catch (error) {
            console.log("Error ", error)

        }
    }

    saveData = async () => {
        console.log("State Data ", this.state)
        try {
            const { userName, email, phone, userPass, id } = this.state

            const acctoUpdate = { userName, email, phone, userPass, id }
            //console.log(id)
            const url = `https://react-employee-7f915.firebaseio.com/employeeAccount/${this.state.id}/.json`

            const response = await Axios.put(url, acctoUpdate)
            //console.log("response ", response)

            if (response.status === 200) {
                this.handleClose()

                const data = this.state.account
                // solution 1
                data.map((val) => {
                    if (val.id === id) {

                        val.userName = userName
                        val.phone = phone
                        val.email = email
                        val.userPass = userPass
                        val.id = id
                        return val
                    }
                })
                this.setState({
                    show: false,
                    account: data

                })
            }
        }

        catch (err) {
            console.log("Error ", err)
        }
    }



    render() {
        return (
            <div className='table-responsive container-fluid'>
                <table className="table table-striped mt-5 table-hover table-bordered">
                    <thead className='thead-dark'>
                        <tr>
                            <th>UserName</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.account.map(account => {
                            return (
                                <tr key={account.id}>
                                    <td>{account.userName}</td>
                                    <td>{account.userEmail}</td>
                                    <td>{account.userMobile}</td>
                                    <td><button className='btn-danger btn'
                                        onClick={() => { this.deleteAccount(account) }}>Delete</button></td>
                                    <td><button className='btn-success btn'
                                        onClick={() => this.handleShow(account)}>Edit</button></td>

                                </tr>
                            )
                        })}

                    </tbody>
                </table>
                <Modal show={this.state.show} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Updating Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='card card-body'>
                            <form onSubmit={this.saveData}>
                                <h3>Register Account</h3>

                                <label >Name</label>
                                <input name="userName"
                                    className="form-control" type="text"
                                    value={this.state.userName}
                                    placeholder="enter name"
                                    onChange={this.handleChange} required />

                                <label >Email</label>
                                <input name="userEmail"
                                    className="form-control" type="text"
                                    value={this.state.userEmail}
                                    onChange={this.handleChange}
                                    placeholder="enter Email" required />

                                <label >Mobile</label>
                                <input name="userMobile"
                                    className="form-control" type="text"
                                    placeholder="enter Mobile"
                                    maxLength='10'
                                    value={this.state.userMobile} required
                                    onChange={this.handleChange} />

                                <label >Password</label>
                                <input name="userPass"
                                    className="form-control" type="text"
                                    id="" placeholder="enter Password"
                                    onChange={this.handleChange}
                                    value={this.state.userPass} required />
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleClose()}>Close</Button>
                        <Button variant="primary" onClick={() => this.saveData()}>Save Changes </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}
