const axios = require('axios');
const cheerio = require('cheerio');

class SyncBoard {
    constructor() {
        this.baseUrl = 'https://UCLIPBOARD.COM';
    };

    async set(content) {
        return new Promise(async (resolve, reject) => {
            const randomKey = Math.random().toString(36).substr(2, 9);
            const data = {
                type: 'api',
                content: content
            };

            axios.post(this.generateUrl(randomKey), data)
                .then(function (response) {
                    //response.status
                    console.log(response);
                    resolve(randomKey);
                })
                .catch(function (error) {
                    console.log(error);
                    resolve(null);
                });
        });
    };

    async get(id) {
        axios({
            method: 'get',
            url: this.generateUrl(id),

            // `transformResponse` allows changes to the response data to be made before
            // it is passed to then/catch
            transformResponse: [function (data) {
                console.log(data);
                // Do whatever you want to transform the data
                // const $ = cheerio.load(data);
                // const result = JSON.parse($('#target').textContent);
                // console.log(result);
                // return result;
            }],
        })
    }

    generateUrl(id) {
        return this.baseUrl + '/' + id;
    }

    async remove(id) {

    }
}

export default new SyncBoard();
