import { DEFAULT_IP, DEFAULT_MAC, IP_SPLITTER, MAC_SPLITTER } from "./const";

export const IpConverter = {
    encode(data: string): Buffer {
        if (!data) {
            data = DEFAULT_IP;
        }
        const octets = data.split(IP_SPLITTER);
        const buffer = Buffer.alloc(octets.length);
        octets.forEach((octet, index) => buffer[index] = Number(octet));
        return buffer;
    },
    decode(data: Buffer): string {
        const res: string[] = [];
        for (let i = 0; i < data.length; i++) {
            res.push(data[i].toString());
        }
        return res.join(IP_SPLITTER);
    },
};

export const MacConverter = {
    encode(data: string, len?: number): Buffer {
        if (len) {
            const regex = new RegExp("^([0-9a-f]{2}[:-]){" + (len - 1) + "}([0-9a-f]{2})", "i");
            if (!regex.test(data)) {
                throw new Error("Wrong MAC incoming data");
            }
        }
        if (!data) {
            data = DEFAULT_IP;
        }
        const octets = data.replace(new RegExp(MAC_SPLITTER, "g"), "");
        const buffer = Buffer.from(octets, "hex");

        return buffer;
    },
    decode(data: Buffer, len?: number): string {
        let res: string[] = [];
        for (let i = 0; i < data.length; i++) {
            res.push(Buffer.from([data[i]]).toString("hex").toUpperCase());
        }
        if (len) {
            res = res.slice(0, len);
        }
        return res.join(MAC_SPLITTER);
    },
};
