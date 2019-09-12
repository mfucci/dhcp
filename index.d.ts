/// <reference types="node" />

import { Socket as NodeSocket } from "dgram";
import { AddressInfo } from "net";

declare namespace DHCP {

    // enum.ts

    export enum DHCPOptions {
        /**
         * None
         * Size: 0
         */
        Pad = 0,
        /**
         * Subnet Mask Value
         * Size: 4
         */
        SubnetMask = 1,
        /**
         * Time Offset in Seconds from UTC
         * Size: 4
         */
        TimeOffset = 2,
        /**
         * N/4 Gateway addresses
         * Size: N
         */
        Gateways = 3,
        /**
         * N/4 Timeserver addresses
         * Size: N
         */
        TimeServer = 4,
        /**
         * N/4 IEN-116 Server addresses
         * Size: N
         */
        NameServer = 5,
        /**
         * N/4 DNS Server addresses
         * Size: N
         */
        DomainServer = 6,
        /**
         * N/4 Logging Server addresses
         * Size: N
         */
        LogServer = 7,
        /**
         * N/4 Quotes Server addresses
         * Size: N
         */
        QuotesServer = 8,
        /**
         * N/4 Printer Server addresses
         * Size: N
         */
        LPRServer = 9,
        /**
         * N/4 Impress Server addresses
         * Size: N
         */
        ImpressServer = 10,
        /**
         * N/4 RLP Server addresses
         * Size: N
         */
        RLPServer = 11,
        /**
         * Hostname string
         * Size: N
         */
        Hostname = 12,
        /**
         * Size of boot file in 512 byte chunks
         * Size: 2
         */
        BootFileSize = 13,
        /**
         * Client to dump and name the file to dump it to
         * Size: N
         */
        MeritDumpFile = 14,
        /**
         * The DNS domain name of the client
         * Size: N
         */
        DomainName = 15,
        /**
         * Swap Server addeess
         * Size: N
         */
        SwapServer = 16,
        /**
         * Path name for root disk
         * Size: N
         */
        RootPath = 17,
        /**
         * Path name for more BOOTP info
         * Size: N
         */
        ExtensionFile = 18,
        /**
         * Enable/Disable IP Forwarding
         * Size: 1
         */
        Forward = 19,
        /**
         * Enable/Disable Source Routing
         * Size: 1
         */
        SrcRte = 20,
        /**
         * Routing Policy Filters
         * Size: N
         */
        PolicyFilter = 21,
        /**
         * Max Datagram Reassembly Size
         * Size: 2
         */
        MaxDGAssembly = 22,
        /**
         * Default IP Time to Live
         * Size: 1
         */
        DefaultIpTtl = 23,
        /**
         * Path MTU Aging Timeout
         * Size: 4
         */
        MtuTimeout = 24,
        /**
         * Path MTU  Plateau Table
         * Size: N
         */
        MtuPlateau = 25,
        /**
         * Interface MTU Size
         * Size: 2
         */
        MtuInterface = 26,
        /**
         * All Subnets are Local
         * Size: 1
         */
        MtuSubnet = 27,
        /**
         * Broadcast Address
         * Size: 4
         */
        BroadcastAddress = 28,
        /**
         * Perform Mask Discovery
         * Size: 1
         */
        MaskDiscovery = 29,
        /**
         * Provide Mask to Others
         * Size: 1
         */
        MaskSupplier = 30,
        /**
         * Perform Router Discovery
         * Size: 1
         */
        RouterDiscovery = 31,
        /**
         * Router Solicitation Address
         * Size: 4
         */
        RouterRequest = 32,
        /**
         * Static Routing Table
         * Size: N
         */
        StaticRoute = 33,
        /**
         * Trailer Encapsulation
         * Size: 1
         */
        Trailers = 34,
        /**
         * ARP Cache Timeout
         * Size: 4
         */
        ArpTimeout = 35,
        /**
         * Ethernet Encapsulation
         * Size: 1
         */
        Ethernet = 36,
        /**
         * Default TCP Time to Live
         * Size: 1
         */
        DefaultTcpTtl = 37,
        /**
         * TCP Keepalive Interval
         * Size: 4
         */
        KeepaliveTime = 38,
        /**
         * TCP Keepalive Garbage
         * Size: 1
         */
        KeepaliveData = 39,
        /**
         * NIS Domain Name
         * Size: N
         */
        NisDomain = 40,
        /**
         * NIS Server Addresses
         * Size: N
         */
        NisServers = 41,
        /**
         * NTP Server Addresses
         * Size: N
         */
        NtpServers = 42,
        /**
         * Vendor Specific Information
         * Size: N
         */
        VendorSpecific = 43,
        /**
         * NETBIOS Name Servers
         * Size: N
         */
        NetbiosNameSrv = 44,
        /**
         * NETBIOS Datagram Distribution
         * Size: N
         */
        NetbiosDistSrv = 45,
        /**
         * NETBIOS Note Type
         * Size: 1
         */
        NetbiosNoteType = 46,
        /**
         * NETBIOS Scope
         * Size: N
         */
        NetbiosScope = 47,
        /**
         * X Window Font Server
         * Size: N
         */
        XWindowFont = 48,
        /**
         * X Window Display Manager
         * Size: N
         */
        XWindowManmager = 49,
        /**
         * Requested IP Address
         * Size: 4
         */
        AddressRequest = 50,
        /**
         * IP Address Lease Time
         * Size: 4
         */
        AddressTime = 51,
        /**
         * Overloaf "sname" or "file"
         * Size: 1
         */
        Overload = 52,
        /*1          DHCP Message Type
        * Size: Type
         */
        DhcpMessageType = 53,
        /**
         * DHCP Server Identification
         * Size: 4
         */
        DhcpServerId = 54,
        /**
         * Parameter Request List
         * Size: N
         */
        ParameterList = 55,
        /**
         * DHCP Error Message
         * Size: N
         */
        DhcpMessage = 56,
        /**
         * DHCP Maximum Message Size
         * Size: 2
         */
        DhcpMaxMsgSize = 57,
        /**
         * DHCP Renewal (T1) Time
         * Size: 4
         */
        RenewalTime = 58,
        /**
         * DHCP Rebinding (T2) Time
         * Size: 4
         */
        RebindingTime = 59,
        /**
         * Class Identifier
         * Size: N
         */
        ClassId = 60,
        /**
         * Client Identifier
         * Size: N
         */
        ClientId = 61,
        /**
         * Netware/IP Domain Name
         * Size: N
         */
        NetwareIpDomain = 62,
        /**
         * Netware/IP sub Options
         * Size: N
         */
        NetwareIpOption = 63,
        /**
         * None
         * Size: 0
         */
        TftpServer = 66,
        /**
         * TFTP server name
         * Size: N
         */
        BootFile = 67,
        /**
         * Bootfile name
         * Size: N
         */
        End = 255,
        //  64-127  Unassigned
        //  128-154 Reserved
    }

    export enum DHCPMessageType {
        discover = 1,
        offer = 2,
        request = 3,
        decline = 4,
        ack = 5,
        nak = 6,
        release = 7,
        inform = 8,
    }

    export enum BOOTMessageType {
        request = 1,
        reply = 2,
    }

    // option.ts

    export abstract class Option<T> {
        public static create(messageType: DHCPOptions): typeof Option | null;
        public static fromBuffer<T extends Option<any>>(this: { new(): T; }, data: Buffer): T;
        public type: DHCPOptions;
        public name: string;
        public value: T;
        protected constructor(type: DHCPOptions, value?: T);
        public abstract toBuffer(): Buffer;
        public abstract fromBuffer(data: Buffer): void;
    }
    export class EndOption extends Option<null> {
        constructor();
        public toBuffer(): Buffer;
        public fromBuffer(data: Buffer): void;
    }
    export abstract class Uint8Option extends Option<number> {
        public toBuffer(): Buffer;
        public fromBuffer(data: Buffer): void;
    }
    export abstract class Uint16Option extends Option<number> {
        public toBuffer(): Buffer;
        public fromBuffer(data: Buffer): void;
    }
    export abstract class Uint32Option extends Option<number> {
        public toBuffer(): Buffer;
        public fromBuffer(data: Buffer): void;
    }
    /**
     * DHCP Message Type
     *
     * @export
     * @class DHCPMessageTypeOption
     * @extends {Uint8Option}
     */
    export class DHCPMessageTypeOption extends Uint8Option {
        constructor(type?: DHCPMessageType);
    }
    export abstract class IpAddressOption extends Option<string> {
        public toBuffer(): Buffer;
        public fromBuffer(data: Buffer): void;
    }
    export abstract class NumberListOption extends Option<number[]> {
        public toBuffer(): Buffer;
        public fromBuffer(data: Buffer): void;
    }
    export abstract class BufferOption extends Option<Buffer> {
        public toBuffer(): Buffer;
        public fromBuffer(data: Buffer): void;
    }
    export abstract class Utf8Option extends Option<string> {
        public toBuffer(): Buffer;
        public fromBuffer(data: Buffer): void;
    }
    export class ParameterListOption extends NumberListOption {
        constructor(data?: number[]);
    }
    export class DhcpMessageOption extends BufferOption {
        constructor(data?: Buffer);
    }
    export class DhcpMaxMsgSizeOption extends Uint16Option {
        constructor(data?: number);
    }
    export class HostnameOption extends Utf8Option {
        constructor(data?: string);
    }
    export class DomainNameOption extends Utf8Option {
        constructor(data?: string);
    }
    export class AddressRequestOption extends IpAddressOption {
        constructor(data?: string);
    }
    export class DHCPServerIdOption extends IpAddressOption {
        constructor(data?: string);
    }
    export class SubnetMaskOption extends IpAddressOption {
        constructor(data?: string);
    }
    export class AddressTimeOption extends Uint32Option {
        constructor(data?: number);
    }
    export class RenewalTimeOption extends Uint32Option {
        constructor(data?: number);
    }
    export class RebindingTimeOption extends Uint32Option {
        constructor(data?: number);
    }
    export class TftpServerOption extends Utf8Option {
        constructor(data?: string);
    }
    export class BootFileOption extends Utf8Option {
        constructor(data?: string);
    }
    export interface ClientIdentifier {
        htype: number;
        chaddr: string;
    }
    export class ClientIdentifierOption extends Option<ClientIdentifier> {
        constructor(data?: ClientIdentifier);
        public toBuffer(): Buffer;
        public fromBuffer(data: Buffer): void;
    }
    export abstract class IpAddressListOption extends Option<string[]> {
        public toBuffer(): Buffer;
        public fromBuffer(data: Buffer): void;
    }
    export class GatewaysOption extends IpAddressListOption {
        constructor(data?: string[]);
    }
    export class DomainServerOption extends IpAddressListOption {
        constructor(data?: string[]);
    }
    export class ClassIdOption extends BufferOption {
        constructor(data?: Buffer);
    }
    export class UnknownOption extends BufferOption {
    }

    // packet.ts

    export type PacketOptions = Array<Option<any>>;
    export class Packet {
        public static fromBuffer(buffer: Buffer): Packet;
        public op: BOOTMessageType;
        public htype: number;
        public hlen: number;
        public hops: number;
        public xid: number;
        public secs: number;
        public flags: number;
        public ciaddr: string;
        public yiaddr: string;
        public siaddr: string;
        public giaddr: string;
        public chaddr: string;
        public sname: string;
        public file: string;
        public options: PacketOptions;
        public reinfo?: AddressInfo;
        /**
         * Возвращает тип DHCP пакета
         *
         * @readonly
         * @type {number}
         * @memberOf Packet
         */
        public readonly type: number;
        public toBuffer(): Buffer;
        public fromBuffer(buffer: Buffer): void;
        public toString(): string;
        public find(type: DHCPOptions): Option<any> | null;
    }

    // socket.ts

    export type SocketType = "udp4" | "udp6";

    export interface SocketEvent<I> {
        target: I;
    }

    export interface SocketMessageEvent<I> extends SocketEvent<I> {
        packet: Packet;
    }

    export interface SocketSendEvent<I> extends SocketMessageEvent<I> { }

    export type EventHandler<T> = (e: T) => void;

    export type SocketMessageEventHandle<T> = EventHandler<SocketMessageEvent<T>>;
    export type SocketSendEventHandle<T> = EventHandler<SocketSendEvent<T>>;

    export class Socket extends NodeJS.EventEmitter {
        public listenPort: number;
        public sendPort: number;
        public type: SocketType;
        public readonly address: AddressInfo;
        protected socket: NodeSocket;
        constructor(type: SocketType, inPort: number, outPort: number);
        public close(): void;
        public on(event: string, cb: (...args: any[]) => void): this;
        public on(event: "send", listener: SocketSendEventHandle<this>): this;
        public on(event: "dhcp", listener: SocketMessageEventHandle<this>): this;
        public on(event: "listening", cb: () => void): this;
        public on(event: "close", listener: () => void): this;
        public on(event: "error", listener: (err: Error) => void): this;
        public once(event: string, cb: (...args: any[]) => void): this;
        public once(event: "send", listener: SocketSendEventHandle<this>): this;
        public once(event: "dhcp", listener: SocketMessageEventHandle<this>): this;
        public once(event: "listening", cb: () => void): this;
        public once(event: "close", listener: () => void): this;
        public once(event: "error", listener: (err: Error) => void): this;
        public emit(event: "send", listener: SocketSendEventHandle<this>): boolean;
        public emit(event: "dhcp", listener: SocketMessageEventHandle<this>): boolean;
        public emit(event: "error", e: Error): boolean;
        public emit(event: string | symbol, ...args: any[]): boolean;
        public bind(address?: string): void;
        public send(packet: Packet, address?: string, sendPort?: number): void;
        protected onMessage(msg: string, reinfo: AddressInfo): void;
    }

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
        public ipAddress: {
            min: number;
            max: number;
        };
        public netmask: string;
        public addressTime: number;
        public domainServer: string[];
        public gateways: string[];
        constructor(serverId: string);
        constructor(options: ServerOptions);
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
        public createOffer(request: Packet): Packet;
        public createAck(packet: Packet): Packet;
        public createNak(packet: Packet): Packet;
    }

}

export = DHCP;
export as namespace DHCP;
