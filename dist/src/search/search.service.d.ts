import { HttpService } from '@nestjs/axios';
import { DSEP_SEARCH_FILTER } from 'utils/types';
export declare class SearchService {
    private readonly httpService;
    constructor(httpService: HttpService);
    handleSearchEvent(transactionId: string, searchPayload: DSEP_SEARCH_FILTER): Promise<any>;
}
