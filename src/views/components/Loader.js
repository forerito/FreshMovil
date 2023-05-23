import { useWindowDimensions } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { BarIndicator } from "react-native-indicators";

const Loader = ({ visible = false }) => {
  const { width, height } = useWindowDimensions();
  return (
    visible && (
      <View style={[styles.container, { width, height }]}>
        <View style={styles.loader}>
          <BarIndicator color="black" count={5} />
          <Text style={styles.text}>Por favor espere</Text>
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  loader: {
    height: 90,
    backgroundColor: "white",
    marginHorizontal: 50,
    borderRadius: 5,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: 'center',
  },
  container: {
    position: "absolute",
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,.5)",
    justifyContent: "center",
  },
  text: {
    marginBottom: 5,
    fontSize: 15,
    color: "black",
  },
});

export default Loader;