"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const search_service_1 = require("./search/search.service");
const select_service_1 = require("./select/select.service");
let AppGateway = class AppGateway {
    constructor(searchService, selectService) {
        this.searchService = searchService;
        this.selectService = selectService;
    }
    handleConnection(client, ...args) {
        console.log('new client with id: ', client.id);
    }
    async handleResponse(response) {
        console.log('response methiod');
        console.log('response: ', response);
        const transaction_id = response.context.transaction_id;
        this.server.to(transaction_id).emit('response', response);
        this.server.in(transaction_id).socketsLeave(transaction_id);
    }
    async handleSearch(body, client) {
        console.log('search message received: ', body);
        const transactionId = Date.now() + client.id;
        client.join(transactionId);
        return this.searchService.handleSearchEvent(transactionId, body);
    }
    async handleSelect(selectQuery, client) {
        console.log('select message received: ', selectQuery);
        const transactionId = Date.now() + client.id;
        client.join(transactionId);
        return this.selectService.handleSelectEvent(selectQuery);
    }
    async handleInit(initQuery, client) {
    }
    async handleConfirm(confirmQuery, client) {
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AppGateway.prototype, "server", void 0);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "handleConnection", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('response'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handleResponse", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('search'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handleSearch", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('select'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handleSelect", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('init'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handleInit", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('confirm'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handleConfirm", null);
AppGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
        port: process.env.PROXY_PORT,
    }),
    __metadata("design:paramtypes", [search_service_1.SearchService,
        select_service_1.SelectService])
], AppGateway);
exports.AppGateway = AppGateway;
//# sourceMappingURL=app.gateway.js.map