export function parseResponse(type, body) {

    let bodyJSON = JSON.parse(body);

    switch (type) {
        case "dryrun": return parseDryRun(type, bodyJSON);
        case "sync": return parseSync(type, bodyJSON);
        case "commit": return parseCommit(type, bodyJSON);
        case "replacesnap": return parseReplaceSnap(type, bodyJSON);
        case "replaceconf": return parseReplaceConf(type, bodyJSON);
        default: break;
    }
}

function parseDryRun(type, bodyJSON) {
    let {overallStatus, configuration, nodeStatus, errorMessage, errorType} = "";
    overallStatus = bodyJSON["output"]["overall-configuration-status"];

    if (bodyJSON["output"]["node-config-results"]) {
        nodeStatus = bodyJSON["output"]["node-config-results"]["node-config-result"]["0"]["configuration-status"];
        errorMessage = bodyJSON["output"]["node-config-results"]["node-config-result"]["0"]["error-message"];
        errorType = bodyJSON["output"]["node-config-results"]["node-config-result"]["0"]["error-type"];
        configuration = bodyJSON["output"]["node-config-results"]["node-config-result"]["0"]["configuration"];

    }
    return {type, overallStatus, nodeStatus, errorMessage, errorType, configuration}
}

function parseSync(type, bodyJSON) {
    let {nodeId, status, errorMessage} = "";
    if (bodyJSON["output"]["node-sync-status-results"]["node-sync-status-result"]){
        nodeId = bodyJSON["output"]["node-sync-status-results"]["node-sync-status-result"][0]["nodeId"];
        status = "updated with changes";
        errorMessage =  bodyJSON["output"]["node-sync-status-results"]["node-sync-status-result"][0]["error-message"];
    } else if (bodyJSON["output"]["node-sync-status-results"]) {
        status = "without changes"
    } else {
        status = "error"
    }
    return {type, nodeId, status, errorMessage}
}

function parseCommit(type, bodyJSON) {
    let {overallStatus, configuration, nodeStatus, errorMessage, errorType} = "";
    overallStatus = bodyJSON["output"]["overall-configuration-status"];

    if (bodyJSON["output"]["node-config-results"]) {
        nodeStatus = bodyJSON["output"]["node-config-results"]["node-config-result"]["0"]["configuration-status"];
        errorMessage = bodyJSON["output"]["node-config-results"]["node-config-result"]["0"]["error-message"];
        errorType = bodyJSON["output"]["node-config-results"]["node-config-result"]["0"]["error-type"];
        configuration = bodyJSON["output"]["node-config-results"]["node-config-result"]["0"]["configuration"];

    }
    return {type, overallStatus, nodeStatus, errorMessage, errorType, configuration}
}

function parseReplaceSnap(type, bodyJSON) {
    let status = "";
    if (bodyJSON["output"]) {
        status = bodyJSON["output"]["result"];
    }
    return {type, status}
}

function parseReplaceConf(type, bodyJSON) {
    let status = "";
    if (bodyJSON["output"]) {
        status = bodyJSON["output"]["result"];
    }
    return {type, status}
}