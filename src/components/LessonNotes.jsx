import React, { useState, useEffect, useRef } from 'react';
import { StickyNote, ChevronDown, ChevronUp, Save, Trash2 } from 'lucide-react';
import { useNotes } from '../hooks/useNotes';

export function LessonNotes({ lessonId }) {
  const { getNote, setNote, deleteNote } = useNotes();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(() => getNote(lessonId));
  const [saved, setSaved] = useState(true);
  const timerRef = useRef(null);

  // Load note when lessonId changes
  useEffect(() => {
    setValue(getNote(lessonId));
    setSaved(true);
  }, [lessonId]);

  const handleChange = (e) => {
    const text = e.target.value;
    setValue(text);
    setSaved(false);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setNote(lessonId, text);
      setSaved(true);
    }, 800);
  };

  const handleDelete = () => {
    setValue('');
    deleteNote(lessonId);
    setSaved(true);
  };

  const hasNote = value.trim().length > 0;

  return (
    <div className="lesson-notes">
      <button
        className={`notes-toggle ${open ? 'open' : ''} ${hasNote ? 'has-note' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <StickyNote size={15} />
        <span>My notes</span>
        {hasNote && <span className="notes-dot" />}
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {open && (
        <div className="notes-body">
          <textarea
            className="notes-textarea"
            placeholder="Write your notes for this lesson... What clicked? What do you want to remember? How will you apply this?"
            value={value}
            onChange={handleChange}
            rows={5}
            aria-label="Lesson notes"
          />
          <div className="notes-footer">
            <span className={`notes-status ${saved ? 'saved' : 'saving'}`}>
              {saved ? (hasNote ? '✓ Saved' : '') : 'Saving...'}
            </span>
            {hasNote && (
              <button className="notes-delete" onClick={handleDelete} title="Delete note">
                <Trash2 size={13} />
                Clear
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
