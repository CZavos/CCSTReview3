/*
  Quiz 3: Cisco CCST Networking
  Edit this file to change questions, answers, or explanations.

  Question types:
    single    options[], answer = index of the correct option
    multi     options[], pick = how many to choose, answer = [indexes]
    yesno     rows[{ text, answer: true|false }]
    match     terms[], pairs[{ definition, answer: "term text" }]
    dropdown  items[{ label, options[], answer: "option text" }]
  Optional on any question: code = text shown in a terminal-style block.
*/
const QUIZ = {
  title: "Quiz 3",
  subtitle: "Cisco CCST networking practice",
  questions: [
    // 1
    {
      type: "yesno",
      prompt: "A new network administrator wants to ensure all of the IP addresses assigned to devices on an internal network are private IP addresses. Which of the following IP addresses is a private IP address? (Choose two)",
      rows: [
        { text: "172.31.31.31", answer: true },
        { text: "192.168.0.1", answer: true },
        { text: "1.1.1.1", answer: false },
        { text: "224.1.1.1", answer: false }
      ],
      explanation: [
        "Private IP addresses are in the following ranges:",
        "10.0.0.0 to 10.255.255.255",
        "172.16.0.0 to 172.31.255.255",
        "192.168.0.1 to 192.168.255.255",
        "Thus, 172.31.31.31 is a private IP address and so is 192.168.0.1.",
        "1.1.1.1 is a public IP address.",
        "224.1.1.1 is a multicast IP address."
      ]
    },
    // 2
    {
      type: "single",
      prompt: "A network administrator needs to configure internal networking on a switch to where 10 ports are used to connect devices in the sales department and 10 ports are used to connect devices in the operations department. What should the administrator configure to fulfill these network requirements?",
      options: ["VLAN", "MAC address filtering", "Layer 3 switching", "MAC address table"],
      answer: 0,
      explanation: [
        "A virtual local area network (VLAN) allows for multiple networks to be created on the same switch and then ports can be assigned to those VLANs. Thus, to create an environment with two separate networks on the same switch, one should create VLANs.",
        "A MAC address table stores MAC addresses switch ports find as connections are made to a switch.",
        "MAC address filtering controls the MAC addresses allowed on a switch.",
        "Layer 3 switching involves using routing functions on a switch."
      ]
    },
    // 3
    {
      type: "single",
      prompt: "Packets are created on which layer of the OSI model?",
      options: ["Network", "Data Link", "Transport", "Physical"],
      answer: 0,
      explanation: [
        "Packets are created on the Network layer of the OSI model. Packets are created from segments, which are created on the Transport layer of the OSI model.",
        "Frames are created on the Data Link layer of the OSI model.",
        "Bits are created on the Physical layer of the OSI model."
      ]
    },
    // 4
    {
      type: "match",
      prompt: "Using drag and drop, match each throughput-related term with its definition.",
      terms: ["Latency", "Delay", "Iperf"],
      pairs: [
        { definition: "The total time a data packet takes to get from a source to a destination.", answer: "Latency" },
        { definition: "The time it takes for the first bit of a data packet to travel from a source to a destination.", answer: "Delay" },
        { definition: "A tool used to measure and tune network performance.", answer: "Iperf" }
      ],
      explanation: [
        "Latency is the total time a data packet takes to get from a source to a destination.",
        "Delay is the time it takes for the first bit of a data packet to travel from a source to a destination.",
        "Iperf measures network performance measurement and tuning."
      ]
    },
    // 5
    {
      type: "multi",
      pick: 2,
      prompt: "Which network types span across multiple buildings in multiple locations? (Choose two)",
      options: ["CAN", "MAN", "WAN", "PAN"],
      answer: [1, 2],
      explanation: [
        "A wide area network (WAN) spans across multiple locations.",
        "A metropolitan area network (MAN) spans across multiple locations, usually within the same city.",
        "A campus area network (CAN) spans across multiple buildings in a single location.",
        "A personal area network (PAN) spans between two devices on one’s person, like a Bluetooth connection from a set of headphones to a phone."
      ]
    },
    // 6
    {
      type: "multi",
      pick: 2,
      prompt: "When configured properly, which network topologies do not exhibit a single point of failure, even when no redundancy is configured? (Choose two)",
      options: ["Star", "Mesh", "Ring", "Bus"],
      answer: [0, 1],
      explanation: [
        "The star and mesh network topologies do not exhibit a single point of failure, as one break in the network will not usually take down the entire network, unless, in the star topology, the central point of the network, usually a switch, malfunctions.",
        "The bus and ring topologies both feature a single point of failure, as one break in a network will take down the entire network, unless, in the case of a ring topology, a redundancy ring is added to the network."
      ]
    },
    // 7
    {
      type: "single",
      prompt: "A financial consulting firm wants to move its operations to the cloud but has a server containing confidential data that it needs to keep on-premises. Which cloud model should the firm utilize?",
      options: ["Community", "Public", "Private", "Hybrid"],
      answer: 3,
      explanation: [
        "A hybrid cloud uses both aspects of public and private cloud computing and thus should be used in this instance as some data can be moved to a cloud service and some cannot. A community cloud is used by multiple entities, so it will not fit the need here."
      ]
    },
    // 8
    {
      type: "multi",
      pick: 2,
      prompt: "Which two aspects of cloud computing fall under IaaS? (Choose two)",
      options: ["Web-based email", "Virtual machines", "Serverless logic apps", "Firewalls"],
      answer: [1, 3],
      explanation: [
        "Infrastructure as a Service (IaaS) is the cloud service that virtualizes hardware. These hardware pieces include firewalls and virtual machines.",
        "Serverless logic apps fall under Platform as a Service (PaaS).",
        "Web-based email falls under Software as a Service (SaaS)."
      ]
    },
    // 9
    {
      type: "multi",
      pick: 2,
      prompt: "Which statements are true about UDP and its use in transmitting data from a source to a destination? (Choose two)",
      options: [
        "UDP is a connectionless protocol.",
        "UDP is well-suited for transmitting documents from a source to a destination.",
        "UDP sends acknowledgements that data was received back to a data source.",
        "UDP has less overhead than does TCP."
      ],
      answer: [0, 3],
      explanation: [
        "UDP is a connectionless protocol that does not send acknowledgements of received data from a source back to the source.",
        "UDP has less overhead than does TCP because of the lack of the need for acknowledgements.",
        "UDP is not well-suited for transmitting documents from a source to a destination because data packets from documents need acknowledgement that data was received."
      ]
    },
    // 10
    {
      type: "multi",
      pick: 2,
      prompt: "A new network administrator is learning about the different ways in which files are transferred from a server to a client machine. Which statements are true regarding FTP? (Choose two)",
      options: [
        "Data can be transferred both from a server to a client machine and from a client machine to a server.",
        "FTP can require authentication.",
        "FTP runs on port 69.",
        "Data transferred over FTP is secure."
      ],
      answer: [0, 1],
      explanation: [
        "File Transfer Protocol (FTP) is an unsecure method for transferring files to and from a server. Data transferred via FTP is not encrypted.",
        "Authentication can be required for FTP.",
        "FTP runs on ports 20 and 21. TFTP runs on port 69."
      ]
    },
    // 11
    {
      type: "single",
      prompt: "Which protocol transmits data from a web server to a client requesting the data?",
      options: ["HTTP", "DHCP", "DNS", "FTP"],
      answer: 0,
      explanation: [
        "Hypertext Transfer Protocol (HTTP) transmits data from a web server to a client requesting data.",
        "Domain Name Server (DNS) resolves hostnames to IP addresses.",
        "Dynamic Host Configuration Protocol (DHCP) assigns IP addresses to devices joining a network.",
        "File Transfer Protocol (FTP) transfers files to and from devices from an FTP server."
      ]
    },
    // 12
    {
      type: "single",
      prompt: "Which network protocol prevents one from having to memorize the IP address of each website they visit?",
      options: ["ICMP", "DNS", "FTP", "DHCP"],
      answer: 1,
      explanation: [
        "Domain Name Server (DNS) resolves hostnames to IP addresses and IP addresses to hostnames. Thus, DNS prevents one from having to memorize the IP address of each website that a person visits.",
        "Dynamic Host Configuration Protocol (DHCP) assigns IP addresses to hosts.",
        "Internet Control Message Protocol (ICMP) is used to troubleshoot connections to IP addresses and hosts.",
        "File Transfer Protocol (FTP) transfers files between hosts."
      ]
    },
    // 13
    {
      type: "single",
      prompt: "Which class of subnet is needed for a network segment that will hold no more than 200 devices at any given time?",
      options: ["Class B", "Class D", "Class A", "Class C"],
      answer: 3,
      explanation: [
        "A Class C subnet can hold up to 254 devices.",
        "A Class B subnet can hold up to 65,534 devices.",
        "A Class A subnet can hold over 16 million devices.",
        "Class D IP addresses are used for multicast purposes."
      ]
    },
    // 14
    {
      type: "match",
      prompt: "A support technician needs to view detailed hardware and IOS information about a Cisco device. Using drag and drop, match each show command with the output it will generate.",
      terms: ["show version", "show inventory", "show switch"],
      pairs: [
        { definition: "Shows detailed hardware information about a device.", answer: "show inventory" },
        { definition: "Shows the IOS running on a device.", answer: "show version" },
        { definition: "Shows information about each device in a stack of devices.", answer: "show switch" }
      ],
      explanation: [
        "The show inventory command details hardware information about a Cisco device.",
        "The show version command provides the version of the IOS operating system on the device.",
        "The show switch command lists information about each switch in a switch stack."
      ]
    },
    // 15
    {
      type: "dropdown",
      prompt: "Using the dropdown lists, answer the following questions about IPv4 broadcast domains.",
      items: [
        {
          label: "Does subnetting a larger network result in fewer broadcast domains in the network, the same number of broadcast domains, or more broadcast domains?",
          options: ["Fewer broadcast domains", "The same number of broadcast domains", "More broadcast domains"],
          answer: "More broadcast domains"
        },
        {
          label: "For its private network, a local business uses a 192.168.1.0/24 network. What is the broadcast IP address of that network?",
          options: ["192.168.1.0", "192.168.1.255", "255.255.255.255"],
          answer: "192.168.1.255"
        }
      ],
      explanation: [
        "Subnetting a network results in more broadcast domains for that network, which reduces overall traffic because broadcasts are sent to fewer devices.",
        "The broadcast address of a subnet is the last IP address in the subnet. Thus, with a network of 192.168.1.0/24, all devices are 192.168.1.x addressed devices. 255 is the highest number in the range, so the broadcast address is 192.168.1.255.",
        "The 255.255.255.255 address is only used when the broadcast address for a network is unknown."
      ]
    },
    // 16
    {
      type: "dropdown",
      prompt: "Using the dropdown lists, identify the most common cable used for the defined installations.",
      items: [
        {
          label: "These cables are used for cable TV and cable internet installations.",
          options: ["Coaxial", "Fiber", "Twisted-pair"],
          answer: "Coaxial"
        },
        {
          label: "These cables are used for Ethernet networks inside of buildings.",
          options: ["Coaxial", "Fiber", "Twisted-pair"],
          answer: "Twisted-pair"
        }
      ],
      explanation: [
        "Coaxial cables are commonly used for cable TV and cable internet installations.",
        "Twisted-pair cables are commonly used for Ethernet networks inside of buildings.",
        "Fiber cables are normally used for high-speed, long-distance network connections."
      ]
    },
    // 17
    {
      type: "match",
      prompt: "Using drag and drop, match each fiber connector type with its characteristic description.",
      terms: ["LC", "SC", "ST", "FC", "MTRJ"],
      pairs: [
        { definition: "A push-pull latching mechanism, often used in data centers.", answer: "LC" },
        { definition: "A push-pull latching mechanism, often used in telecommunications networks.", answer: "SC" },
        { definition: "A bayonet-style latching mechanism.", answer: "ST" },
        { definition: "A screw-on connection.", answer: "FC" },
        { definition: "Combines two fibers into a single connector.", answer: "MTRJ" }
      ],
      explanation: [
        "LC connectors have a push-pull latching mechanism and are often used in data centers.",
        "SC connectors have a push-pull latching mechanism and are often found in telecommunications networks.",
        "ST connectors have a bayonet-style latching mechanism.",
        "FC connectors have a screw-on mechanism.",
        "MTRJ connectors combine two fibers in a single connector."
      ]
    },
    // 18
    {
      type: "dropdown",
      prompt: "Using the dropdown lists, answer each question regarding unlicensed wireless networks.",
      items: [
        {
          label: "Which frequency has three non-overlapping channels for transmission in the United States?",
          options: ["2.4 GHz", "5 GHz", "6 GHz"],
          answer: "2.4 GHz"
        },
        {
          label: "Which frequency supports the 802.11a, ac, ax, and n standards?",
          options: ["2.4 GHz", "5 GHz", "6 GHz"],
          answer: "5 GHz"
        },
        {
          label: "Which frequency transmits data at the fastest speeds, but over the shortest distances compared to the other frequencies?",
          options: ["2.4 GHz", "5 GHz", "6 GHz"],
          answer: "6 GHz"
        }
      ],
      explanation: [
        "The 2.4 GHz spectrum supports three non-overlapping channels in the United States (1, 6, and 11).",
        "The 5 GHz spectrum supports the 802.11a, n, ac, and ax.",
        "The 6 GHz spectrum transmits data at higher speeds than that of the 2.4 and 5 GHz spectrums, but at shorter distances than those spectrums."
      ]
    },
    // 19
    {
      type: "single",
      prompt: "A smart thermostat, a smart refrigerator, and the ability to turn lights on remotely using a smartphone app are examples of which types of endpoint devices?",
      options: ["SCADA", "Mobile", "ICS", "IoT"],
      answer: 3,
      explanation: [
        "Internet of Things (IoT) devices are devices that can be remotely controlled through an app, often an app on a smartphone.",
        "Industrial Control Systems (ICS) devices are manufacturing devices that make materials.",
        "Mobile devices control IoT devices, not the other way around.",
        "Supervisory Control and Data Acquisition (SCADA) systems gather and analyze real-time data to monitor and control equipment."
      ]
    },
    // 20
    {
      type: "single",
      prompt: "What kinds of signals do IP phones use for communication over a network?",
      options: ["Digital", "Licensed wireless", "Unlicensed wireless", "Analog"],
      answer: 0,
      explanation: [
        "IP phones use Voice over IP (VoIP), which is a digital means of sending voice signals over a network.",
        "Traditional phones use analog signals to transmit voice signals from a source to a destination.",
        "Cellular phones use licensed wireless networks to transmit voice signals from a source to destination.",
        "Cordless analog phones use unlicensed wireless networks to transmit voice signals from a source to a destination."
      ]
    },
    // 21  (answer choices for the distractors were not visible in the source PDF; edit as needed)
    {
      type: "dropdown",
      prompt: "Using the dropdown lists, answer each question regarding network connectivity on multiple operating systems.",
      items: [
        {
          label: "Which command-line tool shows open and listening ports on a Windows device?",
          options: ["ping", "netstat", "tracert"],
          answer: "netstat"
        },
        {
          label: "On a Linux device, which command shows a list of wireless network adapters one can use to initiate connecting to a wireless network?",
          options: ["ipconfig", "nslookup", "iwconfig"],
          answer: "iwconfig"
        },
        {
          label: "Which command-line tool is used to run network commands in macOS?",
          options: ["Command Prompt", "Terminal", "PowerShell"],
          answer: "Terminal"
        },
        {
          label: "A mobile device user is claiming that no Bluetooth connections are available from said mobile device. What should a support technician do first to troubleshoot the issue?",
          options: ["Factory reset the device", "Update the operating system", "Make sure Bluetooth is on"],
          answer: "Make sure Bluetooth is on"
        }
      ],
      explanation: [
        "netstat is the command used to show open and listening ports on a Windows device.",
        "iwconfig is the command used to show a list of wireless network adapters on a Linux device.",
        "Terminal is the command-line tool used to run network commands within macOS.",
        "The first step in troubleshooting a network connection on an Android or iOS device is to make sure the networking feature wanted is turned on."
      ]
    },
    // 22
    {
      type: "multi",
      pick: 2,
      prompt: "A support technician has been tasked with building a small topology for a company network. What is included in a small topology? (Choose two)",
      options: ["Load Balancer", "Routers", "Switches", "Server Rack"],
      answer: [1, 2],
      explanation: [
        "Small topologies should be easy to read. Therefore, only major devices, such as servers, switches, and routers are often included in small topologies.",
        "Load Balancers and Server Racks are typically not included in small topologies."
      ]
    },
    // 23
    {
      type: "single",
      prompt: "A network administrator cannot remotely reach a Cisco router using a laptop and a terminal emulator. Which port type on the back of the router should the administrator use to connect directly?",
      options: ["Console", "Ethernet", "PoE", "Serial"],
      answer: 0,
      explanation: [
        "A console port allows for a direct connection between a device, such as a laptop or desktop, and a Cisco device, such as a router or switch.",
        "Serial ports allow for one to use serial cables to connect devices such as one router to another.",
        "An Ethernet port does not always allow for one to use a terminal emulator to connect to a device.",
        "Power over Ethernet (PoE) provides power, but not a terminal-based connection to a device."
      ]
    },
    // 24
    {
      type: "single",
      prompt: "A network administrator is trying to best utilize the Ethernet ports on a switch to provide the highest speeds to devices that need it the most. What is the top speed for a Fast Ethernet port on a Cisco switch?",
      options: ["10 Mbps", "100 Mbps", "1 Gbps", "10 Gbps"],
      answer: 1,
      explanation: [
        "A Fast Ethernet port on a Cisco switch has a top speed of 100 Mbps.",
        "Gigabit Ethernet ports have top speeds of 1 Gbps."
      ]
    },
    // 25
    {
      type: "single",
      prompt: "How can a Cisco switch provide power to a CCTV camera, when the camera has close access to the switch but not to a wall outlet?",
      options: ["SFP", "Serial", "PoE", "Console"],
      answer: 2,
      explanation: [
        "Power over Ethernet (PoE) uses a network cable to provide power to a device without the device needing to be plugged into a wall outlet.",
        "A serial port connects like devices that support serial connections.",
        "A console port enables a direct connection to a device via a terminal emulator.",
        "A small form factor pluggable (SFP) provides extra ports to a switch or router."
      ]
    },
    // 26
    {
      type: "dropdown",
      prompt: "For each situation regarding networks, select whether it is local or remote.",
      items: [
        { label: "A LAN in an office.", options: ["Local", "Remote"], answer: "Local" },
        { label: "A WAN covering offices in multiple cities.", options: ["Remote", "Local"], answer: "Remote" },
        { label: "A VPN connection from a home office to a corporate headquarters.", options: ["Remote", "Local"], answer: "Remote" }
      ],
      explanation: [
        "A Local Area Network (LAN) is a local network.",
        "A VPN network is a remote network as a VPN connects entities from two different networks.",
        "A Wide Area Network (WAN) is a remote network as it has multiple locations."
      ]
    },
    // 27
    {
      type: "single",
      prompt: "Which troubleshooting scenario demonstrates prioritization of help desk tickets?",
      options: [
        "Ensuring that a ticket is documented completely.",
        "Assigning a turnaround time for most tickets.",
        "Setting rules on when tickets should be escalated.",
        "Reaching an agent via cell phone when a problem is critical to network operations."
      ],
      answer: 3,
      explanation: [
        "Prioritization of help desk tickets involves assigning them priorities such as high, normal, or low and then taking action based on priority level.",
        "Prioritization does not involve policy making such as turnaround time for tickets, escalating tickets, or the manner in which a ticket is documented."
      ]
    },
    // 28
    {
      type: "single",
      prompt: "A support technician is examining the following output. Which command was run?",
      code: "Reply from 72.163.4.185: bytes=32 time=46ms TTL=239\nReply from 72.163.4.185: bytes=32 time=34ms TTL=239\nReply from 72.163.4.185: bytes=32 time=33ms TTL=239\nReply from 72.163.4.185: bytes=32 time=35ms TTL=239",
      options: ["ipconfig", "ping", "nslookup", "tracert"],
      answer: 1,
      explanation: [
        "The ping command was run to generate this output, as ping is the command used to test connectivity to a destination.",
        "The tracert command, in Windows, shows the hops a data packet takes from a source to a destination.",
        "The nslookup command shows DNS server information for a given domain.",
        "The ipconfig command shows IP address information for a device."
      ]
    },
    // 29
    {
      type: "single",
      prompt: "A network administrator needs the IP address for a DNS server. What command should be run?",
      options: ["ipconfig", "ping", "nslookup", "ipconfig /all"],
      answer: 2,
      explanation: [
        "The nslookup command returns DNS server information for a domain, when that information is available.",
        "Ping returns ICMP packets from an IP address, not its DNS server information.",
        "ipconfig /all returns DNS server information for the IP address of the device on which the ipconfig command is run.",
        "ipconfig does not, by itself, return any DNS server information."
      ]
    },
    // 30
    {
      type: "single",
      prompt: "Which protocol is used natively on a Windows device to access and control another Windows device?",
      options: ["VNC", "SSH", "RDP", "Telnet"],
      answer: 2,
      explanation: [
        "Remote Desktop Protocol (RDP) is natively available on a Windows device to access and control another Windows device.",
        "Virtual Network Computing (VNC) can be used to access a Windows device but is not natively available on a Windows device.",
        "Secure Shell (SSH) is often used to connect to a Linux device.",
        "Telnet does not make GUI-based connections to other Windows devices."
      ]
    },
    // 31
    {
      type: "dropdown",
      prompt: "Using the dropdown lists, answer each question as it relates to wireless authentication.",
      items: [
        {
          label: "Which wireless security protocol uses SAE to provide stronger password attack protection versus other wireless security protocols?",
          options: ["WPA", "WPA2", "WPA3"],
          answer: "WPA3"
        },
        {
          label: "Which type of wireless network uses a RADIUS server for authentication?",
          options: ["Enterprise", "Personal"],
          answer: "Enterprise"
        }
      ],
      explanation: [
        "WPA3 uses Simultaneous Authentication of Equals (SAE) to provide strong protection against password-based network attacks.",
        "A Remote Authentication Dial-In User Service (RADIUS) server is used as a central authentication server for an enterprise wireless network."
      ]
    },
    // 32
    {
      type: "single",
      prompt: "A support technician needs to connect directly to a Cisco router to examine its configuration and then connect to the same router remotely. What type of app will the technician need to perform these tasks?",
      options: ["Console", "Terminal emulator", "Remote desktop", "Telnet"],
      answer: 1,
      explanation: [
        "A terminal emulator is an app that allows one to connect directly or remotely to a device, such as a Cisco switch or router.",
        "A console connection, in this context, is a connection through a console port, not an app.",
        "A remote desktop connection connects to devices such as PCs, not switches or routers.",
        "Telnet is a protocol, not an app, used to connect to devices."
      ]
    },
    // 33
    {
      type: "single",
      prompt: "Through a packet analyzer, a support technician notices an inordinate amount of ICMP requests to devices on a network. Which type of attack is likely taking place?",
      options: ["Trojan Horse", "DoS attack", "Worm", "Virus"],
      answer: 1,
      explanation: [
        "In a Denial of Service (DoS) attack, a network is flooded with useless packets, like ICMP packets, with the goal of bringing down the network.",
        "Viruses and worms cause damage to a system, but not necessarily through flooding a network with packets.",
        "A Trojan Horse is an imposter program masquerading as a legitimate program."
      ]
    },
    // 34
    {
      type: "single",
      prompt: "A network administrator is looking for a way to manage on-premises network devices remotely. Which Cisco tool is used to manage on-premises devices through the cloud?",
      options: ["SNMP", "Packet Tracer", "Meraki", "Nmap"],
      answer: 2,
      explanation: [
        "Meraki is the Cisco-based network management tool that allows one to manage on-premises network devices through the cloud.",
        "Simple Network Management Protocol (SNMP) is a network management protocol, not a tool.",
        "Packet Tracer is a Cisco-based network device simulation tool.",
        "Nmap is used to get information on network devices, but it is not a Cisco-based tool."
      ]
    },
    // 35
    {
      type: "single",
      prompt: "An employee opens an email inbox to find many messages with unwanted advertisements for new products, some real and some not. What type of attack has been carried out?",
      options: ["Phishing", "Spim", "Adware", "Spam"],
      answer: 3,
      explanation: [
        "Spam is the label used for unwanted, advertisement-based email messages in one’s inbox.",
        "Spim is a version of spam, but carried out through instant messaging instead of email.",
        "Phishing is the blatant attempt to coerce someone into disclosing personal information through email.",
        "Adware is malware that appears on a person’s device, but usually through web browsers, not email."
      ]
    },
    // 36
    {
      type: "single",
      prompt: "A support technician wants to view the devices and their types (switch, router, etc.) that are connected to a Cisco router. Which command should be run?",
      options: ["show cdp neighbors", "show interface", "show ip route", "show ip interface brief"],
      answer: 0,
      explanation: [
        "The show cdp neighbors command shows the devices connected to a Cisco router and their types, such as switch or router.",
        "show ip route shows a routing table that shows routes for a router.",
        "show ip interface brief shows IP address information for each interface on a router but not the type of device connected to each router.",
        "show interface shows detailed information for each router interface but not the device connected to the interface."
      ]
    },
    // 37
    {
      type: "single",
      prompt: "A support technician is evaluating the following output from a Cisco switch. What command was run?",
      code: "Vlan Mac Address Type Ports\n---- ----------- -------- -----\n1 0060.5c6d.b74d DYNAMIC Fa0/3\n1 0090.0c35.a839 DYNAMIC Fa0/2",
      options: ["show ip route", "show version", "show mac address-table", "show ip interface brief"],
      answer: 2,
      explanation: [
        "The show mac address-table command shows devices connected to a switch and their MAC addresses.",
        "show ip route shows routing table information for a router.",
        "show version shows the IOS version information for a device.",
        "show ip interface brief shows interface information such as the IP address assigned to each interface."
      ]
    },
    // 38
    {
      type: "single",
      prompt: "Evaluate the following output. Which command was run?",
      code: "Port Name Status Vlan Duplex Speed Type\nFa0/1 connected 1 auto auto 10/100BaseTX\nFa0/2 connected 1 auto auto 10/100BaseTX\nFa0/3 connected 1 auto auto 10/100BaseTX\nFa0/4 notconnect 1 auto auto 10/100BaseTX\nFa0/5 notconnect 1 auto auto 10/100BaseTX\nFa0/6 notconnect 1 auto auto 10/100BaseTX",
      options: ["show interface", "show ip interface brief", "show ip route", "show interface status"],
      answer: 3,
      explanation: [
        "The show interface status command shows each interface on a switch, its status, the VLAN each interface is on, and speed and duplex settings for each interface.",
        "show interface shows detailed information for each interface on a switch or router.",
        "show ip interface brief shows IP address information for each interface on a device.",
        "show ip route shows a routing table, which shows information for each route on a router."
      ]
    },
    // 39
    {
      type: "multi",
      pick: 2,
      prompt: "What do firewalls use as a basis for filtering both inbound and outbound traffic for a device or network? (Choose two)",
      options: ["MAC address", "protocol", "IP address", "port"],
      answer: [1, 3],
      explanation: [
        "Firewalls use ports and protocols as a basis for filtering both inbound and outbound traffic for a device or network.",
        "Firewalls do not use IP or MAC addresses as a primary means of filtering inbound and outbound traffic for a device or network. Those filters are found primarily on an allow list or block list."
      ]
    },
    // 40
    {
      type: "single",
      prompt: "What can a network administrator do with data to fulfill the “A” part of the CIA triangle?",
      options: [
        "Controlling permissions on data.",
        "Replicating data across multiple servers as it is written to a server.",
        "Ensuring that data is the same from a source to a destination.",
        "Encrypting data."
      ],
      answer: 1,
      explanation: [
        "The “A” part of the CIA triangle (Confidentiality, Integrity, Availability) is Availability, which, in this context, means making data as highly available as possible when data is needed.",
        "Replicating data across multiple servers as it is written to a server helps ensure availability for data.",
        "Controlling permissions on data and encrypting data falls under the Confidentiality side of the CIA triangle.",
        "Ensuring that data is the same from a source to a destination falls under the Integrity side of the CIA triangle."
      ]
    },
    // 41
    {
      type: "single",
      prompt: "A support technician has been tasked with configuring multifactor authentication. Which combination of authentication mechanisms will fulfill the requirement?",
      options: [
        "Username and one-time code",
        "Face and fingerprint readers",
        "Smart card and one-time code",
        "Username and password"
      ],
      answer: 0,
      explanation: [
        "Authentication comes in three main factors: what you know, what you have, and who you are.",
        "What you know includes a username and password.",
        "What you have includes a one-time code, a smart card, or a badge.",
        "Who you are includes biometrics, such as facial recognition, a retina scanner and fingerprint reader.",
        "Thus, a username and a one-time code qualifies as multifactor authentication.",
        "A username and password, a face and fingerprint read, and a smart card and a one-time code do not qualify as multifactor authentication."
      ]
    },
    // 42
    {
      type: "multi",
      pick: 2,
      prompt: "A research organization is updating its password policy and wants to ensure that it enforces a complex password requirement. What factors go into making a password complex? (Choose two)",
      options: [
        "Length of a password.",
        "Locking an account after a specified number of incorrect password attempts.",
        "The use of a one-time code as part of a password.",
        "The number of types of characters used."
      ],
      answer: [0, 3],
      explanation: [
        "The length of a password, the different numbers of types of characters a password has (uppercase letters, lowercase letters, numbers, and symbols), and the avoidance of dictionary words all contribute to a password policy.",
        "Locking out an account after a number of incorrect attempts at a password and the time of that lockout are account lockout policy factors, not password policy factors.",
        "The use of a one-time passcode along with a password is a form of multifactor authentication and is not related to password policies."
      ]
    }
  ]
};
