export const convertSeconds = seconds => {
    let sec = Number(Number(seconds).toFixed(1));
    if(sec) {
        let days = Math.floor(sec / (3600 * 24));
        sec -= days * 3600 * 24;
        let hrs = Math.floor(sec / 3600);
        sec -= hrs * 3600;
        let mnts = Math.floor(sec / 60);
        sec -= mnts * 60;
        sec = Number(Number(sec).toFixed(1));
        return {
            days,
            hrs,
            mnts,
            sec
        };
    }
    return "";
};

export const convertSecondsIntoString = (seconds) => {
    const obj = convertSeconds(seconds);
    const { days, hrs, mnts, sec } = obj;
    return `[${(days?days + "d:":"") + (hrs?hrs + "h:":"") + (mnts?mnts + "m:":"") + (sec?sec + "s":"")}]`;
}

export const formatBytes = (bytes,decimals) => {
    if(bytes === 0) return '0 Bytes';
    let k = 1024,
        dm = decimals <= 0 ? 0 : decimals || 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const formatTime = (type="",value) => {
    if(type) {
        return `${value ? (value < 10 ? "0" + value : value) : " --"}:${type}`;
    }
    else return "type is not valid";
};


export const isEmpty = (object) => { 
    if(Object.keys(object).length === 0) 
    {
        return true;
    }
    else return false;
};