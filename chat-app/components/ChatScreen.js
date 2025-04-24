import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import io from 'socket.io-client/dist/socket.io';

// Use the deployed Vercel URL instead of localhost IP
const socket = io('https://chat-app-backend-7oid8t77y-manikantas-projects-0f76be39.vercel.app', {
  transports: ['websocket'],
  path: '/api/socket'  // Important: match the path in your server config
});

export default function ChatScreen({ user }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef();

  useEffect(() => {
    socket.on('chatHistory', data => {
      setMessages(data);
    });
    socket.on('receiveMessage', data => {
      // only add if it's not your own – avoids double‑printing
      if (data.user !== user) {
        setMessages(prev => [...prev, data]);
      }
    });

    return () => {
      socket.off('chatHistory');
      socket.off('receiveMessage');
    };
  }, [user]);

  const sendMessage = () => {
    if (!message.trim()) return;
    const time = new Date().toLocaleTimeString();
    const msgData = { user, message, time };
    socket.emit('sendMessage', msgData);
    // show your own message immediately
    setMessages(prev => [...prev, msgData]);
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Chat Room</Text>
      </View>
      
      <ScrollView
        style={styles.chatBox}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
      >
        {messages.map((msg, i) => (
          <View 
            key={i} 
            style={[
              styles.messageContainer,
              msg.user === user ? styles.myMessage : styles.otherMessage
            ]}
          >
            {msg.user !== user && (
              <Text style={styles.userName}>{msg.user}</Text>
            )}
            <View style={[
              styles.messageBubble,
              msg.user === user ? styles.myBubble : styles.otherBubble
            ]}>
              <Text style={[
                styles.messageText,
                msg.user === user ? styles.myMessageText : styles.otherMessageText
              ]}>
                {msg.message}
              </Text>
            </View>
            <Text style={styles.time}>{msg.time}</Text>
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          placeholderTextColor="#999"
          style={styles.input}
          multiline
        />
        <TouchableOpacity 
          style={styles.sendButton} 
          onPress={sendMessage}
          disabled={!message.trim()}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 15,
    backgroundColor: '#075e54',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    elevation: 3,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  chatBox: { 
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    marginBottom: 15,
    maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
  },
  otherMessage: {
    alignSelf: 'flex-start',
  },
  userName: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#555',
  },
  messageBubble: {
    borderRadius: 20,
    padding: 12,
    marginBottom: 2,
  },
  myBubble: {
    backgroundColor: '#dcf8c6', // WhatsApp green for your messages
    borderTopRightRadius: 5,
  },
  otherBubble: {
    backgroundColor: 'white',
    borderTopLeftRadius: 5,
  },
  messageText: {
    fontSize: 16,
  },
  myMessageText: {
    color: '#000',
  },
  otherMessageText: {
    color: '#000',
  },
  time: {
    fontSize: 10,
    color: '#999',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#075e54',
    borderRadius: 25,
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    alignSelf: 'flex-end',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});