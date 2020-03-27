import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerActions} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {View} from 'react-native';
import {
  Button,
  Portal,
  Dialog,
  IconButton,
  Badge,
  Chip,
  Provider,
  Modal,
  Text,
} from 'react-native-paper';
import {connect} from 'react-redux';
import {logoutUser} from './actions/authActions';
import Icon from 'react-native-vector-icons/AntDesign';
import MyDrawer from './Drawer';
const Stack = createStackNavigator();

const App = props => {
  // console.log(props);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Sweet Panda"
          component={MyDrawer}
          options={({navigation}) => {
            return {
              // title: 'Sweet Panda',
              headerStyle: {
                backgroundColor: '#ff007f',
              },
              headerTintColor: '#ffff',
              headerTitleStyle: {
                // fontWeight: 'bold',
              },
              headerLeft: () => (
                <IconButton
                  icon="menu"
                  color="white"
                  size={25}
                  onPress={() =>
                    navigation.dispatch(DrawerActions.toggleDrawer())
                  }
                />
              ),
              headerRight: () => (
                <View style={{flexDirection: 'row'}}>
                  {props.auth.isAuthenticated ? (
                    <IconButton
                      icon="logout"
                      color="white"
                      size={25}
                      onPress={() => props.logoutUser()}
                    />
                  ) : (
                    <IconButton
                      icon="account"
                      color="white"
                      size={25}
                      onPress={() =>
                        navigation.navigate('Login', {screen: 'Login'})
                      }
                    />
                  )}
                  <IconButton
                    icon="cart-outline"
                    color="white"
                    size={25}
                    onPress={() =>
                      navigation.navigate('My Cart', {screen: 'My Cart'})
                    }
                  />
                </View>
              ),
            };
          }}
        />
        {/* <Stack.Screen
          name="Items List"
          component={MyDrawer}
          options={({navigation: {navigate}}) => {
            return {
              // title: 'Items List',
              headerStyle: {
                backgroundColor: '#ff007f',
              },
              headerTintColor: '#ffff',
              headerTitleStyle: {
                // fontWeight: 'bold',
              },
              headerLeft: () => (
                <IconButton
                  icon="menu"
                  color="white"
                  size={25}
                  onPress={() =>
                    navigation.dispatch(DrawerActions.toggleDrawer())
                  }
                />
              ),
              headerRight: () => (
                <View style={{flexDirection: 'row'}}>
                  {props.auth.isAuthenticated ? (
                    <IconButton
                      icon="logout"
                      color="white"
                      size={25}
                      onPress={() => props.logoutUser()}
                    />
                  ) : (
                    <IconButton
                      icon="account"
                      color="white"
                      size={25}
                      onPress={() => navigate('Login', {screen: 'Login'})}
                    />
                  )}
                  <IconButton
                    icon="cart-outline"
                    color="white"
                    size={25}
                    onPress={() => navigate('My Cart', {screen: 'My Cart'})}
                  />
                </View>
              ),
            };
          }}
        />
        <Stack.Screen
          name="My Cart"
          component={MyDrawer}
          options={({navigation}) => {
            return {
              // title: 'My Cart',
              headerStyle: {
                backgroundColor: '#ff007f',
              },
              headerTintColor: '#ffff',
              headerTitleStyle: {
                // fontWeight: 'bold',
              },
              headerLeft: () => (
                <IconButton
                  icon="menu"
                  color="white"
                  size={25}
                  onPress={() =>
                    navigation.dispatch(DrawerActions.toggleDrawer())
                  }
                />
              ),
              headerRight: () => (
                <View style={{flexDirection: 'row'}}>
                  {props.auth.isAuthenticated ? (
                    <IconButton
                      icon="logout"
                      color="white"
                      size={25}
                      onPress={() => props.logoutUser()}
                    />
                  ) : (
                    <IconButton
                      icon="account"
                      color="white"
                      size={25}
                      onPress={() =>
                        navigation.navigate('Login', {screen: 'Login'})
                      }
                    />
                  )}
                  <IconButton
                    icon="cart-outline"
                    color="white"
                    size={25}
                    onPress={() =>
                      navigation.navigate('My Cart', {screen: 'My Cart'})
                    }
                  />
                </View>
              ),
            };
          }}
        />
        <Stack.Screen
          name="Login"
          component={MyDrawer}
          options={({navigation}) => {
            return {
              // title: 'Login',
              headerStyle: {
                backgroundColor: '#ff007f',
              },
              headerTintColor: '#ffff',
              headerTitleStyle: {
                // fontWeight: 'bold',
              },
              headerLeft: () => (
                <IconButton
                  icon="menu"
                  color="white"
                  size={25}
                  onPress={() =>
                    navigation.dispatch(DrawerActions.toggleDrawer())
                  }
                />
              ),
              headerRight: () => (
                <View style={{flexDirection: 'row'}}>
                  {props.auth.isAuthenticated ? (
                    <IconButton
                      icon="logout"
                      color="white"
                      size={25}
                      onPress={() => props.logoutUser()}
                    />
                  ) : (
                    <IconButton
                      icon="account"
                      color="white"
                      size={25}
                      onPress={() =>
                        navigation.navigate('Login', {screen: 'Login'})
                      }
                    />
                  )}
                  <IconButton
                    icon="cart-outline"
                    color="white"
                    size={25}
                    onPress={() =>
                      navigation.navigate('My Cart', {screen: 'My Cart'})
                    }
                  />
                </View>
              ),
            };
          }}
        /> */}
        {/* <Stack.Screen
          name="SignUp"
          component={MyDrawer}
          options={({navigation}) => {
            return {
              title: 'SignUp',
              headerStyle: {
                backgroundColor: '#ff007f',
              },
              headerTintColor: '#ffff',
              headerTitleStyle: {
                // fontWeight: 'bold',
              },
              headerLeft: () => (
                <IconButton
                  icon="menu"
                  color="white"
                  size={25}
                  onPress={() =>
                    navigation.dispatch(DrawerActions.toggleDrawer())
                  }
                />
              ),
              headerRight: () => (
                <View style={{flexDirection: 'row'}}>
                  {props.auth.isAuthenticated ? (
                    <IconButton
                      icon="logout"
                      color="white"
                      size={25}
                      onPress={() => props.logoutUser()}
                    />
                  ) : (
                    <IconButton
                      icon="account"
                      color="white"
                      size={25}
                      onPress={() =>
                        navigation.navigate('Login', {screen: 'Login'})
                      }
                    />
                  )}
                  <IconButton
                    icon="cart-outline"
                    color="white"
                    size={25}
                    onPress={() =>
                      navigation.navigate('My Cart', {screen: 'My Cart'})
                    }
                  />
                </View>
              ),
            };
          }}
        /> */}
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
