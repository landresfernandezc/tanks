/**
 * Created by Andres on 11/5/2017.
 */
function doDelay(wait){
    var date = new Date();
    var startDate = date.getTime();
    var a = 1;
    var b = 0;
    while (a !== 0) {
        date = new Date();
        if ((date.getTime() - startDate) >= wait) {
            a = 0;
        }
        b++;
    }
}