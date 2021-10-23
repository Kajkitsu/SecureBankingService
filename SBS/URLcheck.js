const axios = require('axios')
realApiKey = 't6m9apte7pugokcjmo82st921377km31arrvmztaa5f2i63y6lyayw789k63ebyv'


async function GatherResult(whichJob)
{
    var x = await
    
    axios
    .post('https://developers.checkphish.ai/api/neo/scan/status', {
      apiKey: realApiKey,
      jobID: whichJob, 
      insights: true
    })
    .then(res => {
      x = res.data.disposition == "clean"; //koniec, jak clean to ok, inaczej zła
    })
    .catch(error => {
      console.error(error)
    })

    return x;
}

async function SendToChek(whichURL)
{
    var x = await

    axios
    .post('https://developers.checkphish.ai/api/neo/scan', {
        apiKey: realApiKey,
        urlInfo: {
            url: whichURL 
        }
    })
    .then(res => {
        if (res.data.jobID == "none") {
            console.log("Brak prób!")
            x = false;
        } else {
            x = GatherResult(res.data.jobID)
        }
    })
    .catch(error => {
        console.error(error)
    })

    return x;
}

function TestUrl(url)
{
    return await SendToChek(url)
}

TestUrl("https://www.w3schools.com/jsref/jsref_if.asp") // przykład wywołania