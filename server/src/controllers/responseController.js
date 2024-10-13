
export const successResponse = (res, { message = "Successful", statatusCode = 200, payload = {} }) => {
    res.status(statatusCode || 200).json({
        success: true,
        message: message,
        payload: payload
    })
}

export const errorResponse = (res, { message = "INTERNAL SERVER ERROR", statatusCode = 500, }) => {
    res.status(statatusCode || 500).json({
        success: false,
        message: message,
    })
}