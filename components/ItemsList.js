import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {connect} from 'react-redux';
import Quantity from './Quantity';
import {addToCart, addVendor} from '../actions/cartAction';
import {Dropdown} from 'react-native-material-dropdown';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Avatar,
  Button,
  Card,
  Title,
  Dialog,
  Portal,
  RadioButton,
  Paragraph,
  Modal,
  ActivityIndicator,
  Provider,
} from 'react-native-paper';
import axios from 'axios';
import Spinner from './Spinner';
import {baseURL} from '../app.json';
const Tab = createBottomTabNavigator();
const ItemsList = props => {
  const SweetsList = () => (
    <ScrollView>
      <View style={styles.container}>
        {state.sweets.length === 0 ? (
          <Spinner />
        ) : (
          state.sweets.map((s, index) => {
            return (
              <Card
                key={index}
                style={{
                  width: 300,
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <Card.Content>
                  <Title>{s.name}</Title>
                  <Card.Cover
                    style={{borderRadius: 100, height: 200, width: 200}}
                    source={{uri: `data:image/jpeg;base64,${s.imgURL}`}}
                  />
                  <Quantity getValue={getCount} />
                  <Paragraph>{s.price} / KG</Paragraph>
                  <Button
                    // style={styles.btn}
                    mode="outlined"
                    onPress={() => fillCart(s.name, s.price, quantity)}>
                    Add to cart
                  </Button>
                </Card.Content>
              </Card>
            );
          })
        )}
      </View>
    </ScrollView>
  );

  const CakesList = () => (
    <ScrollView>
      <View style={styles.container}>
        {state.sweets.length === 0 ? (
          <Spinner />
        ) : (
          state.cakes.map((s, index) => {
            return (
              <Card
                key={index}
                style={{
                  width: 300,
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <Card.Content>
                  <Title>{s.name}</Title>
                  <Card.Cover
                    style={{borderRadius: 100, height: 200, width: 200}}
                    source={{uri: `data:image/jpeg;base64,${s.imgURL}`}}
                  />
                  <Quantity getValue={getCount} />
                  <Paragraph>{s.price} Rs</Paragraph>
                  <Button
                    // style={styles.btn}
                    mode="outlined"
                    onPress={() => fillCart(s.name, s.price, quantity)}>
                    Add to cart
                  </Button>
                </Card.Content>
              </Card>
            );
          })
        )}
      </View>
    </ScrollView>
  );
  const HalwaList = () => (
    <ScrollView>
      <View style={styles.container}>
        {state.halwa.length === 0 ? (
          <Spinner />
        ) : (
          state.halwa.map((s, index) => {
            return (
              <Card
                key={index}
                style={{
                  width: 300,
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <Card.Content>
                  <Title>{s.name}</Title>
                  <Card.Cover
                    style={{borderRadius: 100, height: 200, width: 200}}
                    source={{uri: `data:image/jpeg;base64,${s.imgURL}`}}
                  />
                  <Quantity getValue={getCount} />
                  <Paragraph>{s.price} / KG</Paragraph>
                  <Button
                    // style={styles.btn}
                    mode="outlined"
                    onPress={() => fillCart(s.name, s.price, quantity)}>
                    Add to cart
                  </Button>
                </Card.Content>
              </Card>
            );
          })
        )}
      </View>
    </ScrollView>
  );
  const NimkoList = () => (
    <ScrollView>
      <View style={styles.container}>
        {state.sweets.length === 0 ? (
          <Spinner />
        ) : (
          state.nimko.map((s, index) => {
            return (
              <Card
                key={index}
                style={{
                  width: 300,
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <Card.Content>
                  <Title>{s.name}</Title>
                  <Card.Cover
                    style={{borderRadius: 100, height: 200, width: 200}}
                    source={{uri: `data:image/jpeg;base64,${s.imgURL}`}}
                  />
                  <Quantity getValue={getCount} />
                  <Paragraph>{s.price} Rs / 250 gm</Paragraph>
                  <Button
                    // style={styles.btn}
                    mode="outlined"
                    onPress={() => fillCart(s.name, s.price, quantity)}>
                    Add to cart
                  </Button>
                </Card.Content>
              </Card>
            );
          })
        )}
      </View>
    </ScrollView>
  );

  const fillCart = (name, price, quantity) => {
    let data = {
      itemName: name,
      price,
      quantity,
    };
    console.log(data);
    props.addToCart(data);
    setShowModal(true);
  };

  const getCount = value => {
    quantity = value;
    console.log(quantity);
  };
  let quantity = 1;
  const [state, setState] = useState({
    sweets: [],
    nimko: [],
    halwa: [],
    cakes: [],
  });

  const [index, setIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [routes] = useState([
    {key: '0', title: 'Sweet'},
    {key: '1', title: 'Cakes'},
    {key: '2', title: 'Halwa'},
    {key: '3', title: 'Nimko'},
  ]);

  const getData = async () => {
    try {
      const sweets = await axios.get(baseURL + '/api//getAllProducts/Sweet');
      const nimko = await axios.get(baseURL + '/api//getAllProducts/Nimko');
      const cakes = await axios.get(baseURL + '/api//getAllProducts/Cake');
      const halwa = await axios.get(baseURL + '/api//getAllProducts/Halwa');
      setState({
        sweets: sweets.data,
        nimko: nimko.data,
        halwa: halwa.data,
        cakes: cakes.data,
      });
      props.addVendor(sweets);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const renderScene = SceneMap({
    0: SweetsList,
    1: CakesList,
    2: HalwaList,
    3: NimkoList,
  });

  return (
    // <Tab.Navigator>
    //   <Tab.Screen name="Sweets" component={SweetsList} />
    //   <Tab.Screen name="Cakes" component={CakesList} />
    //   <Tab.Screen name="Halwa" component={HalwaList} />
    //   <Tab.Screen name="Nimko" component={NimkoList} />
    // </Tab.Navigator>
    <TabView
      renderTabBar={props => (
        <TabBar {...props} style={{backgroundColor: '#ff007f'}} />
      )}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      indicatorStyle={{backgroundColor: 'pink'}}
      // initialLayout={initialLayout}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  btn: {
    marginVertical: 16,
  },
});

const mapStateToProps = state => ({
  //   cart: state.cart,
});

export default connect(mapStateToProps, {addToCart, addVendor})(ItemsList);
