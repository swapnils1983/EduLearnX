import axiosInstance from "./api/axiosInstance";


export async function mediaUploadService(formData) {
  try {
    const { data } = await axiosInstance.post("/media/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.error("Media upload failed:", error);
    throw error;
  }
}

export async function mediaDeleteService(id) {
  const { data } = await axiosInstance.delete(`/media/delete/${id}`);

  return data;
}

export async function fetchInstructorCourseListService(params = {}) {
  const { page = 1, limit = 8, category, level } = params;

  const queryParams = new URLSearchParams({
    page,
    limit,
  });

  if (category && category !== "All") {
    queryParams.append('category', category);
  }

  if (level && level !== "All Levels") {
    queryParams.append('level', level);
  }

  const { data } = await axiosInstance.get(`/instructor/course/get?${queryParams.toString()}`);

  return data;
}

export async function addNewCourseService(formData) {
  const { data } = await axiosInstance.post(`/instructor/course/add`, formData);

  return data;
}

export async function fethCourceDetailById(id) {
  const { data } = await axiosInstance.get(`/instructor/course/get/details/${id}`);

  return data;
}


export async function checkCoursePurchaseInfoService(courseId, studentId) {
  const { data } = await axiosInstance.get(
    `/student/course/purchase-info/${courseId}/${studentId}`
  );

  return data;
}

export async function createPaymentService(formData) {
  const { data } = await axiosInstance.post(`/student/order/create`, formData);

  return data;
}

export async function captureAndFinalizePaymentService(
  paymentId,
  payerId,
  orderId
) {
  const { data } = await axiosInstance.post(`/student/order/capture`, {
    paymentId,
    payerId,
    orderId,
  });

  return data;
}

export async function fetchStudentBoughtCoursesService(studentId) {
  const { data } = await axiosInstance.get(
    `/student/course/get/${studentId}`
  );

  return data;
}

export async function fetchInstructorStatsService(instructorId) {
  const { data } = await axiosInstance.get(`/instructor/course/stats/:${instructorId}`)

  return data;
}


export const updateStudentProgressService = (courseId, lectureId, studentId) => {
  return axiosInstance.post(`/progress`, {
    courseId,
    lectureId,
    studentId,
  });
};

export const getStudentProgressService = (courseId, studentId) => {
  return axiosInstance.get(`/progress/${courseId}/${studentId}`);
};

export const fetchRecomendationService = (title) => {
  return axiosInstance.post("/recomendation", { title })
}