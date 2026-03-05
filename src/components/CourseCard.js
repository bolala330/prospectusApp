import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RatingButton from './RatingButton';
<<<<<<< HEAD
import * as Animatable from 'react-native-animatable';

export default function CourseCard({ course, onRate, onPlayVideo }) {
  return (
    <Animatable.View animation="fadeInUp" duration={600}>
      <View style={styles.card}>
        <Image source={{ uri: course.image }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.name}>{course.name}</Text>
          <Text style={styles.description} numberOfLines={2}>{course.description}</Text>
          <View style={styles.row}>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>Rating: {course.rating}/6</Text>
              <RatingButton onPress={() => onRate(course.id)} disabled={course.rating >= 6} />
            </View>
            <TouchableOpacity onPress={() => onPlayVideo(course.id)} style={styles.videoButton}>
              <Ionicons name="play-circle" size={32} color="#4A90E2" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animatable.View>
=======

export default function CourseCard({ course, onRate, onPlayVideo }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: course.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{course.name}</Text>
        <Text style={styles.description} numberOfLines={2}>{course.description}</Text>
        <View style={styles.row}>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>Rating: {course.rating}/6</Text>
            <RatingButton onPress={() => onRate(course.id)} disabled={course.rating >= 6} />
          </View>
          <TouchableOpacity onPress={() => onPlayVideo(course.id)} style={styles.videoButton}>
            <Ionicons name="play-circle" size={32} color="#4A90E2" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
>>>>>>> 5060a9564fcfbe5e736cbeb009a54c0e3b94a5b4
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginRight: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  videoButton: {
    padding: 4,
  },
<<<<<<< HEAD
});
=======
});
>>>>>>> 5060a9564fcfbe5e736cbeb009a54c0e3b94a5b4
