/** TYPES */
import { ProgressInfo, UpdateInfo } from 'builder-util-runtime';

/** IPC "update:status" payload definition */
export interface IUpdateStatus {
    available: boolean;
    checking: boolean;
    next: UpdateInfo | null;
    progress: ProgressInfo | null;
}
