/*
    *  -------------------------------------  *
    *  -----  app.ts  --  /src/app.ts  -----  *
    *  -------------------------------------  *
*/


import http from 'http';
import fs from 'fs';


const PORT = 8080;


const server = http.createServer((req, res) => {


    const url = req.url || '';
    console.log('Request URL => ', url);

    if (url === '/') {
        
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlFile);
        return;
    }

    if (url.endsWith('.ico')) {
        
        try {
            
            const icoFile = fs.readFileSync(`./public${url}`);
            res.writeHead(200, {
                'Content-Type': 'image/x-icon',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
            });
            res.end(icoFile);

        } catch {
            
            res.writeHead(404);
            res.end();
        }

        return;
    }

    if (url.endsWith('.css')) {
        
        const cssFile = fs.readFileSync(`./public${url}`, 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(cssFile);
        return;
    }

    if (url.endsWith('.js')) {
        const jsFile = fs.readFileSync(`./public${url}`, 'utf-8');
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(jsFile);
        return;
    }

    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1>');


});



server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
