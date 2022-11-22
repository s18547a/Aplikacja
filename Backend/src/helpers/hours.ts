exports.createVetVisitHours = (Hours:string) => {
    const beginEndHours = Hours.split('-');

    const startHour = Number(beginEndHours[0].split(':')[0]);
    const endHour = Number(beginEndHours[1].split(':')[0]);
    console.log(startHour);
    console.log(endHour);
    const times: string[] = [];
    for (let i = startHour; i < endHour; i++) {
        if (i < 10) {
            times.push('0' + i + ':00');
            times.push('0' + i + ':20');
            times.push('0' + i + ':40');
        } else {
            times.push(i + ':00');
            times.push(i + ':20');
            times.push(i + ':40');
        }
    }
    return times;
};
