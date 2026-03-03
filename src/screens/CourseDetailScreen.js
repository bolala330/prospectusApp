import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import { useCourses } from '../context/CoursesContext';
import RatingButton from '../components/RatingButton';
import globalStyles from '../styles/globalStyles';

export default function CourseDetailScreen({ route }) {
  const { courseId } = route.params;
  const { courses, updateRating } = useCourses();
  const course = courses[courseId];

  return (
    <View style={globalStyles.container}>
      <Image source={{ uri: course.image }} style={styles.image} />
      <Text style={styles.name}>{course.name}</Text>
      <Text style={styles.description}>{course.description}</Text>
      <Video
        source={{ uri: course.video }}
        style={styles.video}
        useNativeControls
        resizeMode="contain"
        isLooping
      />
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>Rating: {course.rating} / 6</Text>
        <RatingButton onPress={() => updateRating(course.id)} disabled={course.rating >= 6} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
    color: '#333',
  },
  description: {
    fontSize: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    color: '#666',
  },
  video: {
    width: '100%',
    height: 200,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 16,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: '600',
  },
});