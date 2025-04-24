import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import ChatScreen from './components/ChatScreen';

export default function App() {
  const [user, setUser] = useState('');

  return user ? <ChatScreen user={user} /> : <LoginScreen setUser={setUser} />;
}
