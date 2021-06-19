
import React from 'react';
import { Component } from 'react';
import { instanceOf } from 'prop-types';
import { connect } from 'react-redux';
import { Card, Table } from 'react-bootstrap';
import { fetchOrderDetails } from '../actions/orderDetails_actions';

class AmountComponent extends Component {

  async componentDidMount() {
    const { fetchOrderDetails } = this.props;
    fetchOrderDetails();
  }

  render() {
    const { order_details } = this.props;
    const { error_fetching } = this.props;

     if (error_fetching) {
        return (
          // style={{ "boxShadow": "2px 5px 10px 4px" }}
          <Card className="mt-5">
            <Card.Body>
              <Card.Title align="center"> SESSION EXPIRED</Card.Title>
            </Card.Body>
          </Card>
        )
      }
      else {
        return (
          <Card className="mt-5">

            <Card.Body>

              {order_details && <Card.Title> Payment from {order_details.store_name}</Card.Title>}

              <Table responsive>
                <thead>
                  <tr style={{ backgroundColor: "#E0E0E0" }}>
                    <th>Description</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {order_details &&
                    order_details.items.map((item) => (
                      <tr key={item.product_id}>
                        <td>{item.name} x {item.quantity}</td>
                        <td>{order_details.currency} {item.product_price}</td>
                      </tr>
                    )
                    )}
                </tbody>
                <thead>
                  <tr>
                    <th style={{ fontSize: 25 }}>Total</th>
                    {order_details && <th style={{ fontSize: 20 }}>{order_details.currency} {order_details.total_amount}</th>}
                  </tr>
                </thead>
              </Table>

            </Card.Body>
          </Card>
        )
      }
    }
  }
  const mapStateToProps = ({ order }) => {
    return {
      fetching_order: order.fetching_order,
      order_details: order.order_details,
      error_fetching: order.error_fetching
    };
  };
  const Amount = connect(mapStateToProps, { fetchOrderDetails })(AmountComponent);
export { Amount };