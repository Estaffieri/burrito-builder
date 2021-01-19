import React, { Component } from 'react';
import './App.css';
import { getOrders, postOrder } from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: []
    }
  }

  addOrders = async (name, ingredients) => {
    await postOrder(name, ingredients)
    const orderRecord = await getOrders()
    this.setState({orders: orderRecord.orders})
  }

  async componentDidMount() {
    const orderEls = await getOrders()
    this.setState({orders: orderEls.orders})
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addOrders={this.addOrders} />
        </header>
        <Orders orders={this.state.orders}/>
      </main>
    );
  }
}


export default App;
