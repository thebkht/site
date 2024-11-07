'use client';

import { useFormStatus } from 'react-dom';
import { useState, useEffect } from 'react';
import { deleteNotes } from '@/lib/db/actions';
import { Link } from 'next-view-transitions';
import { Button } from '@/components/ui/button';

export type Note = {
  id: string;
  content: string;
  publishedat: Date;
  telegrammessageid: number;
  tweetid: string;
};

export default function Form({ notes }) {
  const [selectedInputs, setSelectedInputs] = useState<Note[]>([]);
  const [startShiftClickIndex, setStartShiftClickIndex] = useState<number>(0);
  const [isShiftKeyPressed, setIsShiftKeyPressed] = useState(false);
  const [isCommandKeyPressed, setIsCommandKeyPressed] = useState(false);

  useEffect(() => {
    const keyDownHandler = ({ key }: KeyboardEvent) => {
      if (key === 'Shift') {
        setIsShiftKeyPressed(true);
      }
      if (key === 'Meta' || key === 'Control') {
        setIsCommandKeyPressed(true);
      }
    };
    const keyUpHandler = ({ key }: KeyboardEvent) => {
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
    const startIndex = Math.min(startShiftClickIndex, index);
    const endIndex = Math.max(startShiftClickIndex, index);

    setSelectedInputs((prevInputs) => {
      const newSelection = notes
        .slice(startIndex, endIndex + 1)
        .map((item: Note) => item);

      if (checked) {
        const combinedSelection = Array.from(
          new Set([...prevInputs, ...newSelection])
        );
        return combinedSelection;
      } else {
        return prevInputs.filter((input) => !newSelection.includes(input));
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
      const isChecked = selectedInputs.includes(note);
      handleCheck(!isChecked, note, index);
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
      {notes.map((entry: Note, index: number) => (
        <GuestbookEntry key={entry.id} entry={entry}>
          <input
            name={entry.id}
            type="checkbox"
            className="mr-2 w-4 h-4"
            onChange={(e) => handleCheck(e.target.checked, entry, index)}
            onKeyDown={(e) => handleKeyDown(e, entry, index)}
            checked={selectedInputs.includes(entry)}
          />
        </GuestbookEntry>
      ))}
    </form>
  );
}

function GuestbookEntry({
  entry,
  children,
}: {
  entry: Note;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col space-y-1 mb-4">
      <div className="w-full text-sm break-words items-center flex">
        {children}
        <div className="space-y-1.5">
          <span className="text-gray-600 dark:text-gray-400 mr-1 border-gray-100">
            {new Date(entry.publishedat).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
            :
          </span>
          <Link href={`/admin/editor/${entry.id}`} className="line-clamp-1">
            {entry.content}
          </Link>
        </div>
      </div>
    </div>
  );
}

const cx = (...classes) => classes.filter(Boolean).join(' ');

function DeleteButton({ isActive }: { isActive: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      variant={isActive ? 'default' : 'secondary'}
      className="mb-8"
      disabled={pending}
      type="submit"
    >
      Delete Entries
    </Button>
  );
}
