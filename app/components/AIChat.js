'use client'
import { useEffect } from 'react'

function AIChat() {

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js'
    script.type = 'module'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <div className="w-full h-[650px] flex items-center justify-center">

      <div className="w-full h-full rounded-2xl overflow-hidden shadow-inner border border-slate-200 bg-white">

        <zapier-interfaces-chatbot-embed
          is-popup="false"
          chatbot-id="cmluxuwrw001u13gyjhn8lh96"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "16px"
          }}
        />

      </div>

    </div>
  )
}

export default AIChat