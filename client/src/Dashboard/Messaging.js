import React, { useEffect } from 'react'
import { Link,useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getUserId } from '../actions/userActions'
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { MainContainer,ChatContainer,MessageList,Message, MessageInput,} from "@chatscope/chat-ui-kit-react";
const Messaging = () => {
    const { userID } = useParams();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.getUsersByIDReducer)
    const { user } = userData;
    
    useEffect(() => {
        dispatch(getUserId(userID));
    }, [dispatch])
    return (
        <div>
            <section>
                <div className="container py-4 py-xl-5">
                    <h5><img className="rounded-circle m-2"
                      src={user && user.profilePic}
                      width="50" height="50" alt="Profile" />{user && user.name} </h5>
                    <div style={{ position: "relative", height: "500px" }}>
                        <MainContainer>
                            <ChatContainer>
                                <MessageList>
                                    <Message
                                        model={{
                                            message: "Hello my friend",
                                            sentTime: "just now",
                                            sender: "Receiver",
                                            direction:'incoming'
                                        }}
                                    />
                                    <Message
                                        model={{
                                            message: "Hello my friend",
                                            sentTime: "just now",
                                            sender: "Sender",
                                            direction:'outgoing'
                                        }}
                                    />
                                </MessageList>
                                <MessageInput placeholder="Type message here" />
                            </ChatContainer>
                        </MainContainer>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Messaging