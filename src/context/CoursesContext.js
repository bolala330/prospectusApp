import React, { createContext, useState, useContext } from 'react';
import { facultiesData } from '../data/facultiesData';

const CoursesContext = createContext();
export const useCourses = () => useContext(CoursesContext);

export const CoursesProvider = ({ children }) => {
  const [courses, setCourses] = useState(() => {
    const allCourses = {};
    facultiesData.forEach(faculty => {
      faculty.courses.forEach(course => {
        allCourses[course.id] = { ...course, rating: 0 };
      });
    });
    return allCourses;
  });

  const updateRating = (courseId, newRating = null) => {
    setCourses(prev => ({
      ...prev,
      [courseId]: {
        ...prev[courseId],
        rating: newRating !== null 
          ? newRating 
          : prev[courseId].rating < 6 ? prev[courseId].rating + 1 : 6
      }
    }));
  };

  return (
    <CoursesContext.Provider value={{ courses, updateRating }}>
      {children}
    </CoursesContext.Provider>
  );
};
