add_zero = (i) => {
    if (i < 10) {
        i = "0" + i
    }; // add zero 
    return i;
}
startTime = () => {
    let current_time = new Date(); // Returning today
    let hour = current_time.getHours(); // Returning hour
    let minute = current_time.getMinutes(); // Returning minute
    let second = current_time.getSeconds(); // Returning second
    minute = add_zero(minute);
    second = add_zero(second);
    let DOM = document.getElementById('result'); // Getting DOM Html
    DOM.innerHTML =
        hour + ":" + minute + ":" + second;
    setTimeout(startTime, 500); // Delaying for 5 milliseconds 
}
startTime();
//---------------------------------------------------------------