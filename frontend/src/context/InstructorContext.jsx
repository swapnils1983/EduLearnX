import { createContext, useState } from "react";


export const InstructorContext = createContext(null);

export default function InstructorProvider({ children }) {
    const [instructorCoursesList, setInstructorCoursesList] = useState([]);
    const [currentEditedCourseId, setCurrentEditedCourseId] = useState(null);

    return <InstructorContext.Provider value={{
        instructorCoursesList,
        setInstructorCoursesList,
        currentEditedCourseId,
        setCurrentEditedCourseId
    }}>
        {children}
    </InstructorContext.Provider>
}