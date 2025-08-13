import { ref } from "vue"
import type { Ref } from "vue"

export const notifications: Ref<Notification[]> = ref([])

interface Notification {
    message: string,
    type: string,
}

export const add = (message: string, type = 'success', duration = 0) => {
    const notification: Notification = { message, type }
    notifications.value.push(notification)
    if (duration > 0) {
        setTimeout(() => {
            remove(notification)
        }, duration)
    }
    return notification
}

export const remove = (notification: Notification) => {
    notifications.value = notifications.value.filter((n: Notification) => n !== notification)
}

export default {
    add,
    remove,
    notifications
}
