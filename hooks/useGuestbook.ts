import { useState, useEffect } from 'react';

// Simulating an async function to fetch guestbook messages
const fetchGuestbookMessages = async (): Promise<string[]> => {
  // In a real application, this would be an API call
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
  return ['Welcome to my guestbook!', 'Hope you enjoy your stay!'];
};

export function useGuestbook() {
  const [messages, setMessages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchGuestbookMessages().then((fetchedMessages) => {
      setMessages(fetchedMessages);
      setIsLoading(false);
    });
  }, []);

  const addMessage = (newMessage: string) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return { messages, isLoading, addMessage };
}
