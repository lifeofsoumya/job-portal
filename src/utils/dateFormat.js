export default function dateFormat(date){
    let tempDate;

    if(date instanceof Date){
        tempDate = date;
    } else if(typeof date == 'string'){
        tempDate = new Date(date);
    }
    else {
        return ""
    }

    if(isNaN(tempDate)){
        return ""
    }

    return tempDate.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    })
}