const API_HOST = process.env.REACT_APP_API_URL;

function generateRequestingHeaders() {
    const token = localStorage.getItem("userToken");
    return {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json"
    };
}

export async function ajaxAddJourney(body = { tlid: 0, aname: "" }) {
    const response = await fetch(`${API_HOST}/api/POST/addjourney`, {
        method: "POST",
        headers: generateRequestingHeaders(),
        body: JSON.stringify(body)
    });
    return await response.json();
}

export async function ajaxAddList() {
    return fetch(`${API_HOST}/api/POST/addlist`, {
        method: "POST",
        headers: generateRequestingHeaders(),
        body: JSON.stringify({
            title: "請輸入旅行名稱..."
        })
    })
    .then(async (response) => {
        const tlidResult = await response.json();
        console.log(tlidResult, tlidResult.result.tlid);
        return ajaxAddJourney({
            tlid: tlidResult.result.tlid,
            aname: ""
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};

export async function ajaxRemoveList(tlid = 0) {
    // console.log(tlid);
    const response = await fetch(`${API_HOST}/api/POST/deletelist`, {
        method: "POST",
        headers: generateRequestingHeaders(),
        body: JSON.stringify({ 
            tlid
        })
    });
    if (response.status === 204) {
        return {};
    }
    return await response.json();
}

