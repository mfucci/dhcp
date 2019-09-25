/**
 *   Tag     Name          Data Length    Meaning
 *   ---     ----          -----------    -------
 *    0      Pad               0          None
 *    1      Subnet Mask       4          Subnet Mask Value
 *    2      Time Offset       4          Time Offset in
 *                                        Seconds from UTC
 *    3      Gateways          N          N/4 Gateway addresses
 *    4      Time Server       N          N/4 Timeserver addresses
 *    5      Name Server       N          N/4 IEN-116 Server addresses
 *    6      Domain Server     N          N/4 DNS Server addresses
 *    7      Log Server        N          N/4 Logging Server addresses
 *    8      Quotes Server     N          N/4 Quotes Server addresses
 *    9      LPR Server        N          N/4 Printer Server addresses
 *   10      Impress Server    N          N/4 Impress Server addresses
 *   11      RLP Server        N          N/4 RLP Server addresses
 *   12      Hostname          N          Hostname string
 *   13      Boot File Size    2          Size of boot file in 512 byte
 *                                        chunks
 *   14      Merit Dump File              Client to dump and name
 *                                        the file to dump it to
 *   15      Domain Name       N          The DNS domain name of the
 *                                        client
 *   16      Swap Server       N          Swap Server addeess
 *   17      Root Path         N          Path name for root disk
 *   18      Extension File    N          Path name for more BOOTP info
 *
 *   19      Forward On/Off    1          Enable/Disable IP Forwarding
 *   20      SrcRte On/Off     1          Enable/Disable Source Routing
 *   21      Policy Filter     N          Routing Policy Filters
 *   22      Max DG Assembly   2          Max Datagram Reassembly Size
 *   23      Default IP TTL    1          Default IP Time to Live
 *   24      MTU Timeout       4          Path MTU Aging Timeout
 *   25      MTU Plateau       N          Path MTU  Plateau Table
 *   26      MTU Interface     2          Interface MTU Size
 *   27      MTU Subnet        1          All Subnets are Local
 *   28      Broadcast Address 4          Broadcast Address
 *   29      Mask Discovery    1          Perform Mask Discovery
 *   30      Mask Supplier     1          Provide Mask to Others
 *   31      Router Discovery  1          Perform Router Discovery
 *   32      Router Request    4          Router Solicitation Address
 *   33      Static Route      N          Static Routing Table
 *   34      Trailers          1          Trailer Encapsulation
 *   35      ARP Timeout       4          ARP Cache Timeout
 *   36      Ethernet          1          Ethernet Encapsulation
 *   37      Default TCP TTL   1          Default TCP Time to Live
 *   38      Keepalive Time    4          TCP Keepalive Interval
 *   39      Keepalive Data    1          TCP Keepalive Garbage
 *   40      NIS Domain        N          NIS Domain Name
 *   41      NIS Servers       N          NIS Server Addresses
 *   42      NTP Servers       N          NTP Server Addresses
 *   43      Vendor Specific   N          Vendor Specific Information
 *   44      NETBIOS Name Srv  N          NETBIOS Name Servers
 *   45      NETBIOS Dist Srv  N          NETBIOS Datagram Distribution
 *   46      NETBIOS Note Type 1          NETBIOS Note Type
 *   47      NETBIOS Scope     N          NETBIOS Scope
 *   48      X Window Font     N          X Window Font Server
 *   49      X Window Manmager N          X Window Display Manager
 *   50      Address Request   4          Requested IP Address
 *   51      Address Time      4          IP Address Lease Time
 *   52      Overload          1          Overloaf "sname" or "file"
 *   53      DHCP Msg Type     1          DHCP Message Type
 *   54      DHCP Server Id    4          DHCP Server Identification
 *   55      Parameter List    N          Parameter Request List
 *   56      DHCP Message      N          DHCP Error Message
 *   57      DHCP Max Msg Size 2          DHCP Maximum Message Size
 *   58      Renewal Time      4          DHCP Renewal (T1) Time
 *   59      Rebinding Time    4          DHCP Rebinding (T2) Time
 *   60      Class Id          N          Class Identifier
 *   61      Client Id         N          Client Identifier
 *   62      Netware/IP Domain N          Netware/IP Domain Name
 *   63      Netware/IP Option N          Netware/IP sub Options
 *   66      TFTP Server       N          TFTP Server IP/Domain Name
 *   67      Bootfile name     N          Boot file for PXE booting.
 *   
 *   64-127  Unassigned
 *   128-154 Reserved
 *
 *   255     End               0          None
 *
 */

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
