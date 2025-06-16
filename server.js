const http = require('http');
const fs = require('fs');
const path = require('path');

// Configuración del puerto
const PORT = process.env.PORT || 3005;
const ALTERNATIVE_PORT = 3005;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    
    // Si la URL termina en / o no tiene extensión, buscar index.html
    let url = req.url;
    
    // Si la URL es / o termina en /, servir index.html
    if (url === '/' || url.endsWith('/')) {
        url = url + 'index.html';
    }
    
    // Si la URL no tiene extensión y no termina en /, intentar redirigir a index.html
    if (path.extname(url) === '' && !url.endsWith('/')) {
        url = '/index.html';
    }
    
    let filePath = path.join(__dirname, url);
    const extname = path.extname(filePath);
    let contentType = MIME_TYPES[extname] || 'application/octet-stream';
    
    // Leer el archivo
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Página no encontrada
                fs.readFile(path.join(__dirname, '404.html'), (err, content) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content || '<h1>404 - Página no encontrada</h1>', 'utf-8');
                });
            } else {
                // Error del servidor
                res.writeHead(500);
                res.end(`Error del servidor: ${err.code}`);
            }
        } else {
            // Éxito
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Intentar iniciar el servidor en el puerto principal
const startServer = (port) => {
    server.listen(port)
        .on('listening', () => {
            console.log(`✅ Servidor corriendo en http://localhost:${port}/`);
            console.log('La aplicación está lista para ser desplegada en Railway');
        })
        .on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.warn(`❌ El puerto ${port} está ocupado.`);
                console.error('❌ No se pudo iniciar el servidor. El puerto está ocupado.');
                process.exit(1);
            } else {
                console.error('❌ Error al iniciar el servidor:', err);
                process.exit(1);
            }
        });
};

// Iniciar servidor
startServer(PORT);
