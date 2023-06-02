import React, { useEffect } from 'react';
declare global {
    interface Window {
        chatwootSDK: any;
    }
}

const ChatwootScript = () => {
    useEffect(() => {
        const BASE_URL = 'https://app.chatwoot.com';
        const script = document.createElement('script');
        script.src = BASE_URL + '/packs/js/sdk.js';
        script.defer = true;
        script.async = true;
        document.body.appendChild(script);

        script.onload = function () {
            window.chatwootSDK.run({
                websiteToken: 'Hj42qppfXdpu3UcQJ7s2ak3R',
                baseUrl: BASE_URL,
            });
        };
    }, []);

    return null;
};

export default ChatwootScript;