# Use the official Node.js image with the specified version
FROM node:20.11.0

ARG SERVER_PORT

ARG SUPABASE_URL
ARG SUPABASE_KEY

ARG YOUTUBE_KEY


ARG SESSION_SECRET
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET

ARG GROQ_API_KEY

# Set the working directory
WORKDIR /

# Copy package.json and package-lock.json (if available)
COPY server/package*.json ./server/

# Install dependencies
RUN cd server && npm install

# Copy the rest of the application files
COPY . .

# Expose the port your server runs on (change as necessary)
EXPOSE $PORT

RUN echo $SERVER_PORT

RUN echo $SUPABASE_URL
RUN echo $SUPABASE_KEY

RUN echo $YOUTUBE_KEY


RUN echo $SESSION_SECRET
RUN echo $GOOGLE_CLIENT_ID
RUN echo $GOOGLE_CLIENT_SECRET

RUN echo $GROQ_API_KEY


# Command to start the server
CMD ["node", "server/src/index.js"] 
