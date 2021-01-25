import React from "react";
import {
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  Button,
} from "react-native";

import Input from "../../components/UI/Input";
import Colors from "../../constants/Colors";

// 이거 Gradient를 쉽게 쓸 수 있도록 도와주는
// 그런거니까 나중에 이용하도록 하자!
import { LinearGradient } from "expo-linear-gradient";

const AuthScreen = (props) => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <View style={styles.authContainer}>
          <ScrollView>
            <View style={styles.formControl}>
              <Text style={styles.label}>E-MAIL</Text>
              <TextInput
                style={styles.input}
                id="email"
                keyboardType="email-address"
                required
                email
                autoCapitalize="none"
                onChange={() => {}}
                initialValue=""
              />
            </View>
            <View style={styles.formControl}>
              <Text style={styles.label}>PASSWORD</Text>
              <TextInput
                style={styles.input}
                id="password"
                keyboardType="default"
                secureTextEntry
                minLength={5}
                required
                email
                autoCapitalize="none"
                onChange={() => {}}
                initialValue=""
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Login" color={Colors.primary} onPress={() => {}} />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Switch to Sign up"
                color={Colors.accent}
                onPress={() => {}}
              />
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Authenticate",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 2,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
