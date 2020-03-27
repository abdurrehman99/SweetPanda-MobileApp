import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import Signup from './components/Signup';
import Login from './components/Login';
import Landing from './components/Landing';
import ItemsList from './components/ItemsList';
import Cart from './components/Cart';
import {logoutUser} from './actions/authActions';

const Drawer = createDrawerNavigator();

const MyDrawer = props => {
  if (props.auth.isAuthenticated) {
    return (
      <Drawer.Navigator
        backBehavior="history"
        drawerType="slide"
        drawerPosition="left">
        <Drawer.Screen name="Sweet Panda" component={Landing} />
        <Drawer.Screen name="View Products" component={ItemsList} />
        <Drawer.Screen name="My Cart" component={Cart} />
      </Drawer.Navigator>
    );
  } else {
    return (
      <Drawer.Navigator
        backBehavior="history"
        drawerType="slide"
        drawerPosition="left">
        <Drawer.Screen name="Sweet Panda" component={Landing} />
        <Drawer.Screen name="View Products" component={ItemsList} />
        <Drawer.Screen name="My Cart" component={Cart} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="SignUp" component={Signup} />
      </Drawer.Navigator>
    );
  }
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {logoutUser})(MyDrawer);
