

export function flattenJson(data) {
    const flatten = (obj, prefix = [], current = {}) => {
        if (typeof(obj) === 'object' && obj !== null) {
            for (const key of Object.keys(obj)) {
                flatten(obj[key], prefix.concat(key), current)
            }
        } 
        else {
            current[prefix.join('.')] = obj;
        }
            return current;
    }
    let flat = flatten(data);
return flatten(data);
}

export function getCsv(orders, title) {
    let newobj = [];
    let csv;
    if(orders) {
        orders[0] = this.flattenJson(orders[0]);
        const names = Object.getOwnPropertyNames(orders[0]);
        orders.forEach(o => {
            newobj.push(this.flattenJson(o));
        });
        for(let row = 0; row < newobj.length; row++){
            let keysAmount = Object.keys(newobj[row]).length
            let keysCounter = 0
            // If this is the first row, generate the headings
            if(row === 0){
                // Loop each property of the object
                for(let key in newobj[row]){
                    // This is to not add a comma at the last cell
                    // The '\r\n' adds a new line
                    csv += key + (keysCounter+1 < keysAmount ? ',' : '\r\n' )
                    keysCounter++
                }
            }else{
                for(let key in newobj[row]){
                    csv += newobj[row][key] + (keysCounter+1 < keysAmount ? ',' : '\r\n' )
                    keysCounter++
                }
            }
            keysCounter = 0
        }
        let link = document.createElement('a')
        link.id = orders[0].tid
        link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));
        link.setAttribute('download', `${title}.csv`);
        document.body.appendChild(link)
        document.querySelector(orders[0].tid).click()
    }
}

