#!/usr/bin/env python3
import http.server
import socketserver
import os
from pathlib import Path

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory='public', **kwargs)
    
    def do_GET(self):
        # Remove query parameters
        path = self.path.split('?')[0]
        
        # If path doesn't have extension and isn't a file, serve index.html
        if not os.path.splitext(path)[1]:
            # Check if it's a directory with index.html
            full_path = os.path.join('public', path.lstrip('/'))
            if os.path.isdir(full_path):
                self.path = os.path.join(path, 'index.html')
            elif not os.path.exists(full_path):
                # For any route without extension, serve index.html
                # This enables client-side routing
                self.path = '/index.html'
        
        return super().do_GET()
    
    def end_headers(self):
        # Add CORS headers for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

PORT = 3005
Handler = CustomHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"🚀 Zoo Fund server running at http://localhost:{PORT}")
    print(f"📁 Serving files from: {os.path.abspath('public')}")
    print("\nAvailable routes:")
    print("  http://localhost:3005/          - All projects")
    print("  http://localhost:3005/ocean     - OceanDAO")
    print("  http://localhost:3005/neuro     - NeuroDAO")
    print("  http://localhost:3005/climate   - ClimateDAO")
    print("  http://localhost:3005/space     - SpaceDAO")
    print("\nPress Ctrl-C to stop the server")
    httpd.serve_forever()