import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useCourses } from '../context/CoursesContext';
import { facultiesData } from '../data/facultiesData';
import CourseCard from '../components/CourseCard';
import globalStyles from '../styles/globalStyles';
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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CourseCard
            course={item}
            onRate={updateRating}
            onPlayVideo={(id) => navigation.navigate('CourseDetail', { courseId: id })}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
});
