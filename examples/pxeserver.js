"use strict";
let {
  AddressTimeOption,
  BOOTMessageType,
  DHCPMessageType,
  DHCPMessageTypeOption,
  DHCPServerIdOption,
  DomainServerOption,
  GatewaysOption,
  Packet,
  SubnetMaskOption,
  Server,
  TftpServerOption,
  BootFileOption 
} = require("../");


const service = new Server({
    serverId: "192.168.100.1",
    gateways: ["192.168.100.1"],
    domainServer: ["192.168.100.1"],
});

service.on("listening", () => {
    console.log("Server start", service.address);
});

const ips = {};

service.on("discover", e => {
    console.log("DISCOVER");
 
    const pkt = e.packet;
 
    // Get IP by MAC
    let ip = "0.0.0.0";
    if (pkt.op === BOOTMessageType.request) {
        if (!(pkt.chaddr in ips))
            ip = ips[pkt.chaddr] = `192.168.100.${Object.keys(ips).length + 2}`;
        else
            ip = ips[pkt.chaddr];
    }
    console.log(`IP: ${ip}`);
    
    const offer = new Packet();
    offer.yiaddr = ip;
    offer.op = BOOTMessageType.reply;
    offer.giaddr = pkt.giaddr;
    offer.xid = pkt.xid;
    offer.flags = pkt.flags;
    offer.chaddr = pkt.chaddr;
    offer.siaddr = "192.168.100.1";

    offer.options.push(new DHCPMessageTypeOption(DHCPMessageType.offer));         // #53
    offer.options.push(new SubnetMaskOption(service.netmask));                    // #1
    if (service.gateways.length) {
      offer.options.push(new GatewaysOption(service.gateways));                   // #3
    }
    
    if (service.domainServer.length) {
      offer.options.push(new DomainServerOption(service.domainServer));           // #6
    }
    
    offer.options.push(new AddressTimeOption(service.addressTime));               // #51
    offer.options.push(new DHCPServerIdOption(service.serverId));                 // #54
    offer.options.push(new TftpServerOption("192.168.100.1"));                    // #66
    offer.options.push(new BootFileOption("image.bin"));                     // #67

    console.log(`Offer: ${offer}`);
    service.send(offer);
});

service.on("request", e => {
    console.log("REQUEST");
    const ack = service.createAck(e.packet);
 
    ack.yiaddr = ips[e.packet.chaddr];
 
    service.send(ack);
});
service.on("release", e => {
    console.log("RELEASE");
    delete ips[e.packet.chaddr];
});

service.bind()
