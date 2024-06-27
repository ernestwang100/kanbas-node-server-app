import model from "./model.js";

// actions for quizzes
export const createCourse = async (course) => {
    try {
        const courseData = { ...course };
        return await model.create(courseData);
    } catch (error) {
        console.error("Error creating the course:", error);
        throw error;
    }
};
export const findCourses = async(registeredCourses) => {
    let courses = null;
    if (registeredCourses.length > 0) {
        courses = await model.find({
            'id': { $in: registeredCourses }
        });
    } else {
        courses = await model.find();
    }
    return courses;
};

// export const findQuizById = async(quizId) => model.findOne({ id: quizId });
export const updateCourse = async(courseId, course) =>  model.updateOne({ id: courseId }, { $set: course });
export const deleteCourse = async(courseId) => model.deleteOne({ id: courseId });


