import { format } from 'date-fns';
import { FORMAT_DATE } from '../global/enum';

export const formatDate = (date: Date, type: FORMAT_DATE) => {
    return format(date, type);
}