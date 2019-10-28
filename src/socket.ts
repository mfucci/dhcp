import { createSocket, Socket as NodeSocket } from "dgram";
import { EventEmitter } from "events";

import { AddressInfo } from "net";
import { BROADCAST } from "./const";
import { BOOTMessageType, DHCPOptions } from "./enum";
import { Packet } from "./packet";

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

export class Socket extends EventEmitter {

    public listenPort: number;
    public sendPort: number;
    public type: SocketType;

    protected socket: NodeSocket;

    public get address() {
        return this.socket.address() as AddressInfo;
    }

    constructor(type: SocketType = "udp4", inPort: number = 67, outPort: number = 68) {
        super();

        this.socket = createSocket(type);
        this.type = type;
        this.listenPort = inPort;
        this.sendPort = outPort;

        this.socket.on("listening", () => {
            this.socket.setBroadcast(true);
            this.emit("listening");
        });

        this.socket.on("error", (err) => {
            this.emit("error", err);
        });

        this.socket.on("message", this.onMessage.bind(this));
    }

    public close() {
        this.emit("close");
        this.socket.close();
    }

    public on(event: string, cb: (...args: any[]) => void): this;
    public on(event: "send", listener: SocketSendEventHandle<this>): this;
    public on(event: "dhcp", listener: SocketMessageEventHandle<this>): this;
    public on(event: "listening", cb: () => void): this;
    public on(event: "close", listener: () => void): this;
    public on(event: "error", listener: (err: Error) => void): this;
    public on() {
        return super.on.apply(this, arguments);
    }

    public once(event: string, cb: (...args: any[]) => void): this;
    public once(event: "send", listener: SocketSendEventHandle<this>): this;
    public once(event: "dhcp", listener: SocketMessageEventHandle<this>): this;
    public once(event: "listening", cb: () => void): this;
    public once(event: "close", listener: () => void): this;
    public once(event: "error", listener: (err: Error) => void): this;
    public once() {
        return super.once.apply(this, arguments);
    }

    public emit(event: "send", listener: SocketSendEventHandle<this>): boolean;
    public emit(event: "dhcp", listener: SocketMessageEventHandle<this>): boolean;
    public emit(event: "error", e: Error): boolean;
    public emit(event: string | symbol, ...args: any[]): boolean;
    public emit(): boolean {
        return super.emit.apply(this, arguments);
    }

    public bind(address?: string) {
        this.socket.bind(this.listenPort, address);
    }

    public send(packet: Packet, address: string = BROADCAST, sendPort?: number) {
        this.emit("send", {
            target: this,
            packet,
            address,
            sendPort,
        });
        const buf = packet.toBuffer();

        if (typeof sendPort !== "number") {
            sendPort = this.sendPort;
        }

        this.socket.send(buf, 0, buf.length, sendPort, address);
    }

    protected onMessage(msg: string, reinfo: AddressInfo) {
        const buf = Buffer.from(msg, "binary");

        const packet = Packet.fromBuffer(buf);
        packet.reinfo = reinfo;

        if ((packet.op === BOOTMessageType.request || packet.op === BOOTMessageType.reply) &&
            packet.options.some((option) => option.type === DHCPOptions.DhcpMessageType)) {
            this.emit("dhcp", {target: this, packet});
        }
    }
}
