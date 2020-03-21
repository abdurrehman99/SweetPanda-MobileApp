import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput, HelperText, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {loginUser, setCurrentUser} from '../actions/authActions';
import {connect} from 'react-redux';
// import {TextInput} from 'react-native-paper';

const Login = props => {
  let initialState = {
    email: '',
    password: '',
    errors: {},
  };
  const [state, setState] = useState(initialState);
  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.navigation.navigate('Items List');
    }
  }, []);
  const onSubmit = () => {
    if (state.email === '' && state.password === '') {
      alert('Empty field(s)');
    } else {
      const userData = {
        email: state.email.toLowerCase(),
        password: state.password,
      };
      props.loginUser(userData);
      console.log(props.errors, Object.keys(props.errors).length);
      if (Object.keys(props.errors).length === 0) {
        setState({
          email: '',
          password: '',
        });
        props.navigation.navigate('Items List');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>Login to your account</Text>
        <Text style={styles.heading2}>Don't have a account ?</Text>
        <View>
          <Button
            style={styles.btn}
            // size={25}
            icon="account-plus"
            mode="outlined"
            onPress={() => props.navigation.navigate('Sign up')}>
            Sign Up
          </Button>
        </View>
        <TextInput
          style={styles.formcontrol}
          label="Enter email"
          mode="outlined"
          onChangeText={text => setState({...state, email: text})}
          value={state.email}
          error={props.errors.email}
          selectionColor="grey"
        />
        <HelperText type="error" visible={true}>
          {props.errors.email}
        </HelperText>
        <TextInput
          style={styles.formcontrol}
          label="Enter password"
          mode="outlined"
          onChangeText={text => setState({...state, password: text})}
          secureTextEntry
          value={state.password}
          error={props.errors.password}
          helperText="aasddsa"
          selectionColor="grey"
          selectTextOnFocus={true}
        />
        <HelperText type="error" visible={true}>
          {props.errors.password}
        </HelperText>
        <View>
          <Button
            // size={35}
            style={styles.btn}
            icon="account"
            mode="contained"
            onPress={onSubmit}>
            Login
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
    marginBottom: 20,
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

export default connect(mapStateToProps, {setCurrentUser, loginUser})(Login);
