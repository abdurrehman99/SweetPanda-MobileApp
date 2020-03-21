import React, {useState, useEffect} from 'react';
import {registerUser} from '../actions/authActions';
import {connect} from 'react-redux';
import {Button, TextInput, HelperText} from 'react-native-paper';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

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

  const onSubmit = () => {
    const newUser = {
      fullName: state.fullName,
      email: state.email.toLowerCase(),
      password: state.password,
      password2: state.password2,
      mobileNo: state.mobileNo,
    };
    props.registerUser(newUser);
    setState({...state, errors: props.errors});
    console.log(props.errors);
    if (Object.keys(props.errors).length === 0) {
      props.navigation.navigate('Login');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        {/* <Text style={styles.heading}>Sign up to Sweet Panda !</Text> */}
        <Text style={styles.subheading1}>Email</Text>
        <TextInput
          style={styles.formcontrol}
          placeholder="Enter your email"
          mode="outlined"
          error={props.errors.email}
          onChangeText={text => setState({...state, email: text})}
          name="username"
        />
        <HelperText type="error" visible={true}>
          {props.errors.email}
        </HelperText>
        <Text style={styles.subheading1}>Full Name</Text>
        <TextInput
          style={styles.formcontrol}
          placeholder="Enter your fullname"
          mode="outlined"
          error={props.errors.fullName}
          onChangeText={text => setState({...state, fullName: text})}
        />
        <HelperText type="error" visible={true}>
          {props.errors.fullName}
        </HelperText>
        <Text style={styles.subheading1}>Mobile No.</Text>
        <TextInput
          style={styles.formcontrol}
          placeholder="03xxxxxxxxx"
          mode="outlined"
          error={props.errors.mobileNo}
          onChangeText={text => setState({...state, mobileNo: text})}
        />
        <HelperText type="error" visible={true}>
          {props.errors.mobileNo}
        </HelperText>
        <Text style={styles.subheading1}>Password</Text>
        <TextInput
          style={styles.formcontrol}
          placeholder="Password"
          mode="outlined"
          error={props.errors.password}
          secureTextEntry
          onChangeText={text => setState({...state, password: text})}
        />
        <HelperText type="error" visible={true}>
          {props.errors.password}
        </HelperText>
        <Text style={styles.subheading1}>Confirm Password</Text>
        <TextInput
          style={styles.formcontrol}
          placeholder="Re-type Password"
          mode="outlined"
          error={props.errors.password2}
          secureTextEntry
          onChangeText={text => setState({...state, password2: text})}
        />
        <HelperText type="error" visible={true}>
          {props.errors.password2}
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
    marginHorizontal: 10,
    marginTop: 15,
    fontSize: 30,
    margin: 5,
    textAlign: 'center',
  },
  subheading1: {
    fontSize: 18,
    marginLeft: 15,
  },
  formcontrol: {
    marginHorizontal: 15,
    padding: 0,
  },
  btn: {
    alignSelf: 'center',
    width: 120,
    marginVertical: 12,
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {registerUser})(SignUp);
