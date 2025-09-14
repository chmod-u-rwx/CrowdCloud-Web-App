import type { Job } from "@/types";

export const createMockJobs = (): Job[] => {
  const now = new Date();
  const mockJobs: Job[] = [
    {
      job_id: 'job-001',
      job_name: 'ML Model Training Pipeline',
      repo_url: 'https://github.com/user/ml-training',
      job_description: 'Training a deep learning model for image classification using TensorFlow. This job requires high computational resources and runs for several hours.',
      resources: { cpu: 8, ram: 32 },
      status: 'running',
      created_at: new Date(now.getTime() - 2 * 60 * 60 * 1000) // 2 hours ago
    },
    {
      job_id: 'job-002',
      job_name: 'Data Processing ETL',
      repo_url: 'https://docker.io/apache/spark',
      job_description: 'Extract, transform, and load large datasets from multiple sources. Processing customer transaction data for analytics.',
      resources: { cpu: 4, ram: 16 },
      status: 'completed',
      created_at: new Date(now.getTime() - 24 * 60 * 60 * 1000) // 1 day ago
    },
    {
      job_id: 'job-003',
      job_name: 'Video Rendering Service',
      repo_url: 'https://github.com/user/video-renderer',
      job_description: 'High-quality video rendering and encoding service for 4K content. Requires GPU acceleration and substantial memory.',
      resources: { cpu: 12, ram: 64 },
      status: 'failed',
      created_at: new Date(now.getTime() - 6 * 60 * 60 * 1000) // 6 hours ago
    },
    {
      job_id: 'job-004',
      job_name: 'Web Scraping Bot',
      repo_url: 'https://github.com/user/scraper-bot',
      job_description: 'Automated web scraping service for collecting market data from various e-commerce platforms.',
      resources: { cpu: 2, ram: 8 },
      status: 'paused',
      created_at: new Date(now.getTime() - 30 * 60 * 1000) // 30 minutes ago
    },
    {
      job_id: 'job-005',
      job_name: 'Blockchain Node Sync',
      repo_url: 'https://docker.io/ethereum/client-go',
      job_description: 'Synchronizing Ethereum blockchain node for DeFi application backend. Requires consistent uptime and storage.',
      resources: { cpu: 6, ram: 24 },
      status: 'running',
      created_at: new Date(now.getTime() - 12 * 60 * 60 * 1000) // 12 hours ago
    },
    {
      job_id: 'job-006',
      job_name: 'Scientific Simulation',
      repo_url: 'https://github.com/user/physics-sim',
      job_description: 'Monte Carlo simulation for particle physics research. CPU-intensive computation requiring parallel processing.',
      resources: { cpu: 16, ram: 48 },
      status: 'completed',
      created_at: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
    },
    {
      job_id: 'job-007',
      job_name: 'Database Migration',
      repo_url: 'https://github.com/user/db-migrator',
      job_description: 'Migrating legacy database to modern cloud infrastructure with data validation and integrity checks.',
      resources: { cpu: 4, ram: 12 },
      status: 'failed',
      created_at: new Date(now.getTime() - 18 * 60 * 60 * 1000) // 18 hours ago
    },
    {
      job_id: 'job-008',
      job_name: 'API Load Testing',
      repo_url: 'https://docker.io/loadimpact/k6',
      job_description: 'Comprehensive load testing suite for REST API endpoints. Simulating high traffic scenarios.',
      resources: { cpu: 3, ram: 6 },
      status: 'paused',
      created_at: new Date(now.getTime() - 45 * 60 * 1000) // 45 minutes ago
    },
    {
      job_id: 'job-009',
      job_name: 'Image Processing Batch',
      repo_url: 'https://github.com/user/image-processor',
      job_description: 'Batch processing of high-resolution images for computer vision training dataset preparation.',
      resources: { cpu: 8, ram: 20 },
      status: 'completed',
      created_at: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
    },
    {
      job_id: 'job-010',
      job_name: 'Cryptocurrency Mining',
      repo_url: 'https://github.com/user/crypto-miner',
      job_description: 'Experimental cryptocurrency mining operation for research purposes. Testing energy efficiency algorithms.',
      resources: { cpu: 10, ram: 16 },
      status: 'running',
      created_at: new Date(now.getTime() - 8 * 60 * 60 * 1000) // 8 hours ago
    },
    {
      job_id: 'job-011',
      job_name: 'Log Analysis Pipeline',
      repo_url: 'https://docker.io/elastic/logstash',
      job_description: 'Real-time log analysis and monitoring system for distributed microservices architecture.',
      resources: { cpu: 5, ram: 14 },
      status: 'failed',
      created_at: new Date(now.getTime() - 4 * 60 * 60 * 1000) // 4 hours ago
    },
    {
      job_id: 'job-012',
      job_name: 'Weather Data Aggregation',
      repo_url: 'https://github.com/user/weather-aggregator',
      job_description: 'Collecting and processing weather data from multiple APIs for climate research analysis.',
      resources: { cpu: 2, ram: 4 },
      status: 'paused',
      created_at: new Date(now.getTime() - 15 * 60 * 1000) // 15 minutes ago
    },
    {
      job_id: 'job-013',
      job_name: 'Neural Network Training',
      repo_url: 'https://github.com/user/neural-net',
      job_description: 'Training convolutional neural network for medical image analysis. Requires extensive computational resources.',
      resources: { cpu: 14, ram: 56 },
      status: 'completed',
      created_at: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
    },
    {
      job_id: 'job-014',
      job_name: 'Financial Risk Analysis',
      repo_url: 'https://github.com/user/risk-analyzer',
      job_description: 'Monte Carlo simulation for portfolio risk assessment and stress testing financial models.',
      resources: { cpu: 7, ram: 28 },
      status: 'running',
      created_at: new Date(now.getTime() - 1 * 60 * 60 * 1000) // 1 hour ago
    },
    {
      job_id: 'job-015',
      job_name: 'Game Server Instance',
      repo_url: 'https://docker.io/minecraft/server',
      job_description: 'Dedicated game server hosting for multiplayer online gaming with mod support and custom configurations.',
      resources: { cpu: 6, ram: 18 },
      status: 'failed',
      created_at: new Date(now.getTime() - 10 * 60 * 60 * 1000) // 10 hours ago
    }
  ];

  return mockJobs;
};
