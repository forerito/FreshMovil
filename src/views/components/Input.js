import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const Input = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => { },
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <View
        style={[
          styles.input,
          { borderColor: isFocused ? "#5FFDFF" : "black" },
        ]}
      >
        <Icon name={iconName} style={styles.icon} />
        <TextInput
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          style={styles.textInput}
          secureTextEntry={hidePassword}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? "eye" : "eye-slash"}
            style={styles.iconEye}
          />
        )}
      </View>
      {error && <Text style={styles.textError}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 55,
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 2,
    color: 'gray',
    alignItems: "center",
    borderRadius: 6,
  },
  icon: {
    fontSize: 15,
    color: "black",
  },
  iconEye: {
    fontSize: 20,
    color: "black",
  },
  textInput: {
    color: "black",
    flex: 1,
    marginLeft: 10,
  },
  textError: {
    marginTop: 7,
    color: "red",
    fontSize: 14,
  },
});

export default Input;