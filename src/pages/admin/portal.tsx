import { ChatwootConfigData } from '@/utils/creds';
import axios from 'axios';
import React, { useEffect ,useState} from 'react';

const AdminPortal = () => {
    const [inboxMessages, setInboxMessages] = useState([]);

    useEffect(() => {
        const fetchInboxMessages = async () => {
            try {
                const response = await axios.get(
                    `api/chatwoot`,
                    {
                        headers: {
                            Authorization: `Bearer ${ChatwootConfigData.authToken}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                setInboxMessages(response.data.payload.conversations);
            } catch (error) {
                console.log('Error fetching inbox messages:', error);
            }
        };

        fetchInboxMessages();
    }, []);
    console.log(inboxMessages)
    return (
        <div>
            <h1>Reached the page</h1>
        </div>
    )
};

export default AdminPortal;