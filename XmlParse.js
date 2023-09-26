//export default 

function ConvertXMLtoJSON (xmlString) {
    let objectStack = [];
    const xmlStringParts = xmlString.split("\n");
    const distance = xmlStringParts.length;
    const result = {};
 
    const getKey = new RegExp(/^\s*<([^\/>]+)/);
    const getValue = new RegExp(/>([^<\n]+)/);
    const openOrCloseObject = new RegExp(/^\s*<([^\s>]+)(\s|>$)/);
 
    //Helper
    function addElement (key = undefined, value = undefined) {
       entry = result;
       for (let i = 0; i < objectStack.length; i++) {
          entry = Array.isArray(entry[objectStack[i]]) ? entry[objectStack[i]].at(-1) : entry[objectStack[i]];
       }
       if (value === undefined) {
          if (!entry.hasOwnProperty(key)) entry[key] = {};
          else if (entry.hasOwnProperty(key) && Array.isArray(entry[key])) entry[key].push({});
          else if (entry.hasOwnProperty(key) && !Array.isArray(entry[key])) {
             let temp = JSON.stringify(entry[key]);
             entry[key] = [];
             entry[key].push(JSON.parse(temp), {});
          }
       }
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
 
 ConvertXMLtoJSON(`   
 <catalog>
    <book id="bk101">
       <author>Gambardella, Matthew</author>
       <title>XML Developer's Guide</title>
       <genre>Computer</genre>
       <price>44.95</price>
       <publish_date>2000-10-01</publish_date>
       <description>An in-depth look at creating applications 
       with XML.</description>
    </book>
    <book id="bk102">
       <author>Ralls, Kim</author>
       <title>Midnight Rain</title>
       <genre>Fantasy</genre>
       <price>5.95</price>
       <publish_date>2000-12-16</publish_date>
       <description>A former architect battles corporate zombies, 
       an evil sorceress, and her own childhood to become queen 
       of the world.</description>
    </book>
    <book id="bk103">
       <author>Corets, Eva</author>
       <title>Maeve Ascendant</title>
       <genre>Fantasy</genre>
       <price>5.95</price>
       <publish_date>2000-11-17</publish_date>
       <description>After the collapse of a nanotechnology 
       society in England, the young survivors lay the 
       foundation for a new society.</description>
    </book>
    <book id="bk104">
       <author>Corets, Eva</author>
       <title>Oberon's Legacy</title>
       <genre>Fantasy</genre>
       <price>5.95</price>
       <publish_date>2001-03-10</publish_date>
       <description>In post-apocalypse England, the mysterious 
       agent known only as Oberon helps to create a new life 
       for the inhabitants of London. Sequel to Maeve 
       Ascendant.</description>
    </book>
    <book id="bk105">
       <author>Corets, Eva</author>
       <title>The Sundered Grail</title>
       <genre>Fantasy</genre>
       <price>5.95</price>
       <publish_date>2001-09-10</publish_date>
       <description>The two daughters of Maeve, half-sisters, 
       battle one another for control of England. Sequel to 
       Oberon's Legacy.</description>
    </book>
    <book id="bk106">
       <author>Randall, Cynthia</author>
       <title>Lover Birds</title>
       <genre>Romance</genre>
       <price>4.95</price>
       <publish_date>2000-09-02</publish_date>
       <description>When Carla meets Paul at an ornithology 
       conference, tempers fly as feathers get ruffled.</description>
    </book>
    <book id="bk107">
       <author>Thurman, Paula</author>
       <title>Splish Splash</title>
       <genre>Romance</genre>
       <price>4.95</price>
       <publish_date>2000-11-02</publish_date>
       <description>A deep sea diver finds true love twenty 
       thousand leagues beneath the sea.</description>
    </book>
    <book id="bk108">
       <author>Knorr, Stefan</author>
       <title>Creepy Crawlies</title>
       <genre>Horror</genre>
       <price>4.95</price>
       <publish_date>2000-12-06</publish_date>
       <description>An anthology of horror stories about roaches,
       centipedes, scorpions  and other insects.</description>
    </book>
    <book id="bk109">
       <author>Kress, Peter</author>
       <title>Paradox Lost</title>
       <genre>Science Fiction</genre>
       <price>6.95</price>
       <publish_date>2000-11-02</publish_date>
       <description>After an inadvertant trip through a Heisenberg
       Uncertainty Device, James Salway discovers the problems 
       of being quantum.</description>
    </book>
    <book id="bk110">
       <author>O'Brien, Tim</author>
       <title>Microsoft .NET: The Programming Bible</title>
       <genre>Computer</genre>
       <price>36.95</price>
       <publish_date>2000-12-09</publish_date>
       <description>Microsoft's .NET initiative is explored in 
       detail in this deep programmer's reference.</description>
    </book>
    <book id="bk111">
       <author>O'Brien, Tim</author>
       <title>MSXML3: A Comprehensive Guide</title>
       <genre>Computer</genre>
       <price>36.95</price>
       <publish_date>2000-12-01</publish_date>
       <description>The Microsoft MSXML3 parser is covered in 
       detail, with attention to XML DOM interfaces, XSLT processing, 
       SAX and more.</description>
    </book>
    <book id="bk112">
       <author>Galos, Mike</author>
       <title>Visual Studio 7: A Comprehensive Guide</title>
       <genre>Computer</genre>
       <price>49.95</price>
       <publish_date>2001-04-16</publish_date>
       <description>Microsoft Visual Studio 7 is explored in depth,
       looking at how Visual Basic, Visual C++, C#, and ASP+ are 
       integrated into a comprehensive development 
       environment.</description>
    </book>
 </catalog>`)