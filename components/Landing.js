import React, {useState, useEffect} from 'react';
import {baseURL} from '../app.json';
import {connect} from 'react-redux';
import {addVendor} from '../actions/vendorAction';
import Spinner from './Spinner';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  List,
  ActivityIndicator,
  TouchableRipple,
  TextInput,
  Portal,
  Dialog,
} from 'react-native-paper';
import axios from 'axios';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import myImage from '../assets/food-mbl.png';

const Landing = ({navigation, addVendor}) => {
  let initialState = {
    vendors: [],
    subscriber: '',
  };
  const [state, setState] = useState(initialState);
  const [error, setError] = useState(false);
  const [showModal, setModal] = useState(false);
  const [modalText, setText] = useState('');

  useEffect(() => {
    axios
      .get(baseURL + '/api/getAllVendors')
      .then(res => {
        setState({
          vendors: res.data,
        });
        addVendor(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    // console.log(baseURL);
  }, []);

  subscribe = () => {
    console.log(state.subscriber);
    if (state.subscriber === '' || state.subscriber === undefined) {
      setError(true);
    } else {
      const email = state.subscriber;
      let valid = email.includes('@', '.com');
      if (valid) {
        let data = {email};
        axios
          .post(baseURL + '/api/subscribe', data)
          .then(res => {
            setModal(true);
            setText(res.data.title);
            setState({...state, subscriber: ''});
            setError(false);
          })
          .catch(err => {
            setModal(true);
            setText('Already Subscribed !');
            console.log(err);
          });
      } else {
        setModal(true);
        setText('Invalid or Empty Email !');
      }
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Portal>
          <Dialog visible={showModal} onDismiss={() => setModal(false)}>
            <Dialog.Title style={{alignSelf: 'center'}}>
              {modalText}
            </Dialog.Title>
            <Dialog.Actions>
              <Button mode="text" onPress={() => setModal(false)}>
                ok
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <View>
          <ImageBackground source={myImage} style={styles.img}>
            <Text style={styles.heading}>Welcome To{'\n'}Sweet Panda</Text>
          </ImageBackground>
        </View>

        <View>
          <Text style={styles.heading3}>Our Vendors</Text>

          {state.vendors.length === 0 ? (
            <Spinner />
          ) : (
            state.vendors.map((v, index) => {
              return (
                <Card
                  key={index}
                  style={{
                    width: 300,
                    alignItems: 'center',
                    marginVertical: 10,
                  }}>
                  <Card.Content>
                    <Title>{v.name}</Title>
                    <Card.Cover
                      style={{borderRadius: 100, height: 200, width: 200}}
                      source={{uri: `data:image/jpeg;base64,${v.imgURL}`}}
                    />
                    <Button
                      style={styles.btn}
                      mode="outlined"
                      onPress={() => navigation.navigate('View Products')}>
                      View Products
                    </Button>
                  </Card.Content>
                </Card>
              );
            })
          )}
        </View>

        <View style={styles.about}>
          <Text style={styles.heading3}>About Us</Text>
          <Text style={styles.heading2}>- Quality products</Text>
          <Text style={styles.heading2}>- Affordable rates</Text>
          <Text style={styles.heading2}>- On time delivery</Text>
        </View>
        <View style={styles.about}>
          <Text style={styles.heading3}>Subscribe Us</Text>
          <Text style={styles.heading2}>
            Subscribe to us & get Discount Vouchers !
          </Text>
          <TextInput
            style={styles.formcontrol}
            selectTextOnFocus={true}
            error={error}
            mode="outlined"
            value={state.subscriber}
            label="Enter your email"
            onChangeText={text => {
              setState({...state, subscriber: text});
            }}
          />
          <Button style={styles.btn} mode="contained" onPress={subscribe}>
            Subscribe !
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  about: {
    alignSelf: 'stretch',
    marginLeft: 30,
    marginRight: 30,
  },
  img: {
    width: 360,
    height: 200,
  },
  heading: {
    fontSize: 35,
    marginVertical: 50,
    color: 'white',
    textAlign: 'center',
  },
  heading2: {
    fontSize: 18,
    marginVertical: 10,
  },
  heading3: {
    fontSize: 30,
  },
  formcontrol: {
    padding: 0,
  },
  btn: {
    alignSelf: 'center',
    width: 160,
    marginVertical: 10,
  },
});

const mapStateToProps = state => ({
  vendors: state.vendors,
});

export default connect(mapStateToProps, {addVendor})(Landing);
