import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function EditUserScreen({ route, navigation }) {
  const { user } = route.params;
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const updateUser = async () => {
    await updateDoc(doc(db, 'users', user.id), { name, email });
    navigation.goBack();
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput value={name} onChangeText={setName} />
      <TextInput value={email} onChangeText={setEmail} />
      <Button title="Update" onPress={updateUser} />
    </View>
  );
}