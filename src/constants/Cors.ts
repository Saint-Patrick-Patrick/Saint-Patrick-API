import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';


export const CORS : CorsOptions ={
    origin: ['*'],
    allowedHeaders: ['Content-Type', 'Authorization',],
    methods: 'GET,PUT,POST,DELETE,OPTIONS,HEAD,PATCH',
    credentials:true,
    
}
