import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Limkokwing Logo */}
      <Image
        source={require('../../assets/limkokwing-logo.jpeg')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>🌟 Welcome to Limkokwing University</Text>
      <Text style={styles.subtitle}>
        We are excited to welcome new intakes!  
        Begin your journey of creativity, innovation, and global opportunity.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('MainTabs')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f2f4f7', padding: 20 },
  logo: { width: 250, height: 100, marginBottom: 30 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#4A90E2', marginBottom: 12, textAlign: 'center' },
  subtitle: { fontSize: 18, color: '#666', marginBottom: 40, textAlign: 'center', lineHeight: 24 },
  button: { backgroundColor: '#4A90E2', paddingVertical: 14, paddingHorizontal: 40, borderRadius: 10, elevation: 4 },
  buttonText: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
});
