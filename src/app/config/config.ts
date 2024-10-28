import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

interface Config {
  port: number;
  db_url: string;
  jwt: {
    accessSecret: string;
    accessExpiresIn: string;
    refreshSecret: string;
    refreshExpiresIn: string;
  };
  aamarpay: {
    storeId: string;
    signatureKey: string;
    paymentUrl: string;
    paymentVerifyUrl: string;
  };
}

const config: Config = {
  port: parseInt(process.env.PORT as string, 10) || 5000,
  db_url: process.env.DB_URL as string,
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET as string,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN as string,
    refreshSecret: process.env.JWT_REFRESH_SECRET as string,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN as string,
  },
  aamarpay: {
    storeId: process.env.STORE_ID as string,
    signatureKey: process.env.SIGNATURE_KEY as string,
    paymentUrl: process.env.PAYMENT_URL as string,
    paymentVerifyUrl: process.env.PAYMENT_VERIFY_URL as string,
  },
};

export default config;
