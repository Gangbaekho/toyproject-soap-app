import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const Input = (props) => {
  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>TITLE</Text>
      <TextInput
        style={StyleSheet.input}
        value={formState.inputValues.title}
        onChange={textChangeHandler.bind(this, "title")}
        keyboardType="default"
        autoCapitalize="sentences"
        autoCorrect
        returnKeyType="next"
        onEndEditing={() => console.log("onEndEditing")}
        onSubmitEditing={() => console.log("onSubmitEditing")}
      />
      {!formState.inputValidities.title && (
        <Text>Please enter a valid title!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Input;
