//友盟webview统计js
function onEvent(tag, label, duration) {
    prompt("event", JSON.stringify({tag:tag,label:label, duration:duration}));
}

function onKVEvent(tag, map, duration) {
    map.id = tag;
    map.duration = duration;

    prompt("ekv", JSON.stringify( map ));
}

