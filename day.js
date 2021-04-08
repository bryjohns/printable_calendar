class Day {
    activities;
    date;
    id;

    constructor(date) {
        this.activities = '';
        this.date = date;
        this.id = date.getTime();
    }

    static copy(day) {
        let nd = new Day(new Date(day.date));
        nd.activities = day.activities;

        return nd;
    }


    
    // addEditRemoveActivity(something, position) {
    //     // remove
    //     if (!something) {
    //         this.removeActivity(position);
    //     }
    //     // add
    //     else if (this.activities.length < position) {
    //         this.activities.push(something);
    //     }
    //     // edit
    //     else {
    //         this.activities[position] = something;
    //     }
    // }

    // removeActivity(position) {
    //     if (position <= this.activities.length)
    //         this.activities.slice(position, 1);
    // }
}