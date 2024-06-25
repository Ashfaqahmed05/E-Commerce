import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fireDB } from "../../firebase/FirebaseConfig"; // Adjust the path to your Firebase configuration
import { collection, addDoc, query, where, onSnapshot, orderBy } from "firebase/firestore";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";

const Chat = () => {
    const { id } = useParams();
    const { getAllOrder } = useContext(myContext);

    const [order, setOrder] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const user = JSON.parse(localStorage.getItem('users'));

    useEffect(() => {
        const order = getAllOrder.find((order) => order.id === id);
        setOrder(order);
    }, [id, getAllOrder]);

    useEffect(() => {
        if (order) {
            const q = query(collection(fireDB, "chats"), where("orderId", "==", id),orderBy("timestamp"));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                let msgs = [];
                snapshot.forEach((doc) => {
                    msgs.push(doc.data());
                });
                setMessages(msgs);
            });

            return () => unsubscribe();
        }
    }, [order]);

    const sendMessage = async () => {
        if (newMessage.trim() !== "") {
            await addDoc(collection(fireDB, "chats"), {
                orderId: order.id,
                sender: user.uid,
                message: newMessage,
                timestamp: new Date(),
                senderRole: user.role, 
            });
            setNewMessage("");
        }
    };

    if (!order) {
        return <div>Loading...</div>;
    }

    console.log(messages)
    return (
        <Layout>
            <div className="container mx-auto px-4 py-5 lg:py-8">
                <h1 className="text-2xl font-bold mb-4">Chat for Order #{id}</h1>
                {user.role === "admin" ? 
                <h1 className="text-2xl font-bold mb-4">Customer name: {user.name}</h1>:<></>
                }
                <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="chat-box mb-4 max-h-96 overflow-y-auto">
                        {messages.map((msg, index) => (
                            <div key={index} className={`mb-2 flex ${msg.senderRole === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`p-2 rounded-lg ${msg.senderRole === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
                                    <p>{msg.message}</p>
                                    <span className="text-xs">{new Date(msg.timestamp?.seconds * 1000).toLocaleString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex">
                        <input
                            type="text"
                            className="flex-1 p-2 border border-gray-300 rounded-lg"
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button
                            onClick={sendMessage}
                            className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Chat;
