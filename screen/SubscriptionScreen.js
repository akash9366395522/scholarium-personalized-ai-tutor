import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const SubscriptionScreen = () => {
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const subscriptions = [
    {
      id: 1,
      image: { uri: 'https://img.icons8.com/emoji/48/star-emoji.png' },
      duration: '3 Months',
      monthly: '$9.86 per month',
      total: '$30.99',
    },
    {
      id: 2,
      image: { uri: 'https://img.icons8.com/color/48/diamond.png' },
      duration: '6 Months',
      monthly: '$9.86 per month',
      total: '$55.99',
    },
    {
      id: 3,
      image: { uri: 'https://img.icons8.com/emoji/48/crown-emoji.png' },
      duration: '12 Months',
      monthly: '$9.86 per month',
      total: '$78.99',
    },
  ];

  const handleSubscribe = () => {
    if (!selectedItem) {
      Alert.alert('Please select a subscription first.');
      return;
    }

    navigation.navigate('PaymentScreen', { total: selectedItem.total });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Get access to all</Text>
      <Text style={styles.header1}>courses and features</Text>
      <Text style={styles.subHeader}>
        Join now to become a member
      </Text>

      <View style={styles.benefit}>
        <Text style={styles.checkmark}>✅</Text>
        <Text style={styles.benefitText}>Unlock over 15 Courses</Text>
      </View>
      <View style={styles.benefit}>
        <Text style={styles.checkmark}>✅</Text>
        <Text style={styles.benefitText}>Unlock over 120 prompts per day</Text>
      </View>
      <View style={styles.benefit}>
        <Text style={styles.checkmark}>✅</Text>
        <Text style={styles.benefitText}>Get Professional Certificates</Text>
      </View>

      <Text style={styles.selectText}>Select your subscription</Text>

      {subscriptions.map((item) => {
        const isSelected = selectedId === item.id;
        return (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              setSelectedId(item.id);
              setSelectedItem(item);
            }}
            style={[
              styles.subscriptionBox,
              isSelected && styles.selectedBox,
            ]}
          >
            <Image source={item.image} style={styles.icon} />
            <View style={{ flex: 1 }}>
              <Text style={styles.duration}>{item.duration}</Text>
              <Text style={styles.monthly}>{item.monthly}</Text>
            </View>
            <Text style={styles.total}>{item.total}</Text>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity
        style={styles.subscribeButton}
        onPress={handleSubscribe}
      >
        <Text style={styles.subscribeText}>Subscribe Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    fontSize: 28,
    marginTop: 20,
    fontWeight: 'bold',
    marginBottom: -5,
    color: '#111',
  },
  header1: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#111',
  },
  
  subHeader: {
    fontSize: 16,
    color: 'grey',
    marginBottom: 20,
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkmark: {
    fontSize: 18,
    marginRight: 10,
  },
  benefitText: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
  },
  selectText: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 20,
  },
  subscriptionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    elevation: 1,
  },
  selectedBox: {
    backgroundColor: '#e8f9ff', // light cream background
    borderColor: '#001740',     // gold border
    elevation: 1,
    borderWidth: 2,
  },
  
  icon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  duration: {
    fontSize: 16,
    fontWeight: '600',
  },
  monthly: {
    fontSize: 12,
    color: '#555',
  },
  total: {
    fontSize: 16,
    fontWeight: '600',
    color: '#001740',
  },
  subscribeButton: {
    backgroundColor: '#001740',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 130,
    elevation: 2,
  },
  subscribeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
