export default class HelperFunctions {
    async chunk(arr) {
        const data = [];

        let i,j,temparray,chunk = 5;
    
        for (i = 0, j = arr.length; i < j; i += chunk) {
            temparray = arr.slice(i, i + chunk);
            data.push(temparray);
        }
        
        return data;
    }
}