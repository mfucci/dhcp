# DHCP

[![license](https://img.shields.io/badge/license-MIT-green.svg?style=flat)](https://raw.githubusercontent.com/mfucci/dhcp/master/LICENSE.md) 
[![CircleCI](https://circleci.com/gh/mfucci/dhcp.svg?style=svg)](https://circleci.com/gh/mfucci/dhcp)
[![Coverage Status](https://coveralls.io/repos/github/mfucci/dhcp/badge.svg?branch=master)](https://coveralls.io/github/mfucci/dhcp?branch=master)
[![npm version](https://badge.fury.io/js/@network-utils%2Fdhcp.svg)](https://badge.fury.io/js/@network-utils%2Fdhcp)

[![NPM](https://nodei.co/npm/@network-utils/dhcp.png?compact=true)](https://nodei.co/npm/@network-utils/dhcp?compact=true)

NodeJS implementation of DHCP socket connection

## Install

```
npm install @network-utils/dhcp
```

## Declarations

Module has got TypeScript declarations. It can be helpful to understand the module API

[See declarations](index.d.ts)

## Examples

### DHCP monitor

```javascript
"use strict";
let { BOOTMessageType, Server } = require("@network-utils/dhcp");

let s = new Server("192.168.1.1");

s.on("listening", () => {
    console.log("Server start", s.address);
});

s.on("dhcp", e => {
    console.log(e.packet.toString());
});

s.bind();
```

### DHCP server

```javascript
"use strict";
let { BOOTMessageType, Server } = require("@network-utils/dhcp");

let s = new Server({
    serverId: "192.168.1.1",
    gateways: ["192.168.1.1"],
    domainServer: ["192.168.1.1"],
});

s.on("listening", () => {
    console.log("Server start", s.address);
});

let ips = {};

s.on("discover", e => {
    console.log("DISCOVER");

    let pkt = e.packet;

    // Get IP by MAC
    let ip = "0.0.0.0";
    if (pkt.op === BOOTMessageType.request) {
        if (!(pkt.chaddr in ips))
            ip = ips[pkt.chaddr] = `192.168.1.${Object.keys(ips).length + 2}`;
        else
            ip = ips[pkt.chaddr];
    }

    let offer = s.createOffer(pkt);

    offer.yiaddr = ip;

    s.send(offer);
});
s.on("request", e => {
    console.log("REQUEST");
    let ack = s.createAck(e.packet);

    ack.yiaddr = ips[e.packet.chaddr];

    s.send(ack);
});
s.on("release", e => {
    console.log("RELEASE");
    delete ips[e.packet.chaddr];
});

s.bind();
```

## RFC

- [Dynamic Host Configuration Protocol](https://tools.ietf.org/html/rfc2131)
- [DHCP Options and BOOTP Vendor Extensions](https://tools.ietf.org/html/rfc2132)

## RELATED

- [dhcpjs](https://github.com/apaprocki/node-dhcpjs)
- [node-dhcpd](https://github.com/glaszig/node-dhcpd)
- [forge](https://github.com/konobi/forge/blob/master/lib/dhcpd.js)