

export const dateStringToDateString = (dateString: string): string => {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'long' });
    const dateNum = date.getDate();
    return month + " " + dateNum;
}

export const dateStringToTimeString = (dateString: string): string => {
    return (new Date(dateString)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}