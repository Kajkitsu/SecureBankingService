const axios = require('axios')

const urlOne = 'https://www.virustotal.com/api/v3/urls'
const params = {}
const config = {
    headers: {
        'x-apikey': '0c403d41979ec693364dca064d11d20391b4f2c7ba7ab3c6191bbe2e39efa072'
    },
    body: {
        url: 'youtube.com'
    }
}

function GetRes(id) {
    const urlTwo = 'https://www.virustotal.com/api/v3/analyses' + id
    axios
        .get(urlTwo, params, config)
        .then(res => {
            let analyse = res.data.attributes.stats
            console.log(analyse)
        })
        .catch(error => {
            console.error(error)
        })
}

function SendToChek() {
    axios
        .post(urlOne, params, config)
        .then(res => {
            let id = res.data.id
            GetRes(id)
        })
        .catch(error => {
            console.error(error)
        })
}

SendToChek()
