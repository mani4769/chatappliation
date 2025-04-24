import React, { useState } from 'react';
import { 
  View, 
  Text,
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar
} from 'react-native';

export default function LoginScreen({ setUser }) {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (username.trim()) {
      setUser(username.trim());
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#075e54" />
      
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.appTitle}>Chat App</Text>
      </View>
      
      <View style={styles.formContainer}>
        <Text style={styles.label}>Enter your name to continue</Text>
        <TextInput
          placeholder="Your name"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          placeholderTextColor="#999"
          autoFocus
          returnKeyType="go"
          onSubmitEditing={handleLogin}
        />
        
        <TouchableOpacity 
          style={[
            styles.loginButton, 
            !username.trim() ? styles.loginButtonDisabled : {}
          ]}
          onPress={handleLogin}
          disabled={!username.trim()}
        >
          <Text style={styles.loginButtonText}>Join Chat</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Simple • Fast • Secure</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#075e54',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  welcomeText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 20,
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginTop: 20,
  },
  label: {
    marginBottom: 15,
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  loginButton: {
    backgroundColor: '#075e54',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  loginButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#888',
    fontSize: 14,
  }
});