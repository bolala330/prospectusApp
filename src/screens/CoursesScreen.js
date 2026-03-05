<<<<<<< HEAD
﻿import React, { useState } from 'react';
=======
﻿import React from 'react';
>>>>>>> 5060a9564fcfbe5e736cbeb009a54c0e3b94a5b4
import { View, FlatList, StyleSheet } from 'react-native';
import { useCourses } from '../context/CoursesContext';
import { facultiesData } from '../data/facultiesData';
import CourseCard from '../components/CourseCard';
import globalStyles from '../styles/globalStyles';
<<<<<<< HEAD
import { Searchbar } from 'react-native-paper';

export default function CoursesScreen({ route, navigation }) {
  const { facultyId } = route.params;
  const { courses, updateRating } = useCourses();
  const [query, setQuery] = useState('');

  const faculty = facultiesData.find(f => f.id === facultyId);
  const facultyCourses = faculty.courses.map(c => courses[c.id]);
  const filteredCourses = facultyCourses.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={globalStyles.container}>
      <Searchbar
        placeholder="Search courses..."
        onChangeText={setQuery}
        value={query}
        style={{ margin: 16 }}
      />
      <FlatList
        data={filteredCourses}
=======

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
>>>>>>> 5060a9564fcfbe5e736cbeb009a54c0e3b94a5b4
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CourseCard
            course={item}
<<<<<<< HEAD
            onRate={updateRating}
            onPlayVideo={(id) => navigation.navigate('CourseDetail', { courseId: id })}
=======
            onRate={handleRate}
            onPlayVideo={handlePlayVideo}
>>>>>>> 5060a9564fcfbe5e736cbeb009a54c0e3b94a5b4
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  list: { padding: 16 },
});
=======
  list: {
    padding: 16,
  },
});
>>>>>>> 5060a9564fcfbe5e736cbeb009a54c0e3b94a5b4
