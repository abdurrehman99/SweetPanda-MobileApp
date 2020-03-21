import React, {useState, useEffect} from 'react';
import {registerUser} from '../actions/authActions';
import {connect} from 'react-redux';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
} from 'react-native';
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
    if (props.errors === []) {
      props.navigation.navigate('Login');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.heading}>Sign up to Sweet Panda !</Text>
        <Text style={styles.subheading1}>Email</Text>
        <TextInput
          style={styles.formcontrol}
          placeholder="Enter your email"
          onChangeText={text => setState({...state, email: text})}
          name="username"
        />
        <Text style={styles.subheading2}>
          We'ill never share your email with anyone else
        </Text>
        <Text style={styles.subheading1}>Full Name</Text>
        <TextInput
          style={styles.formcontrol}
          placeholder="Enter your fullname"
          onChangeText={text => setState({...state, fullName: text})}
        />
        <Text style={styles.subheading1}>Mobile No.</Text>
        <TextInput
          style={styles.formcontrol}
          placeholder="03xxxxxxxxx"
          onChangeText={text => setState({...state, mobileNo: text})}
        />
        <Text style={styles.subheading1}>Password</Text>
        <TextInput
          style={styles.formcontrol}
          placeholder="Password"
          secureTextEntry
          onChangeText={text => setState({...state, password: text})}
        />
        <Text style={styles.subheading1}>Confirm Password</Text>
        <TextInput
          style={styles.formcontrol}
          placeholder="Re-type Password"
          secureTextEntry
          onChangeText={text => setState({...state, password2: text})}
        />
        <View style={styles.btn}>
          <Icon.Button size={25} name="adduser" onPress={() => onSubmit()}>
            SignUp
          </Icon.Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  heading: {
    marginHorizontal: 70,
    marginTop: 15,
    fontSize: 30,
    margin: 5,
    textAlign: 'center',
  },
  subheading1: {
    fontSize: 18,
    marginLeft: 15,
  },
  subheading2: {
    color: 'grey',
    fontSize: 12,
    marginLeft: 20,
    marginBottom: 8,
  },

  formcontrol: {
    borderColor: 'grey',
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 8,
    borderRadius: 10,
  },
  btn: {
    alignSelf: 'center',
    width: 100,
    marginVertical: 12,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: 'wheat',
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {registerUser})(SignUp);
