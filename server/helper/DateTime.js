
function getCurrentDateTimeString() {
    var currentdate = new Date(); 
    var datetime = (currentdate.getMonth()+1)+ "/"
                +  currentdate.getDate() + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    return datetime;
}

module.exports = {getCurrentDateTimeString};