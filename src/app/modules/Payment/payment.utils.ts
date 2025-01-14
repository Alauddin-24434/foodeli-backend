import axios from 'axios';

import config from '../../config/config';
import { Schema,} from 'mongoose';


const AMARPAY_URL = config.aamarpay.paymentUrl;
const STORE_ID = config.aamarpay.storeId;
const SIGNATURE_KEY = config.aamarpay.signatureKey;

export const initiatePayment = async (transactionId: string, name: string, email: string, phone: string, address: string, amount: number, orderId:Schema.Types.ObjectId, customerId:string, ) => {
    try {
        const response = await axios.post(`${AMARPAY_URL}/jsonpost.php`, {
            store_id: STORE_ID,
            signature_key: SIGNATURE_KEY,
            cus_name: name,
            cus_email: email,
            cus_phone: phone,
            cus_add1: address,
            orderId,
            customerId,
            cus_add2: "Dhaka",
            cus_city: "Dhaka",
            cus_country: "Bangladesh",
            currency: "BDT",
            amount,
            tran_id: transactionId,
            success_url: `http://localhost:5000/verify-payment?transactionId=${transactionId}`,
            fail_url: `http://localhost:5173/fail-payment?transactionId=${transactionId}`,
            cancel_url: `http://localhost:5173/cancel-payment?transactionId=${transactionId}`,
            desc: "Course Fee",
            type: "json"
        });

        return response.data;
    } catch (error) {
        console.error('AmarPay initiation error:', error);
        throw new Error('Payment initiation failed');
    }
};

const AMARPAY_VERIFY_URL = config.aamarpay.paymentVerifyUrl;

export const verifyPaymentWithAmarPay = async (transactionId: string) => {
    try {
        const response = await axios.get(`${AMARPAY_VERIFY_URL}`, {
            params: {
                store_id: STORE_ID,
                signature_key: SIGNATURE_KEY,
                request_id: transactionId,
                type: 'json',
            },
        });
        
        return response.data;
    } catch (error) {
        console.error('AmarPay verification error:', error);
        throw new Error('Payment verification failed');
    }
};