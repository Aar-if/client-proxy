import { AppGateway } from './app.gateway';
export declare class AppService {
    private readonly appGateway;
    constructor(appGateway: AppGateway);
    getHello(): string;
    handleResponse(body: any): void;
}
