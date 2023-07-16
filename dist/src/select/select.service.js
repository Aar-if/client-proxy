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
exports.SelectService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const generators_1 = require("../../utils/generators");
const utils_1 = require("../../utils/utils");
let SelectService = class SelectService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async handleSelectEvent(selectPayload) {
        console.log('select payload: ', selectPayload);
        const msg = (0, generators_1.generateOrder)(selectPayload);
        console.log('generated order: ', msg);
        const payload = {
            context: selectPayload,
            message: msg,
        };
        console.log('payload: ', payload);
        console.log('process.env.BAP_URI: ', process.env.BAP_URI);
        return await (0, utils_1.requestForwarder)(selectPayload.context.bpp_uri, payload, this.httpService);
    }
};
SelectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], SelectService);
exports.SelectService = SelectService;
//# sourceMappingURL=select.service.js.map