import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput, FlatList, Image } from 'react-native';
import globalStyles from '../styles/globalStyles';
import { facultiesData } from '../data/facultiesData';
import { Ionicons } from '@expo/vector-icons';

// Flatten all courses into a single array (25 courses)
const allCourses = facultiesData.flatMap(faculty => faculty.courses);

const questions = [
  {
    question: 'What kind of work excites you most?',
    options: [
      { label: 'Designing buildings', icon: 'business' },
      { label: 'Analyzing data', icon: 'analytics' },
      { label: 'Creating visual content', icon: 'color-palette' },
      { label: 'Telling stories', icon: 'mic' },
      { label: 'Managing people', icon: 'people' }
    ],
  },
  {
    question: 'Which skill would you like to develop?',
    options: [
      { label: 'Creative thinking', icon: 'bulb' },
      { label: 'Technical programming', icon: 'code-slash' },
      { label: 'Artistic expression', icon: 'brush' },
      { label: 'Communication', icon: 'chatbubbles' },
      { label: 'Leadership', icon: 'trophy' }
    ],
  }
];

export default function QuizScreen() {
  const [step, setStep] = useState('credits'); // 'credits', 'questions', 'results'
  const [credits, setCredits] = useState('');
  const [answers, setAnswers] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);

  const handleCreditsSubmit = () => {
    const numCredits = parseInt(credits);
    if (isNaN(numCredits) || numCredits < 0) {
      Alert.alert('Invalid Input', 'Please enter a valid number of credits (0 or more).');
      return;
    }
    setStep('questions');
    setAnswers([]);
  };

  const handleAnswer = (index) => {
    const newAnswers = [...answers, index];
    if (answers.length === 0) {
      // First question answered, move to second question
      setAnswers(newAnswers);
    } else {
      // Second question answered – compute recommendations
      const firstIdx = newAnswers[0];
      const secondIdx = newAnswers[1];
      const numCredits = parseInt(credits);

      // Filter courses student qualifies for
      const qualified = allCourses.filter(c => c.minCredits <= numCredits);

      if (qualified.length === 0) {
        Alert.alert(
          'Not Qualified',
          `You need at least ${Math.min(...allCourses.map(c => c.minCredits))} credits to qualify for any course.`,
          [{ text: 'Restart', onPress: () => setStep('credits') }]
        );
        return;
      }

      // Find the course that matches the answers exactly (preferred)
      const preferredIndex = firstIdx * 5 + secondIdx;
      const preferredCourse = allCourses[preferredIndex];

      // Build recommended list: start with preferred if qualified
      let recommendations = [];
      if (preferredCourse.minCredits <= numCredits) {
        recommendations.push(preferredCourse);
      }

      // Add other qualified courses from the same faculty (if not already included)
      const sameFacultyCourses = qualified.filter(c => 
        c.id.startsWith(preferredCourse.id.substring(0, 2)) && c.id !== preferredCourse.id
      );
      recommendations = [...recommendations, ...sameFacultyCourses];

      // If we still have fewer than 3, add other qualified courses
      if (recommendations.length < 3) {
        const otherQualified = qualified.filter(c => !recommendations.includes(c));
        recommendations = [...recommendations, ...otherQualified];
      }

      // Limit to top 3
      recommendations = recommendations.slice(0, 3);

      setRecommendedCourses(recommendations);
      setStep('results');
    }
  };

  const restartQuiz = () => {
    setStep('credits');
    setCredits('');
    setAnswers([]);
    setRecommendedCourses([]);
  };

  if (step === 'credits') {
    return (
      <View style={globalStyles.container}>
        <View style={styles.card}>
          <Text style={styles.question}>How many credits do you have?</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={credits}
            onChangeText={setCredits}
            placeholder="Enter credits (e.g., 3)"
          />
          <TouchableOpacity style={styles.option} onPress={handleCreditsSubmit}>
            <Text style={styles.optionText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (step === 'questions') {
    const currentQuestionIndex = answers.length; // 0 or 1
    const currentQuestion = questions[currentQuestionIndex];

    return (
      <View style={globalStyles.container}>
        <View style={styles.card}>
          <Text style={styles.question}>{currentQuestion.question}</Text>
          {currentQuestion.options.map((option, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.option}
              onPress={() => handleAnswer(idx)}
            >
              <Ionicons name={option.icon} size={24} color="#fff" style={{ marginRight: 10 }} />
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
          <Text style={styles.progress}>Question {currentQuestionIndex + 1} of {questions.length}</Text>
        </View>
      </View>
    );
  }

  // Results step
  return (
    <View style={globalStyles.container}>
      <View style={styles.card}>
        <Text style={styles.resultTitle}>✨ Recommended Courses ✨</Text>
        <Text style={styles.resultSubtitle}>Based on your {credits} credits and interests</Text>
        <FlatList
          data={recommendedCourses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.resultItem}>
              <Image source={{ uri: item.image }} style={styles.resultImage} />
              <View style={styles.resultText}>
                <Text style={styles.resultName}>{item.name}</Text>
                <Text style={styles.resultDesc} numberOfLines={2}>{item.description}</Text>
                <Text style={styles.resultCredits}>Required credits: {item.minCredits}</Text>
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
        <TouchableOpacity style={styles.restartButton} onPress={restartQuiz}>
          <Text style={styles.restartText}>Take Quiz Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    margin: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flex: 1,
  },
  question: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  option: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  progress: {
    marginTop: 20,
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
    textAlign: 'center',
    marginBottom: 8,
  },
  resultSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  resultItem: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee',
  },
  resultImage: {
    width: 80,
    height: 80,
  },
  resultText: {
    flex: 1,
    padding: 10,
  },
  resultName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  resultDesc: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  resultCredits: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A90E2',
  },
  restartButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  restartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
