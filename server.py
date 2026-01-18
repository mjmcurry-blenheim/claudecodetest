#!/usr/bin/env python3
"""Simple HTTP server for the weather app"""

import http.server
import socketserver
import os

# Change to the script's directory
os.chdir(os.path.dirname(os.path.abspath(__file__)))

PORT = 8000

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Server running at http://localhost:{PORT}/")
    print(f"Open http://localhost:{PORT}/ in your browser")
    print("Press Ctrl+C to stop the server")
    httpd.serve_forever()
