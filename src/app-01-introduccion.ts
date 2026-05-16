/*
    *  ---------------------------------------------------------------------  *
    *  -----  app-01-introduccion.ts  --  /src/app-01-introduccion.ts  -----  *
    *  ---------------------------------------------------------------------  *
*/


import http from 'http';
import fs from 'fs';
import path from 'path';



const PORT = 8000;



const server = http.createServer((req, res) => {


    // ----- favicon -----
    if (req.url?.endsWith('/favicon.ico')) {

        const faviconPath = path.join(process.cwd(), 'public', 'favicon', 'favicon.ico');
        console.log('faviconPath => ', faviconPath);

        fs.readFile(faviconPath, (err, data) => {

            if (err) {
                res.writeHead(404);
                res.end();
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'image/x-icon'
            });

            res.end(data);

        });

        return;
    }

    // ----- home -----
    if (req.url === '/') {

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        res.write(`
            <html>
                <head>
                    <link rel="icon" href="/public/favicon/favicon.ico">
                </head>

                <body>
                    <h1>Welcome to Node.js</h1>
                </body>
            </html>
        `);

        res.end();

        return;
    }


    // ----- data -----
    else if (req.url === '/data') {

        console.log('request.url => ', req.url);

        const data = {
            name: 'John Doe',
            age: 30,
            city: 'New York',
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(data));
        res.end();
        return;
    }


    // ----- 404 not found -----
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<h1>404 - Not Found</h1>');
        res.end();
    }


});



server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
