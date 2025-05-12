"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let GatewayService = class GatewayService {
    servicePorts = {
        'task-creation': 3002,
        'tasks': 3000,
        'teams': 3003,
        'users': 3001,
        'validate': 3004,
        'notifications': 3005,
    };
    async forwardRequest(service, endpoint, data, method) {
        const url = `http://localhost:${this.servicePorts[service]}/${service}/${endpoint}`;
        try {
            if (method === 'POST') {
                const response = await axios_1.default.post(url, data);
                return response.data;
            }
            else if (method === 'GET') {
                const response = await axios_1.default.get(url, { params: data });
                return response.data;
            }
            throw new Error('Unsupported HTTP method');
        }
        catch (error) {
            throw new Error(`Failed to forward request to ${service}: ${error.message}`);
        }
    }
};
exports.GatewayService = GatewayService;
exports.GatewayService = GatewayService = __decorate([
    (0, common_1.Injectable)()
], GatewayService);
//# sourceMappingURL=gateway.service.js.map