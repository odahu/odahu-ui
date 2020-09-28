import {AsyncAction} from "../store";
import {hideBackdrop, showBackdrop} from "../store/backdrop/actions";
import {showErrorAlert, showSuccessAlert} from "../store/alert/actions";

/**
 * Process of creating/editing of Odahu entity
 */
export class SaveButtonClick<T> {
    private createAction: (entity: T) => AsyncAction<Promise<T>>;
    private fetchAllAction: () => AsyncAction;
    private successMessage: string;
    private successCallback?: (entity: T) => void;

    /**
     * @param modifyAction - redux action that allows creating or editing of Odahu entity
     * @param fetchAllAction - redux action that fetch a type of Odahu entities from API server
     * @param successMessage - a message that appears after successful modifyAction
     * @param successCallback - a function that will be called after successful processing of update logic
     */
    constructor(modifyAction: (entity: T) => AsyncAction<Promise<T>>,
                fetchAllAction: () => AsyncAction,
                successMessage: string,
                successCallback?: (entity: T) => void
                ) {
        this.createAction = modifyAction;
        this.fetchAllAction = fetchAllAction;
        this.successMessage = successMessage;
        this.successCallback = successCallback;
    }

    /**
     * Start a process of creating/editing of Odahu entity
     * @param entity - Odahu entity
     * @param dispatch - The redux dispatch hook https://react-redux.js.org/next/api/hooks#usedispatch
     * @param setRedirect - TODO: replace with some successful callback
     */
    handle = (entity: T,
              dispatch: any,
              setRedirect?: (value: boolean) => void) => {
        dispatch(showBackdrop());

        dispatch(this.createAction(entity)).then(() => {
            return dispatch(showSuccessAlert('Success', this.successMessage));
        }).then(() => {
            return dispatch(this.fetchAllAction());
        }).then(() => {
            if (setRedirect) {
                setRedirect(true);
            }
        }).then(() => {
            if(this.successCallback) {
                this.successCallback(entity)
            }
        }).catch((err: string) => {
            dispatch(showErrorAlert("Error", String(err)));
        }).finally(() => {
            dispatch(hideBackdrop());
        });
    }
}
