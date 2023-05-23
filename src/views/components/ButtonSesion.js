import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const Button = ({ title, onPress = () => { } }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={styles.button}
        activeOpacity={0.7}
      >
        <Text style={styles.title}>{title}</Text>
        <Icon name="sign-out-alt" size={24} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#249bad',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginTop: 5,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    flexDirection: 'row',
  },
  icon: {
    color: 'black',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default Button;