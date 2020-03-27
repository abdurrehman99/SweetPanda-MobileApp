import React, {useState, useEffect} from 'react';
import {registerUser} from '../actions/authActions';
import {connect} from 'react-redux';
import {
  Button,
  TextInput,
  HelperText,
  Portal,
  Dialog,
  Paragraph,
} from 'react-native-paper';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {baseURL} from '../app.json';

const SignUp = props => {
  let initialState = {
    fullName: '',
    mobileNo: '',
    email: '',
    password: '',
    password2: '',
    errors: {},
  };
  const [state, setState] = useState(initialState);
  const [showModal, setModal] = useState(false);

  const onSubmit = () => {
    if (
      state.fullName === '' &&
      state.mobileNo === '' &&
      state.email === '' &&
      state.password === '' &&
      state.password2 === ''
    ) {
      setModal(true);
    } else {
      const newUser = {
        fullName: state.fullName,
        email: state.email.toLowerCase(),
        password: state.password,
        password2: state.password2,
        mobileNo: state.mobileNo,
      };
      axios
        .post(baseURL + '/api/users/register', newUser)
        .then(res => {
          props.navigation.navigate('Login');
        })
        .catch(err => {
          // console.log(err.response.data);
          setState({...state, errors: err.response.data});
        });
      // props.registerUser(newUser);
      // console.log(state.errors);
      // if (Object.keys(state.errors).length === 0) {
      //   props.navigation.navigate('Login');
      // }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Portal>
          <Dialog visible={showModal} onDismiss={() => setModal(false)}>
            <Dialog.Title style={{alignSelf: 'center'}}>
              Empty field(s) !
            </Dialog.Title>
            <Dialog.Actions>
              <Button mode="text" onPress={() => setModal(false)}>
                Dismiss
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Text style={styles.heading}>Sign up to Sweet Panda !</Text>
        <TextInput
          style={styles.formcontrol}
          label="Enter your email"
          mode="outlined"
          maxLength={25}
          error={state.errors.email}
          onChangeText={text => setState({...state, email: text})}
          name="username"
        />
        <HelperText type="error" visible={true}>
          {state.errors.email}
        </HelperText>
        <TextInput
          style={styles.formcontrol}
          label="Enter your name"
          mode="outlined"
          maxLength={25}
          error={state.errors.fullName}
          onChangeText={text => setState({...state, fullName: text})}
        />
        <HelperText type="error" visible={true}>
          {state.errors.fullName}
        </HelperText>
        <TextInput
          style={styles.formcontrol}
          placeholder="03001234567"
          label="Mobile No."
          mode="outlined"
          maxLength={11}
          error={state.errors.mobileNo}
          onChangeText={text => setState({...state, mobileNo: text})}
        />
        <HelperText type="error" visible={true}>
          {state.errors.mobileNo}
        </HelperText>
        <TextInput
          style={styles.formcontrol}
          label="Password"
          mode="outlined"
          selectTextOnFocus={true}
          error={state.errors.password}
          maxLength={25}
          secureTextEntry
          onChangeText={text => setState({...state, password: text})}
        />
        <HelperText type="error" visible={true}>
          {state.errors.password}
        </HelperText>
        <TextInput
          style={styles.formcontrol}
          label="Confirm Password"
          mode="outlined"
          selectTextOnFocus={true}
          maxLength={25}
          error={state.errors.password2}
          secureTextEntry
          onChangeText={text => setState({...state, password2: text})}
        />
        <HelperText type="error" visible={true}>
          {state.errors.password2}
        </HelperText>
        <View style={styles.btn}>
          <Button
            mode="contained"
            size={25}
            icon="account-plus"
            onPress={() => onSubmit()}>
            SignUp
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: 'wheat',
  },
  heading: {
    // marginHorizontal: 15,
    marginVertical: 15,
    fontSize: 30,
    margin: 5,
    textAlign: 'center',
  },
  formcontrol: {
    marginHorizontal: 15,
    padding: 0,
  },
  btn: {
    alignSelf: 'center',
    width: 120,
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {registerUser})(SignUp);
