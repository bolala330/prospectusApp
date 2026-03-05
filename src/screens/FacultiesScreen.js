import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { facultiesData } from '../data/facultiesData';
import globalStyles from '../styles/globalStyles';

export default function FacultiesScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Courses', { facultyId: item.id, facultyName: item.name })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={globalStyles.container}>
      {/* Back Arrow to Welcome */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Welcome')}>
        <Ionicons name="arrow-back" size={28} color="#4A90E2" />
      </TouchableOpacity>

      <FlatList
        data={facultiesData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 4,
  },
  image: { width: '100%', height: 150 },
  name: { fontSize: 20, fontWeight: 'bold', padding: 16, color: '#333' },
  backButton: {
    margin: 16,
    alignSelf: 'flex-start',
  },
});
