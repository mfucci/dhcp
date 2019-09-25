import { Packet, Socket, SocketMessageEvent, SocketMessageEventHandle, SocketSendEventHandle } from "./";
import { DHCPMessageType } from "./";
import { AddressTimeOption, BOOTMessageType, DHCPMessageTypeOption, DHCPServerIdOption, DomainServerOption, GatewaysOption, SubnetMaskOption } from "./";

export interface ServerOptions {
    serverId: string;
    ipAddress?: {
        min?: number;
        max?: number;
    };
    netmask?: string;
    addressTime?: number;
    domainServer?: string[];
    gateways?: string[];
}

export class Server extends Socket {

    public serverId: string;
    public ipAddress = {
        min: 10,
        max: 244,
    };
    public netmask = "255.255.255.0";
    public addressTime = 86400; // 1 day
    public domainServer: string[] = [];
    public gateways: string[] = [];

    constructor(serverId: string);
    constructor(options: ServerOptions);
    constructor(param: ServerOptions | string) {
        super("udp4", 67, 68);

        if (typeof param === "string") {
            this.serverId = param;
        } else {
            this.serverId = param.serverId;
            if (param.ipAddress) {
                if (param.ipAddress.min) { this.ipAddress.min = param.ipAddress.min; }
                if (param.ipAddress.max) { this.ipAddress.max = param.ipAddress.max; }
            }
            if (param.netmask) { this.netmask = param.netmask; }
            if (param.addressTime) { this.addressTime = param.addressTime; }
            if (param.domainServer) { this.domainServer = param.domainServer; }
            if (param.gateways) { this.gateways = param.gateways; }
        }

        this.on("dhcp", (e) => {
            const packet = e.packet;
            if (packet.op === BOOTMessageType.request) {
                const event: SocketMessageEvent<this> = {
                    packet, target: this,
                };
                this.emit(DHCPMessageType[packet.type], event);
            }

        });
    }

    public on(event: string, cb: (...args: any[]) => void): this;
    public on(event: "discover", listener: SocketMessageEventHandle<this>): this;
    public on(event: "inform", listener: SocketMessageEventHandle<this>): this;
    public on(event: "request", listener: SocketMessageEventHandle<this>): this;
    public on(event: "release", listener: SocketMessageEventHandle<this>): this;
    public on(event: "decline", listener: SocketMessageEventHandle<this>): this;
    public on(event: "dhcp", listener: SocketMessageEventHandle<this>): this;
    public on(event: "send", listener: SocketSendEventHandle<this>): this;
    public on(event: "listening", cb: () => void): this;
    public on(event: "close", listener: () => void): this;
    public on(event: "error", listener: (err: Error) => void): this;
    public on() {
        return super.on.apply(this, arguments);
    }

    public once(event: string, cb: (...args: any[]) => void): this;
    public once(event: "listening", cb: () => void): this;
    public once(event: "discover", listener: (e: SocketMessageEvent<this>) => void): this;
    public once(event: "inform", listener: (e: SocketMessageEvent<this>) => void): this;
    public once(event: "request", listener: (e: SocketMessageEvent<this>) => void): this;
    public once(event: "release", listener: (e: SocketMessageEvent<this>) => void): this;
    public once(event: "decline", listener: (e: SocketMessageEvent<this>) => void): this;
    public once(event: "send", listener: SocketSendEventHandle<this>): this;
    public once(event: "close", listener: () => void): this;
    public once(event: "error", listener: (err: Error) => void): this;
    public once(event: "dhcp", cb: (packet: Packet) => void): this;
    public once() {
        return super.once.apply(this, arguments);
    }

    /**
     * Creates DHCP Offer Packet
     *
     * @param {Packet} request
     * @returns
     *
     * @memberOf Server
     */
    public createOffer(request: Packet) {
        const p = new Packet();
        p.op = BOOTMessageType.reply;
        p.giaddr = request.giaddr;
        p.xid = request.xid;
        p.flags = request.flags;
        p.chaddr = request.chaddr;

        p.options.push(new DHCPMessageTypeOption(DHCPMessageType.offer));   // #53
        p.options.push(new SubnetMaskOption(this.netmask));                 // #1
        if (this.gateways.length) {
            p.options.push(new GatewaysOption(this.gateways));
        }                                                                   // #3
        if (this.domainServer.length) {
            p.options.push(new DomainServerOption(this.domainServer));
        }                                                                   // #6

        p.options.push(new AddressTimeOption(this.addressTime));            // #51
        p.options.push(new DHCPServerIdOption(this.serverId));              // #54
        return p;
    }

    /**
     * Creates DHCP Ack Packet
     *
     * @param {Packet} pocket
     * @returns
     *
     * @memberOf Server
     */
    public createAck(pocket: Packet) {
        const p = new Packet();
        p.op = BOOTMessageType.reply;
        p.xid = pocket.xid;
        p.ciaddr = pocket.giaddr;
        p.giaddr = pocket.giaddr;
        p.flags = pocket.flags;
        p.chaddr = pocket.chaddr;

        p.options.push(new DHCPMessageTypeOption(DHCPMessageType.ack));     // #53
        p.options.push(new SubnetMaskOption(this.netmask));                 // #1
        if (this.gateways.length) {
            p.options.push(new GatewaysOption(this.gateways));
        }              // #3
        if (this.domainServer.length) {
            p.options.push(new DomainServerOption(this.domainServer));
        }      // #6
        if (pocket.type === DHCPMessageType.request) {
            p.options.push(new AddressTimeOption(this.addressTime));
        }        // #51
        p.options.push(new DHCPServerIdOption(this.serverId));              // #54
        return p;
    }

    /**
     * Creates DHCP Nak Packet
     *
     * @param {Packet} pocket
     * @returns
     *
     * @memberOf Server
     */
    public createNak(pocket: Packet) {
        const p = new Packet();
        p.op = BOOTMessageType.reply;
        p.xid = pocket.xid;
        p.giaddr = pocket.giaddr;

        p.options.push(new DHCPMessageTypeOption(DHCPMessageType.nak));     // #53
        p.options.push(new DHCPServerIdOption(this.serverId));              // #54
        return p;
    }

}
