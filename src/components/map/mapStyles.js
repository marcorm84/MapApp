import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  searchBox:{
    top:0,
    position:"absolute",
    width:width,
    zIndex: 1
  },
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  map:{
    ...StyleSheet.absoluteFillObject,
    marginTop: 200,
    zIndex: 2
  }
});

export default styles;
