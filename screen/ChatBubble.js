import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import React from 'react';

const ChatBubble = ({ role, text, onSpeech,  selectedChatFaceData  }) => {
    const iconColor = selectedChatFaceData?.primary || '#fff';
  return (
    <View
      style={[
        styles.chatItem,
        role === 'user' ? [styles.userChatItem, { backgroundColor: iconColor }]: styles.modelChatItem,
      ]}
    >
      <Text style={styles.chatText}>{text}</Text>
      {role === 'model' && (
        <TouchableOpacity onPress={onSpeech} style={styles.speakerIcon}>
          <Ionicons name="volume-high-outline" size={20} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chatItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: '70%',
    position: 'relative',
  },
  userChatItem: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
  },
  modelChatItem: {
    backgroundColor: '#333',
    alignSelf: 'flex-start',
  },
  chatText: {
    color: '#fff',
    fontSize: 16,
  },
  speakerIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
});

export default React.memo(ChatBubble);
