import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
  ToastAndroid,
  Alert,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import Clipboard from '@react-native-clipboard/clipboard';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../navigation/route.contants';

export default function HomeScreen({}) {
  const [copied, setCopied] = useState(false);
  const [link, setLink] = useState('');

  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        if (link?.url === 'https://assignment://') {
          navigation.navigate(ROUTES.PROFILE_SCREEN);
        }
      });
  }, []);

  const handleDynamicLink = (link: {url: string}) => {
    // Handle dynamic link inside your own application
    if (link.url === 'https://assignment://') {
      navigation.navigate(ROUTES.PROFILE_SCREEN);
    }
  };

  const generateLink = async () => {
    try {
      const link = await dynamicLinks().buildShortLink(
        {
          link: `https://assignment://`,
          domainUriPrefix: `https://ssingh.page.link`,
          android: {
            packageName: `com.assignment`,
          },
        },
        dynamicLinks.ShortLinkType.DEFAULT,
      );
      console.log('link:', link);
      ToastAndroid.show('Link generated!', ToastAndroid.SHORT);
      setLink(link);
    } catch (error) {
      Alert.alert(JSON.stringify(error))
      return '';
    }
  };
  const copyToClipboard = () => {
    if (link) {
      Clipboard.setString(link);

      if (Platform.OS === 'android') {
        ToastAndroid.show('Text copied to clipboard!', ToastAndroid.SHORT);
      } else if (Platform.OS === 'ios') {
        Alert.alert('Text copied to clipboard!');
      }
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{}}>HomeScreen</Text>

      {link && <Text>{link}</Text>}

      <Pressable onPress={generateLink} style={styles.btn}>
        <Text style={styles.btnTitle}>Generate Link</Text>
      </Pressable>
      <Pressable onPress={copyToClipboard} style={styles.btn} disabled={!link}>
        <Text style={styles.btnTitle}>Copy Link</Text>
      </Pressable>
      {copied && (
        <Text style={styles.successMessageStyle}>
          Text copied to clipboard!
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  successMessageStyle: {
    color: 'green',
    marginTop: 10,
  },
  btn: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  btnTitle: {
    color: '#797ee6',
    fontSize: 20,
    textAlign: 'center',
  },
});
