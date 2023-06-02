import { ChatwootConfigData } from '@/utils/creds';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function twitchHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        res.status(405).send({
            message: 'Method not allowed',
            access_token: '',
            scope: [],
            token_type: '',
            expires_in: 0,
            id: '',
            login: '',
            email: ''
        });
        return;
    }

    try {
        const response = await axios.get(
            `/accounts`,
            {
                headers: {
                    Authorization: `Bearer ${ChatwootConfigData.authToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        if (response.status === 200) {
            res.status(200).send({ response, message: "Response retrieved" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'Internal server error',
            access_token: '',
            scope: [],
            token_type: '',
            expires_in: 0,
            id: '',
            login: '',
            email: ''
        });
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb'
        }
    }
}