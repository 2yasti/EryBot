require ("dotenv").config();

const express = require("express")
const Dialogflow = require("@google-cloud/dialogflow")
const {v4: uuid} = require ("uuid")
const Path = require("path")

const app = express()
app.use(express.json())
app.post("/teks", async (req, res)=>{
    const { message } = req.query;

//Membuat session baru
const sessionClient = new Dialogflow.SessionsClient({
    keyFilename: Path.join(__dirname, "./key.json"),
});

const sessionPath = sessionClient.projectAgentSessionPath(
    'erybot-kqwc',
    uuid()
);

//Request object kepada Dialogflow
const request = {
    session: sessionPath,
    queryInput:{
        text:{
            //Query yg akan dikirim ke agent
            text: message,
            languageCode: 'en-US',
        },
    },
};

//Respons dari agent
try{
    const responses = await sessionClient.detectIntent(request);
    res.status(200).send({data: responses});
} catch (e){
    console.log(e);
    res.status(422).send({e});
}
});

module.exports =app