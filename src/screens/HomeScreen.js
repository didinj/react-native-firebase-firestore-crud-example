import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity } from 'react-native';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function HomeScreen({ navigation }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), snapshot => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(list);
    });
    return unsubscribe;
  }, []);

  const deleteUser = async (id) => {
    await deleteDoc(doc(db, 'users', id));
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Add User" onPress={() => navigation.navigate('AddUser')} />
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('EditUser', { user: item })}
          >
            <Text>{item.name} - {item.email}</Text>
            <Button title="Delete" onPress={() => deleteUser(item.id)} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}