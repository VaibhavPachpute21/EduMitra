import React, { useEffect } from 'react'
 
const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js'
    script.async = true
    document.body.appendChild(script)
 
    script.onload = () => {
      window.botpressWebChat.init({
        botId: '0f1227fc-774c-4443-8ea6-793ac87e60b7',
        hostUrl: 'https://cdn.botpress.cloud/webchat/v1',
        messagingUrl: 'https://messaging.botpress.cloud',
        clientId: '0f1227fc-774c-4443-8ea6-793ac87e60b7',
      })
    }
  }, [])
 
  return <div id="webchat" />
}
 
export default Chatbot