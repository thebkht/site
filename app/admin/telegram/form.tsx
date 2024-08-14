'use client';

import { useFormStatus } from 'react-dom';
import { useState, useEffect } from 'react';
import { deleteGuestbookEntries, deleteNotes } from 'app/db/actions';

export type Note = {
  id: string;
  title: string;
  content: string;
  published_at: string;
  telegram_message_id: number;
};

export default function Form({ notes }) {
  const [selectedInputs, setSelectedInputs] = useState<Note[]>([]);
  const [startShiftClickIndex, setStartShiftClickIndex] = useState<number>(0);
  const [isShiftKeyPressed, setIsShiftKeyPressed] = useState(false);
  const [isCommandKeyPressed, setIsCommandKeyPressed] = useState(false);

  useEffect(() => {
    const keyDownHandler = ({ key }) => {
      if (key === 'Shift') {
        setIsShiftKeyPressed(true);
      }
      if (key === 'Meta' || key === 'Control') {
        setIsCommandKeyPressed(true);
      }
    };
    const keyUpHandler = ({ key }) => {
      if (key === 'Shift') {
        setIsShiftKeyPressed(false);
      }
      if (key === 'Meta' || key === 'Control') {
        setIsCommandKeyPressed(false);
      }
    };

    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
      window.removeEventListener('keyup', keyUpHandler);
    };
  }, []);

  const handleNormalClick = (checked: boolean, note: Note, index: number) => {
    setSelectedInputs((prevInputs) =>
      checked
        ? [...prevInputs, note]
        : prevInputs.filter((input) => input !== note)
    );
    setStartShiftClickIndex(index);
  };

  const handleCommandClick = (note: Note) => {
    setSelectedInputs((prevInputs) =>
      prevInputs.includes(note)
        ? prevInputs.filter((input) => input !== note)
        : [...prevInputs, note]
    );
  };

  const handleShiftClick = (index: number, checked: boolean) => {
    const startIndex = Math.min(startShiftClickIndex!, index);
    const endIndex = Math.max(startShiftClickIndex!, index);

    setSelectedInputs((prevInputs) => {
      const newSelection = notes
        .slice(startIndex, endIndex + 1)
        .map((item) => item.id);

      if (checked) {
        const combinedSelection = Array.from(
          new Set([...prevInputs, ...newSelection])
        );
        return combinedSelection;
      } else {
        return prevInputs.filter((inputId) => !newSelection.includes(inputId));
      }
    });
  };

  const handleCheck = (checked: boolean, note: Note, index: number) => {
    if (isCommandKeyPressed) {
      handleCommandClick(note);
    } else if (isShiftKeyPressed && startShiftClickIndex !== null) {
      handleShiftClick(index, checked);
    } else {
      handleNormalClick(checked, note, index);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    note: Note,
    index: number
  ) => {
    if (event.key === 'Enter') {
      // Check if the checkbox was already selected
      const isChecked = selectedInputs.includes(note);

      // Toggle the checkbox
      handleCheck(!isChecked, notes, index);
    }
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await deleteNotes(selectedInputs);
      }}
    >
      <DeleteButton isActive={selectedInputs.length !== 0} />
      {notes.map((entry, index) => (
        <GuestbookEntry key={entry.id} entry={entry}>
          <input
            name={entry.id}
            type="checkbox"
            className="mr-2 w-4 h-4"
            onChange={(e) => handleCheck(e.target.checked, entry.id, index)}
            onKeyDown={(e) => handleKeyDown(e, entry.id, index)}
            checked={selectedInputs.includes(entry.id)}
          />
        </GuestbookEntry>
      ))}
    </form>
  );
}

function GuestbookEntry({ entry, children }) {
  return (
    <div className="flex flex-col space-y-1 mb-4">
      <div className="w-full text-sm break-words items-center flex">
        {children}
        <span className="text-neutral-600 dark:text-neutral-400 mr-1 border-neutral-100">
          {entry.published_at}:
        </span>
        {entry.title}
        <span className="line-clamp-1">{entry.content}</span>
      </div>
    </div>
  );
}

const cx = (...classes) => classes.filter(Boolean).join(' ');

function DeleteButton({ isActive }) {
  const { pending } = useFormStatus();

  return (
    <button
      className={cx(
        'px-3 py-2 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 mb-8 transition-all',
        {
          'bg-red-300/50 dark:bg-red-700/50': isActive,
        }
      )}
      disabled={pending}
      type="submit"
    >
      Delete Notes
    </button>
  );
}
