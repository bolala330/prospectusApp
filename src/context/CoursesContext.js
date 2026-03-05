import React, { createContext, useState, useContext } from 'react';
import { facultiesData } from '../data/facultiesData';

const CoursesContext = createContext();
<<<<<<< HEAD
export const useCourses = () => useContext(CoursesContext);

export const CoursesProvider = ({ children }) => {
=======

export const useCourses = () => useContext(CoursesContext);

export const CoursesProvider = ({ children }) => {
  // Initialize courses with rating 0
>>>>>>> 5060a9564fcfbe5e736cbeb009a54c0e3b94a5b4
  const [courses, setCourses] = useState(() => {
    const allCourses = {};
    facultiesData.forEach(faculty => {
      faculty.courses.forEach(course => {
        allCourses[course.id] = { ...course, rating: 0 };
      });
    });
    return allCourses;
  });

  const updateRating = (courseId) => {
    setCourses(prev => ({
      ...prev,
      [courseId]: {
        ...prev[courseId],
        rating: prev[courseId].rating < 6 ? prev[courseId].rating + 1 : 6
      }
    }));
  };

  return (
    <CoursesContext.Provider value={{ courses, updateRating }}>
      {children}
    </CoursesContext.Provider>
  );
};
