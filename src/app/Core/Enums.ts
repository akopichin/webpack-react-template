/**
 * Common process status states.
 *
 * 0 (IDLE) - Nothing happens.
 * 1 (RUNNING) - In progress, request sent.
 * 2 (SUCCESS) - Finished success.
 * 3 (FAIL) - Fail with error.
 * 4 (CANCELED) - Cancelled.
 */
export enum EProcessStatus {
    IDLE,
    RUNNING,
    SUCCESS,
    FAIL,
    CANCELED
}
