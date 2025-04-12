import React, { useState, useRef, useEffect } from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import { IoMdExit } from "react-icons/io";
import Markdown from "marked-react";

export default function AiChat({ currentAddiction, streak }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);
  const [lastAddiction, setLastAddiction] = useState(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim() || !currentAddiction) return;

    // Add user message
    setMessages((prev) => [...prev, { text: message, sender: "user" }]);
    setMessage("");
    setIsTyping(true);

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: `You are a supportive addiction recovery assistant. 
                Focus only on helping with ${currentAddiction?.label} addiction recovery.
                The user has maintained ${streak} days of sobriety.
                Provide encouraging, compassionate responses in Arabic.
                Keep responses focused on recovery, motivation, and coping strategies.
                Never encourage or discuss harmful behaviors.
                If the user asks about topics unrelated to ${currentAddiction?.label} addiction recovery,
                gently redirect them to focus on their recovery journey.`,
              },
              { role: "user", content: message },
            ],
            temperature: 0.7,
            max_tokens: 150,
          }),
        }
      );

      const data = await response.json();

      if (data.choices && data.choices[0]?.message?.content) {
        setMessages((prev) => [
          ...prev,
          {
            text: data.choices[0].message.content,
            sender: "ai",
          },
        ]);
      }
    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          text: "عذراً، حدث خطأ. حاول مرة أخرى.",
          sender: "ai",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Add new effect for initial message when chat opens
  useEffect(() => {
    if (open && currentAddiction && messages.length === 0) {
      const welcomeMessage = {
        text: `مرحباً بك! 👋
        \nأنا مساعدك في رحلة التعافي من ${currentAddiction.label}.
        \n${
          streak > 0
            ? `أحسنت! لقد حافظت على ${streak} يوم من التقدم. هذا إنجاز رائع! 🌟`
            : "نحن هنا لدعم بداية رحلتك نحو التعافي. 💪"
        }
        \nكيف يمكنني مساعدتك اليوم؟`,
        sender: "ai",
      };

      setMessages([welcomeMessage]);
    }
  }, [open, currentAddiction, streak]);

  // Replace the addiction change effect
  useEffect(() => {
    if (currentAddiction?.id !== lastAddiction?.id) {
      setMessages([]); // Clear previous messages
      setLastAddiction(currentAddiction);

      if (open && currentAddiction) {
        const switchMessage = {
          text: `تم تغيير المحادثة إلى ${currentAddiction.label}.
          \n${
            streak > 0
              ? `لديك ${streak} يوم من التقدم في هذا المسار. استمر! 💪`
              : "دعنا نبدأ رحلة التعافي معاً. 🌟"
          }`,
          sender: "ai",
        };

        setMessages([switchMessage]);
      }
    }
  }, [currentAddiction, streak, open, lastAddiction]);

  if (!currentAddiction) return null;

  return (
    <div>
      <button onClick={() => setOpen(!open)}>
        <div className="cursor-pointer flex items-center justify-center fixed bottom-4 right-4 rounded-full w-12 h-12 bg-indigo-600 hover:bg-indigo-700 animate-pulse">
          <IoChatbubbleEllipsesOutline className="text-2xl text-white" />
        </div>
      </button>
      <div
        className={`fixed ${
          open ? "fixed" : "hidden"
        } overflow-hidden w-72 h-96 bottom-4 right-4 border border-gray-200 bg-gray-50 rounded-md`}
      >
        <div className="w-full flex items-center justify-between p-3 bg-white h-10">
          <div className="text-sm font-medium text-indigo-700">
            {currentAddiction.label} - {streak} يوم
          </div>
          <button onClick={() => setOpen(false)}>
            <IoMdExit className="text-2xl hover:text-red-500" />
          </button>
        </div>

        {/* Chat Messages Container */}
        <div
          ref={chatContainerRef}
          className="h-[calc(100%-96px)] overflow-y-auto p-4 space-y-4"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex text-xs ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 break-words ${
                  msg.sender === "user"
                    ? "bg-indigo-700 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none"
                }`}
              >
                <Markdown>{msg.text}</Markdown>
              </div>
            </div>
          ))}

          {/* Typing Animation */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 rounded-lg rounded-bl-none p-3 max-w-[80%]">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="absolute flex items-center gap-2 bottom-0 w-full p-2 bg-gray-50 border-t">
          <button
            onClick={handleSend}
            className="bg-indigo-700 hover:bg-indigo-800 border border-indigo-500 rounded text-white px-3 py-2"
          >
            <IoIosSend />
          </button>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="اكتب رسالتك..."
            rows={1}
            className="w-full text-sm p-2 rounded border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-emerald-500 bg-white resize-none"
          />
        </div>
      </div>
    </div>
  );
}
