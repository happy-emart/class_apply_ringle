import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTutor, ConditionTutor } from '../../redux/tutorDataReducer';
import { selectClassRequest, addPendingRequest } from '../../redux/classRequestReducer';
import { Dropbox } from '../../util/datamanage/Dropbox';
import condition from '../../util/datamanage/condition.json';
import { ModalFunc } from '../../util/Modal';
import { AcceptTutee } from './AcceptTutee';

function TutorList() {
  const dispatch = useDispatch();
  const classRequest = useSelector(selectClassRequest);
  const tutorList = useSelector(selectTutor);
  console.log("clasRequest", classRequest['classRequest']);
console.log("pendingQueue", classRequest['pendingRequest']);
  const { pendingRequest, classRequest: acceptedRequest, targetRequest } = classRequest;
  const { tutorList: tutors } = tutorList;

  const [filteredTutor, setFilteredTutor] = useState([]);
  const [gender, setGender] = useState('성별');
  const [accent, setAccent] = useState('억양');
  const [major, setMajor] = useState('전공');
  const [selectDate, setSelectDate] = useState(null);

  // Update filtered tutors when filters or the target request changes
  useEffect(() => {
    setFilteredTutor(ConditionTutor(gender, accent, major, targetRequest, tutors));
  }, [gender, accent, major, targetRequest, tutors]);

  // Modal related states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalReturn, setModalReturn] = useState(false);
  const [modalTitle, setModalTitle] = useState("튜터 신청");
  const [modalContent, setModalContent] = useState("날짜를 선택 후 신청해주세요.");
  const [errorModal, setErrorModal] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);

  useEffect(() => {
    if (targetRequest) {
      const date = targetRequest['date'];
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minutes = date.getMinutes();
      setModalContent(`${selectedTutor ? selectedTutor.name : ''} 튜터를 ${year}년 ${month}월 ${day}일 ${hour}시${minutes > 0 ? " " + minutes + "분" : ""}에 신청하시겠습니까?`);
      setErrorModal(true);
      setSelectDate(targetRequest['date']);
    } else {
      setModalContent("날짜를 선택 후 신청해주세요.");
      setErrorModal(false);
      setSelectDate(null);
    }
  }, [targetRequest, selectedTutor]);

  useEffect(() => {
    if (modalReturn && targetRequest && selectedTutor) {
      dispatch(addPendingRequest(selectedTutor.id, targetRequest['tuteeId'], targetRequest['ticket'], targetRequest['date']));
    }
  }, [modalReturn, dispatch, selectedTutor]);

  const handleTutorSelect = (tutor) => {
    setModalOpen(true);
    setSelectedTutor(tutor);
  };

  return (
    <>
      <div className="date-writer h-14 p-2 border-t border-b border-gray-300 border-solid ">
        <div className="regular-300 text-left">
          {selectDate ? `${selectDate.getFullYear()}년 ${selectDate.getMonth() + 1}월 ${selectDate.getDate()}일` : '캘린더에서 시간을 선택해주세요'}
        </div>
      </div>
      <div className="tutor-select h-14 p-2 border-t border-b border-gray-300 border-solid ">
        <div className="regular-300 text-left">튜터 직접 선택</div>
      </div>
      <div className="dropbox-condition h-14 flex flex-row">
        <Dropbox data={condition.gender} name={gender} setValue={setGender} />
        <Dropbox data={condition.accent} name={accent} setValue={setAccent} />
        <Dropbox data={condition.major} name={major} setValue={setMajor} />
      </div>
      {/* Mapping tutors based on filtered results and other UI components */}
      <div className="filter-tutor w-full flex flex-col">
        {filteredTutor.map(tutor => (
          <div key={tutor.id} className="w-full h-36 border-b border-gray-300 bg-white inline-flex flex-col" onClick={() => handleTutorSelect(tutor)}>
            <div className="tutor-info flex flex-row h-24 py-1 px-2">
              <img src={`${process.env.PUBLIC_URL}/pic/${tutor.profile}`} width="90px" height="90px" alt="Profile" style={{ borderRadius: '50%' }} />
              <div className="content ml-5 grow flex flex-col items-start">
                <div className="bold-200">{tutor.name}</div>
                <div className="regular-400">{tutor.university} {tutor.major}</div>
                <div className="regular-400">억양: {tutor.accent}</div>
              </div>
            </div>
            <div className="tutor-lec flex-none h-12 py-2 px-2"></div>
          </div>
        ))}
      </div>
      {modalOpen && <ModalFunc title={modalTitle} content={modalContent} setValue={setModalReturn} modalOpen={modalOpen} setModalOpen={setModalOpen} other={errorModal} />}
      <AcceptTutee />
    </>
  );
}

export default TutorList;