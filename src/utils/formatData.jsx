export default function formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

export function formatDates(datesArray) {
    return datesArray.map((isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    });
}

export function formatTime(timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
}

export const disableOtherDays = (days, data) => {
    let disabledDates = {};

    if (!data || !data.recurrence_day) return disabledDates;

    const recurrenceDayIndex = days[data.recurrence_day];

    for (let year = 2025; year <= 2026; year++) {
        for (let month = 0; month < 12; month++) {
            let date = new Date(year, month, 1);

            while (date.getMonth() === month) {
                const formattedDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

                if (date.getDay() !== recurrenceDayIndex) {
                    disabledDates[formattedDate] = { disabled: true };
                }

                date.setDate(date.getDate() + 1);
            }
        }
    }

    return disabledDates;
};

export function getEventDates(eventDay) {
    const startDate = new Date("2024-12-01");
    const endDate = new Date();
    const dayIndex = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ].indexOf(eventDay);
    const dates = [];

    if (dayIndex === -1) {
        console.error("Invalid event day provided.");
        return [];
    }

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        if (date.getDay() === dayIndex) {
            dates.push(new Date(date));
        }
    }

    return dates;
}

export function getAllEventDates(eventDay, startDate, endDate) {
    const dayOfWeekMap = {
        Sunday: 0,
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6,
    };

    const dayOfWeek = dayOfWeekMap[eventDay];
    if (dayOfWeek === undefined) return [];

    const dates = [];
    let currentDate = new Date(startDate);
    const endDateObj = new Date(endDate);

    while (currentDate <= endDateObj) {
        if (currentDate.getUTCDay() === dayOfWeek) {
            const formattedDate = currentDate.toISOString().split("T")[0];
            dates.push(formattedDate);
        }
        currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }
    return dates;
};

export const getMarkedRange = (start, end) => {
    let range = {};
    let startDateObj = new Date(start);
    let endDateObj = new Date(end);

    while (startDateObj <= endDateObj) {
        let dateString = startDateObj.toISOString().split('T')[0];
        range[dateString] = {
            selected: true,
            color: '#2563EB',
            textColor: 'white'
        };
        startDateObj.setDate(startDateObj.getDate() + 1);
    }

    range[start] = { selected: true, startingDay: true, color: '#2563EB', textColor: 'white' };
    range[end] = { selected: true, endingDay: true, color: '#2563EB', textColor: 'white' };

    return range;
};

export const getPreviousMonthDays = (dayName) => {
    const today = new Date();
    const previousMonth = today.getMonth() - 1;
    const year = today.getFullYear();

    const adjustedYear = previousMonth < 0 ? year - 1 : year;
    const adjustedMonth = previousMonth < 0 ? 11 : previousMonth;

    const daysInMonth = new Date(adjustedYear, adjustedMonth + 1, 0).getDate();

    const daysOfWeek = {
        Sunday: 0,
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6
    };

    const resultDates = [];

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(adjustedYear, adjustedMonth, day);

        if (date.getDay() === daysOfWeek[dayName]) {
            const formattedDate = `${adjustedYear}-${String(adjustedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            resultDates.push(formattedDate);
        }
    }

    return resultDates;
};

export const getCurrentYearDays = (dayName) => {
    const today = new Date();
    const currentYear = today.getFullYear();

    const daysOfWeek = {
        Sunday: 0,
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6
    };

    const resultDates = [];
    let currentDate = new Date(currentYear, 0, 1);
    while (currentDate <= today) {
        if (currentDate.getDay() === daysOfWeek[dayName]) {
            const formattedDate = `${currentYear}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
            resultDates.push(formattedDate);
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return resultDates;
};

export const getPreviousYearDays = (dayName) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const previousYear = currentYear - 1;

    const daysOfWeek = {
        Sunday: 0,
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6
    };

    const resultDates = [];

    const startDate = new Date(previousYear, 11, 1);
    const endDate = new Date(previousYear, 11, 31);

    let currentDate = startDate;
    while (currentDate <= endDate) {
        if (currentDate.getDay() === daysOfWeek[dayName]) {
            const formattedDate = `${previousYear}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
            resultDates.push(formattedDate);
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return resultDates;
};

export const getFirstDayOfCurrentMonth = () => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);

    const formattedDate = `${firstDay.getFullYear()}-${String(firstDay.getMonth() + 1).padStart(2, '0')}-${String(firstDay.getDate()).padStart(2, '0')}`;

    return formattedDate;
};

export const getEventDate = (eventDay, start) => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const targetDayIndex = daysOfWeek.indexOf(eventDay?.trim());

    const startDate = new Date(start);
    if (isNaN(startDate)) {
        console.error("Invalid start date provided:", start);
        return [];
    }

    const today = new Date();
    let resultDates = [];

    while (startDate <= today) {
        if (startDate.getDay() === targetDayIndex) {
            resultDates.push(startDate.toISOString().split("T")[0]);
        }
        startDate.setDate(startDate.getDate() + 1);
    }

    return resultDates;
};

export function filterRequestsByDate(filteredData, startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return filteredData.filter(request => {
        const requestDate = new Date(request.date);
        return requestDate >= start && requestDate <= end;
    });
}