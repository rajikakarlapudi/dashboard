import React, { useState } from 'react';
import './index.css';

const Chat = () => {
  const initialCategories = [
    'Civil Services',
    'After 12th',
    'Government Jobs',
    'Lifestyle',
    'Spiritual',
    'BSE',
    'State Board',
    'College',
    'Technical',
    'Others',
  ];

  const [exams, setExams] = useState([
    { category: 'Civil Services', exams: ['UPSC', 'BPSC', 'UPPSC', 'JPSC'] },
    { category: 'After 12th', exams: ['JEE', 'NEET', 'NDA', 'CUET'] },
    { category: 'Government Jobs', exams: ['Bank','DSC','Teacher','SSC'] },
    { category: 'Lifestyle', exams: ['Lifestyle','Lifestyle','Lifestyle','Lifestyle'] },
    { category: 'Spiritual', exams: ['Spiritual','Spiritual','Spiritual','Spiritual'] },
    { category: 'CBSE', exams: ['Midterm-1','Midterm-2','Endterm-1','Endterm-2'] },
    { category: 'State Board', exams: ['DPTS','PreFinal-1','PreFinal-2','Final'] },
    { category: 'College', exams: ['GATE','GRE','GMAT','CAT'] },
    { category: 'Technical', exams: ['C','Python','Java','C++'] },
    { category: 'Others', exams: ['Exam-1','Exam-2','Exam-3','Exam-4'] },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({ category: initialCategories[0], name: '' });
  const [selectedExam, setSelectedExam] = useState(null);
  const [subjects, setSubjects] = useState({});

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewItem({ category: initialCategories[0], name: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const addItem = () => {
    if (selectedExam) {
      setSubjects((prevSubjects) => {
        const updatedSubjects = { ...prevSubjects };
        if (!updatedSubjects[selectedExam]) {
          updatedSubjects[selectedExam] = [];
        }
        updatedSubjects[selectedExam].push(newItem.name);
        return updatedSubjects;
      });
    } else {
      setExams((prevExams) => {
        return prevExams.map((group) => {
          if (group.category === newItem.category) {
            return { ...group, exams: [...group.exams, newItem.name] };
          }
          return group;
        });
      });
    }
    closeModal();
  };

  const selectExam = (exam) => {
    setSelectedExam(exam);
  };

  const goBack = () => {
    setSelectedExam(null);
  };

  return (
    <div className="top">
      <div className="chat-header">
        <h2>{selectedExam ? selectedExam : 'Competitive Exams'}</h2>
        <div className="chat-header-buttons">
          {selectedExam && <button onClick={goBack}>Back</button>}
          <button>Presets</button>
          <button>Save</button>
          <button>Compare</button>
        </div>
      </div>
      <div className="chat">
        <div className="chat-interface">
          <div className="header">
            <button className="add-exam">SRI</button>
            <button className="add-exam" onClick={openModal}>{selectedExam ? '+ Add Subject' : '+ Add Exam'}</button>
          </div>
        </div>
        {selectedExam ? (
          <div className="exam-group">
            <h2>Subjects</h2>
            <div className="exam-cards">
              {(subjects[selectedExam] || []).map((subject, index) => (
                <div key={index} className="exam-card">
                  {subject}
                </div>
              ))}
            </div>
          </div>
        ) : (
          exams.map((group, index) => (
            <div key={index} className="exam-group">
              <h2>{group.category}</h2>
              <div className="exam-cards">
                {group.exams.map((exam, i) => (
                  <div key={i} className="exam-card" onClick={() => selectExam(exam)}>
                    {exam}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add {selectedExam ? 'Subject' : 'Exam'}</h2>
            {!selectedExam && (
              <select
                name="category"
                value={newItem.category}
                onChange={handleInputChange}
                className="modal-input"
              >
                {initialCategories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            )}
            <input
              type="text"
              name="name"
              value={newItem.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="modal-input"
            />
            <div className="modal-buttons">
              <button onClick={closeModal}>Cancel</button>
              <button onClick={addItem}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
