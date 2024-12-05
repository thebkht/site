// useGuestbook.ts
import { useState, useEffect, useCallback } from 'react';
import { getGuestbookEntries } from '@/lib/db/queries';
import { saveGuestbookEntry } from '@/lib/db/actions';
import { GuestbookEntry } from '@/lib/types';

export function useGuestbook() {
  const [messages, setMessages] = useState<GuestbookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const fetchedMessages = await getGuestbookEntries();
        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Error fetching guestbook messages:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const addMessage = useCallback(async (message: string) => {
    try {
      await saveGuestbookEntry(message);
      // Refetch messages after adding the new message
      const fetchedMessages = await getGuestbookEntries();
      setMessages(fetchedMessages);
    } catch (error) {
      console.error('Error adding message:', error);
    }
  }, []);

  return { messages, isLoading, addMessage };
}
