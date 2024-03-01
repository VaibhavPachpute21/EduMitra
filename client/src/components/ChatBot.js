import React, { useEffect } from 'react'

const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js'
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      window.botpressWebChat.init({
        "composerPlaceholder": "Chat with Edumitra",
        "botConversationDescription": "One stop solution for every student.",
        "botId": "0f1227fc-774c-4443-8ea6-793ac87e60b7",
        "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
        "messagingUrl": "https://messaging.botpress.cloud",
        "clientId": "0f1227fc-774c-4443-8ea6-793ac87e60b7",
        "webhookId": "ef2ef880-f1ac-42c2-afec-7138d143fa25",
        "lazySocket": true,
        "themeName": "prism",
        "botName": "Edumitra",
        "frontendVersion": "v1",
        "useSessionStorage": true,
        "enableConversationDeletion": true,
        "showPoweredBy": true,
        "theme": "prism",
        "themeColor": "#2563eb"
      })
    }
  }, [])

  return <div id="webchat" />
}

export default Chatbot