export default class Course {
    constructor(data) {
        this.code = data.code
        this.description = data.description
        this.intensity = data.intensity
        this.weight = data.weight
        this.topic = data.topic
    }
}