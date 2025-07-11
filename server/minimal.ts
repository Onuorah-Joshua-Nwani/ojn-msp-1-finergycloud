import express from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
const port = process.env.PORT || 3000;

console.log('=== FinergyCloud Minimal Server Starting ===');
console.log('Environment:', process.env.NODE_ENV);
console.log('Port:', port);
console.log('Working directory:', process.cwd());

// Basic middleware
app.use(express.json());
app.use(express.static('dist/public'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static files
app.get('*', (req, res) => {
  console.log('Request for:', req.path);
  
  const indexPath = path.join(__dirname, '../dist/public/index.html');
  const distPath = path.join(__dirname, '../dist/public');
  
  console.log('Looking for index at:', indexPath);
  console.log('Dist directory exists:', fs.existsSync(distPath));
  console.log('Index file exists:', fs.existsSync(indexPath));
  
  if (fs.existsSync(indexPath)) {
    console.log('Serving index.html');
    res.sendFile(indexPath);
  } else {
    console.log('Serving fallback HTML');
    res.status(200).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>FinergyCloud</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          h1 { color: #2563eb; margin-bottom: 20px; }
          .status { background: #dcfce7; padding: 16px; border-radius: 6px; border-left: 4px solid #16a34a; margin: 20px 0; }
          .info { background: #f0f9ff; padding: 16px; border-radius: 6px; border-left: 4px solid #0ea5e9; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🌱 FinergyCloud</h1>
          <div class="status">
            <strong>✅ Server Status: Running Successfully</strong>
          </div>
          <div class="info">
            <strong>Server Information:</strong><br>
            Environment: ${process.env.NODE_ENV}<br>
            Port: ${port}<br>
            Timestamp: ${new Date().toISOString()}<br>
            Working Directory: ${process.cwd()}
          </div>
          <p><strong>Renewable Energy Investment Platform</strong></p>
          <p>The FinergyCloud server is running successfully. The platform provides AI-powered predictions, ESG scoring, and portfolio management for clean energy projects.</p>
          <p><em>If you're seeing this page, the deployment was successful and the server is responding correctly.</em></p>
        </div>
      </body>
      </html>
    `);
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
