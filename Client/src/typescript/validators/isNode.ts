export function isNode(eventTarget: EventTarget): eventTarget is Node {
    return (eventTarget as Node).nodeType != undefined;
}