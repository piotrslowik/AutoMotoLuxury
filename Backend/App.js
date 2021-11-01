import express from 'express';
import bodyParser from 'body-parser';
import expressGraphqlHttp from 'express-graphql';
const { graphqlHTTP } = expressGraphqlHttp;
import mongoose from 'mongoose';

import cloudinary from 'cloudinary';

import graphqlSchema from './GraphQL/schema/index.js';
import graphqlResolvers from './GraphQL/resolvers/index.js';

import uploadRouter from './Routers/upload.js';

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
  
app.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  rootValue: graphqlResolvers,
  graphiql: true,
}));

app.use('/upload', uploadRouter);


mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-uccjg.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(8000);
    })
    .catch(error => {
        console.error(error);
    })

cloudinary.config({ 
  cloud_name: 'auto-moto-luxury', 
  api_key: '419514689614423', 
  api_secret: 'zt6W8gQTeehhJVUD42gSCLqIyEc' 
});
