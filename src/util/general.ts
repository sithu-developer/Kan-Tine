export const calculateEndDate = (date : number , month : number , year : number , totalMonths : number ) => {
    const endDate = new Date();
    endDate.setDate(date);
    endDate.setMonth(month -1);
    endDate.setFullYear(year);
    endDate.setMonth(endDate.getMonth() + totalMonths)
    return endDate;
};
