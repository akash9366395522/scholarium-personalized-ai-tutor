import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export const PaymentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const total = route.params?.total || '$0.00';

  const [selectedOption, setSelectedOption] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCVC] = useState('');

  const handleExpiryChange = (text) => {
    if (text.length === 2 && !text.includes('/')) {
      setExpiry(text + '/');
    } else {
      setExpiry(text);
    }
  };

  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();
  };

  const handleCardNumberChange = (text) => {
    const formatted = formatCardNumber(text);
    setCardNumber(formatted);
  };

  const renderCardFields = () => {
    if (selectedOption !== 'card') return null;

    return (
      <View style={styles.cardBox}>
        <Text style={styles.cardLabel}>Card information</Text>
        <View style={styles.cardInputRow}>
          <TextInput
            style={styles.cardInput}
            placeholder="XXXX XXXX XXXX XXXX"
            placeholderTextColor={'#999'}
            keyboardType="numeric"
            value={cardNumber}
            onChangeText={handleCardNumberChange}
            maxLength={19}
          />
          <Image
            source={{ uri: 'https://img.icons8.com/color/48/visa.png' }}
            style={styles.cardLogo}
          />
        </View>
        <View style={styles.cardSubRow}>
          <TextInput
            style={styles.subInput}
            placeholder="MM/YY"
            keyboardType="numeric"
            placeholderTextColor={'#999'}
            value={expiry}
            onChangeText={handleExpiryChange}
            maxLength={5}
          />
          <TextInput
            style={styles.subInput}
            placeholder="CVC"
            keyboardType="numeric"
            placeholderTextColor={'#999'}
            value={cvc}
            onChangeText={(text) => setCVC(text.slice(0, 3))}
            maxLength={3}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.pageContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Payment</Text>
  
        {/* Payment Options */}
        <TouchableOpacity
          style={[
            styles.option,
            selectedOption === 'card' && styles.selectedOption,
          ]}
          onPress={() => setSelectedOption('card')}
        >
          <Image
            source={{ uri: 'https://img.icons8.com/color/48/bank-card-back-side.png' }}
            style={styles.optionIcon}
          />
          <Text style={styles.optionText}>Credit Card</Text>
          <View
            style={[
              styles.radioCircle,
              selectedOption === 'card' && styles.radioSelected,
            ]}
          />
        </TouchableOpacity>
        {renderCardFields()}
  
        <TouchableOpacity
          style={[
            styles.option,
            selectedOption === 'paypal' && styles.selectedOption,
          ]}
          onPress={() => setSelectedOption('paypal')}
        >
          <Image
            source={{ uri: 'https://img.icons8.com/color/48/paypal.png' }}
            style={styles.optionIcon}
          />
          <Text style={styles.optionText}>PayPal</Text>
          <View
            style={[
              styles.radioCircle,
              selectedOption === 'paypal' && styles.radioSelected,
            ]}
          />
        </TouchableOpacity>
  
        <TouchableOpacity
          style={[
            styles.option,
            selectedOption === 'apple' && styles.selectedOption,
          ]}
          onPress={() => setSelectedOption('apple')}
        >
          <Image
            source={{ uri: 'https://img.icons8.com/ios-filled/50/mac-os.png' }}
            style={styles.optionIcon}
          />
          <Text style={styles.optionText}>Apple Pay</Text>
          <View
            style={[
              styles.radioCircle,
              selectedOption === 'apple' && styles.radioSelected,
            ]}
          />
        </TouchableOpacity>
      </ScrollView>
  
      {/* Fixed Bottom Total & Button */}
      <View style={styles.fixedBottom}>
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Order total</Text>
          <Text style={styles.totalPrice}>{total}</Text>
        </View>
  
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => navigation.navigate('SuccessScreen')}
        >
          <Text style={styles.confirmText}>Confirm Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: '#f9f9f9',
    
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 50,
    marginTop: 5,
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingVertical: 30,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 20,
   
    elevation: 1,
  },
  selectedOption: {
    backgroundColor: '#e8f9ff', // light cream background
    borderColor: 'lightgrey',     // gold border
    elevation: 3,
    borderWidth: 2,
  },
  optionIcon: {
    width: 30,
    height: 30,
    marginRight: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  radioSelected: {
    borderColor: '#001740',
    backgroundColor: '#007AFF',
  },
  cardBox: {
    backgroundColor: '#e8f9ff',
    elevation: 2,
    borderRadius: 12,
    paddingVertical: 25,
    paddingHorizontal: 20,
    marginBottom: 30,
    marginTop: -10,
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  cardInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  cardInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  cardLogo: {
    width: 40,
    height: 25,
    resizeMode: 'contain',
  },
  cardSubRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    flex: 0.48,
    fontSize: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: '600',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: '600',
    color:'#007AFF',
  },
  confirmButton: {
    backgroundColor: '#001740',
    padding: 15,
    borderRadius: 12,
    marginTop: 20,     // Add spacing from above content
    marginBottom: 45,  // Extra space for iPhone bottom safe area
    alignItems: 'center',
  },
  
  confirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  pageContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContainer: {
    padding: 25,
    paddingBottom: 150, // give space below for fixed button
  },
  fixedBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 25,
    paddingTop: 5,
    paddingBottom: 1,
    
    
  },
  
});
