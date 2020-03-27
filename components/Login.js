import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  TextInput,
  HelperText,
  Button,
  Portal,
  Dialog,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {setCurrentUser} from '../actions/authActions';
import {connect} from 'react-redux';
import axios from 'axios';
import {baseURL} from '../app.json';
import jwtDecode from 'jwt-decode';

const Login = props => {
  let initialState = {
    email: '',
    password: '',
    errors: {},
  };
  const [state, setState] = useState(initialState);
  const [showModal, setModal] = useState(false);

  useEffect(() => {
    // console.log(props.auth);
    if (props.auth.isAuthenticated === true) {
      props.navigation.navigate('Items List');
    }
  }, []);

  const onSubmit = () => {
    if (state.email === '' && state.password === '') {
      setModal(true);
    } else {
      const userData = {
        email: state.email.toLowerCase(),
        password: state.password,
      };
      axios
        .post(baseURL + '/api/users/login', userData)
        .then(res => {
          const {token} = res.data;

          //set token to AUTH header
          // setAuthToken(token);

          //decode token to get data
          const decoded = jwtDecode(token);
          console.log(decoded);
          props.setCurrentUser(decoded);
          props.navigation.navigate('View Products');
        })
        .catch(err => {
          setState({...state, errors: err.response.data});
        });
      console.log(state.errors);
      // props.loginUser(userData);
      // console.log(state.errors, Object.keys(state.errors).length);
      // if (Object.keys(state.errors).length === 0) {
      //   props.navigation.navigate('Items List');
      // }
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Portal>
          <Dialog visible={showModal} onDismiss={() => setModal(false)}>
            <Dialog.Title style={{alignSelf: 'center'}}>
              Empty field(s) !
            </Dialog.Title>
            {/* <Dialog.Content>
              <Paragraph></Paragraph>
            </Dialog.Content> */}
            <Dialog.Actions>
              <Button mode="text" onPress={() => setModal(false)}>
                Dismiss
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Text style={styles.heading}>Login to your account</Text>
        <Text style={styles.heading2}>Don't have a account ?</Text>
        <View>
          <Button
            style={styles.btn}
            // size={25}
            icon="account-plus"
            mode="outlined"
            onPress={() => props.navigation.navigate('SignUp')}>
            Sign Up
          </Button>
        </View>
        <TextInput
          style={styles.formcontrol}
          label="Enter email"
          mode="outlined"
          maxLength={25}
          onChangeText={text => setState({...state, email: text})}
          value={state.email}
          error={state.errors.email}
        />
        <HelperText type="error" visible={true}>
          {state.errors.email}
        </HelperText>
        <TextInput
          style={styles.formcontrol}
          label="Enter password"
          mode="outlined"
          maxLength={25}
          onChangeText={text => setState({...state, password: text})}
          secureTextEntry
          value={state.password}
          error={state.errors.password}
          selectTextOnFocus={true}
        />
        <HelperText type="error" visible={true}>
          {state.errors.password}
        </HelperText>
        <View>
          <Button
            // size={35}
            style={styles.btn}
            icon="account"
            mode="contained"
            onPress={onSubmit}>
            Log in
          </Button>
        </View>
        <View style={styles.or}>
          <Text>OR</Text>
        </View>
        <View style={styles.fbbtn}>
          <Icon.Button
            size={25}
            name="facebook-square"
            onPress={() => console.log('fb btn clicked')}>
            LOGIN WITH FACEBOOK
          </Icon.Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  heading: {
    fontSize: 30,
    marginBottom: 10,
    textAlign: 'center',
  },
  heading2: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'center',
  },
  formcontrol: {
    marginHorizontal: 15,
    padding: 0,
  },
  fbbtn: {
    alignSelf: 'center',
    width: 210,
    borderRadius: 0,
  },
  btn: {
    alignSelf: 'center',
    width: 120,
    margin: 8,
  },
  or: {
    alignSelf: 'center',
    marginBottom: 8,
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {setCurrentUser})(Login);
