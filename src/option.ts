import { IpConverter, MacConverter } from "./converters";
import { DHCPMessageType, DHCPOptions } from "./enum";

export abstract class Option<T> {
    public static fromBuffer<T extends Option<any>>(this: { new (): T }, data: Buffer) {
        const option = new this();
        option.fromBuffer(data);
        return option;
    }

    public static create(messageType: DHCPOptions): typeof Option {
        let res: any = UnknownOption;
        switch (messageType) {
            case DHCPOptions.SubnetMask:
                res = SubnetMaskOption;
                break;
            case DHCPOptions.Gateways:
                res = GatewaysOption;
                break;
            case DHCPOptions.DomainServer:
                res = DomainServerOption;
                break;
            case DHCPOptions.Hostname:
                res = HostnameOption;
                break;
            case DHCPOptions.DomainName:
                res = DomainNameOption;
                break;
            case DHCPOptions.AddressRequest:
                res = AddressRequestOption;
                break;
            case DHCPOptions.AddressTime:
                res = AddressTimeOption;
                break;
            case DHCPOptions.DhcpMessageType:
                res = DHCPMessageTypeOption;
                break;
            case DHCPOptions.DhcpServerId:
                res = DHCPServerIdOption;
                break;
            case DHCPOptions.ParameterList:
                res = ParameterListOption;
                break;
            case DHCPOptions.DhcpMessage:
                res = DhcpMessageOption;
                break;
            case DHCPOptions.DhcpMaxMsgSize:
                res = DhcpMaxMsgSizeOption;
                break;
            case DHCPOptions.RenewalTime:
                res = RenewalTimeOption;
                break;
            case DHCPOptions.RebindingTime:
                res = RebindingTimeOption;
                break;
            case DHCPOptions.ClientId:
                res = ClientIdentifierOption;
                break;
            case DHCPOptions.ClassId:
                res = ClassIdOption;
                break;
            case DHCPOptions.TftpServer:
                res = TftpServerOption;
                break;
            case DHCPOptions.BootFile:
                res = BootFileOption;
                break;
            case DHCPOptions.End:
                res = EndOption;
                break;
        }
        return res;
    }

    public type: DHCPOptions;
    public name: string;
    public value: T;

    protected constructor(type: DHCPOptions, value?: T) {
        this.type = type;
        this.name = DHCPOptions[type];
        if (value !== void 0) {
            this.value = value;
        }
    }

    public abstract toBuffer(): Buffer;
    public abstract fromBuffer(data: Buffer): void;
}

export class EndOption extends Option<null> {
    constructor() {
        super(DHCPOptions.End, null);
    }

    public toBuffer(): Buffer {
        return new Buffer([255]);
    }
    public fromBuffer(data: Buffer) {
        this.value = null;
    }
}

export abstract class Uint8Option extends Option<number> {

    public toBuffer() {
        return new Buffer([this.type, 1, this.value]);
    }

    public fromBuffer(data: Buffer) {
        this.type = data[0];
        this.value = data[2];
    }

}

export abstract class Uint16Option extends Option<number> {

    public toBuffer() {
        const buf = new Buffer([this.type, 2, 0, 0]);
        buf.writeUInt16BE(this.value, 2);
        return buf;
    }

    public fromBuffer(data: Buffer) {
        this.type = data[0];
        this.value = data.readUInt16BE(2);
    }

}

export abstract class Uint32Option extends Option<number> {

    public toBuffer() {
        const buf = new Buffer([this.type, 4, 0, 0, 0, 0]);
        buf.writeUInt32BE(this.value, 2);
        return buf;
    }

    public fromBuffer(data: Buffer) {
        this.type = data[0];
        this.value = data.readUInt32BE(2);
    }

}

/**
 * DHCP Message Type
 *
 * @export
 * @class DHCPMessageTypeOption
 * @extends {Uint8Option}
 */
export class DHCPMessageTypeOption extends Uint8Option {
    constructor(type: DHCPMessageType = DHCPMessageType.discover) {
        super(DHCPOptions.DhcpMessageType, type);
    }
}

export abstract class IpAddressOption extends Option<string> {

    public toBuffer() {
        return Buffer.concat([
            new Buffer([this.type, 4]),
            IpConverter.encode(this.value),
        ]);
    }

    public fromBuffer(data: Buffer) {
        this.type = data[0];
        this.value = IpConverter.decode(data.slice(2));
    }

}

export abstract class NumberListOption extends Option<number[]> {

    public toBuffer() {
        return Buffer.concat([
            new Buffer([this.type, this.value.length]),
            new Buffer(this.value),
        ]);
    }

    public fromBuffer(data: Buffer) {
        this.type = data[0];
        const buf = data.slice(2);
        const value: number[] = [];
        for (let i = 0; i < buf.length; i++) {
            value.push(buf[i]);
        }
        this.value = value;
    }

}

export abstract class BufferOption extends Option<Buffer> {

    public toBuffer() {
        return Buffer.concat([
            new Buffer([this.type, this.value.length]),
            this.value,
        ]);
    }

    public fromBuffer(data: Buffer) {
        this.type = data[0];
        this.value = data.slice(2);
    }

}
export abstract class Utf8Option extends Option<string> {

    public toBuffer() {
        const text = new Buffer(this.value, "utf8");
        return Buffer.concat([
            new Buffer([this.type, text.byteLength]),
            text,
        ]);
    }

    public fromBuffer(data: Buffer) {
        this.type = data[0];
        this.value = data.slice(2).toString("utf8");
    }

}

export class ParameterListOption extends NumberListOption {
    constructor(data?: number[]) {
        super(DHCPOptions.ParameterList, data);
    }
}
export class DhcpMessageOption extends BufferOption {
    constructor(data?: Buffer) {
        super(DHCPOptions.DhcpMessage, data);
    }
}
export class DhcpMaxMsgSizeOption extends Uint16Option {
    constructor(data?: number) {
        super(DHCPOptions.DhcpMaxMsgSize, data);
    }
}

export class HostnameOption extends Utf8Option {
    constructor(data?: string) {
        super(DHCPOptions.Hostname, data);
    }
}

export class DomainNameOption extends Utf8Option {
    constructor(data?: string) {
        super(DHCPOptions.DomainName, data);
    }
}

export class AddressRequestOption extends IpAddressOption {
    constructor(data?: string) {
        super(DHCPOptions.AddressRequest, data);
    }
}

export class DHCPServerIdOption extends IpAddressOption {
    constructor(data?: string) {
        super(DHCPOptions.DhcpServerId, data);
    }
}

export class SubnetMaskOption extends IpAddressOption {
    constructor(data?: string) {
        super(DHCPOptions.SubnetMask, data);
    }
}

export class AddressTimeOption extends Uint32Option {
    constructor(data?: number) {
        super(DHCPOptions.AddressTime, data);
    }
}
export class RenewalTimeOption extends Uint32Option {
    constructor(data?: number) {
        super(DHCPOptions.RenewalTime, data);
    }
}
export class RebindingTimeOption extends Uint32Option {
    constructor(data?: number) {
        super(DHCPOptions.RebindingTime, data);
    }
}
export class TftpServerOption extends Utf8Option {
    constructor(data?: string) {
        super(DHCPOptions.TftpServer, data);
    }
}
export class BootFileOption extends Utf8Option {
    constructor(data?: string) {
        super(DHCPOptions.BootFile, data);
    }
}

export interface ClientIdentifier {
    htype: number;
    chaddr: string;
}
export class ClientIdentifierOption extends Option<ClientIdentifier> {
    constructor(data?: ClientIdentifier) {
        super(DHCPOptions.ClientId, data);
    }

    public toBuffer() {
        const chaddr = MacConverter.encode(this.value.chaddr);
        return Buffer.concat([
            new Buffer([this.type, chaddr.byteLength + 1, this.value.htype]),
            chaddr,
        ]);
    }

    public fromBuffer(data: Buffer) {
        this.type = data[0];
        this.value = {
            htype: data[2],
            chaddr: MacConverter.decode(data.slice(3)),
        };
    }
}

export abstract class IpAddressListOption extends Option<string[]> {
    public toBuffer() {
        let buffers = this.value.map((addr) => IpConverter.encode(addr));
        buffers = [new Buffer([this.type, this.value.length * 4])].concat(buffers);
        return Buffer.concat(buffers);
    }

    public fromBuffer(data: Buffer) {
        const res: string[] = [];
        data = data.slice(2);
        const count = data.length / 4;
        for (let i = 0; i < count; i++) {
            res.push(IpConverter.decode(data.slice(i * 4, i * 4 + 4)));
        }
        this.value = res;
    }
}

export class GatewaysOption extends IpAddressListOption {
    constructor(data?: string[]) {
        super(DHCPOptions.Gateways, data);
    }
}
export class DomainServerOption extends IpAddressListOption {
    constructor(data?: string[]) {
        super(DHCPOptions.DomainServer, data);
    }
}
export class ClassIdOption extends BufferOption {
    constructor(data?: Buffer) {
        super(DHCPOptions.ClassId, data);
    }
}
export class UnknownOption extends BufferOption {
}
