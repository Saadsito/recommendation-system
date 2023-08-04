const technologies = [
  "Java",
  "Python",
  "JavaScript",
  "C#",
  "C++",
  "Ruby",
  "PHP",
  "Swift",
  "Kotlin",
  "TypeScript",
  "HTML/CSS",
  "React.js",
  "Angular",
  "Vue.js",
  "Node.js",
  "Django",
  "Spring Boot",
  "Express.js",
  "Laravel",
  "Ruby on Rails",
  "ASP.NET",
  "Unity",
  "TensorFlow",
  "PyTorch",
  "OpenCV",
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "SQLite",
  "Firebase",
  "AWS",
  "Azure",
  "Google Cloud",
  "Docker",
  "Kubernetes",
  "Git",
  "Jenkins",
  "CI/CD",
  "GraphQL",
  "RESTful API",
  "Blockchain",
  "IoT",
  "Big Data",
  "Machine Learning",
  "Inteligencia Artificial",
  "Realidad Virtual",
  "Realidad Aumentada",
  "Ciberseguridad",
  "Desarrollo de Juegos",
  "Desarrollo Móvil",
  "Desarrollo Web",
  "Diseño UI/UX",
  "Pruebas/Control de Calidad",
  "DevOps",
  "Serverless",
  "Microservicios",
  "Ciencia de Datos",
  "Robótica",
  "Procesamiento del Lenguaje Natural",
  "Visión por Computadora",
  "Computación en la Nube",
  "Desarrollo Front-end",
  "Desarrollo Back-end",
  "Desarrollo Full-stack",
  "Desarrollo de Aplicaciones Móviles",
  "Desarrollo de Aplicaciones Web",
  "Desarrollo de Aplicaciones de Escritorio",
  "Sistemas Embebidos",
  "Sistemas Operativos",
  "Gestión de Bases de Datos",
  "Administración de Redes",
  "Seguridad del Sistema",
  "Algoritmos",
  "Estructuras de Datos",
  "Arquitectura de Software",
  "Pruebas de Software",
  "Metodologías Ágiles",
  "Gestión de Proyectos",
  "Herramientas de Diseño UI/UX",
  "Visualización de Datos",
  "Plataformas de E-commerce",
  "Sistemas de Gestión de Contenidos",
  "Sistemas ERP/CRM",
  "Software Empresarial",
  "Infraestructura de TI",
  "Operaciones de TI",
  "Inteligencia de Negocios",
  "Data Warehousing",
  "Integración de Datos",
  "Automatización de Procesos de Negocios",
  "Gestión de Servicios de TI",
  "Gobernanza de TI",
  "Estrategia de TI",
  "Redacción Técnica",
  "Soporte Técnico",
  "Seguridad en la Nube",
  "Seguridad de Redes",
  "Pruebas de Penetración",
  "Hacking Ético",
  "Forense Digital",
  "Redes Inalámbricas",
  "Protocolos de Red",
  "Seguridad Móvil",
  "Seguridad de Aplicaciones Web",
  "Seguridad de Bases de Datos",
  "Programación Segura",
  "Desarrollo de Software Seguro",
  "SDLC Seguro",
  "Protección de la Privacidad",
  "Criptomonedas",
  "Aplicaciones Descentralizadas (DApps)",
  "Contratos Inteligentes",
  "Solidity",
  "Web3.js",
  "Ethereum",
  "Escalabilidad de Blockchain",
  "Interoperabilidad de Blockchain",
  "Gobernanza de Blockchain",
  "Privacidad de Blockchain",
  "Auditoría de Blockchain",
  "Consultoría de Blockchain",
  "Integración de Blockchain",
  "Soluciones de Blockchain",
  "Desarrollo de Blockchain",
  "Computación Cuántica",
  "Algoritmos Cuánticos",
  "Criptografía Cuántica",
  "Aprendizaje Automático Cuántico",
  "Simulación Cuántica",
  "Recocido Cuántico",
  "Corrección de Errores Cuánticos",
  "Sensado Cuántico",
  "Redes Cuánticas",
  "Internet Cuántico",
  "Comunicaciones Cuánticas",
  "Metrología Cuántica",
  "Herramientas de Computación Cuántica",
  "Lenguajes de Programación Cuántica",
  "Desarrollo de Software Cuántico",
  "Servicios en la Nube Cuántica",
  "Seguridad Cuántica",
  "C",
  "Rust",
  "Go",
  "Scala",
  "Haskell",
  "Lua",
  "Perl",
  "R",
  "Objective-C",
  "Shell",
  "Bash",
  "PowerShell",
  "MATLAB",
  "Fortran",
  "COBOL",
  "Scheme",
  "Ada",
  "Pascal",
  "Delphi",
  "VB.NET",
  "Groovy",
  "Clojure",
  "F#",
  "Elixir",
  "Rust",
  "Go",
  "Scala",
  "Haskell",
  "Lua",
  "Perl",
  "R",
  "Objective-C",
  "Shell",
  "Bash",
  "PowerShell",
  "MATLAB",
  "Fortran",
  "COBOL",
  "Scheme",
  "Ada",
  "Pascal",
  "Delphi",
  "VB.NET",
  "Groovy",
  "Clojure",
  "F#",
  "Elixir",
  "Dart",
  "Blazor",
  "Svelte",
  "Gatsby",
  "Next.js",
  "Nuxt.js",
  "Electron",
  "Flask",
  "Symfony",
  "CodeIgniter",
  "Zend",
  "CakePHP",
  "Slim",
  "Grails",
  "Quarkus",
  "Micronaut",
  "Seam",
  "Wicket",
  "Struts",
  "JSF",
  "Play Framework",
  "Quasar",
  "Ionic",
  "Flutter",
  "Xamarin",
  "Apache Cordova",
  "PhoneGap",
  "Sencha Touch",
  "jQuery Mobile",
  "NativeScript",
  "React Native",
  "NativeScript",
  "Unity",
  "Unreal Engine",
  "Godot",
  "Blender",
  "AutoCAD",
  "SolidWorks",
  "SketchUp",
  "Revit",
  "Maya",
  "3ds Max",
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Adobe XD",
  "Figma",
  "InVision",
  "Zeplin",
  "Sketch",
  "Principle",
  "Abstract",
  "Zeplin",
  "JIRA",
  "Trello",
  "Asana",
  "Basecamp",
  "Microsoft Project",
  "ClickUp",
  "Monday.com",
  "Slack",
  "Microsoft Teams",
  "Google Meet",
  "Zoom",
  "WebEx",
  "Skype",
  "Discord",
  "Salesforce",
  "SAP",
  "Oracle",
  "Microsoft Dynamics",
  "SugarCRM",
  "HubSpot",
  "Zoho CRM",
  "Magento",
  "WooCommerce",
  "Shopify",
  "BigCommerce",
  "WordPress",
  "Drupal",
  "Joomla",
  "Kentico",
  "Umbraco",
  "Sitecore",
  "OpenCart",
  "PrestaShop",
  "Salesforce Commerce Cloud",
  "ERP",
  "SAP ERP",
  "Oracle ERP",
  "Microsoft Dynamics 365",
  "NetSuite",
  "Sage",
  "QuickBooks",
  "Workday",
  "Odoo",
  "OpenERP",
  "Microsoft SharePoint",
  "Documentum",
  "Alfresco",
  "Google Workspace",
  "Office 365",
  "G Suite",
  "Amazon WorkSpaces",
  "Citrix Virtual Apps and Desktops",
  "VMware Horizon",
  "Windows Server",
  "Linux",
  "Unix",
  "Android",
  "iOS",
  "Windows",
  "macOS",
  "Linux",
  "Windows Server",
  "Ubuntu",
  "Red Hat Enterprise Linux",
  "CentOS",
  "Debian",
  "Fedora",
  "SUSE",
  "Arch Linux",
  "Gentoo",
  "Slackware",
  "FreeBSD",
  "OpenBSD",
  "NetBSD",
  "Windows Server",
  "macOS Server",
  "IBM AIX",
  "HP-UX",
  "Solaris",
  "Cisco",
  "Juniper",
  "Palo Alto Networks",
  "Fortinet",
  "Check Point",
  "F5 Networks",
  "Citrix NetScaler",
  "Wireshark",
  "Nmap",
  "Metasploit",
  "Burp Suite",
  "Kali Linux",
  "OWASP Zap",
  "Nessus",
  "Acunetix",
  "Snort",
  "Suricata",
  "Splunk",
  "ELK Stack",
  "OSSEC",
  "Symantec",
  "McAfee",
  "Trend Micro",
  "Qualys",
  "Rapid7",
  "CrowdStrike",
  "ForeScout",
  "Palo Alto Networks",
  "Carbon Black",
  "FireEye",
  "Secureworks",
  "IBM QRadar",
  "HP ArcSight",
  "RSA NetWitness",
  "CISCO AMP",
  "Cisco Firepower",
  "F5 Networks",
  "Amazon Web Services (AWS)",
  "Microsoft Azure",
  "Google Cloud Platform (GCP)",
  "IBM Cloud",
  "Oracle Cloud",
  "VMware Cloud",
  "Docker",
  "Kubernetes",
  "Serverless",
  "Terraform",
  "Ansible",
  "Puppet",
  "Chef",
  "Jenkins",
  "CircleCI",
  "Travis CI",
  "GitLab CI/CD",
  "GitHub Actions",
  "SonarQube",
  "Nexus",
  "Artifactory",
  "Grafana",
  "Prometheus",
  "ELK Stack",
  "Kibana",
  "Datadog",
  "New Relic",
  "Selenium",
  "Cypress",
  "JUnit",
  "TestNG",
  "Cucumber",
  "Jest",
  "Pytest",
  "Robot Framework",
  "SoapUI",
  "Postman",
  "LoadRunner",
  "JMeter",
  "BlazeMeter",
  "Gatling",
  "Appium",
  "XCUITest",
  "Espresso",
  "Detox",
  "Cypress",
  "JUnit",
  "TestNG",
  "Cucumber",
  "Jest",
  "Pytest",
  "Robot Framework",
  "SoapUI",
  "Postman",
  "LoadRunner",
  "JMeter",
  "BlazeMeter",
  "Gatling",
  "Appium",
  "XCUITest",
  "Espresso",
  "Detox",
  "Pandas",
  "NumPy",
  "Matplotlib",
  "SciPy",
  "Scikit-learn",
  "TensorFlow",
  "PyTorch",
  "Keras",
  "NLTK",
  "SpaCy",
  "Gensim",
  "Apache Kafka",
  "Apache Spark",
  "Hadoop",
  "Hive",
  "Pig",
  "Cassandra",
  "HBase",
  "Elasticsearch",
  "Neo4j",
  "Redis",
  "Apache ZooKeeper",
  "Airflow",
  "Tableau",
  "Power BI",
  "QlikView",
  "D3.js",
  "Plotly",
  "Apache Superset",
  "Google Analytics",
  "Adobe Analytics",
  "Mixpanel",
  "Amplitude",
  "Salesforce Analytics",
  "Sisense",
  "Looker",
  "Microsoft Power Platform",
  "PowerApps",
  "Power Automate",
  "Power Virtual Agents",
  "Microsoft Power BI",
  "MicroStrategy",
  "SAP BusinessObjects",
  "IBM Cognos",
  "Qlik Sense",
  "Oracle BI",
  "Splunk",
  "Snowflake",
  "Google BigQuery",
  "Amazon Redshift",
  "Microsoft Azure Synapse Analytics",
  "Teradata",
  "Informatica",
  "Talend",
  "Apache NiFi",
  "Apache Kafka",
  "Apache Storm",
  "IBM InfoSphere DataStage",
  "SAP Data Services",
  "Microsoft SQL Server Integration Services (SSIS)",
  "Oracle Data Integrator (ODI)",
  "Pentaho",
  "Apache Beam",
  "RapidMiner",
  "Alteryx",
  "UiPath",
  "Blue Prism",
  "Automation Anywhere",
  "WinAutomation",
  "ServiceNow",
  "BMC Helix",
  "Cherwell",
  "Ivanti",
  "Freshservice",
  "SolarWinds Service Desk",
  "Zendesk",
  "Jira Service Management",
  "Samanage",
  "Axios",
  "Postman",
  "Insomnia",
  "cURL",
  "Fetch API",
  "Swagger",
  "OpenAPI",
  "OAuth",
  "JWT",
  "Passport.js",
  "Auth0",
  "Firebase Authentication",
  "Okta",
  "OneLogin",
  "Ping Identity",
  "Keycloak",
  "Spring Security",
  "AWS Cognito",
  "Azure Active Directory",
  "Google Identity Platform",
  "Okta",
  "NGINX",
  "Apache",
  "IIS",
  "HAProxy",
  "Load Balancer",
  "CDN",
  "WordPress",
  "Joomla",
  "Drupal",
  "Magento",
  "Shopify",
  "WooCommerce",
  "PrestaShop",
  "OpenCart",
  "Salesforce Commerce Cloud",
  "BigCommerce",
  "Squarespace",
  "Wix",
  "Adobe Experience Manager",
  "Sitecore",
  "Contentful",
  "Kentico",
  "Umbraco",
  "Liferay",
  "Episerver",
  "HubSpot CMS",
  "Netlify",
  "Vercel",
  "GitHub Pages",
  "Azure Static Web Apps",
  "AWS Amplify",
  "Google Cloud App Engine",
  "Netlify",
  "Vercel",
  "GitHub Pages",
  "Azure Static Web Apps",
  "AWS Amplify",
  "Google Cloud App Engine",
  "Windows Forms",
  "WPF",
  "JavaFX",
  "GTK",
  "Qt",
  "Swing",
  "Electron",
  "React Native",
  "Flutter",
  "Xamarin",
  "Apache Cordova",
  "PhoneGap",
  "Ionic",
  "Sencha Touch",
  "jQuery Mobile",
  "NativeScript",
  "Appcelerator Titanium",
  "Unity",
  "Unreal Engine",
  "Godot",
  "Blender",
  "AutoCAD",
  "SolidWorks",
  "SketchUp",
  "Revit",
  "Maya",
  "3ds Max",
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Adobe XD",
  "Figma",
  "InVision",
  "Zeplin",
  "Sketch",
  "Principle",
  "Abstract",
  "Zeplin",
  "JIRA",
  "Trello",
  "Asana",
  "Basecamp",
  "Microsoft Project",
  "ClickUp",
  "Monday.com",
  "Slack",
  "Microsoft Teams",
  "Google Meet",
  "Zoom",
  "WebEx",
  "Skype",
  "Discord",
  "Salesforce",
  "SAP",
  "Oracle",
  "Microsoft Dynamics",
  "SugarCRM",
  "HubSpot",
  "Zoho CRM",
  "Magento",
  "WooCommerce",
  "Shopify",
  "BigCommerce",
  "WordPress",
  "Drupal",
  "Joomla",
  "Kentico",
  "Umbraco",
  "Sitecore",
  "OpenCart",
  "PrestaShop",
  "Salesforce Commerce Cloud",
  "ERP",
  "SAP ERP",
  "Oracle ERP",
  "Microsoft Dynamics 365",
  "NetSuite",
  "Sage",
  "QuickBooks",
  "Workday",
  "Odoo",
  "OpenERP",
  "Microsoft SharePoint",
  "Documentum",
  "Alfresco",
  "Google Workspace",
  "Office 365",
  "G Suite",
  "Amazon WorkSpaces",
  "Citrix Virtual Apps and Desktops",
  "VMware Horizon",
  "Windows Server",
  "Linux",
  "Unix",
  "Android",
  "iOS",
  "Windows",
  "macOS",
  "Linux",
  "Windows Server",
  "Ubuntu",
  "Red Hat Enterprise Linux",
  "CentOS",
  "Debian",
  "Fedora",
  "SUSE",
  "Arch Linux",
  "Gentoo",
  "Slackware",
  "FreeBSD",
  "OpenBSD",
  "NetBSD",
  "Windows Server",
  "macOS Server",
  "IBM AIX",
  "HP-UX",
  "Solaris",
  "Cisco",
  "Juniper",
  "Palo Alto Networks",
  "Fortinet",
  "Check Point",
  "F5 Networks",
  "Citrix NetScaler",
  "Wireshark",
];

const uniqueTechnologies = [...new Set(technologies)];

export default uniqueTechnologies;
