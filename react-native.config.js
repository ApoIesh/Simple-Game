module.exports = {
  dependency: {
      'react-native-vector-icons': {
           platforms: {
             ios: null,
           },
         },
  platforms: {
      android: null, // disable Android platform, other platforms will still autolink if provided
    },
  },
  assets: ['./src/components/Assets/fonts'],
};
