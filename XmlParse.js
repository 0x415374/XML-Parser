//export default 

function ConvertXMLtoJSON (xmlString) {
    let objectStack = [];
    const xmlStringParts = xmlString.split("\n");
    const distance = xmlStringParts.length;
    const result = {};

    const getKey = new RegExp(/^\s*<([^\/>]+)/);
    const getValue = new RegExp(/>([^<\n]+)/);
    const openOrCloseObject = new RegExp(/^\s*<([^<]+)>$/);

    //Helper
    function addElement (key = undefined, value = undefined) {
        entry = result;
        for (let i = 0; i < objectStack.length; i++) {
            entry = entry[objectStack[i]];
        }
        if (value === undefined) entry[key] = {};
        else if (value !== undefined) {
            entry[key] = value;
        }
    }

    for (let line = 0; line <= distance; line++) {
        const current = xmlStringParts[line];
        let isObjectRelevant = openOrCloseObject.exec(current);
        if (isObjectRelevant && isObjectRelevant[1]) {
            if (isObjectRelevant[1][0] === "/") objectStack.pop();
            else if (isObjectRelevant[1][0] !== "/") {
                addElement(isObjectRelevant[1]);
                objectStack.push(isObjectRelevant[1]);
            }
            continue;
        }
        let currentKey = getKey.exec(current);
        let currentValue = getValue.exec(current);
        if (currentKey && currentValue) {
            addElement(currentKey[1], currentValue[1]);
        }
        console.log(objectStack, result)
    }
    console.log(JSON.stringify(result))
    return JSON.stringify(result)
}

ConvertXMLtoJSON(`    <food>
    <name>
    <supername>Belgian Waffles</supername>
    </name>
   <price>$5.95</price>
    <description>Two of our famous Belgian Waffles with plenty of real maple syrup</description>
<calories>650</calories>
</food>`)