Object.defineProperty(Array, "equal", {
    enumerable: false,
    value: function(arr1, arr2){
        // poorman array comparison
        return JSON.stringify(arr1) === JSON.stringify(arr2)
    }    
});
