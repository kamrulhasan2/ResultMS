// Define your grading scale and weights
// This is highly specific to the institution
const GRADING_SCALE = [
  { grade: 'A+', points: 4.00, minMarks: 80 },
  { grade: 'A',  points: 3.75, minMarks: 75 },
  { grade: 'A-', points: 3.50, minMarks: 70 },
  { grade: 'B+', points: 3.25, minMarks: 65 },
  { grade: 'B',  points: 3.00, minMarks: 60 },
  { grade: 'B-', points: 2.75, minMarks: 55 },
  { grade: 'C+', points: 2.50, minMarks: 50 },
  { grade: 'C',  points: 2.25, minMarks: 45 },
  { grade: 'D',  points: 2.00, minMarks: 40 },
  { grade: 'F',  points: 0.00, minMarks: 0 },
];

// These weights are as per your SRS
const ASSESSMENT_WEIGHTS = {
  assignment: 0.10, // 10%
  classTest: 0.10,  // 10%
  midterm: 0.30,    // 30%
  finalExam: 0.50,  // 50%
};

// Assuming each subject has a credit hour (e.g., 3 credits)
// This should ideally come from subject data
const DEFAULT_CREDIT_HOURS = 3;

export function getTotalMarks(markEntry) {
  return (markEntry.assignment || 0) + (markEntry.classTest || 0) + (markEntry.midterm || 0) + (markEntry.finalExam || 0);
}

export function getGradePoint(totalMarksPercentage) {
  for (const scale of GRADING_SCALE) {
    if (totalMarksPercentage >= scale.minMarks) {
      return { grade: scale.grade, points: scale.points };
    }
  }
  return { grade: 'F', points: 0.00 }; // Default if not found (should not happen if minMarks 0 is 'F')
}

/**
 * Calculates GPA for a single semester.
 * @param {Array} semesterMarks - Array of mark objects for one semester for a student
 * [{ subject: 'Math', assignment: 8, classTest: 7, midterm: 25, finalExam: 40, creditHours: 3 (optional) }, ...]
 */
export function calculateGPA(semesterMarks) {
  if (!semesterMarks || semesterMarks.length === 0) return 0;

  let totalPoints = 0;
  let totalCredits = 0;

  semesterMarks.forEach(mark => {
    const marksObtained = getTotalMarks(mark); // Max marks for these components sum to 100
    const percentage = marksObtained; // Since total is out of 100
    
    const { points } = getGradePoint(percentage);
    const creditHours = mark.creditHours || DEFAULT_CREDIT_HOURS; // Use actual credit hours if available

    totalPoints += points * creditHours;
    totalCredits += creditHours;
  });

  return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
}

/**
 * Calculates CGPA for a student across all their semesters.
 * @param {Array} allStudentMarks - All mark entries for a student
 * @param {Array} semestersAttended - List of semester identifiers (e.g., ['1st', '2nd'])
 */
export function calculateCGPAForStudent(allStudentMarks, semestersAttended) {
  if (!allStudentMarks || allStudentMarks.length === 0 || !semestersAttended || semestersAttended.length === 0) return 0;

  let grandTotalPoints = 0;
  let grandTotalCredits = 0;

  semestersAttended.forEach(semester => {
    const marksForThisSemester = allStudentMarks.filter(mark => mark.semester === semester);
    if (marksForThisSemester.length > 0) {
      let semesterTotalPoints = 0;
      let semesterTotalCredits = 0;
      marksForThisSemester.forEach(mark => {
        const marksObtained = getTotalMarks(mark);
        const percentage = marksObtained;
        const { points } = getGradePoint(percentage);
        const creditHours = mark.creditHours || DEFAULT_CREDIT_HOURS;

        semesterTotalPoints += points * creditHours;
        semesterTotalCredits += creditHours;
      });
      grandTotalPoints += semesterTotalPoints;
      grandTotalCredits += semesterTotalCredits;
    }
  });

  return grandTotalCredits > 0 ? (grandTotalPoints / grandTotalCredits).toFixed(2) : 0;
}