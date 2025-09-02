import type { Job } from "@/types";

export const createMockJobs = (): Job[] => {
  const now = new Date();
  const mockJobs: Job[] = [
    {
      jobId: 'job-001',
      jobName: 'ML Model Training Pipeline',
      jobUrl: 'https://github.com/user/ml-training',
      jobDescription: 'Training a deep learning model for image classification using TensorFlow. This job requires high computational resources and runs for several hours.',
      resources: { cpu: 8, ram: 32 },
      status: 'running',
      createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000) // 2 hours ago
    },
    {
      jobId: 'job-002',
      jobName: 'Data Processing ETL',
      jobUrl: 'https://docker.io/apache/spark',
      jobDescription: 'Extract, transform, and load large datasets from multiple sources. Processing customer transaction data for analytics.',
      resources: { cpu: 4, ram: 16 },
      status: 'completed',
      createdAt: new Date(now.getTime() - 24 * 60 * 60 * 1000) // 1 day ago
    },
    {
      jobId: 'job-003',
      jobName: 'Video Rendering Service',
      jobUrl: 'https://github.com/user/video-renderer',
      jobDescription: 'High-quality video rendering and encoding service for 4K content. Requires GPU acceleration and substantial memory.',
      resources: { cpu: 12, ram: 64 },
      status: 'failed',
      createdAt: new Date(now.getTime() - 6 * 60 * 60 * 1000) // 6 hours ago
    },
    {
      jobId: 'job-004',
      jobName: 'Web Scraping Bot',
      jobUrl: 'https://github.com/user/scraper-bot',
      jobDescription: 'Automated web scraping service for collecting market data from various e-commerce platforms.',
      resources: { cpu: 2, ram: 8 },
      status: 'pending',
      createdAt: new Date(now.getTime() - 30 * 60 * 1000) // 30 minutes ago
    },
    {
      jobId: 'job-005',
      jobName: 'Blockchain Node Sync',
      jobUrl: 'https://docker.io/ethereum/client-go',
      jobDescription: 'Synchronizing Ethereum blockchain node for DeFi application backend. Requires consistent uptime and storage.',
      resources: { cpu: 6, ram: 24 },
      status: 'running',
      createdAt: new Date(now.getTime() - 12 * 60 * 60 * 1000) // 12 hours ago
    },
    {
      jobId: 'job-006',
      jobName: 'Scientific Simulation',
      jobUrl: 'https://github.com/user/physics-sim',
      jobDescription: 'Monte Carlo simulation for particle physics research. CPU-intensive computation requiring parallel processing.',
      resources: { cpu: 16, ram: 48 },
      status: 'completed',
      createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
    },
    {
      jobId: 'job-007',
      jobName: 'Database Migration',
      jobUrl: 'https://github.com/user/db-migrator',
      jobDescription: 'Migrating legacy database to modern cloud infrastructure with data validation and integrity checks.',
      resources: { cpu: 4, ram: 12 },
      status: 'failed',
      createdAt: new Date(now.getTime() - 18 * 60 * 60 * 1000) // 18 hours ago
    },
    {
      jobId: 'job-008',
      jobName: 'API Load Testing',
      jobUrl: 'https://docker.io/loadimpact/k6',
      jobDescription: 'Comprehensive load testing suite for REST API endpoints. Simulating high traffic scenarios.',
      resources: { cpu: 3, ram: 6 },
      status: 'pending',
      createdAt: new Date(now.getTime() - 45 * 60 * 1000) // 45 minutes ago
    },
    {
      jobId: 'job-009',
      jobName: 'Image Processing Batch',
      jobUrl: 'https://github.com/user/image-processor',
      jobDescription: 'Batch processing of high-resolution images for computer vision training dataset preparation.',
      resources: { cpu: 8, ram: 20 },
      status: 'completed',
      createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
    },
    {
      jobId: 'job-010',
      jobName: 'Cryptocurrency Mining',
      jobUrl: 'https://github.com/user/crypto-miner',
      jobDescription: 'Experimental cryptocurrency mining operation for research purposes. Testing energy efficiency algorithms.',
      resources: { cpu: 10, ram: 16 },
      status: 'running',
      createdAt: new Date(now.getTime() - 8 * 60 * 60 * 1000) // 8 hours ago
    },
    {
      jobId: 'job-011',
      jobName: 'Log Analysis Pipeline',
      jobUrl: 'https://docker.io/elastic/logstash',
      jobDescription: 'Real-time log analysis and monitoring system for distributed microservices architecture.',
      resources: { cpu: 5, ram: 14 },
      status: 'failed',
      createdAt: new Date(now.getTime() - 4 * 60 * 60 * 1000) // 4 hours ago
    },
    {
      jobId: 'job-012',
      jobName: 'Weather Data Aggregation',
      jobUrl: 'https://github.com/user/weather-aggregator',
      jobDescription: 'Collecting and processing weather data from multiple APIs for climate research analysis.',
      resources: { cpu: 2, ram: 4 },
      status: 'pending',
      createdAt: new Date(now.getTime() - 15 * 60 * 1000) // 15 minutes ago
    },
    {
      jobId: 'job-013',
      jobName: 'Neural Network Training',
      jobUrl: 'https://github.com/user/neural-net',
      jobDescription: 'Training convolutional neural network for medical image analysis. Requires extensive computational resources.',
      resources: { cpu: 14, ram: 56 },
      status: 'completed',
      createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
    },
    {
      jobId: 'job-014',
      jobName: 'Financial Risk Analysis',
      jobUrl: 'https://github.com/user/risk-analyzer',
      jobDescription: 'Monte Carlo simulation for portfolio risk assessment and stress testing financial models.',
      resources: { cpu: 7, ram: 28 },
      status: 'running',
      createdAt: new Date(now.getTime() - 1 * 60 * 60 * 1000) // 1 hour ago
    },
    {
      jobId: 'job-015',
      jobName: 'Game Server Instance',
      jobUrl: 'https://docker.io/minecraft/server',
      jobDescription: 'Dedicated game server hosting for multiplayer online gaming with mod support and custom configurations.',
      resources: { cpu: 6, ram: 18 },
      status: 'failed',
      createdAt: new Date(now.getTime() - 10 * 60 * 60 * 1000) // 10 hours ago
    }
  ];

  return mockJobs;
};
