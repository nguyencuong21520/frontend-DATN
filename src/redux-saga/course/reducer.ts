import { createReducer } from "../../utils/redux";
export const COURCES_REQUEST_GET_DATA = "COURCES_REQUEST_GET_API";
export const COURCES_GET_SUCCESS = "COURCES_GET_SUCCESS";
export const COURCES_GET_FAILED = "COURCES_GET_FAILED";

export const GET_ONE_DETAIL_ONE_COURSE = "GET_ONE_DETAIL_ONE_COURSE";
export const GET_ONE_DETAIL_ONE_COURSE_SUCCESS = "GET_ONE_DETAIL_ONE_COURSE_SUCCESS";
export const GET_ONE_DETAIL_ONE_COURSE_FAILED = "GET_ONE_DETAIL_ONE_COURSE_FAILED";
export const GET_ONE_DETAIL_ONE_COURSE_CLEAR = "GET_ONE_DETAIL_ONE_COURSE_CLEAR";

export const CREATE_COURSE_REQUEST = "CREATE_COURSE_REQUEST";
export const CREATE_COURSE_SUCCESS = "CREATE_COURSE_SUCCESS";
export const CREATE_COURSE_FAILED = "CREATE_COURSE_FAILED";
export const CREATE_COURSE_CLEAR = "CREATE_COURSE_CLEAR";

export const CREATE_UNIT_COURSE_REQUEST = "CREATE_UNIT_COURSE_REQUEST";
export const CREATE_UNIT_COURSE_SUCCESS = "CREATE_UNIT_COURSE_SUCCESS";
export const CREATE_UNIT_COURSE_FAILED = "CREATE_UNIT_COURSE_FAILED";
export const CREATE_UNIT_COURSE_CLEAR = "CREATE_UNIT_COURSE_CLEAR";

export const CREATE_LESSON_UNIT_REQUEST = "CREATE_LESSON_UNIT_REQUEST";
export const CREATE_LESSON_UNIT_SUCCESS = "CREATE_LESSON_UNIT_SUCCESS";
export const CREATE_LESSON_UNIT_FAILED = "CREATE_LESSON_UNIT_FAILED";
export const CREATE_LESSON_UNIT_CLEAR = "CREATE_LESSON_UNIT_CLEAR";

export const REMOVE_STUDENT_ENROLL_REQUEST = "REMOVE_STUDENT_ENROLL_REQUEST";
export const REMOVE_STUDENT_ENROLL_SUCCESS = "REMOVE_STUDENT_ENROLL_SUCCESS";
export const REMOVE_STUDENT_ENROLL_FAILED = "REMOVE_STUDENT_ENROLL_FAILED";
export const REMOVE_STUDENT_ENROLL_CLEAR = "REMOVE_STUDENT_ENROLL_CLEAR";

// example APIs Redux-Saga
const CourcesReducer = createReducer(
    COURCES_REQUEST_GET_DATA,
    COURCES_GET_SUCCESS,
    COURCES_GET_FAILED
);
const OneCourceDetailReducer = createReducer(
    GET_ONE_DETAIL_ONE_COURSE,
    GET_ONE_DETAIL_ONE_COURSE_SUCCESS,
    GET_ONE_DETAIL_ONE_COURSE_FAILED,
    GET_ONE_DETAIL_ONE_COURSE_CLEAR
);

const CreateCourseReducer = createReducer(
    CREATE_COURSE_REQUEST,
    CREATE_COURSE_SUCCESS,
    CREATE_COURSE_FAILED,
    CREATE_COURSE_CLEAR
);
const CreateUnitCourseReducer = createReducer(
    CREATE_UNIT_COURSE_REQUEST,
    CREATE_UNIT_COURSE_SUCCESS,
    CREATE_UNIT_COURSE_FAILED,
    CREATE_UNIT_COURSE_CLEAR
);

const CreateLessonUnitReducer = createReducer(
    CREATE_LESSON_UNIT_REQUEST,
    CREATE_LESSON_UNIT_SUCCESS,
    CREATE_LESSON_UNIT_FAILED,
    CREATE_LESSON_UNIT_CLEAR
);
const RemoveStudentEnrollReducer = createReducer(
    REMOVE_STUDENT_ENROLL_REQUEST,
    REMOVE_STUDENT_ENROLL_SUCCESS,
    REMOVE_STUDENT_ENROLL_FAILED,
    REMOVE_STUDENT_ENROLL_CLEAR
);

export default CourcesReducer;
export { OneCourceDetailReducer, CreateCourseReducer, CreateUnitCourseReducer, CreateLessonUnitReducer, RemoveStudentEnrollReducer };