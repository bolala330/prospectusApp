import React, { createContext, useState, useContext } from 'react';
import { facultiesData } from '../data/facultiesData';

const CoursesContext = createContext();

export const useCourses = () => useContext(CoursesContext);

export const CoursesProvider = ({ children }) => {
  // Initialize courses with rating 0
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
