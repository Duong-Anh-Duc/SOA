import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GatewayService {
  private servicePorts: { [key: string]: number } = {
    'task-creation': 3002,
    'tasks': 3000,
    'teams': 3003,
    'users': 3001,
    'validate': 3004,
    'notifications': 3005,
  };

  async forwardRequest(service: string, endpoint: string, data: any, method: string) {
    const url = `http://localhost:${this.servicePorts[service]}/${service}/${endpoint}`;
    try {
      if (method === 'POST') {
        const response = await axios.post(url, data);
        return response.data; // Chỉ trả về response.data
      } else if (method === 'GET') {
        const response = await axios.get(url, { params: data });
        return response.data; // Chỉ trả về response.data
      }
      throw new Error('Unsupported HTTP method');
    } catch (error) {
      throw new Error(`Failed to forward request to ${service}: ${error.message}`);
    }
  }
}