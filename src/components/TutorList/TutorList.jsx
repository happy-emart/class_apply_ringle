import React from 'react';

const tutors = [
  // ... your tutor data here
];

function TutorList() {
  return (    
    <div className="space-y-4">
      {tutors.map((tutor) => (
        <div className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg" key={tutor.id}>
          <img src={tutor.image} alt={tutor.name} className="w-16 h-16 rounded-full" />
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">{tutor.name}</h3>
            <p className="text-gray-600">{tutor.university}</p>
            {/* ... other tutor details */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TutorList;