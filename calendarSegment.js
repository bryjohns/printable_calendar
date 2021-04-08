class CalendarSegment {
    #startDate;
    get startDate() {
        return this.#startDate;
    }
    set startDate(value) {
        let date = new Date(value);
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
        this.#startDate = date;

        if (this.#endDate === undefined || this.#startDate > this.#endDate)
            this.#endDate = this.#startDate;

        this.loadDays();
    }

    #endDate;
    get endDate() {
        return this.#endDate;
    }
    set endDate(value) {
        let date = new Date(value);
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

        this.#endDate = date;

        if (this.#startDate === undefined || this.#startDate > this.#endDate)
            this.#endDate = this.#startDate;

        this.loadDays();
    };

    // all days ever loaded
    daysLoaded;
    displayDays;

    constructor() {
        this.daysLoaded = [];
    }

    loadDays() {
        this.displayDays = [];

        let daysDiff = this.getDaysDiff();
        
        for (let i = 0; i <= daysDiff; i++) {
            let dateTimeForDay = new Date(this.startDate.getTime() + ((1000 * 3600 * 24) * i))
            let newDay = new Day(dateTimeForDay);

            let existingDay = this.daysLoaded.find(d => d.id === newDay.id);
            if (existingDay) {
                this.displayDays.push(existingDay);
            }
            else {
                this.daysLoaded.push(newDay);
                this.displayDays.push(newDay);
            }
        }

        // todo: actual sort
        this.daysLoaded.sort();
    }

    setDayActivities(id, activities) {
        id = +id;
        let day = this.daysLoaded.find(d => d.id === id);
        day.activities = activities;
        // this.displayDays = this.daysLoaded;
    }

    getDaysDiff() {
        let timeDiffInMills = this.endDate.getTime() - this.startDate.getTime();
        let dayInMills = 1000 * 3600 * 24;

        return timeDiffInMills / dayInMills;
    }
}
