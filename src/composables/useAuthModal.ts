import {useConfirm} from "primevue/useconfirm";
import type {ConfirmationOptions} from 'primevue/confirmationoptions'

export default function useAuthModal(options: ConfirmationOptions = {

    accept: () => {
        console.log('Accept')
    },
    reject: () => {
        console.log('reject')
    }
}) {
    const confirm = useConfirm();
    confirm.require({
        group: 'headless',
        message: 'Bu amal avtorizatsiya talab etadi',
        header: 'Avtorizatsiya',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Bekor qilish',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Avtorizatsiyadan o\'tish'
        },
        accept: options.accept,
        reject: options.reject
    });
}
