"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestForwarder = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const requestForwarder = async (url, reqData, httpService) => {
    try {
        const requestOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            mode: 'cors',
        };
        console.log('calling request forwarder');
        return await (0, rxjs_1.lastValueFrom)(httpService.post(url, reqData, requestOptions));
    }
    catch (err) {
        console.log('err: ', err);
        return new common_1.InternalServerErrorException();
    }
};
exports.requestForwarder = requestForwarder;
//# sourceMappingURL=utils.js.map