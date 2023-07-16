import { HttpService } from '@nestjs/axios';
export declare class SelectService {
    private readonly httpService;
    constructor(httpService: HttpService);
    handleSelectEvent(selectPayload: any): Promise<any>;
}
