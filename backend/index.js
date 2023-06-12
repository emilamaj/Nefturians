const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { connect } = require('./database');
const BigNumber = require('bignumber.js');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.post('/api/search', async (req, res) => {
    const address = req.body.address;

    const addressBN = new BigNumber(address.toLowerCase());
    const nftIdBN = addressBN.modulo(1241);
    //   const nftId = nftIdBN.toNumber();
    const nftId = 102;
    console.log("nftId: ", nftId);

    const response = await axios.get(`https://api.nefturians.io/metadata/${nftId}`);
    const nftData = response.data;

    const clanAttribute = nftData.attributes.find((attr) => attr.trait_type === 'Clan');
    const clan = clanAttribute ? clanAttribute.value : 'Lone Wolf';
    console.log("clan assigned:", clan);

    const db = await connect();
    const creaturesCollection = db.collection('creatures');
    await creaturesCollection.updateOne(
        { address },
        { $set: { address, nftId, clan } },
        { upsert: true }
    );

    res.json(nftData);
});

app.get('/api/statistics', async (req, res) => {
    console.log("get statistics");
    const db = await connect();
    const creaturesCollection = db.collection('creatures');

    const cyberiansCount = await creaturesCollection.countDocuments({ clan: 'Cyberian' });
    const samuriansCount = await creaturesCollection.countDocuments({ clan: 'Samurian' });
    const loneWolvesCount = await creaturesCollection.countDocuments({ clan: 'Lone Wolf' });

    res.json({
        cyberians: cyberiansCount,
        samurians: samuriansCount,
        loneWolves: loneWolvesCount,
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});