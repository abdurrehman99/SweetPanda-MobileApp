import React, {useState, useEffect} from 'react';
import {baseURL} from '../app.json';
import {fillCart} from '../actions/cartAction';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {
  DataTable,
  Button,
  List,
  Banner,
  IconButton,
  Title,
  Headline,
  Subheading,
  TextInput,
} from 'react-native-paper';
import {connect} from 'react-redux';
import axios from 'axios';

const Cart = props => {
  const [cart, setCart] = useState([]);
  const [amount, setAmount] = useState(0);
  const [address, setAddress] = useState('');
  const [auth, setAuth] = useState(false);
  const [order, setOrder] = useState(false);

  useEffect(() => {
    const {mycart} = props.cart;
    setCart(mycart);
    let bill = 0;
    // console.log(props.auth);
    mycart.forEach(cart => {
      bill = bill + Number(cart.price) * Number(cart.quantity);
    });
    if (bill === 0) {
      setOrder(true);
    }
    setAmount(bill);
    if (props.auth.Authenticated) {
      setAuth(true);
    }
  }, []);

  const payBill = () => {
    if (address === '') {
      alert('Enter your address !');
    } else {
      let data = {
        user: props.user,
        address,
        paymentMethod: 'Cash on Delivery',
        mycart: cart,
        totalAmount: amount,
      };
      axios
        .post(baseURL + '/api/orders', data)
        .then(res => {
          alert('Your Order has been placed !');
          console.log(res);
          setAddress('');
          setAmount(0);
          props.fillCart([]);
        })
        .catch(err => {
          alert('Error in sending your order !');
          console.log(err);
        });
    }
  };

  return (
    <ScrollView>
      {props.auth.isAuthenticated ? (
        <View>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Item Name</DataTable.Title>
              <DataTable.Title numeric>Quantity</DataTable.Title>
              <DataTable.Title numeric>Price</DataTable.Title>
              <DataTable.Title numeric>Amount</DataTable.Title>
            </DataTable.Header>
            {cart.map((c, index) => {
              return (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{c.name}</DataTable.Cell>
                  <DataTable.Cell numeric>{c.quantity}</DataTable.Cell>
                  <DataTable.Cell numeric>{c.price}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {c.price * c.quantity}
                  </DataTable.Cell>
                </DataTable.Row>
              );
            })}
            {/* <DataTable.Pagination
          page={1}
          numberOfPages={5}
          onPageChange={page => {
            console.log(page);
          }}
          label="1-2 of 6"
        /> */}
          </DataTable>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Subheading>Total Bill</Subheading>
            <Headline>{amount}</Headline>
          </View>
          <TextInput
            label="Enter your address"
            value={address}
            onChangeText={text => setAddress(text)}
            mode="flat"
          />
          <Button
            style={{marginTop: 5}}
            icon="check"
            mode="contained"
            disabled={order}
            onPress={() => payBill()}>
            Order Now !
          </Button>
        </View>
      ) : (
        <View style={{alignItems: 'center', marginHorizontal: 20}}>
          <IconButton icon="cart-off" color="#ff007f" size={45} />
          <Headline>You are not logged in !</Headline>
        </View>
      )}
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  cart: state.cart,
  auth: state.auth,
  vendors: state.vendor,
});

export default connect(mapStateToProps, {fillCart})(Cart);
