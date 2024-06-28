import React, { useState } from 'react';
import axios from 'axios';
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
  const [modalType, setModalType] = useState('');
  const [newItem, setNewItem] = useState({ category: initialCategories[0], name: '', description: '' });
  const [selectedExam, setSelectedExam] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjects, setSubjects] = useState({});
  const [datasets, setDatasets] = useState({});
  const [error, setError] = useState('');
  const [files, setFiles] = useState([]);

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewItem({ category: initialCategories[0], name: '', description: '' });
    setError('');
    setFiles([]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
    if (name === 'name' && value !== '') {
      setError('');
    }
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const addItem = () => {
    if (newItem.name.trim() === '') {
      setError('Name cannot be empty');
      return;
    }

    if (modalType === 'subject' && selectedExam) {
      setSubjects((prevSubjects) => {
        const updatedSubjects = { ...prevSubjects };
        if (!updatedSubjects[selectedExam]) {
          updatedSubjects[selectedExam] = [];
        }
        updatedSubjects[selectedExam].push(newItem.name);
        return updatedSubjects;
      });
    } else if (modalType === 'exam') {
      setExams((prevExams) => {
        return prevExams.map((group) => {
          if (group.category === newItem.category) {
            return { ...group, exams: [...group.exams, newItem.name] };
          }
          return group;
        });
      });
    } else if (modalType === 'dataset' && selectedSubject) {
      const now = new Date();
      const dataset = {
        name: newItem.name,
        description: newItem.description,
        addedDate: now.toLocaleString(),
        files,
      };

      setDatasets((prevDatasets) => {
        const updatedDatasets = { ...prevDatasets };
        if (!updatedDatasets[selectedSubject]) {
          updatedDatasets[selectedSubject] = [];
        }
        updatedDatasets[selectedSubject].push(dataset);
        return updatedDatasets;
      });

      // Save datasets to the backend
      axios.post('http://localhost:5000/api/save-data', { datasets: [dataset] })
        .then(response => {
          console.log('Data saved:', response.data);
        })
        .catch(error => {
          console.error('Error saving data:', error);
        });
    }

    closeModal();
  };

  const selectExam = (exam) => {
    setSelectedExam(exam);
    setSelectedSubject(null);
  };

  const selectSubject = (subject) => {
    setSelectedSubject(subject);
  };

  const goBack = () => {
    if (selectedSubject) {
      setSelectedSubject(null);
    } else {
      setSelectedExam(null);
    }
  };

  return (
    <div className="top">
      <div className="chat-header">
        <h2>{selectedSubject ? selectedSubject : selectedExam ? selectedExam : 'Competitive Exams'}</h2>
        <div className="chat-header-buttons">
          {(selectedExam || selectedSubject) && <button onClick={goBack}>Back</button>}
          <button>Presets</button>
          <button>Save</button>
          <button>Compare</button>
        </div>
      </div>
      <div className="chat">
        <div className="chat-interface">
          <div className="header">
            <button className="add-exam">SRI</button>
            <button className="add-exam" onClick={() => openModal(selectedSubject ? 'dataset' : selectedExam ? 'subject' : 'exam')}>
              {selectedSubject ? '+ Add Dataset' : selectedExam ? '+ Add Subject' : '+ Add Exam'}
            </button>
          </div>
        </div>
        {selectedSubject ? (
          <div className="exam-group">
            <h2>Datasets</h2>
            <div className="exam-cards">
              {(datasets[selectedSubject] || []).map((dataset, index) => (
                <div key={index} className="exam-card">
                  <h3>{dataset.name}</h3>
                  <p>Added Date: {dataset.addedDate}</p>
                  {dataset.description && <p>Description: {dataset.description}</p>}
                  {dataset.files && dataset.files.length > 0 && (
                    <ul>
                      {Array.from(dataset.files).map((file, idx) => (
                        <li key={idx}>{file.name}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : selectedExam ? (
          <div className="exam-group">
            <h2>Subjects</h2>
            <div className="exam-cards">
              {(subjects[selectedExam] || []).map((subject, index) => (
                <div key={index} className="exam-card" onClick={() => selectSubject(subject)}>
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
                {group.exams.map((exam, examIndex) => (
                  <div key={examIndex} className="exam-card" onClick={() => selectExam(exam)}>
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
            <h2>{modalType === 'dataset' ? 'Add Dataset' : modalType === 'subject' ? 'Add Subject' : 'Add Exam'}</h2>
            {modalType === 'exam' && (
              <select name="category" value={newItem.category} onChange={handleInputChange}>
                {initialCategories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            )}
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newItem.name}
              onChange={handleInputChange}
              className="modal-input"
            />
            {modalType === 'dataset' && (
              <>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={newItem.description}
                  onChange={handleInputChange}
                  className="modal-input"
                />
                <input
                  type="file"
                  name="files"
                  multiple
                  onChange={handleFileChange}
                  className="modal-input"
                />
              </>
            )}
            {error && <p className="error-message">{error}</p>}
            <div className="modal-buttons">
              <button onClick={closeModal}>Cancel</button>
              <button onClick={addItem}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
