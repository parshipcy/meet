import { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const randomID = (len: number) => {
    let res = "";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijlkmnopqrstuvwxyz0123456789";
    const maxPos = chars.length;
    len = len || 5;

    for(let i=0; i<len; i++){
        res += chars.charAt(Math.floor(Math.random() * maxPos))
    }

    return res;
};

const getUrlParams = (url=window.location.href) => {
    let urlStr = url.split("?")[1]
    return new URLSearchParams(urlStr)
}

const App = () => {
    const meetId = getUrlParams().get("roomId") || randomID(5)
    const meetContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const element = meetContainerRef.current
        if (!element) return

        const appId = Number(import.meta.env.ZEGOCLOUD_ID)
        const serverSecret = import.meta.env.ZEGOCLOUD_SERVER_SECRET
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appId, serverSecret, meetId, randomID(5), randomID(5))

        const zp = ZegoUIKitPrebuilt.create(kitToken)
        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: "Personal Link",
                    url: window.location.protocol + "//" + window.location.host + window.location.pathname + "?meetId=" + meetId
                }
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.GroupCall
            }
        })

        return () => {
            zp.destroy()
        }
    }, [meetId])

    return (
        <div ref={meetContainerRef} style={{width: "100vw", height: "100vh"}}></div>
    )
}

export default App;
