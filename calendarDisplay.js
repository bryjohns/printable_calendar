class CalendarDisplay {
    calendarSegment;
    viewOptions;

    constructor(calendarSegment, viewOptions) {
        this.calendarSegment = calendarSegment;
        this.viewOptions = viewOptions;
    }

    getHtml() {
        let daysHtml = '';
        for (let i = 0; i < this.calendarSegment.displayDays.length; i++) {
            daysHtml += this.getDayHtml(this.calendarSegment.displayDays[i]);
        }
        return this.getCalendarHtml(daysHtml, this.calendarSegment.displayDays.length);
    }

    getDayEditHtml(dayId) {
        let day = this.calendarSegment.daysLoaded.find(d => d.id == dayId);
        return `
            <textarea>${day.activities}</textarea>
            <button type="button">Done</button>
        `;
    }

    getCalendarHtml(daysHtml, daysDisplayedCount) {
        let cols = Math.min(daysDisplayedCount, 7);
        let rows = Math.ceil(daysDisplayedCount / 7);
        
        return `
            <div class="calendar-segment-wrapper">
                <div class="calendar-segment col-count-${cols} row-count-${rows}">
                    ${daysHtml}
                </div>
            </div>
        `;

    }

    getDayHtmlById(id) {
        return this.getDayHtml(this.calendarSegment.daysLoaded.find(d => d.id === +id));
    }

    getDayHtml(day) {
        let date = day.date.getDate();
        let activitiesHtml = this.getActivitiesHtml(day);
        let id = day.id;

        let removeControl = activitiesHtml ? '<div class="remove-control">&mdash;</div>' : '';
        return `        
            <div class="day" id="${id}">
                <div class="date">${date}</div>
                ${activitiesHtml}
                ${removeControl}
            </div>
        `;

    }

    getActivitiesHtml(day) {
        if (!day.activities)
            return '';

        let activities = day.activities.split("\n");

        let activitiesHtml = '';

        for (let i = 0; i < activities.length; i++) {
            let activity = this.wrapActivity(activities[i]);
            activitiesHtml += '<li>' + activity + '</li>';
        }

        return '<ul class="activities">' + activitiesHtml + '</ul>';
    }

    wrapActivity(activity) {
        if (activity.startsWith('**') && activity.endsWith('**'))
            return '<strong>' + activity.substring(2, activity.length -2) + '</strong>';
        if (activity.startsWith('[red]'))
            return '<span class="r">' + activity.substring(5) + '</span>';
        if (activity.startsWith('[blue]'))
            return '<span class="b">' + activity.substring(6) + '</span>';
        if (activity.startsWith('[green]'))
            return '<span class="g">' + activity.substring(7) + '</span>';

        return activity;
    }
}