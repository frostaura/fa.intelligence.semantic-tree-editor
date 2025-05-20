export const designArchitectureData = `
[
  {
    "id": "player",
    "title": "Player",
    "type": "person",
    "description": "Participates in raffles",
    "connections": [
      { "to": "frontend", "label": "Buys tickets & claims prizes" }
    ]
  },
  {
    "id": "organizer",
    "title": "Raffle Organizer",
    "type": "person",
    "description": "Creates and manages raffles",
    "connections": [
      { "to": "frontend", "label": "Manages raffles" }
    ]
  },
  {
    "id": "ui_layer",
    "title": "Presentation Layer",
    "type": "system",
    "description": "User interface components",
    "connections": []
  },
  {
    "id": "frontend",
    "title": "Web Frontend",
    "type": "container",
    "description": "User interface for raffle interactions",
    "technology": "Next.js + wagmi + RainbowKit",
    "parent": "ui_layer",
    "connections": [
      { "to": "api", "label": "API calls" },
      { "to": "contracts", "label": "Smart contract interactions" }
    ]
  },
  {
    "id": "api_layer",
    "title": "Application Layer",
    "type": "system",
    "description": "Business logic and service integration",
    "connections": []
  },
  {
    "id": "api",
    "title": "Backend API",
    "type": "container",
    "description": "Handles off-chain operations",
    "technology": "Node.js + Express",
    "parent": "api_layer",
    "connections": [
      { "to": "db", "label": "Stores data" },
      { "to": "indexer", "label": "Fetches blockchain events" }
    ]
  },
  {
    "id": "contracts",
    "title": "Smart Contracts",
    "type": "container",
    "description": "Core raffle logic & prize distribution",
    "technology": "Solidity + Chainlink VRF",
    "parent": "api_layer",
    "connections": [
      { "to": "vrf", "label": "Random number generation" },
      { "to": "oracle", "label": "Price feeds" }
    ]
  },
  {
    "id": "notification",
    "title": "Notification Service",
    "type": "service",
    "description": "Sends notifications for raffle events",
    "technology": "Push Protocol",
    "parent": "api_layer",
    "connections": [
      { "to": "indexer", "label": "Monitors events" }
    ]
  },
  {
    "id": "persistence_layer",
    "title": "Persistence Layer",
    "type": "system",
    "description": "Data storage and indexing",
    "connections": []
  },
  {
    "id": "db",
    "title": "Database",
    "type": "database",
    "description": "Stores user profiles and raffle metadata",
    "technology": "PostgreSQL",
    "parent": "persistence_layer",
    "connections": []
  },
  {
    "id": "indexer",
    "title": "Blockchain Indexer",
    "type": "container",
    "description": "Indexes blockchain events",
    "technology": "The Graph Protocol",
    "parent": "persistence_layer",
    "connections": [
      { "to": "contracts", "label": "Indexes events" }
    ]
  },
  {
    "id": "ipfs",
    "title": "IPFS Storage",
    "type": "external",
    "description": "Stores raffle images and metadata",
    "technology": "IPFS + Web3.Storage",
    "parent": "persistence_layer",
    "connections": []
  },
  {
    "id": "external_services",
    "title": "External Services",
    "type": "system",
    "description": "Third-party integrations",
    "connections": []
  },
  {
    "id": "vrf",
    "title": "Random Number Generator",
    "type": "external",
    "description": "Verifiable random number generation",
    "technology": "Chainlink VRF",
    "parent": "external_services",
    "connections": []
  },
  {
    "id": "oracle",
    "title": "Price Oracle",
    "type": "external",
    "description": "Real-time token price data",
    "technology": "Chainlink Price Feeds",
    "parent": "external_services",
    "connections": []
  }
]`;