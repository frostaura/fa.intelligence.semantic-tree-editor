import { FaBug, FaBullhorn, FaCalendarAlt, FaChartBar, FaChartLine, FaChartPie, FaClipboardList, FaCloudUploadAlt, FaCode, FaCog, FaCogs, FaComments, FaDatabase, FaFileAlt, FaGlobe, FaHandshake, FaLaptopCode, FaLightbulb, FaMagic, FaPencilRuler, FaRedo, FaRegClock, FaRegGem, FaRocket, FaSearch, FaSeedling, FaServer, FaStop, FaTicketAlt, FaTools, FaUserCheck, FaUsers, FaVial } from "react-icons/fa"
import { Languages } from "./enums/semantic/Languages"
import { Status } from "./enums/Status"
import { Views } from "./enums/Views"
import { IState } from "./interfaces/state/IState"
import { PopulateTreeContext } from "./services/engines/StepEngine"
import { FaFileLines } from "react-icons/fa6"
import { MdArchitecture } from "react-icons/md"
import { GiGrowth } from "react-icons/gi"
import { marketResearchData } from "./testdata/marketResearch"
import { designDocumenationData } from "./testdata/designDocumentation"
import { designArchitectureData } from "./testdata/designArchitecture"

/**
 * The initial state configuration for the global state.
 * 
 * This should ideally be inferred from appsettings.json.
 */

export const InitialState: IState = {
    activeView: Views.Landing,
    activeUser: {
        email: "dean.martin@derivco.co.za",
        firstName: "Dean",
        lastName: "Martin"
    },
    projects: [
        {
            id: 1,
            title: "Crypto Lottery",
            description: "a TON-based crypto lottery with a ReactJS frontend, a .NET Core backend, and a TACT smart contract that allows for entering with a TON conencted wallet and pays out weekly.",
            timestamp: new Date(2024, 11, 20),
            creator: {
                email: "jane.doe@derivco.co.za",
                firstName: "Jane",
                lastName: "Doe"
            },
            process: PopulateTreeContext({
                key: "cryptoLottery",
                role: "Crypto Lottery",
                status: Status.New,
                steps: [
                    {
                        key: "productDiscovery",
                        role: "Product Discovery",
                        status: Status.New,
                        outputType: Languages.Markdown,
                        steps: [
                            {
                                key: "introduction",
                                role: "Introduction",
                                status: Status.New,
                                steps: [
                                    {
                                        key: "projectOverview",
                                        role: "Brief of Overview of your Product, Business or initiative",
                                        status: Status.New,
                                        steps: [],
                                        output: "Working!!!"
                                    },
                                    {
                                        key: "landscapeOverview",
                                        role: "Overview of the current landscape",
                                        status: Status.New,
                                        steps: []
                                    },
                                    {
                                        key: "proposal",
                                        role: "Explanation of what you are proposing to do",
                                        status: Status.New,
                                        steps: []
                                    }
                                ]
                            },
                            {
                                key: "problemStatement",
                                role: "Problem Statement/s - (JTBD)",
                                status: Status.New,
                                steps: [
                                    {
                                        key: "problemStatement",
                                        role: "Detailed Description of the Problem/s you are aiming to solve specifically within your space",
                                        status: Status.New,
                                        steps: []
                                    },
                                    {
                                        key: "userResearch",
                                        role: "Focus on key Customer/User problems or Jobs To Be Done",
                                        status: Status.New,
                                        steps: []
                                    }
                                ]
                            },
                            {
                                key: "solution",
                                role: "Solution",
                                status: Status.New,
                                steps: [
                                    {
                                        key: "solutionExplanation",
                                        role: "Explanation of how you will be attempting to solve the problem/s",
                                        status: Status.New,
                                        steps: []
                                    },
                                    {
                                        key: "technologyLeverage",
                                        role: "Highlighting how your approach will leverage technology and or services to do so",
                                        status: Status.New,
                                        steps: []
                                    },
                                    {
                                        key: "oneMinutePitch",
                                        role: "Use - The One Minute Pitch",
                                        status: Status.New,
                                        steps: []
                                    }
                                ]
                            },
                            {
                                key: "businessModel",
                                role: "Business Model - (How we make money)",
                                status: Status.New,
                                steps: [
                                    {
                                        key: "businessModelOverview",
                                        role: "The business model provides a broad overview of how a company creates, delivers, and captures value. It explains the key components of the business without going into detail.",
                                        status: Status.New,
                                        steps: []
                                    },
                                    {
                                        key: "importantTasks",
                                        role: "It explains the most important tasks or actions the company must perform to operate successfully, and generate value",
                                        status: Status.New,
                                        steps: []
                                    }
                                ]
                            },
                            {
                                key: "valueProposition",
                                role: "Value Proposition (USPs)",
                                status: Status.New,
                                steps: [
                                    {
                                        key: "uniqueValueProposition",
                                        role: "Explanation of your Unique Value Proposition/s and why it is different from existing Solutions",
                                        status: Status.New,
                                        steps: []
                                    }
                                ]
                            },
                            {
                                key: "definitionOfSuccess",
                                role: "Definition of Success",
                                status: Status.New,
                                steps: [
                                    {
                                        key: "keyObjectives",
                                        role: "Overview of the Key Objectives you would like to achieve and over what period of time",
                                        status: Status.New,
                                        steps: []
                                    },
                                    {
                                        key: "successMeasurement",
                                        role: "Explanation of how the success of this initiative can be successfully measured",
                                        status: Status.New,
                                        steps: []
                                    }
                                ]
                            },
                            {
                                key: "purposeAndVision",
                                role: "Purpose and Vision",
                                status: Status.New,
                                steps: [
                                    {
                                        key: "productVision",
                                        role: "Overview of what you think the 3 - 5 year vision for this Product or initiative will be",
                                        status: Status.New,
                                        steps: []
                                    },
                                    {
                                        key: "keyReason",
                                        role: "Overview of your key reason for being and what will drive you towards your Vision i.e. t",
                                        status: Status.New,
                                        steps: []
                                    }
                                ]
                            },
                            {
                                key: "scopeOfProduct",
                                role: "Scope of Product",
                                status: Status.New,
                                steps: [
                                    {
                                        key: "productValue",
                                        role: "What value does your product offer and to who?",
                                        status: Status.New,
                                        steps: []
                                    },
                                    {
                                        key: "productType",
                                        role: "Is it an internal Product, external or both?",
                                        status: Status.New,
                                        steps: []
                                    },
                                    {
                                        key: "productDescription",
                                        role: "What is the Product? What is it Designed to do? What it does for a Customer?",
                                        status: Status.New,
                                        steps: []
                                    },
                                    {
                                        key: "productFeatures",
                                        role: "Explanation of how it works, key features and what is considered in and out of scope for MVP",
                                        status: Status.New,
                                        steps: []
                                    }
                                ]
                            },
                            {
                                key: "technicalSolution",
                                role: "Technical Solution",
                                status: Status.New,
                                steps: [
                                    {
                                        key: "architectureOverview",
                                        role: "Overview of Architecture",
                                        status: Status.New,
                                        steps: []
                                    },
                                    {
                                        key: "technologyStack",
                                        role: "Description of Technology Stack",
                                        status: Status.New,
                                        steps: []
                                    },
                                    {
                                        key: "coreTechnology",
                                        role: "Detailed description of your core technology",
                                        status: Status.New,
                                        steps: []
                                    }
                                ]
                            },
                            {
                                key: "customerTypes",
                                role: "Customer Types",
                                status: Status.New,
                                steps: [
                                    {
                                        key: "idealCustomerProfiles",
                                        role: "Breakdown of Ideal Customer Profiles",
                                        status: Status.New,
                                        steps: []
                                    },
                                    {
                                        key: "customerSegments",
                                        role: "Overview of key customer segments",
                                        status: Status.New,
                                        steps: []
                                    },
                                    {
                                        key: "customerPainPoints",
                                        role: "Overview of key customer pain points and assumptions",
                                        status: Status.New,
                                        steps: []
                                    }
                                ]
                            },
                            {
                                key: "marketAttractiveness",
                                role: "Market Attractiveness",
                                status: Status.New,
                                steps: [
                                    {
                                        key: "marketSize",
                                        role: "Overview of TAM, SAM and SOM",
                                        status: Status.New,
                                        steps: []
                                    },
                                    {
                                        key: "customerSegmentsMarket",
                                        role: "Overview of key customer segments within Market",
                                        status: Status.New,
                                        steps: []
                                    },
                                    {
                                        key: "competitiveLandscape",
                                        role: "Description of the Competitive Landscape",
                                        status: Status.New,
                                        steps: []
                                    }
                                ]
                            },
                            {
                                key: "competitorAnalysis",
                                role: "Competitor Analysis",
                                status: Status.New,
                                steps: [
                                    {
                                        key: "competitiveLandscapeOverview",
                                        role: "Overview of Competitive Landscape",
                                        status: Status.New,
                                        steps: []
                                    },
                                    {
                                        key: "directCompetitors",
                                        role: "Breakdown of Direct Competitors",
                                        status: Status.New,
                                        steps: []
                                    },
                                    {
                                        key: "indirectCompetitors",
                                        role: "Breakdown of Indirect Competitors",
                                        status: Status.New,
                                        steps: []
                                    }
                                ]
                            },
                            {
                                key: "businessRevenueModels",
                                role: "Business/Revenue Models",
                                status: Status.New,
                                steps: [
                                    {
                                        key: "revenueGeneration",
                                        role: "Explanation of how this will make money",
                                        status: Status.New,
                                        steps: []
                                    },
                                    {
                                        key: "pricingStrategy",
                                        role: "Description of the pricing strategy and revenue streams",
                                        status: Status.New,
                                        steps: []
                                    }
                                ]
                            },
                            {
                                key: "projections",
                                role: "Projections",
                                status: Status.New,
                                steps: [
                                    {
                                        key: "financialModel",
                                        role: "Breakdown of financial model over 3 - 5 years",
                                        status: Status.New,
                                        steps: []
                                    },
                                    {
                                        key: "npv",
                                        role: "NPV",
                                        status: Status.New,
                                        steps: []
                                    },
                                    {
                                        key: "irr",
                                        role: "IRR",
                                        status: Status.New,
                                        steps: []
                                    },
                                    {
                                        key: "cashPositive",
                                        role: "Cash Positive/Cost recovery month",
                                        status: Status.New,
                                        steps: []
                                    },
                                    {
                                        key: "payBackPeriod",
                                        role: "Pay Back Period",
                                        status: Status.New,
                                        steps: []
                                    },
                                    {
                                        key: "expectedROI",
                                        role: "Expected ROI %",
                                        status: Status.New,
                                        steps: []
                                    },
                                    {
                                        key: "probabilityROI",
                                        role: "Probability of ROI",
                                        status: Status.New,
                                        steps: []
                                    }
                                ]
                            },
                            {
                                key: "goToMarket",
                                role: "Go to Market",
                                status: Status.New,
                                steps: [
                                    {
                                        key: "goToMarketDescription",
                                        role: "Description of your Go to Market plans",
                                        status: Status.New,
                                        steps: []
                                    },
                                    {
                                        key: "productMarketFit",
                                        role: "Description of anticipated traction and milestones towards product market fit and growth",
                                        status: Status.New,
                                        steps: []
                                    },
                                    {
                                        key: "marketingStrategy",
                                        role: "Marketing Strategy",
                                        status: Status.New,
                                        steps: []
                                    },
                                    {
                                        key: "brandStrategy",
                                        role: "Brand Strategy",
                                        status: Status.New,
                                        steps: []
                                    },
                                    {
                                        key: "salesStrategy",
                                        role: "Sales Strategy",
                                        status: Status.New,
                                        steps: []
                                    }
                                ]
                            },
                            {
                                key: "regulatoryConsiderations",
                                role: "Regulatory Considerations",
                                status: Status.New,
                                steps: [
                                    {
                                        key: "regulatoryOverview",
                                        role: "Overview of any Regulatory Considerations and risks and ways to mitigate",
                                        status: Status.New,
                                        steps: []
                                    }
                                ]
                            },
                            {
                                key: "roadmap",
                                role: "Roadmap",
                                status: Status.New,
                                steps: [
                                    {
                                        key: "productRoadmap",
                                        role: "Clear Product Roadmap depicting what is needed in to achieve the strategy",
                                        status: Status.New,
                                        steps: []
                                    },
                                    {
                                        key: "expectedOutcomes",
                                        role: "Overview of key Outcomes to be achieved across core business pillars",
                                        status: Status.New,
                                        steps: []
                                    },
                                    {
                                        key: "milestones",
                                        role: "Overview of anticipated timings on expected milestones to be achieved quarterly across a PDLC (3 - 5 years out)",
                                        status: Status.New,
                                        steps: []
                                    }
                                ]
                            },
                            {
                                key: "team",
                                role: "Team",
                                status: Status.New,
                                steps: [
                                    {
                                        key: "coreTeam",
                                        role: "Breakdown of Core Team needed to deliver on work (excludes C suite members)",
                                        status: Status.New,
                                        steps: []
                                    }
                                ]
                            },
                            {
                                key: "approvals",
                                role: "Approvals/The Ask",
                                status: Status.New,
                                steps: [
                                    {
                                        key: "fundingNeeded",
                                        role: "Explanation of how much funding or budget is needed and how it will be used",
                                        status: Status.New,
                                        steps: []
                                    },
                                    {
                                        key: "investmentTerms",
                                        role: "Description of the desired terms of the investment",
                                        status: Status.New,
                                        steps: []
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        key: "productDevelopment",
                        role: "Product Development",
                        status: Status.New,
                        steps: []
                    },
                    {
                        key: "goTomarket",
                        role: "Go to Market",
                        status: Status.New,
                        steps: []
                    },
                    {
                        key: "growth",
                        role: "Growth",
                        status: Status.New,
                        steps: []
                    },
                    {
                        key: "marturity",
                        role: "Maturity",
                        status: Status.New,
                        steps: []
                    },
                    {
                        key: "retirement",
                        role: "Retirement",
                        status: Status.New,
                        steps: []
                    }
                ]
            })
        },
        {
            id: 2,
            title: "Water Intake Logger",
            description: "a Simple water intake logger with a ReactJS frontend and a .NET Core backend which allows for capturing in-the-moment water logging for the data finatics.",
            timestamp: new Date(2024, 11, 28),
            creator: {
                email: "john.doe@derivco.co.za",
                firstName: "John",
                lastName: "Doe"
            },
            process: PopulateTreeContext({
                key: "waterIntakeLogger",
                role: "Water Intake Logger",
                status: Status.InProgress,
                steps: [
                    {
                        key: "productDiscovery",
                        role: "Product Discovery",
                        status: Status.InProgress,
                        outputType: Languages.Markdown,
                        steps: []
                    },
                    {
                        key: "productDevelopment",
                        role: "Product Development",
                        status: Status.New,
                        steps: []
                    },
                    {
                        key: "goTomarket",
                        role: "Go to Market",
                        status: Status.New,
                        steps: []
                    },
                    {
                        key: "growth",
                        role: "Growth",
                        status: Status.New,
                        steps: []
                    },
                    {
                        key: "marturity",
                        role: "Maturity",
                        status: Status.New,
                        steps: []
                    },
                    {
                        key: "retirement",
                        role: "Retirement",
                        status: Status.New,
                        steps: []
                    }
                ]
            })
        },
        {
            id: 3,
            title: "Stock Market Simulator",
            description: "a Stock market simulator with a ReactJS frontend and a .NET Core backend which allows for simulating stock market trading with real-time data.",
            timestamp: new Date(2024, 11, 30),
            creator: {
                email: "dean.martin@derivco.co.za",
                firstName: "Dean",
                lastName: "Martin"
            },
            process: PopulateTreeContext({
                key: "stockMarketSimulator",
                role: "Stock Market Simulator",
                status: Status.InProgress,
                steps: [
                    {
                        key: "productDiscovery",
                        role: "Product Discovery",
                        status: Status.Completed,
                        outputType: Languages.Markdown,
                        steps: []
                    },
                    {
                        key: "productDevelopment",
                        role: "Product Development",
                        status: Status.InProgress,
                        steps: []
                    },
                    {
                        key: "goTomarket",
                        role: "Go to Market",
                        status: Status.New,
                        steps: []
                    },
                    {
                        key: "growth",
                        role: "Growth",
                        status: Status.New,
                        steps: []
                    },
                    {
                        key: "marturity",
                        role: "Maturity",
                        status: Status.New,
                        steps: []
                    },
                    {
                        key: "retirement",
                        role: "Retirement",
                        status: Status.New,
                        steps: []
                    }
                ]
            })
        },
        {
            id: 4,
            title: "Crypto Wallet",
            description: "a Simple crypto wallet with a ReactJS frontend and a .NET Core backend which allows for managing crypto wallets and transactions.",
            timestamp: new Date(2024, 11, 31),
            creator: {
                email: "alex.charles@derivco.co.za",
                firstName: "Alex",
                lastName: "Charles"
            },
            process: PopulateTreeContext({
                key: "cryptoWallet",
                role: "Crypto Wallet",
                status: Status.InProgress,
                steps: [
                    {
                        key: "productDiscovery",
                        role: "Product Discovery",
                        status: Status.Completed,
                        outputType: Languages.Markdown,
                        steps: []
                    },
                    {
                        key: "productDevelopment",
                        role: "Product Development",
                        status: Status.Completed,
                        steps: []
                    },
                    {
                        key: "goTomarket",
                        role: "Go to Market",
                        status: Status.Completed,
                        steps: []
                    },
                    {
                        key: "growth",
                        role: "Growth",
                        status: Status.InProgress,
                        steps: []
                    },
                    {
                        key: "marturity",
                        role: "Maturity",
                        status: Status.New,
                        steps: []
                    },
                    {
                        key: "retirement",
                        role: "Retirement",
                        status: Status.New,
                        steps: []
                    }
                ]
            })
        },
        {
            id: 5,
            title: "Sweepstakes Casino",
            description: "a Sweepstakes casino with a ReactJS frontend and a .NET Core backend which allows for players to deposit funds in exchange for 'coins' which then get used to gamble with. Coins should be exchangable back to fiat and then withdrawable.",
            timestamp: new Date(2025, 0, 9),
            creator: {
                email: "jack.thompson@derivco.co.za",
                firstName: "Jack",
                lastName: "Thompson"
            },
            process: PopulateTreeContext({
                key: "sweepstakesCasino",
                role: "Sweepstakes Casino",
                status: Status.InProgress,
                steps: [
                    {
                        key: "productDiscovery",
                        role: "Product Discovery",
                        status: Status.Completed,
                        outputType: Languages.Markdown,
                        steps: []
                    },
                    {
                        key: "productDevelopment",
                        role: "Product Development",
                        status: Status.Failed,
                        steps: []
                    },
                    {
                        key: "goTomarket",
                        role: "Go to Market",
                        status: Status.New,
                        steps: []
                    },
                    {
                        key: "growth",
                        role: "Growth",
                        status: Status.New,
                        steps: []
                    },
                    {
                        key: "marturity",
                        role: "Maturity",
                        status: Status.New,
                        steps: []
                    },
                    {
                        key: "retirement",
                        role: "Retirement",
                        status: Status.New,
                        steps: []
                    }
                ]
            })
        },
        {
            id: 6,
            title: "Blockchain Raffle",
            description: "A blockchain-based raffle system with a Vue.js frontend, a Node.js backend, and a Solidity smart contract that allows for entering with an Ethereum connected wallet and pays out monthly.",
            timestamp: new Date("2024-11-15T00:00:00.000Z"),
            creator: {
                email: "john.smith@gmail.com",
                firstName: "John",
                lastName: "Smith"
            },
            process: {
                key: "blockchainRaffle",
                role: "Blockchain Raffle",
                status: Status.InProgress,
                icon: <FaTicketAlt />,
                steps: [
                    {
                        key: "productDiscovery",
                        role: "Product Discovery",
                        status: Status.Completed,
                        icon: <FaLightbulb />,
                        steps: [
                            {
                                key: "marketResearch",
                                role: "Market Research",
                                status: Status.Completed,
                                icon: <FaSearch />,
                                steps: [],
                                outputType: Languages.Markdown,
                                output: marketResearchData,
                                metadata: {
                                    created: new Date("2024-01-15"),
                                    modified: new Date("2024-01-20"),
                                    author: "John Smith",
                                    tags: ["market-research", "blockchain", "competition", "opportunities"]
                                }

                            },
                            {
                                key: "userInterviews",
                                role: "User Interviews",
                                icon: <FaComments />,
                                status: Status.Completed,
                                steps: []
                            },
                            {
                                key: "requirementDocumentation",
                                role: "Requirement Documentation",
                                icon: <FaFileAlt />,
                                status: Status.Completed,
                                steps: []
                            }
                        ]
                    },
                    {
                        key: "productDevelopment",
                        role: "Product Development",
                        status: Status.Completed,
                        icon: <FaRocket />,
                        steps: [
                            {
                                key: "planning",
                                role: "Planning",
                                status: Status.Completed,
                                icon: <FaClipboardList />,
                                steps: []
                            },
                            {
                                key: "analysis",
                                role: "Analysis",
                                status: Status.Completed,
                                icon: <FaChartPie />,
                                steps: []
                            },
                            {
                                key: "design",
                                role: "Design",
                                status: Status.Completed,
                                icon: <FaPencilRuler />,
                                steps: [
                                    {
                                        key: "documentation",
                                        role: "Documentation",
                                        icon: <FaFileLines />,
                                        steps: [],
                                        status: Status.Completed,
                                        output: designDocumenationData,
                                        outputType: Languages.Markdown,
                                        metadata: {
                                            created: new Date(),
                                            author: "Someone Great",
                                            modified: new Date(),
                                            tags: ["blockchain", "raffle", "software", "design"]
                                        }
                                    },
                                    {
                                        key: "architecture",
                                        role: "Architecture",
                                        icon: <MdArchitecture />,
                                        steps: [],
                                        status: Status.Completed,
                                        output: designArchitectureData,
                                        outputType: Languages.Diagram,
                                        metadata: {
                                            created: new Date(),
                                            modified: new Date(),
                                        },
                                    }
                                ]
                            },
                            {
                                key: "implementation",
                                role: "Implementation",
                                status: Status.Completed,
                                icon: <FaLaptopCode />,
                                steps: [
                                    {
                                        key: "frontendDevelopment",
                                        role: "Frontend Development",
                                        status: Status.Completed,
                                        icon: <FaLaptopCode />,
                                        steps: []
                                    },
                                    {
                                        key: "backendDevelopment",
                                        role: "Backend Development",
                                        status: Status.Completed,
                                        icon: <FaServer />,
                                        steps: []
                                    },
                                    {
                                        key: "smartContractDevelopment",
                                        role: "Smart Contract Development",
                                        status: Status.Completed,
                                        icon: <FaCode />,
                                        steps: []
                                    }
                                ]
                            },
                            {
                                key: "testing",
                                role: "Testing",
                                status: Status.Completed,
                                icon: <FaVial />,
                                steps: [
                                    {
                                        key: "unitTesting",
                                        role: "Unit Testing",
                                        status: Status.Completed,
                                        icon: <FaBug />,
                                        steps: []
                                    },
                                    {
                                        key: "integrationTesting",
                                        role: "Integration Testing",
                                        status: Status.Completed,
                                        icon: <FaVial />,
                                        steps: []
                                    },
                                    {
                                        key: "systemTesting",
                                        role: "System Testing",
                                        status: Status.Completed,
                                        icon: <FaCogs />,
                                        steps: []
                                    },
                                    {
                                        key: "userAcceptanceTesting",
                                        role: "User Acceptance Testing",
                                        status: Status.Completed,
                                        icon: <FaUserCheck />,
                                        steps: []
                                    }
                                ]
                            },
                            {
                                key: "deployment",
                                role: "Deployment",
                                status: Status.Completed,
                                icon: <FaCloudUploadAlt />,
                                steps: []
                            },
                            {
                                key: "maintenance",
                                role: "Maintenance",
                                status: Status.Completed,
                                icon: <FaTools />,
                                steps: []
                            }
                        ]
                    },
                    {
                        key: "goTomarket",
                        role: "Go to Market",
                        status: Status.InProgress,
                        icon: <FaChartBar />,
                        steps: [
                            {
                                key: "marketingCampaign",
                                role: "Marketing Campaign",
                                status: Status.Completed,
                                icon: <FaBullhorn />,
                                steps: []
                            },
                            {
                                key: "partnerships",
                                role: "Partnerships",
                                status: Status.Completed,
                                icon: <FaHandshake />,
                                steps: []
                            },
                            {
                                key: "userOnboarding",
                                role: "User Onboarding",
                                status: Status.Completed,
                                icon: <FaUsers />,
                                steps: []
                            }
                        ]
                    },
                    {
                        key: "growth",
                        role: "Growth",
                        status: Status.New,
                        icon: <FaSeedling />,
                        steps: [
                            {
                                key: "featureEnhancements",
                                role: "Feature Enhancements",
                                status: Status.Completed,
                                icon: <FaMagic />,
                                steps: []
                            },
                            {
                                key: "scalingInfrastructure",
                                role: "Scaling Infrastructure",
                                status: Status.Completed,
                                icon: <FaChartLine />,
                                steps: []
                            },
                            {
                                key: "communityBuilding",
                                role: "Community Building",
                                status: Status.Completed,
                                icon: <FaGlobe />,
                                steps: []
                            }
                        ]
                    },
                    {
                        key: "maturity",
                        role: "Maturity",
                        status: Status.New,
                        icon: <FaRegGem />,
                        steps: [
                            {
                                key: "optimization",
                                role: "Optimization",
                                status: Status.Completed,
                                icon: <FaCog />,
                                steps: []
                            },
                            {
                                key: "longTermSupport",
                                role: "Long Term Support",
                                status: Status.Completed,
                                icon: <FaTools />,
                                steps: []
                            },
                            {
                                key: "userRetention",
                                role: "User Retention",
                                status: Status.Completed,
                                icon: <FaRedo />,
                                steps: []
                            }
                        ]
                    },
                    {
                        key: "retirement",
                        role: "Retirement",
                        status: Status.New,
                        icon: <FaRegClock />,
                        steps: [
                            {
                                key: "endOfLifeAnnouncement",
                                role: "End of Life Announcement",
                                status: Status.Completed,
                                icon: <FaCalendarAlt />,
                                steps: []
                            },
                            {
                                key: "dataMigration",
                                role: "Data Migration",
                                status: Status.Completed,
                                icon: <FaDatabase />,
                                steps: []
                            },
                            {
                                key: "shutdown",
                                role: "Shutdown",
                                status: Status.Completed,
                                icon: <FaStop />,
                                steps: []
                            }
                        ]
                    },
                    {
                        key: "projections",
                        role: "Projections",
                        icon: <FaChartLine />,
                        status: Status.New,
                        steps: [
                            {
                                key: "financialModel",
                                role: "Breakdown of financial model over 3 - 5 years",
                                icon: <GiGrowth />,
                                status: Status.New,
                                output: "Integrated Financial Report: Blockchain Raffle Platform\n\n**I. Executive Summary:**\n\nThis report provides a comprehensive financial analysis for a proposed blockchain-based raffle platform. Due to the nascent nature of the blockchain raffle market and the limited availability of public financial data for similar ventures, the analysis relies heavily on estimations and assumptions grounded in market research, industry benchmarks, and reasonable projections. The report analyzes market trends, financial projections under various scenarios, cost structures, associated risks, and strategic recommendations for maximizing the platform's potential while mitigating inherent risks. Key findings indicate significant profit potential but highlight the considerable uncertainty inherent in this new market. The report emphasizes the critical need for proactive risk management, user experience optimization, and a robust marketing strategy.\n\n**II. Market Analysis:**\n\nThe blockchain raffle market is experiencing substantial growth, driven by the increasing demand for transparent and provably fair systems. This addresses longstanding concerns about manipulation in traditional raffle systems. Key trends include:\n\n* **Increased Demand for Transparency and Fairness:** Blockchain's inherent transparency and immutability are key selling points.\n* **Growing Adoption of Decentralized Applications (dApps):** The decentralized nature of dApps enables global participation and reduces reliance on central authorities.\n* **Emerging Trend of Skill-Based Raffles:** Incorporating skill-based elements enhances user engagement and differentiates blockchain raffles.\n* **Integration with Other Technologies:** Technologies like Chainlink VRF for verifiable randomness improve security and integrity.\n* **Use of Cryptocurrencies:** Cryptocurrency integration streamlines transactions and aligns with the decentralized nature of the blockchain ecosystem.\n* **Focus on Luxury Items and Crypto Prizes:** Offering high-value prizes attracts a premium user base.\n\nChallenges include:\n\n* **High Transaction Costs:** High gas fees can hinder user adoption.\n* **Complex User Experience:** The technical complexity of blockchain can be a barrier to entry for mainstream users.\n* **Regulatory Uncertainty:** Lack of clear regulatory frameworks poses significant compliance challenges.\n\nThe competitive landscape is relatively fragmented, with various companies offering different approaches and features. However, specific financial details for these competitors are generally unavailable due to the private nature of many firms.\n\n**III. Financial Projections:**\n\nFinancial projections are presented under three scenarios (best-case, most-likely-case, and worst-case) to account for the inherent uncertainty in this emerging market. These projections are based on market size estimates from Grand View Research, which projects the online lottery market to be USD 127.6 billion in 2025 and grow at a CAGR of 5.7% from 2025 to 2030. [1] Our projections assume blockchain raffle systems will capture a gradually increasing share of this market. The projections are highly sensitive to market penetration rates and average ticket prices. Due to a lack of historical data for comparable companies, the models utilize reasonable estimations and assumptions.\n\n[1] Grand View Research. (2024). *Online Lottery Market Size & Share | Industry Report, 2030*. Retrieved from [https://www.grandviewresearch.com/industry-analysis/online-lottery-market-report](https://www.grandviewresearch.com/industry-analysis/online-lottery-market-report)\n\n**Revenue Projections:**\n\n| Year | Online Lottery Market Size (USD Billion) | Blockchain Raffle Market Penetration (%) | Projected Blockchain Raffle Revenue (USD Billion) |\n|---|---|---|---|\n| 2025 | 127.6 | 0.5 | 0.64 |\n| 2026 | 135.1 | 1.0 | 1.35 |\n| 2027 | 143.1 | 2.0 | 2.86 |\n| 2028 | 151.6 | 3.5 | 5.31 |\n| 2029 | 160.7 | 5.0 | 8.04 |\n| 2030 | 170.4 | 7.0 | 11.93 |\n\n**Cost Analysis:**\n\nThe cost analysis includes both one-time development costs and recurring operational costs.\n\n* **Development Costs:** Estimated at $130,000, encompassing smart contract development ($25,000), front-end and back-end development ($90,000), security audits ($10,000), and project management ($5,000).\n* **Monthly Operational Costs:** Estimated at $3,000 per month, including server hosting, security monitoring, customer support, and marketing.\n* **Variable Costs:** These include transaction fees (network-dependent) and prize costs, which will vary based on user activity and prize selection.\n\n**Profitability Analysis:**\n\nProfitability is calculated as Revenue - Total Costs. The profitability is heavily dependent on revenue, as development and operational costs are largely fixed. The variability of transaction fees and prize costs means a highly dynamic profit margin. A break-even analysis would require more precise cost estimations. The current estimations suggest the platform would be profitable by the end of 2025, given the assumptions made within this model.\n\n**IV. Risk Assessment:**\n\nKey market risks include:\n\n* **Market Penetration Risk:** Uncertainty around the rate of adoption of blockchain-based raffles.\n* **Competition Risk:** Potential for increased competition from established and new players.\n* **Regulatory Risk:** Changes in regulations could significantly impact the platform's operations.\n* **Technological Disruption Risk:** Emergence of alternative technologies could render the current system obsolete.\n* **Cryptocurrency Market Volatility Risk:** Volatility in cryptocurrency markets can impact profitability if cryptocurrencies are used for transactions or prizes.\n\nKey operational risks include:\n\n* **Development Cost Overruns:** Costs could exceed estimates due to unforeseen technical challenges.\n* **High Transaction Costs:** High gas fees can reduce profitability and user adoption.\n* **Security Risks:** Security breaches could cause financial losses and reputational damage.\n* **User Experience Issues:** A poor user experience may hinder user adoption.\n\nMitigation strategies are proposed for each risk. A sensitivity analysis shows profitability is highly sensitive to market penetration rates.\n\n**V. SWOT Analysis:**\n\n* **Strengths:** Transparency, decentralization, innovation potential.\n* **Weaknesses:** High transaction costs, complex user experience, regulatory uncertainty.\n* **Opportunities:** Expanding user base, technological advancements, strategic partnerships.\n* **Threats:** Increased competition, technological disruption, security vulnerabilities, cryptocurrency market volatility.\n\n**VI. Strategic Recommendations:**\n\n* **Prioritize User Experience:** Design an intuitive and user-friendly interface.\n* **Cost Optimization:** Explore cost-effective blockchain solutions and efficient operational strategies.\n* **Proactive Regulatory Compliance:** Ensure compliance with relevant regulations.\n* **Robust Marketing:** Implement a comprehensive marketing strategy targeting key demographics.\n* **Innovation:** Explore innovative features such as skill-based raffles and integration with other technologies.\n* **Data-Driven Decision Making:** Track user data and optimize platform features based on insights.\n* **Risk Mitigation:** Implement a robust risk management plan to address potential challenges.\n\n**VII. Appendix:** (Detailed reports for each section are available separately upon request.)\n\n* Comprehensive Market Research Report\n* Cost Analysis Report\n* SWOT Analysis\n* Financial Model\n* Profitability Analysis Report\n* Risk Assessment Report\n* Revenue Projections for Blockchain Raffle Systems\n* Business Plan\n* Strategic Recommendations Report\n* Operational Plan\n\n**Tools Used:** Search the internet, Yahoo Finance Tool, Market Research. Agent-generated content and calculations are clearly indicated throughout the report. Many sections rely on estimations and assumptions due to the limitations of publicly available data for blockchain raffle systems.\n\nThis integrated financial report provides a comprehensive overview of the financial aspects of a blockchain-based raffle platform. It highlights the potential for substantial profitability but also underscores the risks inherent in this emerging market. The report's conclusions are strongly tied to the accuracy of the underlying assumptions and estimations. Further research and more granular data would significantly improve the accuracy of these projections.",
                                outputType: Languages.Markdown,
                                metadata: {
                                    created: new Date("2025-01-01"),
                                    author: "John Smit",
                                    tags: ["financial", "forecast", "blockchain", "raffle", "software"]
                                },
                                steps: []
                            }
                        ],
                    }

                ]
            }
        }
    ],
    newProjectExamplesCount: 0,
    semanticEditor: {
        options: {
            tabSize: 4,
            insertSpaces: false,
            detectIndentation: true,
            trimAutoWhitespace: true,
            largeFileOptimizations: true,
            "semanticHighlighting.enabled": true,
            formatOnType: true,
            formatOnPaste: true,
            wordWrap: "on",
            autoClosingBrackets: "always",
            autoIndent: "full",
            codeLens: true,
            lineNumbers: "on",
            padding: {
                top: 15,
                bottom: 15
            }
        },
        suggestionsCount: 5
    },
    productDevelopmentLifecycle: [
        {
            key: "productDiscovery",
            role: "Product Discovery",
            status: Status.New,
            outputType: Languages.Markdown,
            steps: [
                {
                    key: "introduction",
                    role: "Introduction",
                    status: Status.New,
                    steps: [
                        {
                            key: "projectOverview",
                            role: "Brief of Overview of your Product, Business or initiative",
                            status: Status.New,
                            steps: []
                        },
                        {
                            key: "landscapeOverview",
                            role: "Overview of the current landscape",
                            status: Status.New,
                            steps: []
                        },
                        {
                            key: "proposal",
                            role: "Explanation of what you are proposing to do",
                            status: Status.New,
                            steps: []
                        }
                    ]
                },
                {
                    key: "problemStatement",
                    role: "Problem Statement/s - (JTBD)",
                    status: Status.New,
                    steps: [
                        {
                            key: "problemStatement",
                            role: "Detailed Description of the Problem/s you are aiming to solve specifically within your space",
                            status: Status.New,
                            steps: []
                        },
                        {
                            key: "userResearch",
                            role: "Focus on key Customer/User problems or Jobs To Be Done",
                            status: Status.New,
                            steps: []
                        }
                    ]
                },
                {
                    key: "solution",
                    role: "Solution",
                    status: Status.New,
                    steps: [
                        {
                            key: "solutionExplanation",
                            role: "Explanation of how you will be attempting to solve the problem/s",
                            status: Status.New,
                            steps: []
                        },
                        {
                            key: "technologyLeverage",
                            role: "Highlighting how your approach will leverage technology and or services to do so",
                            status: Status.New,
                            steps: []
                        },
                        {
                            key: "oneMinutePitch",
                            role: "Use - The One Minute Pitch",
                            status: Status.New,
                            steps: []
                        }
                    ]
                },
                {
                    key: "businessModel",
                    role: "Business Model - (How we make money)",
                    status: Status.New,
                    steps: [
                        {
                            key: "businessModelOverview",
                            role: "The business model provides a broad overview of how a company creates, delivers, and captures value. It explains the key components of the business without going into detail.",
                            status: Status.New,
                            steps: []
                        },
                        {
                            key: "importantTasks",
                            role: "It explains the most important tasks or actions the company must perform to operate successfully, and generate value",
                            status: Status.New,
                            steps: []
                        }
                    ]
                },
                {
                    key: "valueProposition",
                    role: "Value Proposition (USPs)",
                    status: Status.New,
                    steps: [
                        {
                            key: "uniqueValueProposition",
                            role: "Explanation of your Unique Value Proposition/s and why it is different from existing Solutions",
                            status: Status.New,
                            steps: []
                        }
                    ]
                },
                {
                    key: "definitionOfSuccess",
                    role: "Definition of Success",
                    status: Status.New,
                    steps: [
                        {
                            key: "keyObjectives",
                            role: "Overview of the Key Objectives you would like to achieve and over what period of time",
                            status: Status.New,
                            steps: []
                        },
                        {
                            key: "successMeasurement",
                            role: "Explanation of how the success of this initiative can be successfully measured",
                            status: Status.New,
                            steps: []
                        }
                    ]
                },
                {
                    key: "purposeAndVision",
                    role: "Purpose and Vision",
                    status: Status.New,
                    steps: [
                        {
                            key: "productVision",
                            role: "Overview of what you think the 3 - 5 year vision for this Product or initiative will be",
                            status: Status.New,
                            steps: []
                        },
                        {
                            key: "keyReason",
                            role: "Overview of your key reason for being and what will drive you towards your Vision i.e. t",
                            status: Status.New,
                            steps: []
                        }
                    ]
                },
                {
                    key: "scopeOfProduct",
                    role: "Scope of Product",
                    status: Status.New,
                    steps: [
                        {
                            key: "productValue",
                            role: "What value does your product offer and to who?",
                            status: Status.New,
                            steps: []
                        },
                        {
                            key: "productType",
                            role: "Is it an internal Product, external or both?",
                            status: Status.New,
                            steps: []
                        },
                        {
                            key: "productDescription",
                            role: "What is the Product? What is it Designed to do? What it does for a Customer?",
                            status: Status.New,
                            steps: []
                        },
                        {
                            key: "productFeatures",
                            role: "Explanation of how it works, key features and what is considered in and out of scope for MVP",
                            status: Status.New,
                            steps: []
                        }
                    ]
                },
                {
                    key: "technicalSolution",
                    role: "Technical Solution",
                    status: Status.New,
                    steps: [
                        {
                            key: "architectureOverview",
                            role: "Overview of Architecture",
                            status: Status.New,
                            steps: []
                        },
                        {
                            key: "technologyStack",
                            role: "Description of Technology Stack",
                            status: Status.New,
                            steps: []
                        },
                        {
                            key: "coreTechnology",
                            role: "Detailed description of your core technology",
                            status: Status.New,
                            steps: []
                        }
                    ]
                },
                {
                    key: "customerTypes",
                    role: "Customer Types",
                    status: Status.New,
                    steps: [
                        {
                            key: "idealCustomerProfiles",
                            role: "Breakdown of Ideal Customer Profiles",
                            status: Status.New,
                            steps: []
                        },
                        {
                            key: "customerSegments",
                            role: "Overview of key customer segments",
                            status: Status.New,
                            steps: []
                        },
                        {
                            key: "customerPainPoints",
                            role: "Overview of key customer pain points and assumptions",
                            status: Status.New,
                            steps: []
                        }
                    ]
                },
                {
                    key: "marketAttractiveness",
                    role: "Market Attractiveness",
                    status: Status.New,
                    steps: [
                        {
                            key: "marketSize",
                            role: "Overview of TAM, SAM and SOM",
                            status: Status.New,
                            steps: []
                        },
                        {
                            key: "customerSegmentsMarket",
                            role: "Overview of key customer segments within Market",
                            status: Status.New,
                            steps: []
                        },
                        {
                            key: "competitiveLandscape",
                            role: "Description of the Competitive Landscape",
                            status: Status.New,
                            steps: []
                        }
                    ]
                },
                {
                    key: "competitorAnalysis",
                    role: "Competitor Analysis",
                    status: Status.New,
                    steps: [
                        {
                            key: "competitiveLandscapeOverview",
                            role: "Overview of Competitive Landscape",
                            status: Status.New,
                            steps: []
                        },
                        {
                            key: "directCompetitors",
                            role: "Breakdown of Direct Competitors",
                            status: Status.New,
                            steps: []
                        },
                        {
                            key: "indirectCompetitors",
                            role: "Breakdown of Indirect Competitors",
                            status: Status.New,
                            steps: []
                        }
                    ]
                },
                {
                    key: "businessRevenueModels",
                    role: "Business/Revenue Models",
                    status: Status.New,
                    steps: [
                        {
                            key: "revenueGeneration",
                            role: "Explanation of how this will make money",
                            status: Status.New,
                            steps: []
                        },
                        {
                            key: "pricingStrategy",
                            role: "Description of the pricing strategy and revenue streams",
                            status: Status.New,
                            steps: []
                        }
                    ]
                },
                {
                    key: "projections",
                    role: "Projections",
                    status: Status.New,
                    steps: [
                        {
                            key: "financialModel",
                            role: "Breakdown of financial model over 3 - 5 years",
                            status: Status.New,
                            steps: []
                        },
                        {
                            key: "npv",
                            role: "NPV",
                            status: Status.New,
                            steps: []
                        },
                        {
                            key: "irr",
                            role: "IRR",
                            status: Status.New,
                            steps: []
                        },
                        {
                            key: "cashPositive",
                            role: "Cash Positive/Cost recovery month",
                            status: Status.New,
                            steps: []
                        },
                        {
                            key: "payBackPeriod",
                            role: "Pay Back Period",
                            status: Status.New,
                            steps: []
                        },
                        {
                            key: "expectedROI",
                            role: "Expected ROI %",
                            status: Status.New,
                            steps: []
                        },
                        {
                            key: "probabilityROI",
                            role: "Probability of ROI",
                            status: Status.New,
                            steps: []
                        }
                    ]
                },
                {
                    key: "goToMarket",
                    role: "Go to Market",
                    status: Status.New,
                    steps: [
                        {
                            key: "goToMarketDescription",
                            role: "Description of your Go to Market plans",
                            status: Status.New,
                            steps: []
                        },
                        {
                            key: "productMarketFit",
                            role: "Description of anticipated traction and milestones towards product market fit and growth",
                            status: Status.New,
                            steps: []
                        },
                        {
                            key: "marketingStrategy",
                            role: "Marketing Strategy",
                            status: Status.New,
                            steps: []
                        },
                        {
                            key: "brandStrategy",
                            role: "Brand Strategy",
                            status: Status.New,
                            steps: []
                        },
                        {
                            key: "salesStrategy",
                            role: "Sales Strategy",
                            status: Status.New,
                            steps: []
                        }
                    ]
                },
                {
                    key: "regulatoryConsiderations",
                    role: "Regulatory Considerations",
                    status: Status.New,
                    steps: [
                        {
                            key: "regulatoryOverview",
                            role: "Overview of any Regulatory Considerations and risks and ways to mitigate",
                            status: Status.New,
                            steps: []
                        }
                    ]
                },
                {
                    key: "roadmap",
                    role: "Roadmap",
                    status: Status.New,
                    steps: [
                        {
                            key: "productRoadmap",
                            role: "Clear Product Roadmap depicting what is needed in to achieve the strategy",
                            status: Status.New,
                            steps: []
                        },
                        {
                            key: "expectedOutcomes",
                            role: "Overview of key Outcomes to be achieved across core business pillars",
                            status: Status.New,
                            steps: []
                        },
                        {
                            key: "milestones",
                            role: "Overview of anticipated timings on expected milestones to be achieved quarterly across a PDLC (3 - 5 years out)",
                            status: Status.New,
                            steps: []
                        }
                    ]
                },
                {
                    key: "team",
                    role: "Team",
                    status: Status.New,
                    steps: [
                        {
                            key: "coreTeam",
                            role: "Breakdown of Core Team needed to deliver on work (excludes C suite members)",
                            status: Status.New,
                            steps: []
                        }
                    ]
                },
                {
                    key: "approvals",
                    role: "Approvals/The Ask",
                    status: Status.New,
                    steps: [
                        {
                            key: "fundingNeeded",
                            role: "Explanation of how much funding or budget is needed and how it will be used",
                            status: Status.New,
                            steps: []
                        },
                        {
                            key: "investmentTerms",
                            role: "Description of the desired terms of the investment",
                            status: Status.New,
                            steps: []
                        }
                    ]
                }
            ]
        },
        {
            key: "productDevelopment",
            role: "Product Development",
            status: Status.New,
            steps: []
        },
        {
            key: "goTomarket",
            role: "Go to Market",
            status: Status.New,
            steps: []
        },
        {
            key: "growth",
            role: "Growth",
            status: Status.New,
            steps: []
        },
        {
            key: "marturity",
            role: "Maturity",
            status: Status.New,
            steps: []
        },
        {
            key: "retirement",
            role: "Retirement",
            status: Status.New,
            steps: []
        }
    ],
    signatureExamples: {
        step: {
            key: "example_step_id",
            role: "Example description of the step's expected output.",
            status: Status.InProgress,
            steps: [],
            output: "Example output from the step. Typically auto-generated by Accelerator.",
            outputType: Languages.Plaintext
        }
    }
}