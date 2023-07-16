import { Server, Socket } from 'socket.io';
import { SearchService } from './search/search.service';
import { SelectService } from './select/select.service';
export declare class AppGateway {
    private readonly searchService;
    private readonly selectService;
    constructor(searchService: SearchService, selectService: SelectService);
    server: Server;
    handleConnection(client: Socket, ...args: any[]): void;
    handleResponse(response: any): Promise<void>;
    handleSearch(body: any, client: Socket): Promise<any>;
    handleSelect(selectQuery: any, client: Socket): Promise<any>;
    handleInit(initQuery: any, client: Socket): Promise<void>;
    handleConfirm(confirmQuery: any, client: Socket): Promise<void>;
}
