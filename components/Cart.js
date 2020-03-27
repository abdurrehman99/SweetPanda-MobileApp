import React, {useState, useEffect} from 'react';
import {baseURL} from '../app.json';
import {fillCart} from '../actions/cartAction';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {
  DataTable,
  List,
  Banner,
  IconButton,
  Title,
  Headline,
  Subheading,
  TextInput,
  Button,
  Dialog,
  HelperText,
  Badge,
  Paragraph,
} from 'react-native-paper';
import {connect} from 'react-redux';
import axios from 'axios';

const Cart = props => {
  const [cart, setCart] = useState([]);
  const [amount, setAmount] = useState(0);
  const [address, setAddress] = useState('');
  const [error, setError] = useState(false);
  const [auth, setAuth] = useState(false);
  const [order, setOrder] = useState(false);

  useEffect(() => {
    const {mycart} = props.cart;
    setCart(mycart);
    console.log(mycart);
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
      setError(true);
    } else {
      let data = {
        user: props.auth.user,
        address,
        paymentMethod: 'Cash on Delivery',
        mycart: cart,
        totalAmount: amount,
      };
      console.log(props.cart.mycart);
      axios
        .post(baseURL + '/api/orders', data)
        .then(res => {
          alert('Your Order has been placed !');
          // console.log(res.data);
          setAddress('');
          setAmount(0);
          props.fillCart([]);
          props.navigation.navigate('Sweet Panda');
        })
        .catch(err => {
          alert('Error in sending your order !');
          // console.log(err.response.data);
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
                  <DataTable.Cell>{c.itemName}</DataTable.Cell>
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
            error={error}
            onChangeText={text => {
              setAddress(text);
              setError(false);
            }}
            mode="flat"
          />
          <HelperText type="error" visible={error}>
            Address Required !
          </HelperText>
          <Button
            style={{marginTop: 3}}
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
          <Button
            style={{width: 120, margin: 8}}
            // size={25}
            icon="account"
            mode="outlined"
            onPress={() => props.navigation.navigate('Login')}>
            Log In
          </Button>
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
