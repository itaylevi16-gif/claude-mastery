import React, { useState } from 'react';
import { CheckCircle, XCircle, Trophy } from 'lucide-react';

export function Quiz({ quiz, lessonId, onPass }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (i) => {
    if (submitted) return;
    setSelected(i);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
    if (selected === quiz.answer && onPass) {
      setTimeout(onPass, 1200);
    }
  };

  const correct = submitted && selected === quiz.answer;

  return (
    <div className="quiz-wrapper">
      <div className="quiz-header">
        <Trophy size={18} className="quiz-icon" />
        <span>Knowledge check</span>
      </div>

      <p className="quiz-question">{quiz.question}</p>

      <div className="quiz-options">
        {quiz.options.map((opt, i) => {
          let cls = 'quiz-option';
          if (submitted) {
            if (i === quiz.answer) cls += ' correct';
            else if (i === selected) cls += ' wrong';
            else cls += ' dim';
          } else if (i === selected) {
            cls += ' selected';
          }
          return (
            <button key={i} className={cls} onClick={() => handleSelect(i)}>
              <span className="quiz-opt-letter">{String.fromCharCode(65 + i)}</span>
              <span className="quiz-opt-text">{opt}</span>
              {submitted && i === quiz.answer && <CheckCircle size={16} className="ml-auto text-green-600" />}
              {submitted && i === selected && i !== quiz.answer && <XCircle size={16} className="ml-auto text-red-500" />}
            </button>
          );
        })}
      </div>

      {!submitted && (
        <button
          className={`quiz-submit ${selected !== null ? 'active' : ''}`}
          onClick={handleSubmit}
          disabled={selected === null}
        >
          Submit answer
        </button>
      )}

      {submitted && (
        <div className={`quiz-feedback ${correct ? 'correct' : 'wrong'}`}>
          <div className="feedback-header">
            {correct ? (
              <><CheckCircle size={18} /> <strong>Correct!</strong></>
            ) : (
              <><XCircle size={18} /> <strong>Not quite</strong></>
            )}
          </div>
          <p className="feedback-text">{quiz.explanation}</p>
        </div>
      )}
    </div>
  );
}
