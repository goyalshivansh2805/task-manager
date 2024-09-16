const priorityMap = {
    "low":0,
    "medium":1,
    "high":2
}

const reverseMap = Object.fromEntries(Object.entries(priorityMap).map(([key,value])=>[value,key.charAt(0).toUpperCase() + key.slice(1)]));


const priorityConvertor = (value)=>{
    if(typeof value === "string"){
        return priorityMap[value.toLowerCase()] ?? null;
    }else if(typeof value === "number"){
        return reverseMap[value] ?? null;
    }
    return null;
}

module.exports = priorityConvertor;