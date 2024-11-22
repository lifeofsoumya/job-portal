export function formatMoney(money){
    let formatter = new Intl.NumberFormat('en-IN');
    return formatter.format(money)
}