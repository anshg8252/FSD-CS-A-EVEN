import http from 'http';
import os from 'os';

const port = 5001;

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/' && method === 'GET') {
        res.write("Home Page");
        res.end();
    }
    else if (url === '/contact' && method === 'GET') {
        res.write("Contact Page");
        res.end();
    }
    else if (url === '/system' && method === 'GET') {
        const sysdata = {
            operstingSystem: os.platform(),
            Architecture: os.arch(),
            cpuLength: os.cpus().length,
            TotalMemory: (os.totalmem()/1024**3).toFixed(2) + "GB",
            FreeMemory: (os.freemem()/1024**3).toFixed(2) + "GB",
            // network : os.networkInterfaces()
        }
        res.write(JSON.stringify(sysdata));
        res.end();
    }
    else if (url === '/createuser' && method === 'POST') {
        res.write("Create User");
        res.end();
    }
    else if (url.startsWith("/users/") && method === 'GET') {
        res.write("Search User");
        res.end();
    }
    else if (url.startsWith("/users/") && method === 'PUT') {
        res.write("Update User");
        res.end();
    }
    else if (url.startsWith("/users/") && method === 'DELETE') {
        res.write("Delete User");
        res.end();
    }
    else {
        res.write("Error Page");
        res.end();
    }
})
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})