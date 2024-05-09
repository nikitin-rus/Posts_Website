export function getFormattedDate(date: Date) {
    const diffDate = new Date(new Date().getTime() - date.getTime());

    let day: string | undefined;
    let month: string | undefined;
    let year: string | undefined;
    let hour: string | undefined;
    let minute: string | undefined;

    const formatter = new Intl.DateTimeFormat("ru-RU", {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    });

    const parts = formatter.formatToParts(date);

    parts.map((p) => {
        if (p.type === "day") {
            day = p.value;
        } else if (p.type === "month") {
            month = p.value;
        } else if (p.type === "year") {
            year = p.value;
        } else if (p.type === "hour") {
            hour = p.value;
        } else if (p.type === "minute") {
            minute = p.value;
        }
    });

    if (diffDate.getFullYear() - 1970 >= 1) {
        return day + " " + month + " " + year + " в " + hour + ":" + minute;
    }

    return day + " " + month + " в " + hour + ":" + minute;
}