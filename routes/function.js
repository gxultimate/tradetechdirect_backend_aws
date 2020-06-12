class Filter {




    removeUndefinedProps(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop) && obj[prop] === "") {
            
                delete obj[prop];
            }
        }
        return obj;
      }



}


module.exports = Filter