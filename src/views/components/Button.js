import { Text, TouchableOpacity, StyleSheet } from "react-native";

const Button = ({ title, onPress = () => {} }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
      activeOpacity={0.7}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: "50%",
    backgroundColor: "#249bad",
    marginBottom: 10,
    alignSelf: 'center',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  title: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Button;