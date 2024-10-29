import jwt from "jsonwebtoken";
import config from "../app/config/config";

export const generateTokens=(payload:object)=>{

    const accessToken=jwt.sign(payload,config.jwt.accessSecret,{
        expiresIn:config.jwt.accessExpiresIn,
    })

    const refreshToken = jwt.sign(payload, config.jwt.refreshSecret, {
        expiresIn: config.jwt.refreshExpiresIn,
    });

    return {
        accessToken,
        refreshToken,
    };

};



