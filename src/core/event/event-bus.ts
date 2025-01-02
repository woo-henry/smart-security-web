import Vue from "vue";

class EventBus extends Vue {

    publish(event: string, ...args: any[]) {
        this.$emit(event, args);
    }

    subscribe(event: string | string[], callback: Function, once: boolean = false) {
        if(once) {
            this.$once(event, callback);
        } else {
            this.$on(event, callback);
        }
    }

    unsubscribe(event?: string | string[], callback?: Function) {
        this.$off(event, callback);
    }
}

export default new EventBus();