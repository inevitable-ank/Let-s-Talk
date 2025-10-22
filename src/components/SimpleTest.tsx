import React from 'react';

const SimpleTest: React.FC = () => {
  return (
    <div className="bg-red-500 text-white p-4">
      <h1 className="text-2xl font-bold">Simple Tailwind Test</h1>
      <p>If you see red background and white text, Tailwind is working!</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Blue Button
      </button>
    </div>
  );
};

export default SimpleTest;
