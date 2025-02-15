export default class GameObject {
    constructor(world, body, ref) {
        this.world = world;
        this.body = body;
        this.ref = ref;
    }

    draw() {
        this.body.draw();
    }
}