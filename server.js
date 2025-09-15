const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Serve static files
app.use(express.static('.'));

// Store vote counts and user votes
let voteCounts = { red: 0, yellow: 0, green: 0 };
let userVotes = new Map(); // socketId -> vote
let connectedUsers = 0;
const MAX_USERS = 25;

io.on('connection', (socket) => {
    // Check user limit
    if (connectedUsers >= MAX_USERS) {
        socket.emit('error', 'Server is at capacity. Please try again later.');
        socket.disconnect();
        return;
    }
    
    connectedUsers++;
    console.log(`User connected. Total: ${connectedUsers}`);
    
    // Send current vote counts to new user
    socket.emit('voteUpdate', voteCounts);
    socket.emit('userCount', connectedUsers);
    
    // Handle voting
    socket.on('vote', (vote) => {
        if (!['red', 'yellow', 'green'].includes(vote)) {
            return; // Invalid vote
        }
        
        const oldVote = userVotes.get(socket.id);
        
        // Remove old vote
        if (oldVote) {
            voteCounts[oldVote]--;
        }
        
        // Add new vote
        voteCounts[vote]++;
        userVotes.set(socket.id, vote);
        
        // Broadcast to all clients
        io.emit('voteUpdate', voteCounts);
        console.log(`Vote update: ${JSON.stringify(voteCounts)}`);
    });
    
    // Handle chat messages
    socket.on('chatMessage', (message) => {
        if (typeof message === 'string' && message.trim().length > 0 && message.length <= 200) {
            io.emit('chatMessage', message.trim());
        }
    });
    
    // Handle disconnection
    socket.on('disconnect', () => {
        connectedUsers--;
        const userVote = userVotes.get(socket.id);
        if (userVote) {
            voteCounts[userVote]--;
            userVotes.delete(socket.id);
            io.emit('voteUpdate', voteCounts);
        }
        io.emit('userCount', connectedUsers);
        console.log(`User disconnected. Total: ${connectedUsers}`);
    });
});

// Reset votes endpoint (for instructor use)
app.post('/reset-votes', (req, res) => {
    voteCounts = { red: 0, yellow: 0, green: 0 };
    userVotes.clear();
    io.emit('voteUpdate', voteCounts);
    res.json({ success: true, message: 'Votes reset' });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Polling server running on port ${PORT}`);
    console.log(`Access the widget at: http://localhost:${PORT}/poll-widget.html`);
});
