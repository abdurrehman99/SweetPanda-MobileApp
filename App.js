import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import {View} from 'react-native';
import {Button, IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import Signup from './components/Signup';
import Login from './components/Login';
import Landing from './components/Landing';
import Items from './components/ItemsList';
import Cart from './components/Cart';
import {connect} from 'react-redux';
import {logoutUser} from './actions/authActions';
const Stack = createStackNavigator();

const App = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Sweet Panda"
          component={Landing}
          options={({navigation: {navigate}}) => {
            return {
              // title: 'Login',
              headerStyle: {
                backgroundColor: '#ff007f',
              },
              headerTintColor: '#ffff',
              headerTitleStyle: {
                // fontWeight: 'bold',
              },
              headerRight: () => (
                <View style={{flexDirection: 'row'}}>
                  {props.auth.isAuthenticated ? (
                    <IconButton
                      icon="account-arrow-left"
                      color="white"
                      size={25}
                      onPress={() => props.logoutUser()}
                    />
                  ) : (
                    <IconButton
                      icon="account-arrow-right"
                      color="white"
                      size={25}
                      onPress={() => navigate('Login')}
                    />
                  )}
                  <IconButton
                    icon="cart-outline"
                    color="white"
                    size={25}
                    onPress={() => navigate('Cart')}
                  />
                </View>
              ),
            };
          }}
        />
        <Stack.Screen
          name="Items List"
          component={Items}
          options={({navigation: {navigate}}) => {
            return {
              // title: 'Login',
              headerStyle: {
                backgroundColor: '#ff007f',
              },
              headerTintColor: '#ffff',
              headerTitleStyle: {
                // fontWeight: 'bold',
              },
              headerRight: () => (
                <View style={{flexDirection: 'row'}}>
                  {props.auth.isAuthenticated ? (
                    <IconButton
                      icon="account-arrow-left"
                      color="white"
                      size={25}
                      onPress={() => props.logoutUser()}
                    />
                  ) : (
                    <IconButton
                      icon="account-arrow-right"
                      color="white"
                      size={25}
                      onPress={() => navigate('Login')}
                    />
                  )}
                  <IconButton
                    icon="cart-outline"
                    color="white"
                    size={25}
                    onPress={() => navigate('Cart')}
                  />
                </View>
              ),
            };
          }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={({navigation: {navigate}}) => {
            return {
              // title: 'Login',
              headerStyle: {
                backgroundColor: '#ff007f',
              },
              headerTintColor: '#ffff',
              headerTitleStyle: {
                // fontWeight: 'bold',
              },
              headerRight: () => (
                <View style={{flexDirection: 'row'}}>
                  {props.auth.isAuthenticated ? (
                    <IconButton
                      icon="account-arrow-left"
                      color="white"
                      size={25}
                      onPress={() => props.logoutUser()}
                    />
                  ) : (
                    <IconButton
                      icon="account-arrow-right"
                      color="white"
                      size={25}
                      onPress={() => navigate('Login')}
                    />
                  )}
                  <IconButton
                    icon="cart-outline"
                    color="white"
                    size={25}
                    onPress={() => navigate('Cart')}
                  />
                </View>
              ),
            };
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={({navigation: {navigate}}) => {
            return {
              // title: 'Login',
              headerStyle: {
                backgroundColor: '#ff007f',
              },
              headerTintColor: '#ffff',
              headerTitleStyle: {
                // fontWeight: 'bold',
              },
              headerRight: () => (
                <View style={{flexDirection: 'row'}}>
                  {props.auth.isAuthenticated ? (
                    <IconButton
                      icon="account-arrow-left"
                      color="white"
                      size={25}
                      onPress={() => props.logoutUser()}
                    />
                  ) : (
                    <IconButton
                      icon="account-arrow-right"
                      color="white"
                      size={25}
                      onPress={() => navigate('Login')}
                    />
                  )}
                  <IconButton
                    icon="cart-outline"
                    color="white"
                    size={25}
                    onPress={() => navigate('Cart')}
                  />
                </View>
              ),
            };
          }}
        />
        <Stack.Screen
          name="Sign up"
          component={Signup}
          options={({navigation: {navigate}}) => {
            return {
              // title: 'Login',
              headerStyle: {
                backgroundColor: '#ff007f',
              },
              headerTintColor: '#ffff',
              headerTitleStyle: {
                // fontWeight: 'bold',
              },
              headerRight: () => (
                <View style={{flexDirection: 'row'}}>
                  {props.auth.isAuthenticated ? (
                    <IconButton
                      icon="account-arrow-left"
                      color="white"
                      size={25}
                      onPress={() => props.logoutUser()}
                    />
                  ) : (
                    <IconButton
                      icon="account-arrow-right"
                      color="white"
                      size={25}
                      onPress={() => navigate('Login')}
                    />
                  )}
                  <IconButton
                    icon="cart-outline"
                    color="white"
                    size={25}
                    onPress={() => navigate('Cart')}
                  />
                </View>
              ),
            };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = state => ({
  cart: state.cart,
  auth: state.auth,
  vendors: state.vendor,
});

export default connect(mapStateToProps, {logoutUser})(App);
