import {defineStore} from "pinia";

type breadCrumb = {
    route?: string | object,
    title: string
}

const useBreadcrumbs = defineStore({
    id: 'breadcrumbs',
    state: (): { breadcrumbs: breadCrumb[] } => {
        return {
            breadcrumbs: []
        }
    },
    actions: {
        addBreadcrumb(payload: breadCrumb) {
            this.breadcrumbs.push(payload)
        },
        removeBreadcrumb(index) {
            this.breadcrumbs.splice(index, 1)
        },
        updateBreadcrumb(payload: breadCrumb[]) {
            this.breadcrumbs = payload
        }
    },
    getters: {
        getBreadcrumbs(state) {
            return state.breadcrumbs
        }
    }
})

export default useBreadcrumbs
