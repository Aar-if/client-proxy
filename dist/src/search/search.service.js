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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const generators_1 = require("../../utils/generators");
const utils_1 = require("../../utils/utils");
let SearchService = class SearchService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async handleSearchEvent(transactionId, searchPayload) {
        console.log('searchPayload: ', searchPayload);
        const msg = (0, generators_1.intentGenerator)(searchPayload);
        console.log('generated intent: ', msg.intent.category);
        const payload = {
            context: (0, generators_1.contextGenerator)(transactionId, 'search', 'http://localhost:5010/', 'bap.dsep.samagra.io'),
            message: msg,
        };
        console.log('payload: ', payload);
        console.log('process.env.BAP_URI: ', process.env.BAP_URI);
        return await (0, utils_1.requestForwarder)('http://localhost:5002/search', payload, this.httpService);
    }
};
SearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], SearchService);
exports.SearchService = SearchService;
//# sourceMappingURL=search.service.js.map