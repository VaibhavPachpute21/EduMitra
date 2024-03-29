import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getUserId } from '../actions/userActions'
import { sendMessage, getMessages } from '../actions/chatActions'
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, } from "@chatscope/chat-ui-kit-react";
import '../styles/Profile.css'
import Loading from '../components/Common/Loading'

const Messaging = () => {
    const { userID } = useParams();
    const dispatch = useDispatch();
    const receiverData = useSelector(state => state.getUsersByIDReducer)
    const conversation = useSelector(state => state.getChatsReducer);
    const { loading, chats } = conversation;
    const currentUserData = useSelector(state => state.userLoginReducer)
    useEffect(() => {
        getData()
    }, [dispatch])

    async function getData() {
        await dispatch(getUserId(userID));
        await dispatch(getMessages(currentUserData.currentUser.user._id, userID));
        console.log(chats)
    }
    async function handleSendMSG(text) {
        const messageData = {
            "senderId": currentUserData.currentUser.user._id,
            "receiverId": userID,
            "message": text
        }
        await dispatch(sendMessage(messageData));
    }
    return (
        <div>
            <section className='py-4 py-xl-5'>
                <div className="container py-4 py-xl-3" style={{ backgroundColor: 'var(--APRICOT)', borderRadius: '15px' }}>
                    <h5 className='heading2 fs-5 '><img className="rounded-circle m-2"
                        src={receiverData.user && receiverData.user.profilePic}
                        width="50" height="50" alt="Profile" />{receiverData.user && receiverData.user.name} </h5>
                    <div style={{ position: "relative", height: "500px" }}>

                        {loading ? <Loading /> : <MainContainer>
                            <ChatContainer>
                                <MessageList>
                                    {chats && chats.messages.map((message) => (
                                        <Message
                                            model={{
                                                message: message.message,
                                                sentTime: message.timestamp,
                                                sender: message.sender,
                                                direction: message.sender === currentUserData.currentUser.user._id ? 'outgoing' : 'incoming',
                                            }}
                                        />
                                    ))}
                                </MessageList>
                                <MessageInput placeholder="Type message here" onSend={(e) => { handleSendMSG(e) }} />
                            </ChatContainer>
                        </MainContainer>}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Messaging