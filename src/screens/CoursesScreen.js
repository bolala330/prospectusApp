import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useCourses } from '../context/CoursesContext';
import { facultiesData } from '../data/facultiesData';
import CourseCard from '../components/CourseCard';
import globalStyles from '../styles/globalStyles';

export default function CoursesScreen({ route, navigation }) {
  const { facultyId, facultyName } = route.params;
  const { courses, updateRating } = useCourses();

  const faculty = facultiesData.find(f => f.id === facultyId);
  const facultyCourses = faculty.courses.map(c => courses[c.id]);

  const handleRate = (courseId) => {
    updateRating(courseId);
  };

  const handlePlayVideo = (courseId) => {
    navigation.navigate('CourseDetail', { courseId });
  };

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={facultyCourses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CourseCard
            course={item}
            onRate={handleRate}
            onPlayVideo={handlePlayVideo}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
});
