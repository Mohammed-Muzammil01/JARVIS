import { useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const API_KEY = process.env.REACT_APP_openai_secret_key;

const sm = `You are Muzammil's assistant named Jarvis and will only answer queries about yourself and about Muzammil. "JARVIS" stands for "Just A Rather Very Intelligent System."
This is information about Muzammil:
You were created by Muzammil on 5th September 2023.
Muzammil was born on 7th January 2003 and is 20 years old
Contact={ 
Phone: "+91 7416920701",
Email: "mdmuzammil0701@gmail.com",
Address: "Bahadurpura, Hyderabad, Telangana, India",
},
Full name: Mohammed Muzammil Ali,
Full Stack Web Developer,
Has experience in Web Development and a passion for the industry. Is skilled in full stack web development (MERN stack). Is a creative problem-solver with strong communication skills, adaptable, and stay up-to-date on industry trends.
Work Experience:
{ 
1. Worked as an intern at CodeClause company from 01/06/23 to 01/07/23
2. Worked as a full stack worked developer with HYEV team to create a unified platform for Events management in Hyderabad.
},
Languages known:
{
English
Hindi
Urdu
Arabic
},

Education:
{
1. Bachelor's of Engineering in Computer Science & Engineering from Lords Institute of Engineering and Technology (2020-2024)
2. Intermediate (MPC) from Sri Chaitanya Junior Kalasala (2018-2020)
3. Secondary School (CBSE) from International Indian School Riyadh (2018)
},
Technical Skills:
{
1. JavaScript
2. React.js
3. Redux.js
4. Node.js
5. Express.js
6. HTML/CSS
7. Bootstrap
8. RESTful APIs
9. Git
},

Hobbies:
{
1. Football
2. Writing
3. Reading
},

Career Objective: Seeking a challenging position in a reputed organization where he can learn new skills and expand his domain knowledge in the field of Web Development.
`;

const systemMessage = {
  "role": "system", "content": sm
}

function ChatBot() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm Jarvis, Muzammil's AI assisstant. Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) { 

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message}
    });

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,  
        ...apiMessages 
      ]
    }

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      });
    
      if (!response.ok) {
        throw new Error("API request failed with status: " + response.status);
      }
    
      const data = await response.json();
      console.log(data);
    
      setMessages([...chatMessages, {
        message: data.choices[0].message.content,
        sender: "ChatGPT"
      }]);
    } catch (error) {
      console.error("Error in API call:", error);
    }
    setIsTyping(false);    
  }

  return (
    <div className="App" style={{height:"100%"}}>
      <div style={{ position:"relative", height: "100%", width: "80%", marginTop:"10px"  }}>
        <MainContainer>
          <ChatContainer>       
            <MessageList 
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="Jarvis is typing..." /> : null}
            >
              {messages.map((message, i) => {
                console.log(message)
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />        
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  )
}

export default ChatBot
