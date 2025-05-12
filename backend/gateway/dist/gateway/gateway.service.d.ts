export declare class GatewayService {
    private servicePorts;
    forwardRequest(service: string, endpoint: string, data: any, method: string): Promise<any>;
}
