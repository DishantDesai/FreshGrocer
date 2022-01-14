import React from "react";
import { Text, TextInput, StyleSheet, View } from "react-native";

const CustomInput = (props) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <View style={{ marginBottom: 20 }}>
      <TextInput
        style={[styles.input, hasError && styles.errorInput]}
        value={value}
        onChangeText={(text) => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#ecedf1",
    height: 45,
    borderRadius: 15,
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
    paddingHorizontal: 10,
  },
  errorText: {
    fontSize: 12,
    color: "red",
    paddingLeft: 8,
    marginTop: 5,
  },
  errorInput: {
    borderColor: "red",
  },
});

export default CustomInput;
