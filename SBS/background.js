realApiKey = 'vj103o0ndh19vkea0mo8hnx2zbxigti1yhp2st3yqxqpmbp0o974vvsnsyurfwol'

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log(tab.url);
    isSafeUrl(tab.url).then((value) => {
        if (value) {
            console.log("Safe page");
        }
        else {
            console.log("UnsafePage");
            replaceTab(tab, 3)
        }
    })
});

function replaceTab(tab, tryies) {
    chrome.tabs.get(tab.id)
        .then((tab) => {

            chrome.tabs.update(tab.id, { url: chrome.runtime.getURL('Blocked/index.html') })
                .then((val) => {
                    console.log(val)
                })
                .catch((e) => {
                    console.log(e)
                    if (tryies > 0) {
                        tryies--;
                        setTimeout(function () {
                            replaceTab(tab, tryies);
                        }, 100)
                    }
                });
        }).catch((e) => {
            if (tryies > 0) {
                tryies--;
                setTimeout(function () {
                    replaceTab(tab, tryies);
                }, 100)
            }
            console.log("Page not found")
            console.log(e)
        })

}

//Uncaught SyntaxError: Cannot use import statement outside a module

//<script type="module" src="milsymbol-2.0.0/src/milsymbol.js"></script>


async function isSafeUrl(url) {
    return ifApiCorrect(url)
}

async function handleScanResult(whichJob) {
    const url = 'https://developers.checkphish.ai/api/neo/scan';
    const options = {
        method: 'POST',
        body: JSON.stringify({
            apiKey: realApiKey,
            jobID: whichJob,
            insights: true
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
    };

    return await fetch(url, options)
        .then((res) => res.json())
        .then(body => {
            return body.disposition == "clean"; //koniec, jak clean to ok, inaczej zła
        })
        .catch(error => {
            console.error(error)
            return true
        })
}


async function ifApiCorrect(whichURL) {
    const url = 'https://developers.checkphish.ai/api/neo/scan';
    const options = {
        method: 'POST',
        body: JSON.stringify({
            apiKey: realApiKey,
            urlInfo: {
                url: whichURL
            },
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
    };

    return await fetch(url, options)
        .then((res) => res.json())
        .then((body) => {
            console.log(body)
            if (body.jobID == "none") {
                console.log("Brak prób!")
                return true;
            } else {

                return handleScanResult(body.jobID)
            }
        })
        .catch(error => {
            console.error(error)
        })
}

