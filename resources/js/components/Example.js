import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TransferForm from "./TransferForm";
import TransferList from "./TransferList";
import url from "../url";

export default class Example extends Component {
    constructor(props) {
        super(props);

        this.state = {
            money: 0.0,
            transfers: [],
            errors: null,
            form: {
                description: '',
                amount: '',
                wallet_id: 1
            }
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async componentDidMount(){
        try {
            let res = await fetch(`${url}/api/wallet`);
            let data = await res.json();

            this.setState({
                money: data.money,
                transfers: data.transfers
            });
        } catch (error) {
            this.setState({
                error
            })
        }
    }
    async handleSubmit(e){
        e.preventDefault();
        try {
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'aplication/json'
                },
                body: JSON.stringify(this.state.form)
            }

            let res = await fetch(`${url}/api/transfer`, config);
            let data = await res.json();
            let {wallet, transfer} = data;

            this.setState({
                ...this.state.form,
                transfers: this.state.transfers.concat(transfer),
                money: wallet.money
            });
        } catch (error) {
            this.setState({
                error
            })
        }
        console.log('Sending...');
    }

    handleChange(e){
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="col-md-12-m-t-md">
                                <h1 className="title display-3 text-center"> ${ this.state.money } </h1>
                            </div>
                            <div className="col-md-12">
                                <TransferForm form={this.state.form} onChange={this.handleChange} onSubmit={this.handleSubmit}/>
                            </div>
                        </div>
                        <div className="row container justify-content-between mt-5 mx-0 px-0">
                           <TransferList transfers={this.state.transfers}/>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(
        <Example />, document.getElementById('example'));
}