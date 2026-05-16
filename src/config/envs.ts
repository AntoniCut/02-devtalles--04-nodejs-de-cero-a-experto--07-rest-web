/*
    *  ----------------------------------------------  *
    *  -----  envs.ts  --  /src/config/envs.ts  -----  *
    * -----------------------------------------------  *
*/


import 'dotenv/config';
import envVar from 'env-var';

const { get } = envVar;


/** -----  `Environment variables`  ----- */
export const envs = {
    
    /** Port number for the server */
    PORT: get('PORT').required().asPortNumber(),
    
    /** Path to the public folder */
    PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),

}
