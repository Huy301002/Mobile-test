import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { baseUrl } from "./utils/IP";
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();
  const requestToken = (token) => {
    return axios.create({
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/users/login`,
        {
          user_name: username,
          password: password,
        }
      );
      await AsyncStorage.setItem("accessToken", response.data.result.access_token);
      await AsyncStorage.setItem("user_id", response.data.result.user_id);
      axios.defaults.headers.common.Authorization = `Bearer ${response.data.result.access_token}`;
      navigation.navigate("HomeDrawer");
    } catch (error) {
      setErrorMessage("Invalid username or password");
      console.log("response data", error);
    }
  };

  const handleForgot = () => {
    navigation.navigate('Forget');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/the_oasis_luxury.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.label}>Please log into your account</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!showPassword} // Sử dụng !showPassword để ẩn hoặc hiện mật khẩu
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Icon
            name={showPassword ? "eye-slash" : "eye"}
            size={20}
            color="#000"
          />
        </TouchableOpacity>
      </View>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <View style={styles.checkboxContainer} >
        <TouchableOpacity onPress={handleForgot}>
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or log in with</Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <View style={{ flex: 1, marginRight: 5 }}>
          <Button title="Facebook" color="#3b5998" onPress={() => { }} />
        </View>
        <View style={{ flex: 1, marginLeft: 5 }}>
          <Button title="Github" color="#333" onPress={() => { }} />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <View style={{ flex: 1, marginRight: 5 }}>
          <Button title="Firebase" color="#FFA611" onPress={() => { }} />
        </View>
        <View style={{ flex: 1, marginLeft: 5 }}>
          <Button title="Google+" color="#dd4b39" onPress={() => { }} />
        </View>
      </View>
      <TouchableOpacity
        style={{ marginTop: 40 }}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.linkText}>Don't Have an Account? Registration</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
    marginTop: -50,
    marginLeft: -250,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: 12
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  checkbox: {
    fontSize: 16,
  },
  linkText: {
    color: "#26AAA0",
    textDecorationLine: "none",
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#26AAA0",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  orText: {
    marginVertical: 10,
  },
});

export default LoginScreen;
